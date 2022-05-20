<?php namespace App\Models;

use CodeIgniter\Model;

class KegiatanModel extends Model{
    protected $table = 'data_kegiatan';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_program','kode_kegiatan','nama_kegiatan','created_by','updated_by','create_date','update_date'];
    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function getKegiatan($code = null)
    {
          $builder = $this->db->table('data_kegiatan');
          if($code){
            $query   = $builder->getWhere(['kode_program' => $code]);
          }else{
            $query   = $builder->get();
          }
          return  $query->getResult();
    }

    public function getsubKegiatan($code = null)
    {
          $builder = $this->db->table('data_subkegiatan');
          if($code){
            $query   = $builder->getWhere(['kode_kegiatan' => $code]);
          }else{
            $query   = $builder->get();
          }
          return  $query->getResult();
    }

    public function getpaket($code = null)
    {
          if($code){
            $sql = "SELECT * FROM `data_paket` WHERE `kode_subkegiatan` = '$code' and
                    id not in (select id_paket from data_realisasi where id_paket = data_paket.id )";

            $result = $this->db->query($sql);
            $row = $result->getResult();
            return $row;
          }else{
            $builder = $this->db->table('data_paket');
            $query   = $builder->get();
          }
          // echo $this->db->getLastQuery();die;
          return  $query->getResult();
    }

    public function saveParam($table = null, $data = null)
    {
        return  $this->db->table($table)->insert($data);
    }

    public function deletedata($table = null, $id = null)
    {
      $builder = $this->db->table($table);
      $builder->where('id', $id);
      $builder->delete();
      return  true;
    }

    public function deletedatafilepermohonan($table = null, $id = null)
    {
      $builder = $this->db->table($table);
      $builder->where('id_parent', $id);
      $builder->delete();
      return  true;
    }

}
