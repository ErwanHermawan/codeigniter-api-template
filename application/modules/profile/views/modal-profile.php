<div class="modal fade" id="modal-profile" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Form Data Informasi Akun</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
      </div>
      <div class="modal-body">
        <form class="js-form-profile">
          <div class="form-group">
            <label for="name" class="col-form-label">Nama</label>
            <input type="text" class="form-control" name="name" id="name" placeholder="Masukkan nama" data-target="alertName" />
            <p class="form-alert" id="alertName" data-req="Nama harus di isi!"></p>
          </div>
          <div class="form-group">
            <label for="email" class="col-form-label">Email</label>
            <input type="text" class="form-control" name="email" id="email" placeholder="Masukkan email" data-target="alertEmail" />
            <p class="form-alert" id="alertEmail" data-req="Email harus di isi!" data-invalid="Email Anda tidak vaid!"></p>
          </div>
          <div class="form-group">
            <label for="phone" class="col-form-label">Telepon</label>
            <input type="text" class="form-control number-only" name="phone" id="phone" placeholder="Masukkan nomor telepon" data-target="alertPhone" />
            <p class="form-alert" id="alertPhone" data-req="Telepon harus di isi!" data-invalid="Telepon Anda tidak vaid!"></p>
          </div>
          <div class="form-group">
            <label for="createdDate" class="col-form-label">Tanggal Registrasi</label>
            <input type="text" class="form-control" name="created_date" id="createdDate" readonly="readonly" />
          </div>
          <div class="form-group">
            <label for="dateLog" class="col-form-label">Login Terakhir</label>
            <input type="text" class="form-control" name="date_log" id="dateLog" readonly="readonly" />
          </div>
          <!-- Save changes button-->
          <button type="submit" class="btn btn-custom waves-effect waves-light"><i class="mdi mdi-content-save-outline"></i> Simpan Perubahan</button>
        </form>
      </div>
    </div>
  </div>
</div>
