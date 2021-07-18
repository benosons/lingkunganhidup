<?php namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model{
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $allowedFields = ['user_name','user_email','user_password','user_created_at', 'user_role', 'user_fullname', 'user_status', 'isLogin', 'update_by', 'update_date', 'user_satuan', 'nip'];

    public function getUsers($id = null)
    {
      $this->join('users_role', 'users_role.role_id = users.user_role', 'LEFT');
      $this->select('*');
      $this->whereNotIn('user_id', $id);
      $result = $this->findAll();

      // echo $this->db->getLastQuery();

      return $result;
    }

    public function getUsersPpk($id = null)
    {
      $this->join('users_role', 'users_role.role_id = users.user_role', 'LEFT');
      $this->select('*');
      $this->whereNotIn('user_id', $id);
      $this->where('user_role', '30');
      $result = $this->findAll();

      // echo $this->db->getLastQuery();

      return $result;
    }

    public function getSatuanByCode($code)
    {
          $builder = $this->db->table('satuan');
          $query   = $builder->getWhere(['satuan_code' => $code]);
          return  $query->getRow();
    }

    public function updateIsLogin($id, $data)
    {
      $builder = $this->db->table('users');
      $query   = $builder->where('user_id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();

      return true;
    }

    public function update($id, $data)
    {
      $builder = $this->db->table('users');
      $query   = $builder->where('user_id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();

      return true;
    }
}
