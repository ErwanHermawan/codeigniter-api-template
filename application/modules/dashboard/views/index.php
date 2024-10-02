<!-- Widget Summary -->
<h4 class="mt-2 mb-3 header-title">Kunjungan Pasien Hari Ini</h4>
<div class="row js-dashboard-summary">
  <div class="col-lg-4 col-md-6">
    <div class="card-box wg-db">
			<div>
				<div class="wg-db__icon wg-db__bg-info">
					<i class="mdi mdi-cart-outline"></i>
				</div>
				<div class="wg-db__info">
					<h5 class="wg-db__title js-total-registred"> 0</h5>
					<p class="wg-db__desc">Pasien Terdaftar</p>
				</div>
			</div>
		</div>
  </div>
  <div class="col-lg-4 col-md-6">
    <div class="card-box wg-db">
			<div>
				<div class="wg-db__icon wg-db__bg-warning">
					<i class="mdi mdi-cart-outline"></i>
				</div>
				<div class="wg-db__info">
					<h5 class="wg-db__title js-total-notserved"> 0</h5>
					<p class="wg-db__desc">Belum Dilayani</p>
				</div>
			</div>
		</div>
  </div>
  <div class="col-lg-4 col-md-6">
    <div class="card-box wg-db">
			<div>
				<div class="wg-db__icon wg-db__bg-success">
					<i class="mdi mdi-cart-outline"></i>
				</div>
				<div class="wg-db__info">
					<h5 class="wg-db__title js-total-served"> 0</h5>
					<p class="wg-db__desc">Sudah Dilayani</p>
				</div>
			</div>
		</div>
  </div>
</div>
<!-- End Widget Summary -->

<!-- Chart -->
<div class="row">
  <div class="col-lg-12">
    <div class="card-box card-chart js-dashboard-chart">
      <div class="row">
        <div class="col-lg-12">
          <h4 class="header-title m-t-0 m-b-30">Grafik Kunjungan</h4>
        </div>
      </div>
      <div id="morris-line" class="morris-chart"></div>
      <div class="js-chart-not-found"></div>
    </div>
  </div>
</div>
<!-- End Chart -->

<div class="row">
  <div class="col-md-6">
    <div class="card-box card-dashboard">
      <h4 class="header-title m-t-0 m-b-30">Diagnosa Terbanyak</h4>
      <div class="card-dashboard-content js-list-diagnosis">
      </div>
    </div>
  </div>
  <div class="col-md-6">
    <div class="card-box card-dashboard">
      <h4 class="header-title m-t-0 m-b-30">Kunjungan Poli Terbanyak</h4>
      <div class="card-dashboard-content js-destination">
      </div>
    </div>
  </div>
</div>
