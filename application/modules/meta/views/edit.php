<div class="card-box">
  <h4 class="header-title m-t-0 m-b-4">Edit Data Meta</h4>
  <p class="text-muted m-b-30 font-14">Please make sure all fields are filled in correctly!</p>

  <form enctype="multipart/form-data" role="form" method="POST" class="form-horizontal js-form-meta" data-parsley-validate novalidate>
    <input type="hidden" name="meta_id" value="<?= $meta->meta_id; ?>">
    <div class="form-group row">
      <label for="inputRobots" class="col-sm-2 col-form-label">Robots</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="robots" id="inputRobots" placeholder="Enter robots" value="<?= $meta->robots; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputRefresh" class="col-sm-2 col-form-label">Refresh</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="refresh" id="inputRefresh" placeholder="Enter refresh" value="<?= $meta->refresh; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputTitle" class="col-sm-2 col-form-label">Title</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="title" id="inputTitle" placeholder="Enter title" value="<?= $meta->title; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputDescription" class="col-sm-2 col-form-label">Description</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="description" id="inputDescription" placeholder="Enter description" value="<?= $meta->description; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputKeywords" class="col-sm-2 col-form-label">Keywords</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="keywords" id="inputKeywords" placeholder="Enter keywords" value="<?= $meta->keywords; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputAuthor" class="col-sm-2 col-form-label">Author</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="author" id="inputAuthor" placeholder="Enter author" value="<?= $meta->author; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputCopyright" class="col-sm-2 col-form-label">Copyright</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="copyright" id="inputCopyright" placeholder="Enter copyright" value="<?= $meta->copyright; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputThemeColor" class="col-sm-2 col-form-label">Theme Color</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="theme_color" id="inputThemeColor" placeholder="Enter theme color" value="<?= $meta->theme_color; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputDomainName" class="col-sm-2 col-form-label">Domain Name</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="domain_name" id="inputDomainName" placeholder="Enter domain name" value="<?= $meta->domain_name; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputTwitterAccount" class="col-sm-2 col-form-label">Twitter Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="twitter_account" id="inputTwitterAccount" placeholder="Enter twitter account" value="<?= $meta->twitter_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputFacebookAccount" class="col-sm-2 col-form-label">Facebook Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="facebook_account" id="inputFacebookAccount" placeholder="Enter facebook account" value="<?= $meta->facebook_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputInstagramAccount" class="col-sm-2 col-form-label">Instagram Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="instagram_account" id="inputInstagramAccount" placeholder="Enter instagram account" value="<?= $meta->instagram_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputEmailAccount" class="col-sm-2 col-form-label">Email Account</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" name="email_account" id="inputEmailAccount" placeholder="Enter email account" value="<?= $meta->email_account; ?>" required="required" />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputDefaultOGImage" class="col-sm-2 col-form-label">Default OG Image</label>
      <div class="col-sm-6">
        <?
          if ( $meta->og_image)
          {
        ?>
          <div class="img-preview">
            <img class="img-detail-static-preview" src="<?= FILES . 'meta/og/' . $meta->og_image . '?dt=' .date('ms'); ?>" alt='<?= $meta->og_image; ?>'/>
          </div>
        <?
          }
        ?>
        <input type="file" class="js-dropify" name="og_image" id="inputDefaultOGImage" data-max-file-size="5M" />
        <p class="text-muted m-t-5 font-13">Image size: 1200px x 630px</p>
      </div>
    </div>
    <div class="form-group row">
      <label for="inputDefaultTwitterImage" class="col-sm-2 col-form-label">Default Twitter Image</label>
      <div class="col-sm-6">
        <?
          if ( $meta->twitter_image)
          {
        ?>
          <div class="img-preview">
            <img class="img-detail-static-preview" src="<?= FILES . 'meta/twt/' . $meta->twitter_image . '?dt=' .date('ms'); ?>" alt='<?= $meta->twitter_image; ?>'/>
          </div>
        <?
          }
        ?>
        <input type="file" class="js-dropify" name="twitter_image" id="inputDefaultTwitterImage" data-max-file-size="5M" />
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
