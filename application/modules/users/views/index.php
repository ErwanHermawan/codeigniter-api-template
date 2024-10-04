<div class="row">
  <div class="col-12">
    <div class="card-box table-responsive datatable-custom">
			<div class="d-flex justify-content-between align-items-center mb-4">
				<h4 class="header-title mb-0">Data User</h4>
				<div class="form-inline">
					<div class="form-group">
						<input id="dateRange" class="form-control ml-2 js-date-range-picker" data-range="0" placeholder="Search data"/>
					</div>
					<div class="form-group">
						<select class="form-control ml-2 js-examination-status" id="status">
							<option value="Pendaftaran">Pilih Status</option>
							<option value="All">Semua</option>
							<option value="Pendaftaran">Menunggu Pemeriksaan</option>
						</select>
					</div>
					<div class="form-group">
						<input id="search" class="form-control ml-2" placeholder="Search data"/>
					</div>
					<div class="form-group ml-2">
						<a href="<?= base_url('users/add') ?>" class="btn btn-custom"><i class="mdi mdi-plus"></i> Add User</a>
					</div>
				</div>
			</div>
      <div class="row">
        <div class="col-sm-12 labe">
          <table class="table js-data-users">
            <thead>
              <tr role="row">
                <th class="text-center" width="20">No</th>
                <th class="text-center" width="80">Photo</th>
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
