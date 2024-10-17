<div class="row">
  <?php include('profile-photo.php'); ?>

  <div class="col-xl-8">
    <!-- Account details card -->
    <div class="card-box js-profile-page">
      <?php include('tab-filter.php'); ?>
      <hr class="mt-0">

      <!-- User Information -->
      <div class="col-lg-8">
        <p class="mb-1"><strong>Name</strong></p>
        <p class="mb-0 text-muted js-profile-name skeleton-text skeleton"></p>
      </div>
      <hr>
      <div class="col-lg-8">
        <p class="mb-1"><strong>Username</strong></p>
        <p class="mb-0 text-muted js-profile-username skeleton-text skeleton"></p>
      </div>
			<hr>
      <div class="col-lg-8">
        <p class="mb-1"><strong>Email</strong></p>
        <p class="mb-0 text-muted js-profile-email skeleton-text skeleton"></p>
      </div>
			<hr>
      <div class="col-lg-8">
        <p class="mb-1"><strong>Phone</strong></p>
        <p class="mb-0 text-muted js-profile-phone skeleton-text skeleton"></p>
      </div>
      <hr>
      <div class="col-lg-8">
        <p class="mb-1"><strong>Role</strong></p>
        <p class="mb-0 text-muted js-profile-role skeleton-text skeleton"></p>
      </div>
      <hr>
      <div class="col-lg-8">
        <p class="mb-1"><strong>Created Date</strong></p>
        <p class="mb-0 text-muted js-profile-cd skeleton-text skeleton"></p>
      </div>
      <hr>

      <!-- Account Update Button -->
      <button type="button" class="btn btn-custom waves-effect waves-light" data-toggle="modal" data-target="#modal-profile">
        <i class="mdi mdi-pencil-outline"></i> Change Account Information
      </button>

      <hr>

      <!-- Data Reset Information -->
      <div>
        <p>If you want to delete all transaction data or other data, you can perform a Data Reset.</p>
      </div>
      <button type="button" class="btn btn-danger waves-effect waves-light js-edit-data" data-toggle="modal" data-target="#modal-reset">
        <i class="mdi mdi-trash-can-outline"></i> Reset Data
      </button>
    </div>
  </div>
</div>

<!-- Include Modals -->
<?php include('modal-profile.php'); ?>
