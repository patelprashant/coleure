use Rack::Static, 
  :urls => ["/styles", "/scripts"],
  :root => "public"

require 'sass/plugin/rack'
use Sass::Plugin::Rack

Sass::Plugin.options[:css_location] = "./styles"
Sass::Plugin.options[:template_location] = "./sass"

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open('public/index.html', File::RDONLY)
  ]
}