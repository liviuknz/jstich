(function(e,t){var n=wp.customize,r;r=function(e,t,n){var r;return function(){var i=arguments;n=n||this;clearTimeout(r);r=setTimeout(function(){r=null;e.apply(n,i)},t)}};n.Preview=n.Messenger.extend({initialize:function(e,i){var s=this;n.Messenger.prototype.initialize.call(this,e,i);this.body=t(document.body);this.body.on("click.preview","a",function(e){e.preventDefault();s.send("scroll",0);s.send("url",t(this).prop("href"))});this.body.on("submit.preview","form",function(e){e.preventDefault()});this.window=t(window);this.window.on("scroll.preview",r(function(){s.send("scroll",s.window.scrollTop())},200));this.bind("scroll",function(e){s.window.scrollTop(e)})}});t(function(){n.settings=window._wpCustomizeSettings;if(!n.settings)return;var e,r;e=new n.Preview({url:window.location.href,channel:n.settings.channel});e.bind("settings",function(e){t.each(e,function(e,t){n.has(e)?n(e).set(t):n.create(e,t)})});e.trigger("settings",n.settings.values);e.bind("setting",function(e){var t;e=e.slice();(t=n(e.shift()))&&t.set.apply(t,e)});e.bind("sync",function(n){t.each(n,function(t,n){e.trigger(t,n)});e.send("synced")});e.bind("active",function(){n.settings.nonce&&e.send("nonce",n.settings.nonce)});e.send("ready");r=t.map(["color","image","position_x","repeat","attachment"],function(e){return"background_"+e});n.when.apply(n,r).done(function(e,n,r,i,s){var o=t(document.body),u=t("head"),a=t("#custom-background-css"),f;f=function(){var f="";o.toggleClass("custom-background",!!e()||!!n());e()&&(f+="background-color: "+e()+";");if(n()){f+='background-image: url("'+n()+'");';f+="background-position: top "+r()+";";f+="background-repeat: "+i()+";";f+="background-attachment: "+s()+";"}a.remove();a=t('<style type="text/css" id="custom-background-css">body.custom-background { '+f+" }</style>").appendTo(u)};t.each(arguments,function(){this.bind(f)})})})})(wp,jQuery);