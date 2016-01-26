/* global tinymce, MediaElementPlayer, WPPlaylistView *//**
 * Note: this API is "experimental" meaning that it will probably change
 * in the next few releases based on feedback from 3.9.0.
 * If you decide to use it, please follow the development closely.
 */// Ensure the global `wp` object exists.
window.wp=window.wp||{};(function(e){var t={},n={},r=wp.media,i=["encodedText"];wp.mce=wp.mce||{};wp.mce.View=function(e){e||(e={});_.extend(this,_.pick(e,i));this.initialize.apply(this,arguments)};_.extend(wp.mce.View.prototype,{initialize:function(){},getHtml:function(){},render:function(){var t=this.getHtml();_.each(tinymce.editors,function(n){var r,i=this;if(n.plugins.wpview){r=n.getDoc();e(r).find('[data-wpview-text="'+this.encodedText+'"]').each(function(n,r){var s=e(r);s.html(t).append('<ins data-wpview-end="1"></ins>');e(i).trigger("ready",r)})}},this)},unbind:function(){}});wp.mce.View.extend=Backbone.View.extend;wp.mce.views={register:function(e,n){t[e]=n},get:function(e){return t[e]},unregister:function(e){delete t[e]},unbind:function(){_.each(n,function(e){e.unbind()})},toViews:function(e){var n=[{content:e}],r;_.each(t,function(e,t){r=n.slice();n=[];_.each(r,function(r){var i=r.content,s;if(r.processed){n.push(r);return}while(i&&(s=e.toView(i))){s.index&&n.push({content:i.substring(0,s.index)});n.push({content:wp.mce.views.toView(t,s.content,s.options),processed:!0});i=i.slice(s.index+s.content.length)}i&&n.push({content:i})})});return _.pluck(n,"content").join("")},toView:function(e,t,r){var i=wp.mce.views.get(e),s=window.encodeURIComponent(t),o,u;if(!i)return t;if(!wp.mce.views.getInstance(s)){u=r;u.encodedText=s;o=new i.View(u);n[s]=o}return wp.html.string({tag:"div",attrs:{"class":"wpview-wrap wpview-type-"+e,"data-wpview-text":s,"data-wpview-type":e,contenteditable:"false"},content:" "})},refreshView:function(e,t){var r=window.encodeURIComponent(t),i,s,o;o=wp.mce.views.getInstance(r);if(!o){s=e.toView(t);i=s.options;i.encodedText=r;o=new e.View(i);n[r]=o}wp.mce.views.render()},getInstance:function(e){return n[e]},render:function(){_.each(n,function(e){e.render()})},edit:function(t){var n=e(t).data("wpview-type"),r=wp.mce.views.get(n);r&&r.edit(t)}};wp.mce.gallery={shortcode:"gallery",toView:function(e){var t=wp.shortcode.next(this.shortcode,e);if(!t)return;return{index:t.index,content:t.content,options:{shortcode:t.shortcode}}},View:wp.mce.View.extend({className:"editor-gallery",template:r.template("editor-gallery"),postID:e("#post_ID").val(),initialize:function(e){this.shortcode=e.shortcode;this.fetch()},fetch:function(){this.attachments=wp.media.gallery.attachments(this.shortcode,this.postID);this.dfd=this.attachments.more().done(_.bind(this.render,this))},getHtml:function(){var e=this.shortcode.attrs.named,t=!1,n;if(this.dfd&&"pending"===this.dfd.state()&&!this.attachments.length)return;if(this.attachments.length){t=this.attachments.toJSON();_.each(t,function(e){e.sizes&&(e.sizes.thumbnail?e.thumbnail=e.sizes.thumbnail:e.sizes.full&&(e.thumbnail=e.sizes.full))})}n={attachments:t,columns:e.columns?parseInt(e.columns,10):3};return this.template(n)}}),edit:function(t){var n=wp.media.gallery,r=this,i,s;s=window.decodeURIComponent(e(t).attr("data-wpview-text"));i=n.edit(s);i.state("gallery-edit").on("update",function(s){var o=n.shortcode(s).string();e(t).attr("data-wpview-text",window.encodeURIComponent(o));wp.mce.views.refreshView(r,o);i.detach()})}};wp.mce.views.register("gallery",wp.mce.gallery);wp.mce.media={loaded:!1,toView:function(e){var t=wp.shortcode.next(this.shortcode,e);if(!t)return;return{index:t.index,content:t.content,options:{shortcode:t.shortcode}}},edit:function(t){var n=wp.media[this.shortcode],r=this,i,s,o;wp.media.mixin.pauseAllPlayers();s=window.decodeURIComponent(e(t).attr("data-wpview-text"));i=n.edit(s);i.on("close",function(){i.detach()});o=function(n){var s=wp.media[r.shortcode].shortcode(n).string();e(t).attr("data-wpview-text",window.encodeURIComponent(s));wp.mce.views.refreshView(r,s);i.detach()};_.isArray(r.state)?_.each(r.state,function(e){i.state(e).on("update",o)}):i.state(r.state).on("update",o);i.open()}};wp.mce.media.View=wp.mce.View.extend({initialize:function(t){this.players=[];this.shortcode=t.shortcode;_.bindAll(this,"setPlayer");e(this).on("ready",this.setPlayer)},setPlayer:function(t,n){if(!n)return;var r=this,i,s=this.ua.is("ff"),o=".wp-"+this.shortcode.tag+"-shortcode";this.player&&this.unsetPlayer();i=e(n).find(o);if(!this.isCompatible(i)){i.closest(".wpview-wrap").addClass("wont-play");i.parent().hasClass("wpview-wrap")||i.parent().replaceWith(i);i.replaceWith("<p>"+i.find("source").eq(0).prop("src")+"</p>");return}i.closest(".wpview-wrap").removeClass("wont-play");s?i.prop("preload","metadata"):i.prop("preload","none");i=wp.media.view.MediaDetails.prepareSrc(i.get(0));setTimeout(function(){wp.mce.media.loaded=!0;r.players.push(new MediaElementPlayer(i,r.mejsSettings))},wp.mce.media.loaded?10:500)},getHtml:function(){var e=_.defaults(this.shortcode.attrs.named,wp.media[this.shortcode.tag].defaults);return this.template({model:e})},unbind:function(){var e=this;this.pauseAllPlayers();_.each(this.players,function(t){e.removePlayer(t)});this.players=[]}});_.extend(wp.mce.media.View.prototype,wp.media.mixin);wp.mce.video=_.extend({},wp.mce.media,{shortcode:"video",state:"video-details",View:wp.mce.media.View.extend({className:"editor-video",template:r.template("editor-video")})});wp.mce.views.register("video",wp.mce.video);wp.mce.audio=_.extend({},wp.mce.media,{shortcode:"audio",state:"audio-details",View:wp.mce.media.View.extend({className:"editor-audio",template:r.template("editor-audio")})});wp.mce.views.register("audio",wp.mce.audio);wp.mce.media.PlaylistView=wp.mce.View.extend({className:"editor-playlist",template:r.template("editor-playlist"),initialize:function(t){this.data={};this.attachments=[];this.shortcode=t.shortcode;_.bindAll(this,"setPlayer");e(this).on("ready",this.setNode)},setNode:function(e,t){this.node=t;this.fetch()},fetch:function(){this.attachments=wp.media.playlist.attachments(this.shortcode);this.attachments.more().done(this.setPlayer)},setPlayer:function(){var t,n=this.getHtml(),r=this.encodedText,i=this;this.unsetPlayer();_.each(tinymce.editors,function(t){var s;if(t.plugins.wpview){s=t.getDoc();e(s).find('[data-wpview-text="'+r+'"]').each(function(t,r){var s=e(r);s.html(n);i.node=r})}},this);if(!this.data.tracks)return;t=new WPPlaylistView({el:e(i.node).find(".wp-playlist").get(0),metadata:this.data});this.player=t._player},getHtml:function(){var e=this.shortcode.attrs.named,t=wp.media.playlist,n,i,s=[];if(this.dfd&&"pending"===this.dfd.state()&&!this.attachments.length)return;_.each(t.defaults,function(n,r){e[r]=t.coerce(e,r)});n={type:e.type,style:e.style,tracklist:e.tracklist,tracknumbers:e.tracknumbers,images:e.images,artists:e.artists};if(!this.attachments.length)return this.template(n);i=this.attachments.toJSON();_.each(i,function(t){var i={},o={},u={src:t.url,type:t.mime,title:t.title,caption:t.caption,description:t.description,meta:t.meta};if("video"===e.type){i.width=t.width;i.height=t.height;if(r.view.settings.contentWidth){o.width=r.view.settings.contentWidth-22;o.height=Math.ceil(i.height*o.width/i.width);if(!n.width){n.width=o.width;n.height=o.height}}else if(!n.width){n.width=t.width;n.height=t.height}u.dimensions={original:i,resized:_.isEmpty(o)?i:o}}else n.width=400;u.image=t.image;u.thumb=t.thumb;s.push(u)});n.tracks=s;this.data=n;return this.template(n)}});_.extend(wp.mce.media.PlaylistView.prototype,wp.media.mixin);wp.mce.playlist=_.extend({},wp.mce.media,{shortcode:"playlist",state:["playlist-edit","video-playlist-edit"],View:wp.mce.media.PlaylistView});wp.mce.views.register("playlist",wp.mce.playlist)})(jQuery);