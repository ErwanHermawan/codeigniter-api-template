<?php
if (!function_exists('template_page')) {
  function template_page($title, $navigation_menu='', $content_module, $slug='', $template='dashboard') {
    $ci =& get_instance();

    // meta
    $ci->db->where('meta_id', 1);
    $meta = $ci->db->get('tb_meta')->row();

    // - seo
    $seo = (object) [
      'header' => [
        'robots' => $meta->robots,
        'refresh' => $meta->refresh,
        'page' => str_replace(' ', '-', strtolower($title)),
        'title' => $title . ' - ' . $meta->title,
        'title_module' => $title,
        'description' => $title . $meta->description,
        'keywords' => strtolower($title) . $meta->keywords,
        'author' => $meta->author,
        'copyright' => $meta->copyright,
        'theme_color' => $meta->theme_color,
        'domain_name' => $meta->domain_name,
        'twitter_account' => $meta->twitter_account,
        'navigation_menu' => $navigation_menu
      ],
      'footer' => [
        'page' => str_replace(' ', '-', strtolower($title)),
        'copyright' => $meta->copyright,
      ]
    ];

    // - template
    $data = [
      'header' => modules::run('global/header/top', $seo->header, $template),
      'content' => modules::run($content_module, $slug),
      'footer' => modules::run('global/footer/bottom', $seo->footer, $template)
    ];
    $ci->load->view('template', $data);
  }
}
