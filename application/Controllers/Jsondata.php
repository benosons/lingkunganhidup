<?php namespace App\Controllers;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\Files\UploadedFile;

class Jsondata extends \CodeIgniter\Controller
{
	protected $session;
	protected $request;

  function __construct(RequestInterface $request)
  {
      $this->session = session();
			$this->now = date('Y-m-d H:i:s');
			$this->request = $request;
      $this->logged = $this->session->get('logged_in');
			$this->data = array(
				'version' => \CodeIgniter\CodeIgniter::CI_VERSION,
				'baseURL' => BASE.'/public',
				// 'baseURL' => BASE,
				'userid' => $this->session->get('user_id'),
				'username' => $this->session->get('user_name'),
				'role' => $this->session->get('user_role'),
				'satuan' => $this->session->get('user_satuan'),
				'nip' => $this->session->get('nip'),
			);
  }

	public function getpengaduan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$user_satuan		= $this->data['satuan'];

				if($this->logged){
					$model = new \App\Models\PengaduanModel();
					$modelfiles = new \App\Models\FilesModel();
					if($role == 100){
						$data = $model->findAll();
					}else{
							$data['pengaduan'] = $model->getPengaduan($param, $role, $userid, '', $id, $user_satuan);
							$data['lampiran']  = $modelfiles->getWhere(['id_parent' => $id])->getResult();
							$data['balasan']   = $model->getBalasan($id);
							foreach ($data['balasan'] as $key => $value) {
								unset($value->user_password);
								unset($value->user_created_at);
								unset($value->user_id);
							}

					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getBerita()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$user_satuan		= $this->data['satuan'];

				if($this->logged){
					$model = new \App\Models\BeritaModel();
					$modelfiles = new \App\Models\FilesModel();
					if($role == 100){
							$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					}else{
							$data['berita'] = $model->getBerita($param, $role, $userid, '', $id);
							$data['lampiran']  = $modelfiles->getWhere(['id_parent' => $id])->getResult();
					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getKegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\KegiatanModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getKegiatan($param, $role, $userid, '', $id);

					foreach ($data as $key => $value) {
						$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
					}

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getFiles()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\KegiatanModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $modelfiles->getWhere(['id_parent' => $param['id']])->getResult();

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getBeritaCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\BeritaModel();
					$modelfiles = new \App\Models\FilesModel();
					// if($role == 100){
					// 		$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					// }else{
							$data = $model->getBeritaCovid($param, $role, $userid, '', $id);
							foreach ($data as $key => $value) {
								$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
							}
					// }

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function getLaporCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

				if($this->logged){
					$model = new \App\Models\PengaduanModel();
					$modelfiles = new \App\Models\FilesModel();
					// if($role == 100){
					// 		$data['berita'] = $model->join('users','users.user_id = data_berita.create_by')->findAll();
					// }else{
							$data = $model->getLaporCovid($param, $role, $userid, '', $id);
							foreach ($data as $key => $value) {
								$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id])->getResult();
							}
					// }

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				}else{
					$response = [
							'status'   => 'gagal',
							'code'     => '0',
							'data' 		 => 'silahkan login'
					];
				}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadprogram()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ProgramModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$dataprogram = $model->getProgram($role);


					if($dataprogram){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $dataprogram
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadkegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datakegiatan = $model->getKegiatan($code);

					if($datakegiatan){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datakegiatan
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadsubkegiatan()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datakegiatan = $model->getsubKegiatan($code);

					if($datakegiatan){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datakegiatan
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadpaket()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datapaket = $model->getpaket($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadtarget()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettarget($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadtargetNip()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettargetNip($code);

					$datareal = [];
					$bulan = [];
					$newreal = [];
					foreach ($datapaket as $key => $value) {

						if($value->type == 'keuangan'){
							$datareal['n1'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n1');
							$datareal['n2'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n2');
							$datareal['n3'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n3');
							$datareal['n4'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n4');
							$datareal['n5'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n5');
							$datareal['n6'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n6');
							$datareal['n7'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n7');
							$datareal['n8'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n8');
							$datareal['n9'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n9');
							$datareal['n10'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n10');
							$datareal['n11'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n11');
							$datareal['n12'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n12');
							$datapaket[$key]->progres = $datareal;
						}else if($value->type == 'fisik'){
							$datareal['n1'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n1');
							$datareal['n2'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n2');
							$datareal['n3'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n3');
							$datareal['n4'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n4');
							$datareal['n5'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n5');
							$datareal['n6'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n6');
							$datareal['n7'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n7');
							$datareal['n8'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n8');
							$datareal['n9'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n9');
							$datareal['n10'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n10');
							$datareal['n11'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n11');
							$datareal['n12'] = $model->getrealisasi($value->id_paket, $value->ppk, $value->type, 'n12');
							$datapaket[$key]->progres = $datareal;
						}

					}


					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadminggu()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$type 		= $request->getVar('type');
				$code 		= $request->getVar('code');
				$idpaket 		= $request->getVar('idpaket');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$datapaket = $model->getminggu($type,$code, $idpaket);
					$cekrealisasi = $model->cekDataRealisasi($idpaket, $code, $userid);

					if(empty($datapaket)){
						$datapaket = [];
						if(!empty($cekrealisasi)){
							$cekrealisasi[0]->type = $type;
							$datapaket[0] = $cekrealisasi[0];
						}else{
							$datapaket = [];
						}
					}else{
						$datapaket = $datapaket;
					}

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadnip()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->getnip($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadrealisasi()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$nip			= $this->data['nip'];
				$code 		= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$fulldata = [];
					$datapaket = $model->gettarget($code);

					if($datapaket){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $datapaket
						];
					}else{
						$response = [
								'status'   => 'gagal',
								'code'     => '0',
								'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaByidCovid($id);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles[0], (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaCovid($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
									$obj_merged = (object) array_merge((array) $valueberita);
									$obj_merged->lampiran = (array) $datafiles;
									array_push($fulldata, $obj_merged);
								}
								$berita = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadKegiatan_pol()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\KegiatanModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getKegiatanByid($id);
						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datasatuan);
							$obj_merged->lampiran = (array) $datafiles;
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadKegiatan($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaHeadline()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaHeadline($id, 1);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles, (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaHeadline($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadBeritaHeadlineCovid()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\BeritaModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getBeritaHeadlineCovid($id, 1);

						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles, (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadBeritaHeadlineCovid($value->satuan_code);

								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadparam()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getparam($param, $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function save(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		if($mode == 'balasan'){
			$data = [
				'id_pengaduan'=> $request->getVar('id'),
				'isi' 				=> $request->getVar('isi'),
				'create_date' => $this->now,
				'update_date' => $this->now,
				'create_by' 	=> $this->data['userid']
	    ];

			$simpan = $model->saveBalasan($data);
			$response = [
					'status'   => 'sukses',
					'code'     => '0',
					'data' 		 => 'terkirim'
			];
			header('Content-Type: application/json');
			echo json_encode($response);
			exit;
		}

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
						'kode_tujuan' => $request->getVar('kode_tujuan'),
						'nama_tujuan'	=> $request->getVar('nama_tujuan'),
						'judul' 			=> $request->getVar('judul'),
						'isi' 				=> $request->getVar('isi'),
						'create_date' => $this->now,
						'update_date' => $this->now,
						'create_by' 	=> $this->data['userid'],
						'update_by' 	=> '',
						'status' 			=> 0,
						'role' 				=> $this->data['role']
        ];
		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveBerita(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\BeritaModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_berita' => $request->getVar('judul'),
			'isi_berita' => $request->getVar('isi'),
			'satuan' => $request->getVar('kode_tujuan'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveKegiatan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\KegiatanModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_kegiatan' => $request->getVar('judul'),
			'satuan' => $request->getVar('kode_tujuan'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveBeritaCovid(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\BeritaModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= 'covid';
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'judul_berita' => $request->getVar('judul'),
			'isi_berita' => $request->getVar('isi'),
			'create_by' => $this->data['userid'],
			'status' => 0,
			'create_date' => $this->now,
			'update_date' => $this->now
    ];

		$res = $model->insertBeritaCovid($data);
		$id  = $res;

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => $request->getVar('param'),
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function saveLapor(){
		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['lampiran'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/'.$request->getVar('param').'/lampiran';
		$bagian 	= 'covid';
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$bagian.'/'.$date.'/';

		$data = [
			'nama' => $request->getVar('input-name'),
			'no_telepon' => $request->getVar('input-notelp'),
			'alamat' => $request->getVar('input-alamat'),
			'id_kecamatan' => $request->getVar('input-kecamatan'),
			'id_desa' => $request->getVar('input-desa'),
			'create_date' => $this->now
    ];

		$res = $model->saveLaporan($data);
		$id  = $res;

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}

		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$bagian.'/'.$date.'/',
					'type' => 'kerumunan',
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function update(){

		$request  = $this->request;
		$id 	  = $request->getVar('id');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$model 	  = new \App\Models\PengaduanModel();

		$data = [
						'update_date' => $this->now,
						'update_by' 	=> $userid,
						'status' 			=> 1,
        ];

		$res = $model->update($id, $data);

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addProgram(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\ProgramModel();

		$data = [
						'kode_program' => $request->getVar('kode_program'),
						'nama_program' => $request->getVar('nama_program'),
						'created_by'	 => $role,
						'created_date' => $this->now,
						'updated_date' => $this->now,
        ];

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addKegiatan(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\KegiatanModel();

		if($request->getVar('param') == 'data_kegiatan'){
			$data = [
							'kode_program	' => $request->getVar('kode_program'),
							'kode_kegiatan' => $request->getVar('kode_kegiatan'),
							'nama_kegiatan' => $request->getVar('nama_kegiatan'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}else if($request->getVar('param') == 'data_subkegiatan'){
			$data = [
							'kode_program	' => $request->getVar('kode_program'),
							'kode_kegiatan' => $request->getVar('kode_kegiatan'),
							'kode_subkegiatan' => $request->getVar('kode_subkegiatan'),
							'nama_subkegiatan' => $request->getVar('nama_subkegiatan'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}else if($request->getVar('param') == 'data_paket'){
			$data = [
							'kode_program	' 	 => $request->getVar('kode_program'),
							'kode_kegiatan' 	 => $request->getVar('kode_kegiatan'),
							'kode_subkegiatan' => $request->getVar('kode_subkegiatan'),
							'nama_paket' 		=> $request->getVar('nama_paket'),
							'created_by'		=> $role,
							'created_date'	=> $this->now,
							'updated_date'	=> $this->now,
					];
		}

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addTarget(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];

		$model 	  = new \App\Models\TargetModel();

		$data = [
						'kode_program'		=> $request->getVar('kode_program'),
						'kode_kegiatan'		=> $request->getVar('kode_kegiatan'),
						'kode_subkegiatan'=> $request->getVar('kode_subkegiatan'),
						'id_paket'				=> $request->getVar('id_paket'),
						'created_by'			=> $role,
						'created_date'		=> $this->now,
						'updated_date'		=> $this->now,
						'pagu'						=> $request->getVar('pagu_kegiatan'),
						'ppk'							=> $request->getVar('ppk'),
						'bidang'					=> $request->getVar('bidang'),
						'seksi'						=> $request->getVar('seksi'),
				];

		$databulan_k = [];
		$databulan_f = [];
		for ($i=1; $i <= 12; $i++) {
			$databulan_k['id_paket'] = $request->getVar('id_paket');
			$databulan_f['id_paket'] = $request->getVar('id_paket');

			$databulan_k['type'] = 'keuangan';
			$databulan_k['n'.$i] = $request->getVar('k'.$i);
			$databulan_f['type'] = 'fisik';
			$databulan_f['n'.$i] = $request->getVar('f'.$i);
		}

		$databulan_k['tot'] = $request->getVar('ktot');
		$databulan_f['tot'] = $request->getVar('ftot');
		// for ($i=1; $i <= 2; $i++) {
			// if($=1){
				$res_k = $model->saveParam('bulan_target', $databulan_k);

			// }else if($=2){
				$res_f = $model->saveParam('bulan_target', $databulan_f);
			// }
			// code...
		// }

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addRealisasi(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$role 		= $this->data['role'];
		$userid 	= $this->data['userid'];

		$model 	  = new \App\Models\TargetModel();

		$type = $request->getVar('type');

		$edited = $request->getVar('edited');
		if($edited){

			$data = [
				'created_by'		=> $userid,
				'updated_date'	=> $this->now
			];

			$data_new = [
					'created_by'		=> $userid,
					'updated_date'	=> $this->now,
					'koordinat'			=> $request->getVar('koordinat'),
					'latar_belakang'=> $request->getVar('latar_belakang'),
					'uraian'				=> $request->getVar('uraian'),
					'permasalahan'	=> $request->getVar('permasalahan'),
				];
		}else{
			$data = [
					'id_paket'			=> $request->getVar('id_paket'),
					'type'					=> $type,
					'kode_bulan'		=> $request->getVar('kode_bulan'),
					'created_by'		=> $userid,
					'created_date'	=> $this->now,
					'updated_date'	=> $this->now,
				];

			$data_new = [
					'id_paket'			=> $request->getVar('id_paket'),
					'created_by'		=> $userid,
					'created_date'	=> $this->now,
					'updated_date'	=> $this->now,
					'koordinat'			=> $request->getVar('koordinat'),
					'latar_belakang'=> $request->getVar('latar_belakang'),
					'uraian'				=> $request->getVar('uraian'),
					'permasalahan'	=> $request->getVar('permasalahan'),
					'kode_bulan'		=> $request->getVar('kode_bulan')
				];
			}
	if($request->getVar('type') == 'keuangan'){
		if($request->getVar('m1')){
			$data['m1'] = $request->getVar('m1');
		}else if($request->getVar('m2')){
			$data['m2'] = $request->getVar('m2');
		}else if($request->getVar('m3')){
			$data['m3'] = $request->getVar('m3');
		}else if($request->getVar('m4')){
			$data['m4'] = $request->getVar('m4');
		}
	}else if($request->getVar('type') == 'fisik'){
		if($request->getVar('m1')){
			$data['m1'] = $request->getVar('m1');
			$data['total']	= $request->getVar('m1');
		}else if($request->getVar('m2')){
			$data['m2'] = $request->getVar('m2');
			$data['total']	= $request->getVar('m2');
		}else if($request->getVar('m3')){
			$data['m3'] = $request->getVar('m3');
			$data['total']	= $request->getVar('m3');
		}else if($request->getVar('m4')){
			$data['m4'] = $request->getVar('m4');
			$data['total']	= $request->getVar('m4');
		}
	}

		if($edited){
			$idnya = $request->getVar('idnya');
			$res = $model->updateDong('bulan_realisasi', $idnya , $data);
			$res2 = $model->updateDong2('data_realisasi', $request->getVar('id_paket'), $request->getVar('kode_bulan') , $data_new);

		}else{
			$cekrealisasi = $model->cekrealisasi($request->getVar('id_paket'), $request->getVar('kode_bulan'), $userid, $type, $request->getVar('m1'), $request->getVar('m2'), $request->getVar('m3'), $request->getVar('m4'));
			if(empty($cekrealisasi)){
				$res = $model->saveParam('bulan_realisasi', $data);
			}else{
				if(!array_key_exists("total",$data)){
					$data['total'] = '';
				}
				$res = $model->updateRealisasi($cekrealisasi[0]->id, $request->getVar('m1'), $request->getVar('m2'), $request->getVar('m3'), $request->getVar('m4'), @$data['total']);
			}

			$cekpaket	= $model->cekpaket($request->getVar('id_paket'), $request->getVar('kode_bulan'));

			if(empty($cekpaket)){
				$res_new = $model->saveParam('data_realisasi', $data_new);
			}
		}

		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addParam(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$model 	  = new \App\Models\ParamModel();

		$data = [
						'satuan_code' => $request->getVar('satuan_code'),
						'satuan_name'	=> $request->getVar('satuan_name'),
						'satuan_desc' => $request->getVar('satuan_desc'),
        ];

		$res = $model->saveParam($param, $data);
		$id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addUser(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$model 	  = new \App\Models\UserModel();

		$data = [
			'user_name' 		=> $request->getVar('user_name'),
			'user_email' 		=> $request->getVar('user_email'),
			'user_password' => password_hash($request->getVar('user_password'), PASSWORD_DEFAULT),
			'user_role' 		=> $request->getVar('user_role'),
			'user_fullname' => $request->getVar('user_fullname'),
			'user_satuan' 	=> $request->getVar('user_satuan'),
			'user_status' 	=> 1,
			'create_by' 		=> $this->data['userid'],
			'user_created_at'=> $this->now,
			'nip'=> $request->getVar('nip'),
		];

		$model->save($data);
		// $id  = $model->insertID();

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionBerita(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\BeritaModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatus();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 2,
				];
				$lastId = $model->getMaxId();

				if($param['id'] == $lastId){
					$lastId = $param['id'];
				}
				$model->update($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'update_by' 	=> $userid,
				'status' 			=> $param['stat'],
			];

			$res = $model->update($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->delete($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->update($param['id'], $data);
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionKegiatan(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\KegiatanModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatus();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 0,
				];
				$lastId = $model->getMaxId();
				$model->update($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'update_by' 	=> $userid,
				'status' 			=> $param['stat'],
			];

			$res = $model->update($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->delete($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 1;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->update($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionBeritaCovid(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');

		$model 	  = new \App\Models\BeritaModel();
		if($param['mode'] == 'headline'){
			$count = $model->countStatusCovid();
			if($count >= 5){
				$data = [
					'update_date' => $this->now,
					'update_by' 	=> $userid,
					'status' 			=> 2,
				];
				$lastId = $model->getMaxIdCovid();
				$model->updateBeritaCovid($lastId, $data);
			}

			$data = [
				'update_date' => $this->now,
				'status' 			=> $param['stat'],
			];
			$res = $model->updateBeritaCovid($param['id'], $data);

		}else if($param['mode'] == 'delete'){
			$res = $model->deleteDataCovid($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->updateBeritaCovid($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function actionLaporCovid(){

		$request  = $this->request;
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		$param 	  = $request->getVar('param');
		$id				= $param['id'];

		$model 	  = new \App\Models\PengaduanModel();
		$modelfiles = new \App\Models\FilesModel();

		if($param['mode'] == 'view'){
			$data = $model->getLaporCovid($id);

			foreach ($data as $key => $value) {
				$data[$key]->lampiran  = $modelfiles->getWhere(['id_parent' => $value->id, 'type' => 'kerumunan'])->getResult();
			}

		}else if($param['mode'] == 'delete'){
			$res = $model->deleteDataCovid($param['id']);
		}else if($param['mode'] == 'update'){
			switch ($param['stat']) {
				case 'false':
						$status = 0;
					break;

				default:
						$status = 2;
					break;
			}
			$data = [
									'update_date' => $this->now,
									'update_by' 	=> $userid,
									'status' => $status,
			        ];
				$res = $model->updateBeritaCovid($param['id'], $data);
		}


		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => @$data
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function addKonten(){

		$request  = $this->request;
		$param 	  = $request->getVar('param');
		$mode 	  = $request->getVar('mode');
		$model 	  = new \App\Models\KontenModel();
		$modelfiles = new \App\Models\FilesModel();

		$files	  = $request->getFiles()['img'];
		$path			= FCPATH.'public';
		$tipe			= 'uploads/users/pelayanan/img';
		// $bagian 	= $request->getVar('nama_tujuan');
		$date 		= date('Y/m/d');
		$folder		= $path.'/'.$tipe.'/'.$date.'/';

		$data = [
			'satuan_pelayanan' => $request->getVar('satuan'),
			'jenis_pelayanan' => $request->getVar('jenis'),
			'konten' => $request->getVar('konten'),
			'banner' => null,
			'create_by' => $this->data['userid'],
			'create_date' => $this->now,
    ];

		$res = $model->insert($data);
		$id  = $model->insertID();

		if (!is_dir($folder)) {
		    mkdir($folder, 0777, TRUE);
		}
		// print_r($id);die;
		if($id){
			foreach($files as $idx => $img){

				$stat = $img->move($folder, $img->getName());

				$datalampiran = [
					'id_parent' => $id,
					'file_name' => $img->getName(),
					'extention' => null,
					'size' => $img->getSize('kb'),
					'path' => $tipe.'/'.$date.'/',
					'type' => 'pelayanan',
					'create_date' => $this->now,
					'update_date' => $this->now,
		    ];
				$modelfiles->insert($datalampiran);
				// $saveupload = $model->saveDataUpload($datalampiran);
			}
		}

		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terkirim'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function loadKonten()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\KontenModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					if($param == 'post'){
						$fulldata = [];
						$databerita = $model->getKontenByid($id);
						foreach ($databerita as $keyberita => $valueberita) {

							$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getResult();
							$datasatuan= $model->getSatuanByCode($valueberita->satuan_pelayanan);
							$obj_merged = (object) array_merge((array) $valueberita, (array) $datasatuan);
							$obj_merged->lampiran = (array) $datafiles;
							array_push($fulldata, $obj_merged);
						}
						$berita = $fulldata;
					}else{
							if($param && $id){
								$data = $modelparam->getparam($param, $id);
							}else{
								$data = $model->getSatuan();
							}

							$berita = [];
							foreach ($data as $key => $value) {
								$fulldata = [];
								$databerita = $model->loadKegiatan($value->satuan_code);
								foreach ($databerita as $keyberita => $valueberita) {
									$datafiles = $modelfiles->getWhere(['id_parent' => $valueberita->id])->getRow();
									$obj_merged = (object) array_merge((array) $valueberita, (array) $datafiles);
									array_push($fulldata, $obj_merged);
								}
								$berita[$value->satuan_name] = $fulldata;
							}
						}

					if($berita){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $berita
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	function kawalcorona(){

		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://api.kawalcorona.com/indonesia/provinsi/",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "Cookie: __cfduid=d9578df7ba02ceb3ed84751b41a36c0391610346454"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$result = [
			'status'   => 'sukses',
			'code'     => $this->now,
			'data' 		 => json_decode($response, true)
		];

		header('Content-Type: application/json');
		echo json_encode($result);
		exit;
	}

	function coronas(){
		$curl = curl_init();

		curl_setopt_array($curl, array(
		  CURLOPT_URL => "https://dashboard-pikobar-api.digitalservice.id/v2/kasus/harian?wilayah=kota&kode_kab=3211",
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => "",
		  CURLOPT_MAXREDIRS => 10,
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_FOLLOWLOCATION => true,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST => "GET",
		  CURLOPT_HTTPHEADER => array(
		    "api-key: 480d0aeb78bd0064d45ef6b2254be9b3"
		  ),
		));

		$response = curl_exec($curl);

		curl_close($curl);
		// echo $response;
		print_r($response);die;
	}

	public function loadusers()
	{
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\UserModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

						$fulldata = [];
						$datauser = $model->getUsers($userid);

						foreach ($datauser as $keyuser => $valueuser) {
							$datafiles = $modelfiles->getWhere(['id_parent' => $valueuser['user_id']])->getRow();
							$datasatuan= $model->getSatuanByCode($valueuser['user_satuan']);
							$obj_merged = (object) array_merge((array) $valueuser, (array) $datafiles, (array) $datasatuan);
							array_push($fulldata, $obj_merged);
						}
						$users = $fulldata;

					if($users){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $users
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadppk()
	{
		try
		{

				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\UserModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();
						$fulldata = [];
						$datauser = $model->getUsersPpk($userid);

						foreach ($datauser as $keyuser => $valueuser) {
							$datafiles = $modelfiles->getWhere(['id_parent' => $valueuser['user_id']])->getRow();
							$obj_merged = (object) array_merge((array) $valueuser, (array) $datafiles);
							array_push($fulldata, $obj_merged);
						}
						$users = $fulldata;

					if($users){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $users
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function loadall()
	{
		try
		{

				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];
				$code			= $request->getVar('code');

					$model = new \App\Models\TargetModel();
					$modelparam = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();
						$fulldata = [];
						$dataprogram = $model->getall('data_program', 'kode_program, nama_program', ['kode_program' => '1.03.03']);
						$dataprogram = json_decode(json_encode($dataprogram), true);
						foreach ($dataprogram as $key => $value) {
							$datakegiatan = $model->getall('data_kegiatan','kode_kegiatan, nama_kegiatan', ['kode_program' => $value['kode_program']]);
							$datakegiatan = json_decode(json_encode($datakegiatan), true);
							foreach ($datakegiatan as $key1 => $value1) {
								$datasubkegiatan = $model->getall('data_subkegiatan', 'kode_subkegiatan, nama_subkegiatan', ['kode_kegiatan' => $value1['kode_kegiatan']]);
								$datasubkegiatan = json_decode(json_encode($datasubkegiatan), true);
								foreach ($datasubkegiatan as $key2 => $value2) {
									$datapaket = $model->getall('data_paket', 'id, nama_paket', ['kode_subkegiatan' => $value2['kode_subkegiatan']]);
									$datapaket = json_decode(json_encode($datapaket), true);
									foreach ($datapaket as $key3 => $value3) {
										$datatarget = $model->getall('data_target', 'id_paket, pagu, bidang, seksi', ['id_paket' => $value3['id'] ]);
										$datatarget = json_decode(json_encode($datatarget), true);
										foreach ($datatarget as $key4 => $value4) {
											$databulantarget_k = $model->getall('bulan_target', $code, ['id_paket' => $value4['id_paket'], 'type' => 'keuangan']);
											$databulantarget_k = json_decode(json_encode($databulantarget_k), true);

											$databulantarget_f = $model->getall('bulan_target', $code, ['id_paket' => $value4['id_paket'], 'type' => 'fisik']);
											$databulantarget_f = json_decode(json_encode($databulantarget_f), true);

											$datatarget[$key4]['keuangan'] = $databulantarget_k[0][$code];
											$datatarget[$key4]['fisik'] = $databulantarget_f[0][$code];
										}

										$datarealisasi = $model->getall('data_realisasi', 'id_paket, koordinat, latar_belakang, uraian, permasalahan ,kode_bulan', ['id_paket' => $value3['id'], 'kode_bulan' => $code ]);
										$datarealisasi = json_decode(json_encode($datarealisasi), true);
										foreach ($datarealisasi as $key5 => $value5) {
											$dataprogres_k = $model->getall('bulan_realisasi', "* , replace(m1, '.','') + replace(m2, '.','') + replace(m3, '.','') + replace(m4, '.','') as new_total", ['id_paket' => $value5['id_paket'], 'type' => 'keuangan', 'kode_bulan' => $value5['kode_bulan']]);
											$dataprogres_k = json_decode(json_encode($dataprogres_k), true);
											$dataprogres_f = $model->getall('bulan_realisasi', '*', ['id_paket' => $value5['id_paket'], 'type' => 'fisik', 'kode_bulan' => $value5['kode_bulan']]);
											$dataprogres_f = json_decode(json_encode($dataprogres_f), true);
											$datarealisasi[$key5]['keuangan'] = $dataprogres_k[0];
											$datarealisasi[$key5]['fisik'] = $dataprogres_f[0];
										}

										// $datatarget = empty($datatarget) ? 0 : $datatarget[0];
										// $datarealisasi = empty($datarealisasi) ? 0 : $datarealisasi[0];

										$datapaket[$key3]['target'] = $datatarget;
										$datapaket[$key3]['realisasi'] = $datarealisasi;

										foreach ($datapaket[$key3]['target'] as $keytar => $valuetar) {
											$datapaket[$key3]['pagu_paket'] = $valuetar['keuangan'];
										}

									}

									$datasubkegiatan[$key2]['paket'] = $datapaket;
									$pagu_sub = [];
									foreach ($datasubkegiatan[$key2]['paket'] as $keypak => $valuepak) {
										if(array_key_exists("pagu_paket",$valuepak)){
											array_push($pagu_sub, str_replace(".","",$valuepak['pagu_paket']));
										}
									}
									$datasubkegiatan[$key]['pagu_subkegiatan'] = array_sum($pagu_sub);

								}

								$datakegiatan[$key1]['subkegiatan'] = $datasubkegiatan;
								$pagu_keg = [];

								foreach ($datakegiatan[$key1]['subkegiatan'] as $keysub => $valuesub) {
									print_r($valuesub['pagu_subkegiatan']);die;
										array_push($pagu_keg, $valuesub['pagu_subkegiatan']);
								}
								$datakegiatan[$key]['pagu_kegiatan']= array_sum($pagu_keg);
							}

							$dataprogram[$key]['kegiatan'] = $datakegiatan;
							$pagu_prog = [];
							foreach ($dataprogram[$key]['kegiatan'] as $keykeg => $valuekeg) {
								array_push($pagu_prog, $valuekeg['pagu_kegiatan']);
							}
							$dataprogram[$key]['pagu_program']	   = array_sum($pagu_prog);
						}

					if($dataprogram){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $dataprogram
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

	public function actionUsers(){

		$request  = $this->request;
		$mode 	  = $request->getVar('mode');
		$id 	  	= $request->getVar('id');
		$status 	= $request->getVar('status');
		$role 		= $this->data['role'];
		$userid		= $this->data['userid'];

		switch ($status) {
			case 'false':
					$status = 0;
				break;

			default:
					$status = 1;
				break;
		}
		$model 	  = new \App\Models\UserModel();

		$data = [
						'update_date' => $this->now,
						'update_by' 	=> $userid,
						'user_status' => $status,
        ];
		if($mode == 'update'){
			$res = $model->update($id, $data);

		}else{
			$res = $model->delete(['user_id' => $id]);
		}
		$response = [
				'status'   => 'sukses',
				'code'     => '0',
				'data' 		 => 'terupdate'
		];
		header('Content-Type: application/json');
		echo json_encode($response);
		exit;

	}

	public function loadkota(){
		try
		{
				$request  = $this->request;
				$param 	  = $request->getVar('param');
				$id		 	  = $request->getVar('id');
				$role 		= $this->data['role'];
				$userid		= $this->data['userid'];

					$model = new \App\Models\ParamModel();
					$modelfiles = new \App\Models\FilesModel();

					$data = $model->getkota($param, $id);

					if($data){
						$response = [
							'status'   => 'sukses',
							'code'     => '1',
							'data' 		 => $data
						];
					}else{
						$response = [
						    'status'   => 'gagal',
						    'code'     => '0',
						    'data'     => 'tidak ada data',
						];
					}

				header('Content-Type: application/json');
				echo json_encode($response);
				exit;
			}
		catch (\Exception $e)
		{
			die($e->getMessage());
		}
	}

}
