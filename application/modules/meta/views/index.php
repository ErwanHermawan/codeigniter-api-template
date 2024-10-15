<div class="row">
  <div class="col-12">
    <!-- session success -->
    <?
      if ($this->session->flashdata('success'))
      {
    ?>
      <div class="alert alert-success alert-dismissible js-temporary-alert">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i class="mdi mdi-check"></i> Process Success!</h5>
        <?= $this->session->flashdata('success'); ?>
      </div>
    <? } ?>

    <!-- session failed -->
    <?
      if ($this->session->flashdata('failed'))
      {
    ?>
      <div class="alert alert-danger alert-dismissible js-temporary-alert">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
        <h5><i class="mdi mdi-close"></i> Process Failed!</h5>
        <?=$this->session->flashdata('failed');?>
      </div>
    <? } ?>

    <div class="card-box">
      <div class="row">
        <div class="col-sm-12 row">
          <div class="form-group col-lg-4">
            <label>Robots</label>
            <p class="card-text"><?= $meta->robots; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Refresh</label>
            <p class="card-text"><?= $meta->refresh; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Title</label>
            <p class="card-text"><?= $meta->title; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Description</label>
            <p class="card-text"><?= $meta->description; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Keywords</label>
            <p class="card-text"><?= $meta->keywords; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Author</label>
            <p class="card-text"><?= $meta->author; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Copyright</label>
            <p class="card-text"><?= $meta->copyright; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Theme Color</label>
            <p class="card-text"><?= $meta->theme_color; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Domain Name</label>
            <p class="card-text"><?= $meta->domain_name; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Twitter Account</label>
            <p class="card-text"><?= $meta->twitter_account; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Facebook Account</label>
            <p class="card-text"><?= $meta->facebook_account; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Instagram Account</label>
            <p class="card-text"><?= $meta->instagram_account; ?></p>
          </div>
          <div class="form-group col-lg-4">
            <label>Email Account</label>
            <p class="card-text"><?= $meta->email_account; ?></p>
          </div>
					<div class="form-group col-lg-12">
            <label>Logo Image</label>
            <div class="img-preview d-block">
              <img class="img-preview__el" src="<?= FILES . 'meta/logo/' . $meta->logo . '?dt=' .date('ms'); ?>" alt="<?= $meta->logo; ?>" />
            </div>
          </div>
          <div class="form-group col-lg-12">
            <label>Default OG Image</label>
            <div class="img-thumb">
              <img class="img-thumb-preview" src="<?= FILES . 'meta/og/' . $meta->og_image . '?dt=' .date('ms'); ?>" alt="<?= $meta->og_image; ?>" />
            </div>
          </div>
          <div class="form-group col-lg-12">
            <label>Default Twitter Image</label>
            <div class="img-thumb">
              <img class="img-thumb-preview" src="<?= FILES . 'meta/twt/' . $meta->twitter_image . '?dt=' .date('ms'); ?>" alt="<?= $meta->twitter_image; ?>" />
            </div>
          </div>
          <div class="form-group col-lg-4">
            <a href="<?= base_url('meta/edit/' . $meta->meta_id); ?>" data-toggle="tooltip" data-placement="left" title="Edit" class="btn btn-icon btn-primary"><i class="mdi mdi-pencil-outline"></i> Edit</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
