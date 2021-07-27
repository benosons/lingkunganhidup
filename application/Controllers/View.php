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

	public function login()
	{

		if ($this->logged) {
			return redirect('dashboard');
		} else {
			helper('form');
			$message = $this->session->getFlashdata('msg');

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

	public function program()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/program/program-index.js';
			return \Twig::instance()->display('admin/program/program-index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function kegiatan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/kegiatan/kegiatan-index.js';
			return \Twig::instance()->display('admin/kegiatan/kegiatan-index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function subkegiatan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/subkegiatan/subkegiatan-index.js';
			return \Twig::instance()->display('admin/subkegiatan/subkegiatan-index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function paket()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/paket/paket-index.js';
			return \Twig::instance()->display('admin/paket/paket-index.html', $this->data);
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

	public function laporan()
	{
		if ($this->logged) {
			helper('form');
			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/laporan/laporan-insert.js';
				return \Twig::instance()->display('admin/laporan/laporan-insert.html', $this->data);
			} else if ($param == 'view') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/laporan/laporan-view.js';
				$this->data['ids'] = $request->getGet('ids');
				return \Twig::instance()->display('admin/laporan/laporan-view.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/laporan/laporan-index.js';
				return \Twig::instance()->display('admin/laporan/laporan-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function rekap()
	{
		if ($this->logged) {
			helper('form');
			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rekap/rekap-insert.js';
				return \Twig::instance()->display('admin/rekap/rekap-insert.html', $this->data);
			} else if ($param == 'view') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rekap/rekap-view.js';
				$this->data['ids'] = $request->getGet('ids');
				return \Twig::instance()->display('admin/rekap/rekap-view.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/rekap/rekap-index.js';
				return \Twig::instance()->display('admin/rekap/rekap-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function report()
	{
		if ($this->logged) {
			helper('form');
			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/report/report-insert.js';
				return \Twig::instance()->display('admin/report/report-insert.html', $this->data);
			} else if ($param == 'view') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/report/report-view.js';
				$this->data['ids'] = $request->getGet('ids');
				return \Twig::instance()->display('admin/report/report-view.html', $this->data);
			} else {;
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/report/report-index.js';
				return \Twig::instance()->display('admin/report/report-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function target()
	{
		if ($this->logged) {
			helper('form');

			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/target/target-insert.js';
				return \Twig::instance()->display('admin/target/target-insert.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/target/target-index.js';
				return \Twig::instance()->display('admin/target/target-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function fisik()
	{
		if ($this->logged) {
			helper('form');

			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/fisik/fisik-insert.js';
				return \Twig::instance()->display('admin/fisik/fisik-insert.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/fisik/fisik-index.js';
				return \Twig::instance()->display('admin/fisik/fisik-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function biodata()
	{
		if ($this->logged) {
			helper('form');

			$request  = $this->request;
			$param 	  = $request->getGet('param');

			if ($param == 'insert') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/biodata/biodata-insert.js';
				return \Twig::instance()->display('admin/biodata/biodata-insert.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/biodata/biodata-index.js';
				return \Twig::instance()->display('admin/biodata/biodata-index.html', $this->data);
			}
		} else {
			return redirect('home');
		}
	}

	public function kirimpengaduan()
	{
		helper('form');
		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/pengaduan.js';
		return \Twig::instance()->display('users/pengaduan/index.html', $this->data);
	}

	public function datapengaduan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pengaduan/data.js';
			return \Twig::instance()->display('admin/pengaduan/index.html', $this->data);
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

	public function inputberita()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/informasi/inputberita.js';
			return \Twig::instance()->display('admin/informasi/inputberita.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function inputkegiatan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/informasi/inputkegiatan.js';
			return \Twig::instance()->display('admin/informasi/inputkegiatan.html', $this->data);
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

	public function kegiatan_pol()
	{
		helper('form');
		helper('url');

		$uri = current_url(true);

		if ($_SERVER['QUERY_STRING']) {
			parse_str($_SERVER['QUERY_STRING'], $get_array);
			$params = isset($get_array['params']) ? $get_array['params'] : '';
			$ids 		= isset($get_array['ids']) ? $get_array['ids'] : '';

			if (!$params || !$ids) {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/kegiatan.js';
				return \Twig::instance()->display('users/informasi/kegiatan.html', $this->data);
			}

			$this->data['params'] = $params;
			$this->data['ids'] = $ids;

			if ($params == 'satuan') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/kegiatan-satuan.js';
				return \Twig::instance()->display('users/informasi/kegiatan-satuan.html', $this->data);
			} else if ($params == 'post') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/kegiatan-post.js';
				return \Twig::instance()->display('users/informasi/kegiatan-post.html', $this->data);
			} else {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/kegiatan.js';
				return \Twig::instance()->display('users/informasi/kegiatan.html', $this->data);
			}
		}

		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/informasi/kegiatan.js';
		return \Twig::instance()->display('users/informasi/kegiatan.html', $this->data);
	}


	public function satuan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/satuan/satuan-index.js';
			return \Twig::instance()->display('admin/satuan/index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function satuan1()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/satuan/satuan-index.js';
			return \Twig::instance()->display('admin/satuan/index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function profile()
	{
		helper('form');
		helper('url');

		$uri = current_url(true);

		if ($_SERVER['QUERY_STRING']) {
			parse_str($_SERVER['QUERY_STRING'], $get_array);
			$params = isset($get_array['params']) ? $get_array['params'] : '';
			$ids 		= isset($get_array['ids']) ? $get_array['ids'] : '';

			if (!$params || !$ids) {
				return redirect('home');
			}

			$this->data['params'] = $params;
			$this->data['ids'] = $ids;
			if ($params == 'kapolres') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/kapolres.html', $this->data);
			} else if ($params == 'visi-misi') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/visi-misi.html', $this->data);
			} else if ($params == 'struktur-organisasi') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/struktur-organisasi.html', $this->data);
			} else if ($params == 'tentang') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/tentang.html', $this->data);
			}
		}

		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/home.js';
		$this->data['page'] = 'home';
		return \Twig::instance()->display('users/index.html', $this->data);
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

	public function pelayanan()
	{
		helper('form');
		helper('url');

		$uri = current_url(true);

		if ($_SERVER['QUERY_STRING']) {
			parse_str($_SERVER['QUERY_STRING'], $get_array);
			$params = isset($get_array['params']) ? $get_array['params'] : '';
			$ids 		= isset($get_array['ids']) ? $get_array['ids'] : '';

			// if(!$params || !$ids){
			// 	return redirect('home');
			// }

			$this->data['params'] = $params;
			$this->data['ids'] = $ids;
			if ($params == 'kapolres') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/kapolres.html', $this->data);
			} else if ($params == 'visi-misi') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/visi-misi.html', $this->data);
			} else if ($params == 'struktur-organisasi') {
				$this->data['script'] = $this->data['baseURL'] . '/action-js/users/profile/profile.js';
				return \Twig::instance()->display('users/profile/struktur-organisasi.html', $this->data);
			}
		}

		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/pelayanan/pelayanan.js';
		$this->data['page'] = $params;
		return \Twig::instance()->display('users/pelayanan/pelayanan.html', $this->data);
	}

	public function listpelayanan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/pelayanan/pelayanan-index.js';
			return \Twig::instance()->display('admin/pelayanan/index.html', $this->data);
		} else {
			return redirect('home');
		}
	}

	public function lapor()
	{
		helper('form');
		$this->data['script'] = $this->data['baseURL'] . '/action-js/users/lapor.js';
		return \Twig::instance()->display('users/lapor.html', $this->data);
	}

	public function kawalcovid()
	{
		helper('form');
		return \Twig::instance()->display('kawalcovid.html', $this->data);
	}

	public function laporkerumunan()
	{
		if ($this->logged) {
			helper('form');
			$this->data['script'] = $this->data['baseURL'] . '/action-js/admin/covid19/laporkerumunan.js';
			return \Twig::instance()->display('admin/covid19/laporkerumunan.html', $this->data);
		} else {
			return redirect('home');
		}
	}
}
