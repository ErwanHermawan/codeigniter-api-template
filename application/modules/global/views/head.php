<?
  $url_seo = base_url().($this->uri->segment(1) ? $this->uri->segment(1) : '').($this->uri->segment(2) ? '/'.$this->uri->segment(2) : '').($this->uri->segment(3) ? '/'.$this->uri->segment(3) : '').($this->uri->segment(4) ? '/'.$this->uri->segment(4) : '').($this->uri->segment(5) ? '/'.$this->uri->segment(5) : '') ?><?=($this->uri->segment(1) ? '' : '');
?>

<meta charset="utf-8" />
<!-- <meta http-equiv="refresh" content="<?= $refresh; ?>" /> -->
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no,minimal-ui" />
<base href="<?= base_url(); ?>"/>

<!-- primary information-->
<title><?= $title ; ?></title>
<meta name="description" content="<?= $description; ?>" />
<meta name="keywords" content="<?= $keywords; ?>" />

<!-- ie fix for html5 tags-->
<!--[if lt IE 9]><script src='http://html5shiv.googlecode.com/svn/trunk/html5.js'></script><![endif]-->

<!-- author-->
<meta name="author" content="<?= $author; ?>" />
<meta name="copyright" content="<?= $copyright; ?>" />

<!-- user agent crawler-->
<meta name="robots" content="no-index, no-follow" />
<meta name="googlebot" content="no-index, no-follow" />
<meta name="googlebot-news" content="no-index, no-follow" />
<meta name="msnbot" content="no-index, no-follow" />
<meta name="webcrawlers" content="no-index, no-follow" />
<meta name="spiders" content="no-index, no-follow" />

<!-- canonical-->
<link rel="canonical" href="<?= $url_seo; ?>" />

<!-- og facebook general-->
<meta property="og:locale" content="en_US" />
<meta property="og:type" content="website" />
<meta property="og:title" content="<?= $title ; ?>" />
<meta property="og:description" content=""<?= $description; ?>" />
<meta property="og:url" content="<?= $url_seo; ?>" />
<meta property="og:site_name" content="<?= $domain_name; ?>" />
<meta property="og:image" content="<?= ASSETS_IMG; ?>default/og-facebook.jpg" />
<meta property="og:image:type" content="image/jpeg" />

<!-- twitter card-->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="<?= $title; ?>" />
<meta name="twitter:description" content="<?= $description; ?>" />
<meta name="twitter:site" content="<?= $twitter_account; ?>" />
<meta name="twitter:site:id" content="<?= $twitter_account; ?>" />
<meta name="twitter:domain" content="<?= $domain_name; ?>" />
<meta name="twitter:image:src" content="<?= ASSETS_IMG; ?>default/twitter-card.jpg" />
<meta name="twitter:creator" content="<?= $twitter_account; ?>" />

<!-- ============ icon ============-->
<!-- web favicon-->
<link rel="shortcut icon" href="<?= ASSETS_IMG; ?>homescreen/favicon.ico" />

<!-- android add to home screen-->
<link rel="manifest" href="<?= ASSETS_JS; ?>data/manifest.json" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="theme-color" content="<?= $theme_color; ?>" />
<link rel="icon" type="image/png" sizes="16x16" href="<?= ASSETS_IMG; ?>homescreen/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="<?= ASSETS_IMG; ?>homescreen/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="<?= ASSETS_IMG; ?>homescreen/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="144x144" href="<?= ASSETS_IMG; ?>homescreen/android-icon-144x144.png" />
<link rel="icon" type="image/png" sizes="192x192" href="<?= ASSETS_IMG; ?>homescreen/android-icon-192x192.png" />

<!-- windows microsoft-->
<meta name="msapplication-TileColor" content="<?= $theme_color; ?>" />
<meta name="msapplication-TileImage" content="<?= ASSETS_IMG; ?>homescreen/ms-icon-144x144.png" />
<meta name="theme-color" content="<?= $theme_color; ?>" />

<!-- apple add to home screen-->
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="<?= $theme_color; ?>" />
<link rel="apple-touch-icon" href="<?= ASSETS_IMG; ?>homescreen/apple-icon.png" />
<link rel="apple-touch-icon" sizes="57x57" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="<?= ASSETS_IMG; ?>homescreen/apple-icon-180x180.png" />
<link rel="apple-touch-startup-image" href="<?= ASSETS_IMG; ?>homescreen/apple-icon.png" />
