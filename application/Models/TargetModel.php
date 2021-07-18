<?php namespace App\Models;

use CodeIgniter\Model;

class TargetModel extends Model{
    protected $table = 'data_target';
    protected $primaryKey = 'id';
    protected $allowedFields = ['kode_program','kode_kegiatan','nama_kegiatan','created_by','updated_by','create_date','update_date'];
    protected $createdField  = 'create_date';
    protected $updatedField  = 'update_date';

    public function gettarget($code = null)
    {
      if($code){
        $sql = "SELECT dt.*, dp.nama_paket as nama_paket, bt.*, dsk.nama_subkegiatan, dk.nama_kegiatan, dpo.nama_program, u.user_fullname as nama_ppk
                FROM data_target dt
                inner join data_paket dp on dp.id = dt.id_paket
								inner join data_subkegiatan dsk on dsk.kode_subkegiatan = dt.kode_subkegiatan
								inner join data_kegiatan dk on dk.kode_kegiatan = dt.kode_kegiatan
								inner join data_program dpo on dpo.kode_program = dt.kode_program
                inner join bulan_target bt on bt.id_paket = dt.id_paket
                inner join users u on u.user_id = dt.ppk where dt.id = '$code'";

        $result = $this->db->query($sql);
        $row = $result->getResult();
        return $row;
      }

      $sql = "SELECT dt.*, dp.nama_paket as nama_paket FROM `data_target` dt
              inner join data_paket dp on dp.id = dt.id_paket";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
    }

    public function gettargetNip($code = null)
    {
      if($code){
        $sql = "SELECT dt.*, u.*, dp.nama_paket as nama_paket, bt.*, dsk.nama_subkegiatan, dk.nama_kegiatan, dpo.nama_program
                FROM data_target dt
                inner join data_paket dp on dp.id = dt.id_paket
								inner join data_subkegiatan dsk on dsk.kode_subkegiatan = dt.kode_subkegiatan
								inner join data_kegiatan dk on dk.kode_kegiatan = dt.kode_kegiatan
								inner join data_program dpo on dpo.kode_program = dt.kode_program
                inner join bulan_target bt on bt.id_paket = dt.id_paket
                inner join users u on u.user_id = dt.ppk where dt.id = '$code'";

        $result = $this->db->query($sql);
        $row = $result->getResult();
        return $row;
      }

      $sql = "SELECT dt.*, dp.nama_paket as nama_paket FROM `data_target` dt
              inner join data_paket dp on dp.id = dt.id_paket";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
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
          $builder = $this->db->table('data_paket');
          if($code){
            $query   = $builder->getWhere(['kode_subkegiatan' => $code]);
          }else{
            $query   = $builder->get();
          }
          return  $query->getResult();
    }

    public function saveParam($table = null, $data = null)
    {
        $res = $this->db->table($table)->insert($data);
        // echo $this->db->getLastQuery();die;
        return  $res;
    }

    public function getminggu($type = null, $code = null, $idpaket = null)
    {
      $str = substr($code, -1);
      $last = $str - 1;
      $toto = '';
      $now = '';
      if($type == 'keuangan'){
        $toto = "(select replace(m1, '.','') + replace(m2, '.','') + replace(m3, '.','') + replace(m4, '.','') from bulan_realisasi where type = '$type' and kode_bulan = 'n$last')";
        $now  = ", replace(m1, '.','') + replace(m2, '.','') + replace(m3, '.','') + replace(m4, '.','') as totalnya";
      }else if($type == 'fisik'){
        $toto = "(select total from bulan_realisasi where type = '$type' and kode_bulan = 'n$last' ORDER BY id DESC LIMIT 1)";
      }

      $sql = "SELECT
              br.*,
              dr.koordinat,
              dr.latar_belakang,
              dr.uraian,
              dr.permasalahan,
              $toto as total_sebelumnya $now from bulan_realisasi br
              left join data_realisasi dr on dr.id_paket = br.id_paket and dr.created_by = br.created_by and dr.kode_bulan = br.kode_bulan
              where type = '$type' and br.kode_bulan = '$code' and br.id_paket = $idpaket";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
    }

    public function updateDong($table = null, $id = null, $data = null)
    {

      $builder = $this->db->table($table);
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

    public function updateDong2($table = null, $id = null, $kode = null, $data = null)
    {
      $builder = $this->db->table($table);
      $query   = $builder->where('id_paket', $id);
      $query   = $builder->where('kode_bulan', $kode);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

    public function updateRealisasi($id = null, $m1 = null, $m2 = null, $m3 = null, $m4 = null, $total = null)
    {
      $data = [];

      if($m1){
        $data['m1'] = $m1;
        if($total){
          $data['total'] = $m1;
        }
      }
      if($m2){
        $data['m2'] = $m2;
        if($total){
          $data['total'] = $m2;
        }
      }
      if($m3){
        $data['m3'] = $m3;
        if($total){
          $data['total'] = $m3;
        }
      }
      if($m4){
        $data['m4'] = $m4;
        if($total){
          $data['total'] = $m4;
        }
      }

      // print_r($data);die;
      $builder = $this->db->table('bulan_realisasi');
      $query   = $builder->where('id', $id);
      $query->update($data);
      // echo $this->db->getLastQuery();die;
      return true;
    }

    public function getnip($code = null)
    {

      $sql = "SELECT dt.*, dp.nama_paket as nama_paket, u.* FROM `data_target` dt
              inner join data_paket dp on dp.id = dt.id_paket
              inner join users u on u.user_id = dt.ppk";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
    }

    public function getrealisasi($id_paket = null, $ppk = null, $type = null, $kodebulan = null)
    {

      $sql = "SELECT br.kode_bulan, br.m1, br.m2, br.m3, br.m4 , dr.koordinat, dr.latar_belakang, dr.uraian, dr.permasalahan
              from bulan_realisasi br
              inner join data_realisasi dr on dr.id_paket = br.id_paket and dr.created_by = br.created_by and dr.kode_bulan = br.kode_bulan
              where br.id_paket = '$id_paket' and br.created_by = '$ppk' and br.type = '$type' and br.kode_bulan = '$kodebulan'";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      $val = [];
      $toto = [];
      if((array)$row){

        if($type == 'fisik'){
          foreach ($row as $key => $value) {

            if($value->m1){
              $val['m1'] = $value->m1;
              $val['tot'] = $value->m1;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;

            }
            if($value->m2){
              $val['m2'] = $value->m2;
              $val['tot'] = $value->m2;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;

            }
            if($value->m3){
              $val['m3'] = $value->m3;
              $val['tot'] = $value->m3;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;

            }
            if($value->m4){
              $val['m4'] = $value->m4;
              $val['tot'] = $value->m4;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;

            }
          }


        }else{
          foreach ($row as $key => $value) {
            if($value->m1){
              $toto['m1'] = $value->m1;
              $val['m1'] = $value->m1;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;
            }
            if($value->m2){
              $toto['m2'] = $value->m2;
              $val['m2'] = $value->m2;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;
            }
            if($value->m3){
              $toto['m3'] = $value->m3;
              $val['m3'] = $value->m3;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;
            }
            if($value->m4){
              $toto['m4'] = $value->m4;
              $val['m4'] = $value->m4;
              $val['koordinat'] = $value->koordinat;
              $val['latar_belakang'] = $value->latar_belakang;
              $val['uraian'] = $value->uraian;
              $val['permasalahan'] = $value->permasalahan;
            }
          }

          $sum = 0;
          foreach($toto as $key => $value){
               $sum += (int)str_replace('.','',$toto[$key]);
          }
          $val['tot'] =$sum;

        }

      }

      return (object)$val;
    }

    public function cekpaket($paket = null, $bulan = null)
    {

      $sql = "select * from data_realisasi where id_paket = '$paket' and kode_bulan = '$bulan'";

      $result = $this->db->query($sql);
      $row = $result->getResult();
      return $row;
    }

    public function cekrealisasi($paket = null, $bulan = null, $userid = null, $type = null, $m1 = null, $m2 = null, $m3 = null, $m4 = null)
    {
      $field = '';
      if($m1){
        $field = "m1 = '$m1'";
      }
      if($m2){
        $field = "m2 = '$m2'";
      }
      if($m3){
        $field = "m3 = '$m3'";
      }
      if($m4){
        $field = "m4 = '$m4'";
      }
      $sql = "select * from bulan_realisasi where id_paket = '$paket' and kode_bulan = '$bulan' and type= '$type' and created_by = '$userid'";

      $result = $this->db->query($sql);
      $row = $result->getResult();

      return $row;
    }

    public function cekDataRealisasi($paket = null, $bulan = null, $userid = null, $type = null, $m1 = null, $m2 = null, $m3 = null, $m4 = null)
    {
      $field = '';
      if($m1){
        $field = "m1 = '$m1'";
      }
      if($m2){
        $field = "m2 = '$m2'";
      }
      if($m3){
        $field = "m3 = '$m3'";
      }
      if($m4){
        $field = "m4 = '$m4'";
      }
      $sql = "select * from data_realisasi where id_paket = '$paket' and kode_bulan = '$bulan' and created_by = '$userid'";
      $result = $this->db->query($sql);
      $row = $result->getResult();

      return $row;
    }

    public function getall($table = null, $select = null, $where = null){

      $builder = $this->db->table($table);
      $builder->select($select);
      if($where){
        $query   = $builder->getWhere($where);
      }else{
        $query = $builder->get();
      }
      // if($table == 'data_kegiatan'){
      //   echo $this->db->getLastQuery();die;
      // }


      return  $query->getResult();
    }

}
