<div class="row">
  <?php include('account-photo.php'); ?>

  <div class="col-xl-8">
    <!-- Account details card -->
    <div class="card-box">
      <?php include('tab-filter.php'); ?>
      <hr class="mt-0">

      <!-- User Information -->
      <div class="form-group row">
        <p class="mb-0 col-lg-4"><strong>Name</strong></p>
        <p class="mb-0 col-lg-8" id="name"></p>
      </div>
      <hr>
      <div class="form-group row">
        <p class="mb-0 col-lg-4"><strong>Username</strong></p>
        <p class="mb-0 col-lg-8" id="email"></p>
      </div>
      <hr>
      <div class="form-group row">
        <p class="mb-0 col-lg-4"><strong>Role</strong></p>
        <p class="mb-0 col-lg-8" id="phone"></p>
      </div>
      <hr>
      <div class="form-group row">
        <p class="mb-0 col-lg-4"><strong>Created Date</strong></p>
        <p class="mb-0 col-lg-8" id="created_date"></p>
      </div>
      <hr>

      <!-- Account Update Button -->
      <button type="button" class="btn btn-custom waves-effect waves-light" data-toggle="modal" data-target="#modal-profile">
        <i class="mdi mdi-pencil-outline"></i> Change Account Information
      </button>

      <hr>

      <!-- Data Reset Information -->
      <div class="form-group">
        <p>If you want to delete all transaction data or other data, you can perform a Data Reset.</p>
      </div>
      <button type="button" class="btn btn-danger waves-effect waves-light" data-toggle="modal" data-target="#modal-reset">
        <i class="mdi mdi-trash-can-outline"></i> Reset Data
      </button>
    </div>
  </div>
</div>

<!-- Include Modals -->
<?php include('modal-profile.php'); ?>
