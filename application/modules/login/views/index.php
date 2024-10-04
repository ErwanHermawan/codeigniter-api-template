<div class="m-t-40 card-box">
  <div class="text-center m-t-20">
    <a href="<?= base_url(''); ?>" class="login-logo">
      <img src="<?= ASSETS_IMG; ?>logo/logo.svg" alt="Company Name" />
    </a>
    <h4 class="text-uppercase font-bold m-t-20 m-b-10">Sign In</h4>
    <h5 class="m-t-0 font-600">Content Management System<br />Official Website <span class="c-primary">Company Name</span></h5>
  </div>
  <div class="p-20">

    <form class="form-horizontal m-t-20 m-b-30 js-auth-login">
      <div class="form-group">
        <div class="col-xs-12">
          <input class="form-control" type="text" required="required" placeholder="Username" name="username" id="username" />
        </div>
      </div>

      <div class="form-group">
        <div class="col-xs-12">
          <input class="form-control" type="password" required="required" placeholder="Password" name="password" id="password" />
        </div>
      </div>

      <div class="form-group text-center m-t-30">
        <div class="col-xs-12">
          <button class="btn btn-success btn-block waves-effect waves-light" type="submit">Log In</button>
        </div>
      </div>

    </form>
    <p class="text-muted font-13 mb-0 text-center">&copy; RZF Software 2024</p>
  </div>
</div>
