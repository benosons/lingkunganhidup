<?php namespace App\Models;

use CodeIgniter\Model;

class FilesModel extends Model{
    protected $table = 'data_files';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_parent','file_name','extention','size','path','type','create_date','update_date'];

}
