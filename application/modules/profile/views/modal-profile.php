<div class="modal fade" id="modal-profile" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Form Account Information</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
      </div>
      <div class="modal-body">
        <form class="js-form-profile">
					<!-- Hidden Account ID -->
          <input type="hidden" name="user_id" id="user_id" />
          <div class="form-group">
            <label for="name" class="col-form-label">Name</label>
            <input type="text" class="form-control" name="name" id="name" placeholder="Enter name" data-target="alertName" />
            <p class="form-alert" id="alertName" data-req="Name is required."></p>
          </div>
					<div class="form-group">
            <label for="username" class="col-form-label">Username</label>
            <input type="text" class="form-control" name="username" id="username" placeholder="Enter username" data-target="alertUsername" />
            <p class="form-alert" id="alertUsername" data-req="Username is required."></p>
          </div>
          <div class="form-group">
            <label for="email" class="col-form-label">Email</label>
            <input type="text" class="form-control" name="email" id="email" placeholder="Enter email" data-target="alertEmail" />
            <p class="form-alert" id="alertEmail" data-req="Email harus di isi!" data-invalid="Email is not valid."></p>
          </div>
          <div class="form-group">
            <label for="phone" class="col-form-label">Phone</label>
            <input type="text" class="form-control number-only" name="phone" id="phone" placeholder="Enter phone number" data-target="alertPhone" />
            <p class="form-alert" id="alertPhone" data-req="Phone is required." data-invalid="Phone is not valid."></p>
          </div>
          <!-- Save changes button-->
          <button type="submit" class="btn btn-custom waves-effect waves-light"><i class="mdi mdi-content-save-outline"></i> Save Changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
