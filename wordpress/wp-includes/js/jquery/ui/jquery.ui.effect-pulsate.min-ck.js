/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */(function(e){e.effects.effect.pulsate=function(n,r){var i,s=e(this),o=e.effects.setMode(s,n.mode||"show"),u="show"===o,a="hide"===o,f=u||"hide"===o,l=2*(n.times||5)+(f?1:0),c=n.duration/l,h=0,p=s.queue(),d=p.length;for((u||!s.is(":visible"))&&(s.css("opacity",0).show(),h=1),i=1;l>i;i++)s.animate({opacity:h},c,n.easing),h=1-h;s.animate({opacity:h},c,n.easing),s.queue(function(){a&&s.hide(),r()}),d>1&&p.splice.apply(p,[1,0].concat(p.splice(d,l+1))),s.dequeue()}})(jQuery);