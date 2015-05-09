//-----------------------------------------------------------------
// Rdio SWF Player Initialization
//-----------------------------------------------------------------

var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
var apiswf = null;

//-----Heroku
var playback_token = "GA1VQtLg_____2R2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbnd3dy5wcmRpby5jb229Lci-G1YF9zVvTMWC3UWj";
var domain = "www.prdio.com";

//-----local
// var playback_token = "GAlVQvFDAeItJmR2cHlzNHd5ZXg3Z2M0OXdoaDY3aHdrbmxvY2FsaG9zdMnp0MHSOZflCxXJciahTas=";
// var domain = "localhost";

var track_pos = -1;

$(document).ready(function() {

  Array.prototype.allValuesSame = function() {

      for(var i = 1; i < this.length; i++)
      {
          if(this[i] !== this[0])
              return false;
      }

      return true;
  }

  var ul = document.getElementById('tracks')
      ,lis = ul.querySelectorAll('li')
      ,liHeight = lis[0].offsetHeight
  ;
  ul.style.height = ul.offsetHeight+'px';
  for (var i= 0,l=lis.length;i<l;i++) {
      var li = lis[i];
      li.style.position = 'absolute';
      li.style.top = i*liHeight+'px';
  }
  // on page load use SWFObject to load the API swf into div#apiswf
  var flashvars = {
    'playbackToken': playback_token,
    'domain': domain,
    'listener': 'Playlist.Controller.prototype'    // the global name of the object that will receive callbacks from the SWF
    };
  var params = {
    'allowScriptAccess': 'always'
  };
  var attributes = {};
  swfobject.embedSWF('http://www.rdio.com/api/swf/', // the location of the Rdio Playback API SWF
      'apiswf', // the ID of the element that will be replaced with the SWF
      1, 1, '9.0.0', 'expressInstall.swf', flashvars, params, attributes);


  // set up the controls
  $('.play').click(function() {
    apiswf.rdio_play($('#play_key').val());
  });
  $('.resume').click(function() { apiswf.rdio_play(); });
  $('.stop').click(function() { apiswf.rdio_stop(); });
  $('.pause').click(function() { apiswf.rdio_pause(); });
  $('.previous').click(function() { apiswf.rdio_previous(); });
  $('.next').on('click', function() { 
    $('.next').attr("class", "modular next busy");

    trackVotes = []
    $('#tracks .track').each(function(i) {
      trackVotes.push(parseInt($('#tracks .track:eq('+i+') .vote').html()));
    });
    // highestVote = trackVotes.indexOf(Math.max.apply(Math, trackVotes));
    allSame = trackVotes.allValuesSame();

    if (allSame) {
      console.log('ALLSAME TRIGGER');
        apiswf.rdio_next();
    } else {
        apiswf.rdio_play($('#play_key').val()); 
    }
    $('#highest_key').val($('#tracks .track:eq(1)').data('key'));
  });
});

//-----------------------------------------------------------------
// Prdio Socket Setup
//-----------------------------------------------------------------

var __bind = function(fn, me){ 
  return function(){ 
    return fn.apply(me, arguments); 
  }; 
};

jQuery(function() {
  if (/party/i.test(window.location.href)) {
    if ( !(/search/i.test(window.location.href)) && !(/new/i.test(window.location.href))) {
      return window.trackController = new Playlist.Controller($('#switcher').data('uri'), true);
    }
  }
});

window.Playlist = {};

//-----------------------------------------------------------------
// Prdio Socket User
//-----------------------------------------------------------------

Playlist.User = (function() {
  function User(_at_user_name, _host_id) {
    this.user_name = _at_user_name;
    this.host_id   = _host_id;
    this.serialize = __bind(this.serialize, this);
  }

  User.prototype.serialize = function() {
    return {
      user_name: this.user_name,
      host_id:   this.host_id
    };
  };

  return User;

})();

//-----------------------------------------------------------------
// Prdio Socket Controller
//-----------------------------------------------------------------

Playlist.Controller = (function() {
  Controller.prototype.template = function(track) {
    var html;
    track = jQuery.parseJSON(track);
    html = "<li class='track' data-id='"+track.id+"' data-key='"+track.key+"' data-order='0'> <div class='track-arrow'> <img src='"+track.image+"' class='trackIcon'> <div class='trackInfo'> <span class='track-title'>"+track.title+"</span><br> <span class='track-artist'>"+track.artist+"</span><br> Vote: <span class='vote'>0</span> </div> </div>";

    if ($('#guest').val() !== undefined) {
      html +="<div class='like' id='<%= song.id %>'> <form action='/like' accept-charset='UTF-8' data-remote='true' method='post'> <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='58.222px' height='62.814px' viewBox='22.259 3.037 58.222 62.814' enable-background='new 22.259 3.037 58.222 62.814' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' class='vote_btn like_button'> <g> <g> <path d='M75.814,27.704h-14c-2,0-3.703,1.63-3.703,3.704c0,2.074,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704 C79.519,29.333,77.814,27.704,75.814,27.704z'></path> <path d='M59.074,41.63c0,2,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704c0-2.074-1.63-3.704-3.704-3.704H62.703 C60.703,38,59.074,39.63,59.074,41.63z'></path> <path d='M56.26,51.926c0,2,1.629,3.704,3.703,3.704h14c2,0,3.703-1.63,3.703-3.704c0-2.074-1.629-3.704-3.703-3.704h-14 C57.963,48.222,56.26,49.926,56.26,51.926z'></path> <path d='M48.111,62.148c0,2,1.629,3.703,3.703,3.703h14c2,0,3.704-1.629,3.704-3.703s-1.63-3.704-3.704-3.704H51.74 C49.741,58.519,48.111,60.148,48.111,62.148z'></path> </g> <path d='M58.26,36.815c-1.926-1.111-3.186-3.111-3.186-5.408c0-1.111,0.297-2.222,0.814-3.111H44.852V9.037c0-3.333-2.667-6-6-6 c-3.333,0-6.074,2.667-6.074,6v27.185c0,0.148,0,0.296,0,0.444c0,0.148,0,0.296,0,0.445v18.074c0,4.889,4,8.889,8.889,8.889h3.63 C45.148,63.481,45,62.889,45,62.223c0-3.482,2.815-6.297,6.297-6.297h3.333c-0.89-1.111-1.481-2.519-1.481-4 c0-2.814,1.926-5.259,4.444-6c-1.037-1.111-1.704-2.592-1.704-4.296C55.963,39.704,56.852,38,58.26,36.815z'></path> <g> <path d='M29.815,56.666V38.593c0-0.148,0-0.296,0-0.445c0-0.148,0-0.296,0-0.444v-7.778h-7.556v35.556h15.407l0,0 C33.222,64.963,29.815,61.186,29.815,56.666z'></path> </g> </g> </svg> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> <form action='/dislike' accept-charset='UTF-8' data-remote='true' method='post'> <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='58.222px' height='62.814px' viewBox='22.259 3.037 58.222 62.814' enable-background='new 22.259 3.037 58.222 62.814' xmlns:xlink='http://www.w3.org/1999/xlink' xml:space='preserve' class='vote_btn dislike_button'> <g> <g> <path d='M75.814,27.704h-14c-2,0-3.703,1.63-3.703,3.704c0,2.074,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704 C79.519,29.333,77.814,27.704,75.814,27.704z'></path> <path d='M59.074,41.63c0,2,1.629,3.704,3.703,3.704h14c2,0,3.704-1.63,3.704-3.704c0-2.074-1.63-3.704-3.704-3.704H62.703 C60.703,38,59.074,39.63,59.074,41.63z'></path> <path d='M56.26,51.926c0,2,1.629,3.704,3.703,3.704h14c2,0,3.703-1.63,3.703-3.704c0-2.074-1.629-3.704-3.703-3.704h-14 C57.963,48.222,56.26,49.926,56.26,51.926z'></path> <path d='M48.111,62.148c0,2,1.629,3.703,3.703,3.703h14c2,0,3.704-1.629,3.704-3.703s-1.63-3.704-3.704-3.704H51.74 C49.741,58.519,48.111,60.148,48.111,62.148z'></path> </g> <path d='M58.26,36.815c-1.926-1.111-3.186-3.111-3.186-5.408c0-1.111,0.297-2.222,0.814-3.111H44.852V9.037c0-3.333-2.667-6-6-6 c-3.333,0-6.074,2.667-6.074,6v27.185c0,0.148,0,0.296,0,0.444c0,0.148,0,0.296,0,0.445v18.074c0,4.889,4,8.889,8.889,8.889h3.63 C45.148,63.481,45,62.889,45,62.223c0-3.482,2.815-6.297,6.297-6.297h3.333c-0.89-1.111-1.481-2.519-1.481-4 c0-2.814,1.926-5.259,4.444-6c-1.037-1.111-1.704-2.592-1.704-4.296C55.963,39.704,56.852,38,58.26,36.815z'></path> <g> <path d='M29.815,56.666V38.593c0-0.148,0-0.296,0-0.445c0-0.148,0-0.296,0-0.444v-7.778h-7.556v35.556h15.407l0,0 C33.222,64.963,29.815,61.186,29.815,56.666z'></path> </g> </g> </svg> <input type='hidden' name='song' id='song' value='"+track.id+"'> <input type='hidden' name='host_id' id='host_id' value='"+this.user.host_id+"'> </form> </div> </li>";
    }
    
    return $(html);
  };

  Controller.prototype.userListTemplate = function(userList) {
    var user, userHtml, _i, _len;
    userHtml = "";
    for (_i = 0, _len = userList.length; _i < _len; _i++) {
      user = userList[_i];
      userHtml = userHtml + ("<li>" + user.user_name + "</li>");
    }
    return $(userHtml);
  };

  function Controller(url, useWebSockets) {
    this.createGuestUser      = __bind(this.createGuestUser, this);
    this.shiftTrackQueue      = __bind(this.shiftTrackQueue, this);
    this.updateUserList       = __bind(this.updateUserList, this);
    this.likeTrack            = __bind(this.likeTrack, this);
    this.dislikeTrack         = __bind(this.dislikeTrack, this);
    this.sortTracks           = __bind(this.sortTracks, this);
    this.sendTrack            = __bind(this.sendTrack, this);
    this.newTrack             = __bind(this.newTrack, this);
    this.bindEvents           = __bind(this.bindEvents, this);
    this.resetVote            = __bind(this.resetVote, this);
    this.resume               = __bind(this.resume, this);
    this.updateList           = __bind(this.updateList, this);
    this.reconnect            = __bind(this.reconnect);
    this.trackQueue           = [];
    this.dispatcher           = new WebSocketRails(url, useWebSockets);
    this.dispatcher.on_open   = this.createGuestUser;
    this.bindEvents();

    this.ready                = __bind(this.ready, this);
  }

  Controller.prototype.bindEvents = function() {
    this.dispatcher.bind('user_list', this.updateUserList);
    this.dispatcher.bind('connection_closed', this.reconnect);
    $('#tracks .track').removeClass('playing-track');
    $('#tracks .track:eq(0)').addClass('playing-track');
    dispatcher = this.dispatcher;
    $('#tracks').on('click', '.like_button', function() {
      dispatcher.trigger('song_like', { host_id: $('.roomcode').html(), song: $(this).parents('.track:first').data('id') });
      $(this).parent().parent().fadeOut("normal");
      console.log(Playlist);
      // this.likeTrack($(this).parents('.track:first').data('id'));
    });

    $('#tracks').on('click', '.dislike_button', function() {
      dispatcher.trigger('song_dislike', { host_id: $('.roomcode').html(), song: $(this).parents('.track:first').data('id') });
      $(this).parent().parent().fadeOut("normal");
      // this.dislikeTrack($(this).parents('.track:first').data('id'));
    });
  };

  Controller.prototype.likeTrack = function(track){
    $('*[data-id="' + track.song + '"] .vote').html(function(i, val) { return +val+1 });
    console.log(track);
    this.sortTracks();
  };

  Controller.prototype.dislikeTrack = function(track){
    $('*[data-id="' + track.song + '"] .vote').html(function(i, val) { return val > 0 ? ''+val-1 : 0 });
    this.sortTracks();
  };

   Controller.prototype.updateList = function(track){
    order = jQuery.parseJSON(track.order);
    current_order = $.map($('.track'), function(el) {
          return $(el).data('key');
    });
    this.sortTracks();
  };

  Controller.prototype.sortTracks = function() {
    tinysort($('.track'), {selector:'span.vote', order:'desc'}, {data:'id', order:'desc'}).forEach(function(elm,i){
    setTimeout((function(elm,i){
        elm.style.top = i*liHeight+'px';
    }).bind(null,elm,i),40);
});
    $('#tracks .track').removeClass('playing-track');
    $('#tracks .track:eq(0)').addClass('playing-track');
  }

  Controller.prototype.newTrack = function(track) {
    this.appendTrack(track);
  };

  Controller.prototype.sendTrack = function(event) {
    var track;
    event.preventDefault();
    track = $('#search-data').val();
    this.dispatcher.trigger('new_track', {
      user_name: this.user.user_name,
      track_search: track
    });
    return $('#search-data').val('');
  };

  Controller.prototype.resetVote = function(track) {
    console.log(track);
   $('*[data-id="' + track.song + '"] .vote').html('0');
   $('*[data-id="' + track.song + '"] .like').fadeIn();
   this.sortTracks();
  };

  Controller.prototype.resume = function() {
    console.log('wat');
    // $('.resume').trigger('click');
  };

  Controller.prototype.updateUserList = function(userList) {
    return $('#user-list').html(this.userListTemplate(userList));
  };

  Controller.prototype.appendTrack = function(track) {
    var trackTemplate;
    trackTemplate = this.template(track);
    $('#tracks').append(trackTemplate);
    return trackTemplate.slideDown(140);
  };

  Controller.prototype.shiftTrackQueue = function() {
    this.trackQueue.shift();
    return $('#tracks li:first').slideDown(100, function() {
      return $(this).remove();
    });
  };

  Controller.prototype.createGuestUser = function() {
    this.user = new Playlist.User($('#guest').val(), $('#host').val());
    channel = this.dispatcher.subscribe('host' + this.user.host_id);
    channel.bind('new_track', this.newTrack);
    channel.bind('like_track', this.likeTrack);
    channel.bind('dislike_track', this.dislikeTrack);
    channel.bind('reset_vote', this.resetVote);
    channel.bind('update_list', this.updateList);
    channel.bind('resume_play', this.resume);
    this.dispatcher.trigger('reorder_playlist', { host_id: $('.roomcode').html() });
    return this.dispatcher.trigger('new_guest', this.user.serialize());
  };

  Controller.prototype.reconnect = function() {
      location.reload();
  };

//-----------------------------------------------------------------
// Prdio Socket Playback Manager
//-----------------------------------------------------------------

  Controller.prototype.ready = function(user) {
    // Called once the API SWF has loaded and is ready to accept method calls.
    // find the embed/object element
    apiswf = $('#apiswf').get(0);

    apiswf.rdio_startFrequencyAnalyzer({
      frequencies: '10-band',
      period: 100
    });
    $('.controls').fadeIn();

    apiswf.rdio_setRepeat(2);
  }

  Controller.prototype.playStateChanged = function(playState) {
    // The playback state has changed.
    // The state can be: 0 - paused, 1 - playing, 2 - stopped, 3 - buffering or 4 - paused.
    console.log('state: ' + playState);
    trackVotes = []
    $('#tracks .track').each(function(i) {
      trackVotes.push(parseInt($('#tracks .track:eq('+i+') .vote').html()));
    });
    allSame = trackVotes.allValuesSame();
    if (playState === 3) {
      $('.modular').attr("class", "modular stop busy");
      if (track_pos > 0 && !allSame) {
        apiswf.rdio_play($('#play_key').val());
      }
    //   $('#highest_key').val($('#tracks .track:eq(0)').data('key'));
    //   this.dispatcher.trigger('song.update_playlist', { host_id: $('.roomcode').html() });
    }
    if (playState === 1){
      $('.modular').attr("class", "modular next free");
    }
    if (playState === 0){
      $('.modular').attr("class", "modular next free");
    }
  }

  Controller.prototype.playingTrackChanged = function(playingTrack, sourcePosition) {
    // apiswf.rdio_clearQueue();
    // Track metadata is provided as playingTrack and the position within the playing source as sourcePosition.
    // console.log(playingTrack.key);
    console.log('position: ' +sourcePosition);
    trackVotes = []
    $('#tracks .track').each(function(i) {
      trackVotes.push(parseInt($('#tracks .track:eq('+i+') .vote').html()));
    });
    // highestVote = trackVotes.indexOf(Math.max.apply(Math, trackVotes));
    allSame = trackVotes.allValuesSame();
    track_pos = sourcePosition;
    lastPlayed = '';
    if (allSame) {
   
    } else {  
      if (sourcePosition > 1 ) {
        console.log('dud');
      } else if (sourcePosition === 1) {
        
        dispatcher = channel._dispatcher;
        dispatcher.trigger('reorder_playlist', { host_id: $('.roomcode').html() });
      } else if (sourcePosition === 0 && lastPlayed !== playingTrack.key) {
      console.log(lastPlayed + ' <- last current -> ' + playingTrack.key);

        lastPlayed = playingTrack.key;
        dispatcher.trigger('clear', { key: playingTrack.key, host_id: $('.roomcode').html() });        
        dispatcher.trigger('reorder_playlist', { host_id: $('.roomcode').html() });
      }
    }

    $('#track').text(playingTrack['name']);
    $('#album').text(playingTrack['album']);
    $('#artist').text(playingTrack['artist']);
    $('#art').fadeTo(1000,0.30, function() {
        $("#art").attr("src", playingTrack['icon']);
    }).fadeTo(500,1);
    $('#progress').attr("max", playingTrack['duration']);
    $('#switcher').css('padding-bottom', $('.playback-container').css('height'));
    $('.divider').show();
    $('.artistAlbumInfo').css('background-color', '#FFF');

  }

  Controller.prototype.positionChanged = function(position) {
    //The position within the track changed to position seconds.
    // This happens both in response to a seek and during playback.
    $('#progress').attr("value", position);
  }

  Controller.prototype.updateFrequencyData = function(arrayAsString) {
    // Called with frequency information after apiswf.rdio_startFrequencyAnalyzer(options) is called.
    // arrayAsString is a list of comma separated floats.

    var arr = arrayAsString.split(',');
    
    $('#freq div').each(function(i) {
      $(this).height(parseInt(parseFloat(arr[i])*70));
    })
  }

  return Controller;

})();
