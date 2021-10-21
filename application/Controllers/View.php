<?php

namespace App\Controllers;

use CodeIgniter\HTTP\RequestInterface;

class View extends \CodeIgniter\Controller
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
			'baseURL' => BASE . '/public',
			// 'baseURL' => BASE,
			'userid' => $this->session->get('user_id'),
			'username' => $this->session->get('user_name'),
			'role' => $this->session->get('user_role'),
			'satuan' => $this->session->get('user_satuan'),
			'nip' => $this->session->get('nip'),
		);
	}

	public function index()
	{

		return redirect('home');
	}

	public function home()
	{

		helper('form');
		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'home';
		return \Twig::instance()->display('users/backupindex.html', $this->data);
	}


	public function contact()
	{
		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'contact';
		return \Twig::instance()->display('users/contact.html', $this->data);
	}

	public function profil()
	{
		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'contact';
		return \Twig::instance()->display('users/profil.html', $this->data);
	}

	public function visimisi()
	{
		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'visi misi';
		return \Twig::instance()->display('users/visimisi.html', $this->data);
	}

	public function struktur()
	{
		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'struktur';
		return \Twig::instance()->display('users/struktur.html', $this->data);
	}

	public function kegiatanUser()
	{

		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'kegiatanUser';
		return \Twig::instance()->display('users/kegiatanUser.html', $this->data);
	}

	public function eco_concept()
	{

		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'eco_concept';
		return \Twig::instance()->display('users/eco_concept.html', $this->data);
	}

	public function penapisan()
	{

		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'penapisan';
		return \Twig::instance()->display('users/penapisan.html', $this->data);
	}

	public function dasar_hukum()
	{

		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'dasar_hukum';
		return \Twig::instance()->display('users/dasar_hukum.html', $this->data);
	}

	public function persyaratan()
	{

		helper('form');
		// $this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'persyaratan';
		return \Twig::instance()->display('users/persyaratan.html', $this->data);
	}

	public function login()
	{

		if ($this->logged) {
			return redirect('dashboard');
		} else {
			helper('form');
			helper('url');

			$uri = current_url(true);

			$message = $this->session->getFlashdata('msg');
			
			if($_SERVER['QUERY_STRING']){
				$st = 1;
			}else{
				$st = 0;
			}
			$this->data['register'] = $st;
			
			if ($message) {
				$this->data['message'] = $message;
			}
			return \Twig::instance()->display('auth/login.html', $this->data);
		}
	}

	public function register()
	{
		if ($this->logged) {
			return redirect('dashboard');
		} else {
			helper('form');
			return \Twig::instance()->display('auth/register.html', $this->data);
		}
	}

	public function dashboard()
	{

		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/index.js';
			return \Twig::instance()->display('admin/index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function users()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/users/users-index.js';
			return \Twig::instance()->display('admin/users/index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function teknis()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/menu/menu-index-teknis.js';
			return \Twig::instance()->display('admin/menu/menu-index-teknis.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function operasi()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/menu/menu-index-operasi.js';
			return \Twig::instance()->display('admin/menu/menu-index-operasi.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function rencana()
	{
		if ($this->logged) {
			helper('form');
			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rencana/rencana-insert.js';
				return \Twig::instance()->display('admin/rencana/rencana-insert.html', $this->data);
			} else if ($param == 'view') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rencana/rencana-view.js';
				$this->data['ids'] = $request->getGet('ids');
				return \Twig::instance()->display('admin/rencana/rencana-view.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rencana/rencana-index.js';
				return \Twig::instance()->display('admin/rencana/rencana-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function userprofile()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/users/profile.js';
			return \Twig::instance()->display('admin/users/profile.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function berita()
	{
		helper('form');
		helper('url');

		$uri = current_url(true);

		if ($_SERVER['QUERY_STRING']) {
			parse_str($_SERVER['QUERY_STRING'], $get_array);
			$params = isset($get_array['params']) ? $get_array['params'] : '';
			$ids 		= isset($get_array['ids']) ? $get_array['ids'] : '';

			if (!$params || !$ids) {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita.js';
				return \Twig::instance()->display('users/informasi/berita.html', $this->data);
			}

			$this->data['params'] = $params;
			$this->data['ids'] = $ids;

			if ($params == 'satuan') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita-satuan.js';
				return \Twig::instance()->display('users/informasi/berita-satuan.html', $this->data);
			} else if ($params == 'post') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita-post.js';
				return \Twig::instance()->display('users/informasi/berita-post.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita.js';
				return \Twig::instance()->display('users/informasi/berita.html', $this->data);
			}
		}

		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita.js';
		return \Twig::instance()->display('users/informasi/berita.html', $this->data);
	}

	public function covid()
	{
		helper('form');
		helper('url');

		$uri = current_url(true);

		if ($_SERVER['QUERY_STRING']) {
			parse_str($_SERVER['QUERY_STRING'], $get_array);
			$params = isset($get_array['params']) ? $get_array['params'] : '';
			$ids 		= isset($get_array['ids']) ? $get_array['ids'] : '';

			if (!$params || !$ids) {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/covid-19.js';
				return \Twig::instance()->display('users/covid-19.html', $this->data);
			}

			$this->data['params'] = $params;
			$this->data['ids'] = $ids;

			if ($params == 'satuan') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/berita-satuan.js';
				return \Twig::instance()->display('users/informasi/berita-satuan.html', $this->data);
			} else if ($params == 'post') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/covid-post.js';
				return \Twig::instance()->display('users/covid-post.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/covid-19.js';
				return \Twig::instance()->display('users/covid-19.html', $this->data);
			}
		}

		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/covid-19.js';
		return \Twig::instance()->display('users/covid-19.html', $this->data);
	}


	public function beritacovid()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/covid19/beritacovid.js';
			return \Twig::instance()->display('admin/covid19/beritacovid.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function kawalcovid()
	{
		helper('form');
		return \Twig::instance()->display('kawalcovid.html', $this->data);
	}

}
