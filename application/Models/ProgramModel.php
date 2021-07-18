<?php namespace App\Models;

use CodeIgniter\Model;

class ProgramModel extends Model{
    protected $table = 'data_program';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_program','nama_program','created_by','updated_by','create_date','update_date'];
    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function getProgram($role=null)
    {
          if($role == '30'){ //ppk
            $builder = $this->db->table('data_program');
            $query   = $builder->get();
            return  $query->getResult();
          }
          
          $builder = $this->db->table('data_program');
          $query   = $builder->get();
          return  $query->getResult();
    }

    public function saveParam($table = null, $data = null)
    {
        return  $this->db->table($table)->insert($data);
    }

}
