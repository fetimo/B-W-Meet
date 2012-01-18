require 'flickraw'

FlickRaw.api_key="ad28dea2b7d8e33ff6becb22475b4781"
FlickRaw.shared_secret="8c5e0adeda33c4ba"

photos = flickr.photos.search(:tags => 'bwmeet', :per_page => 12).each do |p|
	info = flickr.photos.getInfo(:photo_id => p.id)
	square_url = FlickRaw.url_m(info)
	puts "<img src='#{square_url}'/>"
end