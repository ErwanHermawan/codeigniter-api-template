<?
  $user_photo = ($this->session->userdata('photo') ? $this->session->userdata('photo') : 'default.jpg') . '?dt=' .date('ms');
  $user_name = $this->session->userdata('full_name');
?>

<!DOCTYPE html>
<html>
<head>
  <? include 'head.php'; ?>

  <!-- style-->
  <? if ($navigation_menu === 'block' || $navigation_menu === 'page-not-found' || $navigation_menu === 'subscribe') { ?>
    <link href="<?= ASSETS_CSS; ?>app.min.css" rel="stylesheet" type="text/css" />
  <? } else { ?>
    <link href="<?= ASSETS_PUBLIC; ?>main.min.css" rel="stylesheet" type="text/css" />
  <? } ?>

  </head>

<? if ($navigation_menu === 'block' || $navigation_menu === 'page-not-found' || $navigation_menu === 'subscribe') { ?>
  <body>

    <div class="account-pages"></div>
    <div class="clearfix"></div>
    <!-- wrapper page -->
    <div class="wrapper-page <?= $navigation_menu === 'subscribe' ? 'subscribe-page' : '' ?>">
<? } else if ($navigation_menu !== 'auth') { ?>
  <body class="hold-transition" data-url="<?= base_url(); ?>">
    <!--header-->
    <div class="header <?= ($navigation_menu === 'profile' ? 'header--gap' : ''); ?>">
      <div class="container">
        <div class="header__wrapper">
          <div class="header__left">
            <a class="header__logo" href="<?= base_url('transaction'); ?>">
              <img class="header__logo__img" src="<?= ASSETS_IMG; ?>logo/rzf-logo.png" alt="logo rzf pos" />
            </a>
          </div>
          <div class="header__nav">
            <ul class="header__nav__list">
              <? if ($this->session->userdata('role') !== '4') { ?>
                <li class="header__nav__item">
                  <a class="header__nav__link <?= $navigation_menu == 'transaction' ? 'header__nav__link--active' : ''; ?>" href="<?= base_url('transaction'); ?>">
                    <i class="pi-dashboard"></i><span>Menu List</span>
                  </a>
                </li>
                <li class="header__nav__item">
                  <a class="header__nav__link <?= $navigation_menu == 'transaction-list' ? 'header__nav__link--active' : ''; ?>" href="<?= base_url('transaction-list'); ?>">
                    <i class="pi-receipt"></i><span>Order List</span>
                  </a>
                </li>
                <li class="header__nav__item">
                  <a class="header__nav__link <?= $navigation_menu == 'reservation' ? 'header__nav__link--active' : ''; ?>" href="<?= base_url('Reservation'); ?>">
                    <i class="pi-receipt-edit"></i><span>Reservation</span>
                  </a>
                </li>
              <? } ?>
            </ul>
          </div>
          <div class="header__right">
            <div class="header__profile dropdown">
              <a class="header__link dropbtn">
                <img class="header__profile__img" src="<?= $user_photo; ?>" alt="<?= $user_name; ?>" />
              </a>
              <ul class="dropdown__menu" data-align="right">
                <li class="dropdown__item">
                  <a class="dropdown__link" href="<?= base_url('profile'); ?>"><i class="pi-user"></i>Profile</a>
                </li>
                <li class="dropdown__item">
                  <a class="dropdown__link" href="<?= base_url('logout'); ?>"><i class="pi-logout"></i>Logout</a>
                </li>
              </ul>
            </div>
            <ul class="header__list">
              <li class="header__item dropdown dropdown--notif">
                <a class="header__link dropbtn">
                  <i class="pi-bell"></i><span class="header__badge">18</span>
                </a>
                <ul class="dropdown__menu dropdown__lg" data-align="right">
                  <li class="dropdown__item dropdown__item--active">
                    <a class="dropdown__link" href="#"><span>4 new messages</span><span>3 mins</span></a>
                  </li>
                  <li class="dropdown__item">
                    <a class="dropdown__link" href="#"><span>4 new messages</span><span>3 mins</span></a>
                  </li>
                  <li class="dropdown__item">
                    <a class="dropdown__link" href="#"><span>4 new messages</span><span>3 mins</span></a>
                  </li>
                </ul>
              </li>
              <? if ($navigation_menu == 'profile') { ?>
                <li class="header__item">
                  <a class="header__link" href="<?= base_url('logout'); ?>">
                    <i class="pi-logout"></i>
                  </a>
                </li>
              <? } ?>
              <? if ($navigation_menu == 'transaction') { ?>
                <? if ($this->session->userdata('role') !== '4') { ?>
                  <li class="header__item">
                    <button class="header__link js-show-popup" data-target="cart">
                      <i class="pi-shopping-cart"></i>
                      <span class="header__badge">0</span>
                    </button>
                  </li>
                <? } ?>
              <? } ?>
            </ul>
            <div class="header__search">
              <input class="fe__control js-search" type="text" placeholder="Search menu">
              <i class="fe__icon pi-search"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- main site -->
    <div class="main-site main-site--hide js-main-site <?= ($navigation_menu === 'profile' ? 'main-site--gap' : ''); ?>">
<? } else { ?>
  <body class="hold-transition" data-url="<?= base_url(); ?>">
    <!-- main site -->
    <div class="main-site main-site--hide js-main-site main-site--auth">
<? } ?>
