<div class="modal fade disable-click-outside" id="modalAccount" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title" id="myLargeModalLabel">Form Data User</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
      </div>

      <!-- Modal Body -->
      <div class="modal-body">
        <form class="form-horizontal">
          <!-- Hidden Account ID -->
          <input type="hidden" name="user_id" id="user_id" />

          <!-- Photo Upload -->
          <div class="form-group row">
            <label for="photo" class="col-sm-2 col-form-label">Photo</label>
            <div class="col-sm-8">
              <div class="img-preview">
                <img class="img-preview__el" src="" />
              </div>
              <input type="file" class="js-dropify" name="photo" id="photo" data-max-file-size="2M" />
              <p class="text-muted m-t-5 font-13 mb-0">Image size: 512px x 512px</p>
            </div>
          </div>

          <!-- Name Input -->
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-8">
              <input id="name" type="text" name="name" placeholder="Enter name" required="required" class="form-control" data-target="alertName" />
              <p class="form-alert" id="alertName" data-req="Name is required."></p>
            </div>
          </div>

          <!-- Username Input -->
          <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-8">
              <input id="username" type="text" name="username" placeholder="Enter username" class="form-control" data-target="alertUsername" />
              <p class="form-alert" id="alertUsername" data-req="Username is required."></p>
            </div>
          </div>

          <!-- Phone Input -->
          <div class="form-group row">
            <label for="phone" class="col-sm-2 col-form-label">Phone</label>
            <div class="col-sm-8">
              <input id="phone" type="text" name="phone" placeholder="Enter phone" class="form-control" data-target="alertPhone" />
              <p class="form-alert" id="alertPhone" data-req="Phone is required." data-invalid="Invalid phone number."></p>
            </div>
          </div>

          <!-- Role Selection -->
          <div class="form-group row">
            <label for="role" class="col-sm-2 col-form-label">Role</label>
            <div class="col-sm-8">
              <select class="form-control" id="role" name="role" data-target="alertRole">
                <option value="">Choose Role</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <p class="form-alert" id="alertRole" data-req="Role is required."></p>
            </div>
          </div>

          <!-- Password Input -->
          <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-8">
              <input id="password" type="password" name="password" placeholder="Enter password" class="form-control" data-target="alertPassword" />
              <p class="form-alert" id="alertPassword" data-req="Password is required." data-invalid="Password must be at least 5 characters."></p>
            </div>
          </div>

          <!-- Status Switch -->
          <div class="form-group row">
            <label class="col-2 col-form-label">Status</label>
            <div class="col-md-8">
              <div class="custom-control custom-switch pt-1">
                <input type="checkbox" class="custom-control-input js-checkbox" id="status" name="status" value="1" checked="checked" />
                <label class="custom-control-label" for="status"></label>
              </div>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal Footer -->
      <div class="modal-footer justify-content-start">
        <button type="submit" class="btn btn-custom waves-effect waves-light js-button-loader">
          <i class="mdi mdi-content-save-outline"></i> Save
        </button>
        <button type="button" class="btn btn-danger btn-trans waves-effect waves-light m-l-5" data-dismiss="modal">
          <i class="mdi mdi-cancel"></i> Cancel
        </button>
      </div>
    </div>
  </div>
</div>
