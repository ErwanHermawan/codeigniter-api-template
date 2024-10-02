<? if ($navigation_menu == 'block' || $navigation_menu === 'page-not-found' || $navigation_menu == 'subscribe') { ?>
  </div>
  <!-- end wrapper page -->

  <!-- JS  -->
  <script src="<?= ASSETS_JS; ?>vendor.min.js"></script>
  <script src="<?= ASSETS_JS; ?>app.min.js"></script>
<? } else { ?>
  </div>
  <!-- end main site -->
  <? if ($navigation_menu !== 'auth') { ?>
  <!--footer-->
  <div class="footer">
    <div class="container">
      <ul class="footer__nav">
        <li class="footer__item">
          <a class="footer__link <?= $navigation_menu == 'transaction' ? 'footer__link--active' : ''; ?>" href="<?= base_url('transaction'); ?>">
            <i class="footer__icon pi-dashboard"></i>
            <span class="footer__title">Menu List</span></a>
        </li>
        <? if ($this->session->userdata('role') !== '4') { ?>
        <li class="footer__item">
          <a class="footer__link <?= $navigation_menu == 'transaction-list' ? 'footer__link--active' : ''; ?>" href="<?= base_url('transaction-list'); ?>">
            <i class="footer__icon pi-receipt"></i>
            <span class="footer__title">Order List</span></a>
        </li>
        <li class="footer__item">
          <a class="footer__link <?= $navigation_menu == 'reservation' ? 'footer__link--active' : ''; ?>" href="<?= base_url('reservation'); ?>">
            <i class="footer__icon pi-receipt-edit"></i>
            <span class="footer__title">Reservation</span></a>
        </li>
        <? } ?>
        <li class="footer__item dropdown">
          <button class="footer__link dropbtn <?= $navigation_menu == 'profile' ? 'footer__link--active' : ''; ?>"" type="button">
            <i class="footer__icon pi-user"></i>
            <span class="footer__title">Profile</span>
          </button>
          <ul class="dropdown__menu" data-align="right">
            <li class="dropdown__item">
              <a class="dropdown__link" href="<?= base_url('profile'); ?>">
                <span>Profile</span>
                <i class="pi-user"></i>
              </a>
            </li>
            <li class="dropdown__item">
              <a class="dropdown__link" href="<?= base_url('logout'); ?>">
                <span>Logout</span>
                <i class="pi-logout"></i>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <!-- end-footer-->
  <? } ?>

  <!-- schema organization-->
  <script type="application/ld+json">
    {

      "@context": "http://schema.org",
      "@id": "https://rzf-pos.com#organization",
      "@type": "Organization",
      "name": "RZF POS",
      "url": "https://rzf-pos.com",
      "logo": "https://rzf-pos.com/assets/img/logo/rzf-logo.png",
      "contactPoint": [

        {
          "@type": "ContactPoint",
          "telephone": "+62-818-068-18424",
          "contactType": "sales",
          "areaServed": "ID"
        }
      ],
      "sameAs": ["https://www.youtube.com", "https://www.linkedin.com", "https://www.facebook.com", "https://www.twitter.com"]
    }

  </script>

  <!-- schema website-->
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@id": "https://rzf-pos.com#website",
      "@type": "WebSite",
      "url": "https://rzf-pos.com",
      "name": "RZF POS"
    }

  </script>

  <!-- schema webpage-->
  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@id": "https://rzf-pos.com#webpage"
      "@type": "WebPage",
      "url": "https://rzf-pos.com",
      "name": "RZF POS"
    }

  </script>

  <!-- App -->
  <script src="<?= ASSETS_JS; ?>vendor.min.js"></script>
  <script src="<?= ASSETS_JS; ?>app.min.js"></script>
<? }  ?>

</body>
</html>
