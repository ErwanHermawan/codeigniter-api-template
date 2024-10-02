<!DOCTYPE html>
<html>
<head>
  <? include 'head.php'; ?>

  <!-- style-->
  <link href="<?= ASSETS_CSS; ?>app.min.css" rel="stylesheet" type="text/css" />

</head>
<body class="fixed-left">

  <!-- Begin page -->
  <div id="wrapper">
    <!-- Top Bar Start -->
    <div class="topbar">
      <!-- LOGO -->
      <div class="topbar-left">
        <a href="<?= base_url(''); ?>" class="dashboard-logo">
          <img src="<?= ASSETS_IMG; ?>logo/rzf-resto.png" alt="RZF Resto Logo" />
        </a>
      </div>

      <!-- Button mobile view to collapse sidebar menu -->
      <div class="navbar navbar-default" role="navigation">
        <div class="container-fluid">

          <!-- Page title -->
          <ul class="nav navbar-nav list-inline navbar-left">
            <li class="list-inline-item">
              <button class="button-menu-mobile open-left">
                <i class="mdi mdi-menu"></i>
              </button>
            </li>
            <li class="list-inline-item">
              <h4 class="page-title"><?= $title_module; ?></h4> </li>
          </ul>
          <ul class="list-unstyled topbar-right-menu float-right m-0">
            <li class="list-inline-item dropdown">
              <a href="#" class="user-profile" data-toggle="dropdown" aria-expanded="true">
                <img src="https://www.rzfsoftware.com/member/admin/files/pos/default.jpg" alt="user" class="user-profile__el" />
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <p class="user-name"></p>
                <hr/>
                <a href="<?= base_url('users/profile'); ?>" class="dropdown-item"><i class="mdi mdi-account-outline"></i>  Profile</a>
                <!-- item-->
                <a href="<?= base_url('logout'); ?>" class="dropdown-item js-logout"><i class="mdi mdi-logout"></i>  Logout</a>
              </div>
            </li>
          </ul>
        </div><!-- end container -->
      </div><!-- end navbar -->
    </div>
    <!-- Top Bar End -->

    <!-- ========== Left Sidebar Start ========== -->
    <div class="left side-menu">
      <div class="sidebar-inner slimscrollleft">
        <!--- Sidemenu -->
        <div id="sidebar-menu">
          <!-- Master -->
          <ul>
            <li>
              <a href="<?= base_url(''); ?>" class="waves-effect <?= ($navigation_menu == 'dashboard' ? 'active' : ''); ?>">
                <i class="mdi mdi-view-dashboard"></i><span>Dashboard</span>
              </a>
            </li>
          </ul>
          <!-- Master End -->

          <!-- Settings -->
          <ul>
            <li class="text-muted menu-title">Pengaturan</li>
            <li>
              <a href="<?= base_url('meta'); ?>" class="waves-effect <?= ($navigation_menu == 'meta' ? 'active' : ''); ?>">
                <i class="mdi mdi-code-tags-check"></i><span>Meta</span>
              </a>
            </li>
            <li>
              <a href="<?= base_url('users/profile'); ?>" class="waves-effect <?= ($navigation_menu == 'profile' ? 'active' : ''); ?>">
                <i class="mdi mdi-account-circle"></i><span>Profile</span>
              </a>
            </li>
            <li>
              <a href="<?= base_url('users'); ?>" class="waves-effect <?= ($navigation_menu == 'users' ? 'active' : ''); ?>">
                <i class="mdi mdi-account-box"></i><span>Users</span>
              </a>
            </li>
            <li>
              <a href="<?= base_url('logout'); ?>" class="waves-effect text-danger js-logout <?= ($navigation_menu == 'logout' ? 'active' : ''); ?>">
                <i class="mdi mdi-logout"></i><span>Logout</span>
              </a>
            </li>
            <!-- Settings End -->
          </ul>
          <div class="clearfix"></div>
        </div>
        <!-- Sidebar -->
        <div class="clearfix"></div>

      </div>

    </div>


    <!-- ============================================================== -->
    <!-- Start right Content here -->
    <!-- ============================================================== -->
    <div class="content-page">
      <!-- Start content -->
      <div class="content">
        <div class="container-fluid">
          <div class="alert alert-danger js-alert-subscribe d-none">
            <span class="alert-message"></span>
            <button type="button" class="alert-subscribe text-danger" data-toggle="modal" data-target="#modal-billing">Perpanjang</button>
          </div>
