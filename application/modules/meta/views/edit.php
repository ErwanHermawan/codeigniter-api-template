<div class="card-box">
  <h4 class="header-title m-t-0 m-b-4">Edit Data Meta</h4>
  <p class="text-muted m-b-30 font-14">Please make sure all fields are filled in correctly!</p>

  <form enctype="multipart/form-data" role="form" method="POST" class="form-horizontal js-form-meta" data-parsley-validate novalidate>
    <input type="hidden" id="meta_id" name="meta_id" value="<?= $meta->meta_id; ?>" />
		<div class="form-group row">
      <label for="logo" class="col-sm-2 col-form-label">Logo</label>
      <div class="col-sm-6">
        <?
          if ( $meta->logo)
          {
        ?>
          <div class="img-preview d-block">
            <img class="img-preview__el" src="<?= FILES . 'meta/logo/' . $meta->logo . '?dt=' .date('ms'); ?>" alt='<?= $meta->logo; ?>'/>
          </div>
        <?
          }
        ?>
        <input type="file" class="js-dropify" name="logo" id="logo" data-max-file-size="5M" />
      </div>
    </div>
    <div class="form-group row">
      <label for="robots" class="col-sm-2 col-form-label">Robots</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="robots" id="robots" placeholder="Enter robots" value="<?= $meta->robots; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="refresh" class="col-sm-2 col-form-label">Refresh</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="refresh" id="refresh" placeholder="Enter refresh" value="<?= $meta->refresh; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="title" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="title" id="title" placeholder="Enter title" value="<?= $meta->title; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="description" class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="description" id="description" placeholder="Enter description" value="<?= $meta->description; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="keywords" class="col-sm-2 col-form-label">Keywords</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="keywords" id="keywords" placeholder="Enter keywords" value="<?= $meta->keywords; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="author" class="col-sm-2 col-form-label">Author</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="author" id="author" placeholder="Enter author" value="<?= $meta->author; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="copyright" class="col-sm-2 col-form-label">Copyright</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="copyright" id="copyright" placeholder="Enter copyright" value="<?= $meta->copyright; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="theme_color" class="col-sm-2 col-form-label">Theme Color</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="theme_color" id="theme_color" placeholder="Enter theme color" value="<?= $meta->theme_color; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="domain_name" class="col-sm-2 col-form-label">Domain Name</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="domain_name" id="domain_name" placeholder="Enter domain name" value="<?= $meta->domain_name; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="twitter_account" class="col-sm-2 col-form-label">Twitter Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="twitter_account" id="twitter_account" placeholder="Enter twitter account" value="<?= $meta->twitter_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="facebook_account" class="col-sm-2 col-form-label">Facebook Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="facebook_account" id="facebook_account" placeholder="Enter facebook account" value="<?= $meta->facebook_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="instagram_account" class="col-sm-2 col-form-label">Instagram Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="instagram_account" id="instagram_account" placeholder="Enter instagram account" value="<?= $meta->instagram_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="email_account" class="col-sm-2 col-form-label">Email Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="email_account" id="email_account" placeholder="Enter email account" value="<?= $meta->email_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="og_image" class="col-sm-2 col-form-label">Default OG Image</label>
      <div class="col-sm-6">
        <?
          if ( $meta->og_image)
          {
        ?>
          <div class="img-preview d-block">
            <img class="img-preview__el" src="<?= FILES . 'meta/og/' . $meta->og_image . '?dt=' .date('ms'); ?>" alt='<?= $meta->og_image; ?>'/>
          </div>
        <?
          }
        ?>
        <input type="file" class="js-dropify" name="og_image" id="og_image" data-max-file-size="5M" />
        <p class="text-muted m-t-5 font-13">Image size: 1200px x 630px</p>
      </div>
    </div>
    <div class="form-group row">
      <label for="twitter_image" class="col-sm-2 col-form-label">Default Twitter Image</label>
      <div class="col-sm-6">
        <?
          if ( $meta->twitter_image)
          {
        ?>
          <span class="img-preview d-block">
            <img class="img-preview__el" src="<?= FILES . 'meta/og/' . $meta->twitter_image . '?dt=' .date('ms'); ?>" />
          </span>
        <?
          }
        ?>
        <input type="file" class="js-dropify" name="twitter_image" id="twitter_image" data-max-file-size="5M" />
        <p class="text-muted m-t-5 font-13">Image size: 800px x 418px</p>
      </div>
    </div>
    <div class="form-group">
      <div class="offset-sm-2 col-sm-6">
        <button type="submit" class="btn btn-primary waves-effect waves-light">
          <i class="mdi mdi-content-save-outline"></i> Save
        </button>
        <button type="button" class="btn btn-danger btn-trans waves-effect waves-light m-l-5 js-back-btn">
          <i class="mdi mdi-cancel"></i> Cancel
        </button>
      </div>
    </div>
  </form>
</div>

<!-- <?= data_history($meta); ?> -->
