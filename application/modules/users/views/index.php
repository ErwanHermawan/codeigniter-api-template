<div class="row">
  <div class="col-12">
    <div class="card-box datatable-custom">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="header-title mb-0">Data Users</h4>
        <div class="form-inline">
          <!-- Date Range Input -->
          <div class="form-group">
            <input id="dateRange" class="form-control ml-2 js-date-range-picker" data-range="0" placeholder="Search data" />
          </div>

          <!-- Status Dropdown -->
          <div class="form-group">
            <select class="form-control ml-2" id="status">
              <option value="Pendaftaran">Pilih Status</option>
              <option value="All">Semua</option>
              <option value="Pendaftaran">Menunggu Pemeriksaan</option>
            </select>
          </div>

          <!-- Search Input -->
          <div class="form-group">
            <input id="search" class="form-control ml-2" placeholder="Search data" />
          </div>

          <!-- Add User Button -->
          <div class="form-group ml-2">
            <button type="button" class="btn btn-custom waves-effect w-md waves-light" data-toggle="modal" data-target="#modalAccount">
              <i class="mdi mdi-plus"></i> Tambah Data
            </button>
          </div>
        </div>
      </div>

      <!-- DataTable -->
      <div class="row">
        <div class="col-sm-12">
          <table id="dataTable" class="table js-data-users">
            <thead>
              <tr role="row">
                <th class="text-center" width="20">
                  <div class="custom-checkbox js-select-all-checkbox">
                    <label class="custom-checkbox__wrapper">
                      <input type="checkbox" id="selectAll" />
                      <div class="custom-checkbox__checkmark"></div>
                    </label>
                  </div>
                </th>
                <th width="80">Photo</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Role</th>
                <th class="text-center" width="60">Status</th>
                <th class="text-center" width="80">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include('modal-user.php'); ?>
