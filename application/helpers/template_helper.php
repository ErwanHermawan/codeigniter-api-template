<?php
if (!function_exists('template_page')) {
  /**
   * Render a template page with SEO metadata, header, content, and footer.
   *
   * @param string $title Page title
   * @param string $navigation_menu Navigation menu items (optional)
   * @param string $content_module The module for the content
   * @param string $slug The slug for the content (optional)
   * @param string $template The template name (default is 'dashboard')
   * @return void
   */
  function template_page(string $title, string $navigation_menu = '', string $content_module, string $slug = '', string $template = 'dashboard'): void {
    $ci =& get_instance();
    
    // Retrieve meta data from database
    $meta = $ci->db->where('meta_id', 1)->get('tb_meta')->row();

    // Check if meta data is retrieved successfully
    if (!$meta) {
      // Handle the error as needed, e.g., set default meta values or log an error
      $meta = (object) [
        'robots' => 'index, follow',
        'refresh' => '',
        'title' => 'Default Title',
        'description' => 'Default Description',
        'keywords' => '',
        'author' => 'Default Author',
        'copyright' => 'Default Copyright',
        'theme_color' => '#ffffff',
        'domain_name' => 'example.com',
        'twitter_account' => '@example'
      ];
    }

    // SEO data for header and footer
    $seo = [
      'header' => [
        'robots' => $meta->robots,
        'refresh' => $meta->refresh,
        'page' => str_replace(' ', '-', strtolower($title)),
        'title' => "{$title} - {$meta->title}",
        'title_module' => $title,
        'description' => "{$title} {$meta->description}",
        'keywords' => strtolower($title) . ', ' . $meta->keywords, // Ensure there's a space after the comma
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

    // Render the template with header, content, and footer
    $data = [
      'header' => modules::run('global/header/top', $seo['header'], $template),
      'content' => modules::run($content_module, $slug),
      'footer' => modules::run('global/footer/bottom', $seo['footer'], $template)
    ];
    
    // Load the template view
    $ci->load->view('template', $data);
  }
}
