<?php

namespace Config;

/**
 * --------------------------------------------------------------------
 * URI Routing
 * --------------------------------------------------------------------
 * This file lets you re-map URI requests to specific controller functions.
 *
 * Typically there is a one-to-one relationship between a URL string
 * and its corresponding controller class/method. The segments in a
 * URL normally follow this pattern:
 *
 *    example.com/class/method/id
 *
 * In some instances, however, you may want to remap this relationship
 * so that a different class/function is called than the one
 * corresponding to the URL.
 *
 */

// Create a new instance of our RouteCollection class.
$routes = Services::routes(true);

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(BASEPATH . 'Config/Routes.php')) {
	require BASEPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 * The RouteCollection object allows you to modify the way that the
 * Router works, by acting as a holder for it's configuration settings.
 * The following methods can be called on the object to modify
 * the default operations.
 *
 *    $routes->defaultNamespace()
 *
 * Modifies the namespace that is added to a controller if it doesn't
 * already have one. By default this is the global namespace (\).
 *
 *    $routes->defaultController()
 *
 * Changes the name of the class used as a controller when the route
 * points to a folder instead of a class.
 *
 *    $routes->defaultMethod()
 *
 * Assigns the method inside the controller that is ran when the
 * Router is unable to determine the appropriate method to run.
 *
 *    $routes->setAutoRoute()
 *
 * Determines whether the Router will attempt to match URIs to
 * Controllers when no specific route has been defined. If false,
 * only routes that have been defined here will be available.
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('View');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// $routes->set404Override(function() {
// 	echo view('404');die;
// });
$routes->setAutoRoute(true);

/**
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->add('/', 'View::index');
$routes->add('home', 'View::home');
$routes->add('profil', 'View::profil');
$routes->add('visimisi', 'View::visimisi');
$routes->add('struktur', 'View::struktur');
$routes->add('contact', 'View::contact');
$routes->add('kegiatanUser', 'View::kegiatanUser');
$routes->add('eco_concept', 'View::eco_concept');
$routes->add('penapisan', 'View::penapisan');
$routes->add('dasar_hukum', 'View::dasar_hukum');
$routes->add('persyaratan', 'View::persyaratan');
$routes->add('dashboard', 'View::dashboard');
$routes->add('login', 'View::login');
$routes->add('register', 'View::register');
$routes->add('users', 'View::users');
$routes->add('teknis', 'View::teknis');
$routes->add('operasi', 'View::operasi');

$routes->add('auth', 'Auth::auth');
$routes->add('reg', 'Auth::reg');
$routes->add('logout', 'Auth::logout');

$routes->post('loadusers', 'Jsondata::loadusers');
$routes->post('loadall', 'Jsondata::loadall');
$routes->post('loadpermohonan', 'Jsondata::loadpermohonan');
$routes->post('loadfile', 'Jsondata::loadfile');
$routes->post('loadfilelapangan', 'Jsondata::loadfilelapangan');
$routes->post('updatestatus', 'Jsondata::updatestatus');
$routes->post('loadstatus', 'Jsondata::loadstatus');
$routes->post('uploadfile', 'Jsondata::uploadfile');
$routes->post('uploadfilelapangan', 'Jsondata::uploadfilelapangan');

$routes->post('actionUsers', 'Jsondata::actionUsers');
$routes->post('addUser', 'Jsondata::addUser');
$routes->post('addpermohonan', 'Jsondata::addpermohonan');
$routes->post('editfile', 'Jsondata::editfile');
$routes->post('checkUser', 'Jsondata::checkUser');
$routes->post('deletedata', 'Jsondata::deletedata');
$routes->post('deletedataungahan', 'Jsondata::deletedataungahan');
$routes->post('updatestatusmaster', 'Jsondata::updatestatusmaster');
$routes->post('updatepermohonanparam', 'Jsondata::updatepermohonanparam');






/**
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need to it be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
