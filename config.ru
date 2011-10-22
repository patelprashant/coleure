@root = 'app'

use Rack::Static, 
  urls: ['/c', '/j'],
  root: @root

run lambda { |env|
  [
    200, 
    {
      'Content-Type'  => 'text/html', 
      'Cache-Control' => 'public, max-age=86400' 
    },
    File.open("#{@root}/index.html", File::RDONLY)
  ]
}