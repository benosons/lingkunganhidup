<?php

/**
 * Holds the paths that are used by the system to
 * locate the main directories, app, system, etc.
 * Modifying these allows you to re-structure your application,
 * share a system folder between multiple applications, and more.
 *
 * All paths are relative to the project's root folder.
 */

	$system_directory = 'system';
	$application_directory = 'application';
	$writable_directory = 'writable';
	$tests_directory = 'tests';

	// --------------------------------------------------------------------
	// END OF USER CONFIGURABLE SETTINGS.  DO NOT EDIT BELOW THIS LINE
	// --------------------------------------------------------------------

	/*
	 * ---------------------------------------------------------------
	 *  Resolve the system path for increased reliability
	 * ---------------------------------------------------------------
	 */



	/*
	 * -------------------------------------------------------------------
	 *  Now that we know the path, set the main path constants
	 * -------------------------------------------------------------------
	 */

	// The name of THIS file
	define('SELF', pathinfo(__FILE__, PATHINFO_BASENAME));

	// Path to the system folder
	define('BASEPATH', realpath(FCPATH).DIRECTORY_SEPARATOR.$system_directory.DIRECTORY_SEPARATOR);

	// Path to the front controller (this file)

	// Path to the writable directory.
	define('WRITEPATH', realpath(FCPATH).DIRECTORY_SEPARATOR.$writable_directory.DIRECTORY_SEPARATOR);

	// The path to the "application" folder
	define('APPPATH', realpath(FCPATH).DIRECTORY_SEPARATOR.$application_directory.DIRECTORY_SEPARATOR);

	// The path to the "tests" directory
	define('TESTPATH', realpath(FCPATH).DIRECTORY_SEPARATOR.$tests_directory.DIRECTORY_SEPARATOR);

	/*
	 *---------------------------------------------------------------
	 * BOOT THE ENVIRONMENT
	 *---------------------------------------------------------------
	 *
	 * The boot files allow you completely customize the working
	 * conditions in this environment, including turning error
	 * reporting on or off, loading up extra debugging tools,
	 * and more.
	 *
	 * A file matching the name of the current environment must
	 * be found under application/Config/Boot or the system
	 * will stop execution.
	 */

	if (file_exists(APPPATH.'Config/Boot/'.ENVIRONMENT.'.php'))
	{
		require APPPATH.'Config/Boot/'.ENVIRONMENT.'.php';
	}
	else
	{
		header('HTTP/1.1 503 Service Unavailable.', true, 503);
		echo 'The application environment is not set correctly.';
		exit(1); // EXIT_ERROR
	}

	/*
	 * ------------------------------------------------------
	 * Load the Kint Debugger
	 * ------------------------------------------------------
	 */
	if ($useKint === true)
	{
		require_once BASEPATH.'ThirdParty/Kint/Kint.class.php';
	}

	/*
	 * ------------------------------------------------------
	 *  Load any environment-specific settings from .env file
	 * ------------------------------------------------------
	 */

	// Load environment settings from .env files
	// into $_SERVER and $_ENV
	require BASEPATH.'Config/DotEnv.php';
	$env = new CodeIgniter\Config\DotEnv(APPPATH);
	$env->load();
	unset($env);

	/*
	 * ------------------------------------------------------
	 *  Load the framework constants
	 * ------------------------------------------------------
	 */
	if (file_exists(APPPATH.'Config/'.ENVIRONMENT.'/Constants.php'))
	{
		require_once APPPATH.'Config/'.ENVIRONMENT.'/Constants.php';
	}

	require_once(APPPATH.'Config/Constants.php');

	/*
	 * ------------------------------------------------------
	 *  Setup the autoloader
	 * ------------------------------------------------------
	 */
	// The autoloader isn't initialized yet, so load the file manually.
	require BASEPATH.'Autoloader/Autoloader.php';
	require APPPATH.'Config/Autoload.php';
	require APPPATH.'Config/Services.php';

	// Use Config\Services as CodeIgniter\Services
	class_alias('Config\Services', 'CodeIgniter\Services');

	// The Autoloader class only handles namespaces
	// and "legacy" support.
	$loader = CodeIgniter\Services::autoloader();
	$loader->initialize(new Config\Autoload());

	// The register function will prepend
	// the psr4 loader.
	$loader->register();

	/*
	 * ------------------------------------------------------
	 *  Load the global functions
	 * ------------------------------------------------------
	 */

	require_once BASEPATH.'Common.php';

	/*
	 * ------------------------------------------------------
	 *  Set custom exception handling
	 * ------------------------------------------------------
	 */
	$config = new \Config\App();

	CodeIgniter\Services::exceptions($config, true)
		->initialize();

	//--------------------------------------------------------------------
	// Should we use a Composer autoloader?
	//--------------------------------------------------------------------

	if ($composer_autoload = $config->composerAutoload)
	{
		if ($composer_autoload === TRUE)
		{
			file_exists(APPPATH.'../vendor/autoload.php')
				? require_once(APPPATH.'../vendor/autoload.php')
				: log_message('error', '$config->\'composerAutoload\' is set to TRUE but '.realpath("../").'vendor/autoload.php was not found.');
		}
		elseif (file_exists($composer_autoload))
		{
			require_once($composer_autoload);
		}
		else
		{
			log_message('error', 'Could not find the specified $config->\'composerAutoload\' path: '.$composer_autoload);
		}
	}

	/*
	 * --------------------------------------------------------------------
	 * LOAD THE BOOTSTRAP FILE
	 * --------------------------------------------------------------------
	 *
	 * And away we go...
	 */
	$codeigniter = new CodeIgniter\CodeIgniter($startMemory, $startTime, $config);
	$codeigniter->run();
