# (c) 2011 Rdio Inc
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

require 'om'
require 'uri'
require 'net/http'
require 'net/https'
require 'openssl'
require 'cgi'
require 'json'

class Rdio
  # the consumer and token can be accessed
  attr_accessor :consumer, :token

  def initialize(consumer, token=nil)
    @consumer = consumer
    @token = token
  end

  def begin_authentication(callback_url)
    # request a request token from the server
    Net::HTTP::Get.new('https://www.rdio.com/oauth2/authorize', 
      {
        'response_type' => 'code',
        'client_id' => ENV["RDIO_CONSUMER_KEY"],
        'redirect_uri' => 'http://localhost:3000/callback'
      })

    # response = signed_post('https://www.rdio.com/oauth2/token',
    #                        {'oauth_callback' => callback_url})
    # # parse the response
    # parsed = CGI.parse(response)
    # # save the token
    # @token = [parsed['oauth_token'][0], parsed['oauth_token_secret'][0]]
    # # return an URL that the user can use to authorize this application
    # return parsed['login_url'][0] + '?oauth_token=' + parsed['oauth_token'][0]
  end

  def complete_authentication(verifier)
    # request an access token
    response = signed_post('https://services.rdio.com/oauth2/token',
                           {'oauth_verifier' => verifier})
    # parse the response
    parsed = CGI.parse(response)
    # save the token
    @token = [parsed['oauth_token'][0], parsed['oauth_token_secret'][0]]
  end

  def call(method, params={})
    # make a copy of the dict
    # # raise 'wat'
    params = params.clone
    # put the method in the dict
    params['method'] = method
    # call to the server and parse the response
    return JSON.load(signed_post('https://services.rdio.com/api/1/', params))
  end

  def songs_for_playlist(key)
    results = call('get', ({keys: key, extras: 'tracks'}))
    results['result'][key]['tracks']   
  end

  def set_playlist_order host
    order = ""
    host.playlist.songs.sort_by {|song| [song.vote, song.id]}.reverse.each do |song|
      order = order + song.key + ', '
    end
    call('setPlaylistOrder', ({playlist: host.playlist.key, tracks: order}))
  end

  private

  def signed_post(url, params)
    if params.is_a?(Array)
      params = params
    else
      params = params.collect { |x| x }
    end

    params = params.collect { |k,v| [k.to_s, v.to_s]} 
    params << ["access_token", @token]
    params.sort!
    params = params.map { |p| { p[0] => p[1] } }
    params = params.reduce({}, :merge)

    uri = URI(url)
    response = ''
    Net::HTTP.start(uri.host, uri.port,
      :use_ssl => uri.scheme == 'https', 
      :verify_mode => OpenSSL::SSL::VERIFY_NONE) do |http|

      request = Net::HTTP::Post.new uri.request_uri
      request.set_form_data(params)

      response = http.request request # Net::HTTPResponse object
      # response = JSON.parse response.body
    end
    response.body
  end
  
  def method_missing(method, *params)
    raise method.to_s
    call(method.to_s, params[0])
  end

  def percent_encode(s)
    if s.respond_to?(:encoding)
      # Ruby 1.9 knows about encodings, convert the string to UTF-8
      s = s.encode(Encoding::UTF_8)
    else
      # Ruby 1.8 does not, just check that it's valid UTF-8
      begin
        $__om_utf8_checker.iconv(s)
      rescue Iconv::IllegalSequence => exception
        throw ArgumentError.new("Non-UTF-8 string: "+s.inspect)
      end
    end
    chars = s.bytes.map do |b|
      c = b.chr
      if ((c >= '0' and c <= '9') or
          (c >= 'A' and c <= 'Z') or
          (c >= 'a' and c <= 'z') or
          c == '-' or c == '.' or c == '_' or c == '~')
        c
      else
        '%%%02X' % b
      end
    end
    chars.join
  end

end
