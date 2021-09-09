<?php namespace App\Controllers;
use App\Models\UserModel;
use App\Controller\BaseController;

class Auth extends \CodeIgniter\Controller
{

	public function auth()
	{
		try
			{

			$session = session();
			$model = new UserModel();
			$userModel = new \App\Models\UserModel();

			$email = $this->request->getVar('username');
			$password = $this->request->getVar('password');
			$dataemail = $model->getWhere(['user_name' => $email])->getRow();
			
			if(!$dataemail){
				$session->setFlashdata('msg', 'User Belum Terdaftar');
				return redirect('login');
			}

			$dataactive = $model->getWhere(['user_name' => $email, 'user_status' => 0])->getRow();
			
			if($dataactive){
				$session->setFlashdata('msg', 'User Tidak Aktif');
				return redirect('login');
			}

			$datastatus = $model->getWhere(['user_name' => $email, 'user_status' => 1])->getRow();
			
			if(!$datastatus){
				$session->setFlashdata('msg', 'User Belum di Verifikasi');
				return redirect('login');
			}

			

			if($dataemail && $datastatus){
					$pass = $dataemail->user_password;
					$hash =  substr_replace($pass, "$2y$10", 0, 1);
					$verify_pass = password_verify($password, $hash);
					if($verify_pass){
							$ses_data = [
									'user_id'       => $dataemail->user_id,
									'user_name'     => $dataemail->user_name,
									'user_fullname' => $dataemail->user_fullname,
									'user_email'    => $dataemail->user_email,
									'logged_in'     => TRUE,
									'user_role'     => $dataemail->user_role,
							];
							$session->set($ses_data);

							$userModel->updateIsLogin($dataemail->user_id, ['isLogin' => 1]);
							return redirect('dashboard');
					}else{
							$session->setFlashdata('msg', 'Salah Password');
							return redirect('login');
					}
			}else{
					$session->setFlashdata('msg', 'User belum terdaftar');
					return redirect('login');
			}
		}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function reg()
	{
		//include helper form
		helper('form');
		//set rules validation form
		$rules = [
			'email' 		=> 'required|min_length[6]|max_length[50]|valid_email|is_unique[users.user_email]',
			'username'		=> 'required|min_length[3]|max_length[20]',
			'password' 		=> 'required|min_length[6]|max_length[200]',
			'confpassword' 	=> 'matches[password]'
		];
		
		// if($this->validate($rules)){
			$model = new UserModel();
			$data = [
				'user_name' 	=> $this->request->getVar('register_username'),
				'user_email' 	=> $this->request->getVar('register_email'),
				'user_password' => password_hash($this->request->getVar('register_password'), PASSWORD_DEFAULT),
				'user_role' 	=> $this->request->getVar('register_tipe'),
				'user_fullname' => $this->request->getVar('register_badan_usaha')
			];
			
			$model->save($data);
			return redirect('login');
		// }else{
		// 	$data['validation'] = $this->validator;
		// 	echo view('register', $data);
		// }

	}

	public function logout()
	{
			$session = session();
			$userModel = new \App\Models\UserModel();
			$userModel->updateIsLogin($session->get('user_id'), ['isLogin' => null]);
			$session->destroy();
			return redirect('home');
	}

}
