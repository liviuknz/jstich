var wpNavMenu;!function(e){var t;t=wpNavMenu={options:{menuItemDepthPerLevel:30,globalMaxDepth:11},menuList:void 0,targetList:void 0,menusChanged:!1,isRTL:"undefined"!=typeof isRtl&&!!isRtl,negateIfRTL:"undefined"!=typeof isRtl&&isRtl?-1:1,init:function(){t.menuList=e("#menu-to-edit"),t.targetList=t.menuList,this.jQueryExtensions(),this.attachMenuEditListeners(),this.setupInputWithDefaultTitle(),this.attachQuickSearchListeners(),this.attachThemeLocationsListeners(),this.attachTabsPanelListeners(),this.attachUnsavedChangesListener(),t.menuList.length&&this.initSortables(),menus.oneThemeLocationNoMenus&&e("#posttype-page").addSelectedToMenu(t.addMenuItemToBottom),this.initManageLocations(),this.initAccessibility(),this.initToggles()},jQueryExtensions:function(){e.fn.extend({menuItemDepth:function(){var e=this.eq(0).css(t.isRTL?"margin-right":"margin-left");return t.pxToDepth(e&&-1!=e.indexOf("px")?e.slice(0,-2):0)},updateDepthClass:function(t,n){return this.each(function(){var r=e(this);n=n||r.menuItemDepth(),e(this).removeClass("menu-item-depth-"+n).addClass("menu-item-depth-"+t)})},shiftDepthClass:function(t){return this.each(function(){var n=e(this),r=n.menuItemDepth();e(this).removeClass("menu-item-depth-"+r).addClass("menu-item-depth-"+(r+t))})},childMenuItems:function(){var t=e();return this.each(function(){for(var n=e(this),r=n.menuItemDepth(),i=n.next();i.length&&i.menuItemDepth()>r;)t=t.add(i),i=i.next()}),t},shiftHorizontally:function(t){return this.each(function(){var n=e(this),r=n.menuItemDepth(),i=r+t;n.moveHorizontally(i,r)})},moveHorizontally:function(t,n){return this.each(function(){var r=e(this),i=r.childMenuItems(),s=t-n,o=r.find(".is-submenu");r.updateDepthClass(t,n).updateParentMenuItemDBId(),i&&i.each(function(){var t=e(this),n=t.menuItemDepth(),r=n+s;t.updateDepthClass(r,n).updateParentMenuItemDBId()}),0===t?o.hide():o.show()})},updateParentMenuItemDBId:function(){return this.each(function(){var t=e(this),n=t.find(".menu-item-data-parent-id"),r=parseInt(t.menuItemDepth(),10),i=r-1,s=t.prevAll(".menu-item-depth-"+i).first();n.val(0===r?0:s.find(".menu-item-data-db-id").val())})},hideAdvancedMenuItemFields:function(){return this.each(function(){var t=e(this);e(".hide-column-tog").not(":checked").each(function(){t.find(".field-"+e(this).val()).addClass("hidden-field")})})},addSelectedToMenu:function(n){return 0===e("#menu-to-edit").length?!1:this.each(function(){var r=e(this),i={},s=r.find(menus.oneThemeLocationNoMenus&&0===r.find(".tabs-panel-active .categorychecklist li input:checked").length?'#page-all li input[type="checkbox"]':".tabs-panel-active .categorychecklist li input:checked"),o=/menu-item\[([^\]]*)/;return n=n||t.addMenuItemToBottom,s.length?(r.find(".spinner").show(),e(s).each(function(){var r=e(this),s=o.exec(r.attr("name")),u="undefined"==typeof s[1]?0:parseInt(s[1],10);this.className&&-1!=this.className.indexOf("add-to-top")&&(n=t.addMenuItemToTop),i[u]=r.closest("li").getItemData("add-menu-item",u)}),void t.addItemToMenu(i,n,function(){s.removeAttr("checked"),r.find(".spinner").hide()})):!1})},getItemData:function(e,t){e=e||"menu-item";var n,r={},i=["menu-item-db-id","menu-item-object-id","menu-item-object","menu-item-parent-id","menu-item-position","menu-item-type","menu-item-title","menu-item-url","menu-item-description","menu-item-attr-title","menu-item-target","menu-item-classes","menu-item-xfn"];return t||"menu-item"!=e||(t=this.find(".menu-item-data-db-id").val()),t?(this.find("input").each(function(){var s;for(n=i.length;n--;)"menu-item"==e?s=i[n]+"["+t+"]":"add-menu-item"==e&&(s="menu-item["+t+"]["+i[n]+"]"),this.name&&s==this.name&&(r[i[n]]=this.value)}),r):r},setItemData:function(t,n,r){return n=n||"menu-item",r||"menu-item"!=n||(r=e(".menu-item-data-db-id",this).val()),r?(this.find("input").each(function(){var i,s=e(this);e.each(t,function(e,t){"menu-item"==n?i=e+"["+r+"]":"add-menu-item"==n&&(i="menu-item["+r+"]["+e+"]"),i==s.attr("name")&&s.val(t)})}),this):this}})},countMenuItems:function(t){return e(".menu-item-depth-"+t).length},moveMenuItem:function(n,r){var i,s,o,u=e("#menu-to-edit li"),f=u.length,l=n.parents("li.menu-item"),c=l.childMenuItems(),h=l.getItemData(),p=parseInt(l.menuItemDepth(),10),d=parseInt(l.index(),10),v=l.next(),m=v.childMenuItems(),g=parseInt(v.menuItemDepth(),10)+1,y=l.prev(),w=parseInt(y.menuItemDepth(),10),E=y.getItemData()["menu-item-db-id"];switch(r){case"up":if(s=d-1,0===d)break;0===s&&0!==p&&l.moveHorizontally(0,p),0!==w&&l.moveHorizontally(w,p),c?(i=l.add(c),i.detach().insertBefore(u.eq(s)).updateParentMenuItemDBId()):l.detach().insertBefore(u.eq(s)).updateParentMenuItemDBId();break;case"down":if(c){if(i=l.add(c),v=u.eq(i.length+d),m=0!==v.childMenuItems().length,m&&(o=parseInt(v.menuItemDepth(),10)+1,l.moveHorizontally(o,p)),f===d+i.length)break;i.detach().insertAfter(u.eq(d+i.length)).updateParentMenuItemDBId()}else{if(0!==m.length&&l.moveHorizontally(g,p),f===d+1)break;l.detach().insertAfter(u.eq(d+1)).updateParentMenuItemDBId()}break;case"top":if(0===d)break;c?(i=l.add(c),i.detach().insertBefore(u.eq(0)).updateParentMenuItemDBId()):l.detach().insertBefore(u.eq(0)).updateParentMenuItemDBId();break;case"left":if(0===p)break;l.shiftHorizontally(-1);break;case"right":if(0===d)break;if(h["menu-item-parent-id"]===E)break;l.shiftHorizontally(1)}n.focus(),t.registerChange(),t.refreshKeyboardAccessibility(),t.refreshAdvancedAccessibility()},initAccessibility:function(){var n=e("#menu-to-edit");t.refreshKeyboardAccessibility(),t.refreshAdvancedAccessibility(),n.on("click",".menus-move-up",function(n){t.moveMenuItem(e(this).parents("li.menu-item").find("a.item-edit"),"up"),n.preventDefault()}),n.on("click",".menus-move-down",function(n){t.moveMenuItem(e(this).parents("li.menu-item").find("a.item-edit"),"down"),n.preventDefault()}),n.on("click",".menus-move-top",function(n){t.moveMenuItem(e(this).parents("li.menu-item").find("a.item-edit"),"top"),n.preventDefault()}),n.on("click",".menus-move-left",function(n){t.moveMenuItem(e(this).parents("li.menu-item").find("a.item-edit"),"left"),n.preventDefault()}),n.on("click",".menus-move-right",function(n){t.moveMenuItem(e(this).parents("li.menu-item").find("a.item-edit"),"right"),n.preventDefault()})},refreshAdvancedAccessibility:function(){e(".menu-item-settings .field-move a").css("display","none"),e(".item-edit").each(function(){var t,n,r,i,s,o,u,f,l,c=e(this),h=c.closest("li.menu-item").first(),p=h.menuItemDepth(),d=0===p,v=c.closest(".menu-item-handle").find(".menu-item-title").text(),m=parseInt(h.index(),10),g=d?p:parseInt(p-1,10),y=h.prevAll(".menu-item-depth-"+g).first().find(".menu-item-title").text(),b=h.prevAll(".menu-item-depth-"+p).first().find(".menu-item-title").text(),w=e("#menu-to-edit li").length,E=h.nextAll(".menu-item-depth-"+p).length;0!==m&&(t=h.find(".menus-move-up"),t.prop("title",menus.moveUp).css("display","inline")),0!==m&&d&&(t=h.find(".menus-move-top"),t.prop("title",menus.moveToTop).css("display","inline")),m+1!==w&&0!==m&&(t=h.find(".menus-move-down"),t.prop("title",menus.moveDown).css("display","inline")),0===m&&0!==E&&(t=h.find(".menus-move-down"),t.prop("title",menus.moveDown).css("display","inline")),d||(t=h.find(".menus-move-left"),n=menus.outFrom.replace("%s",y),t.prop("title",menus.moveOutFrom.replace("%s",y)).html(n).css("display","inline")),0!==m&&h.find(".menu-item-data-parent-id").val()!==h.prev().find(".menu-item-data-db-id").val()&&(t=h.find(".menus-move-right"),n=menus.under.replace("%s",b),t.prop("title",menus.moveUnder.replace("%s",b)).html(n).css("display","inline")),d?(r=e(".menu-item-depth-0"),i=r.index(h)+1,w=r.length,s=menus.menuFocus.replace("%1$s",v).replace("%2$d",i).replace("%3$d",w)):(o=h.prevAll(".menu-item-depth-"+parseInt(p-1,10)).first(),u=o.find(".menu-item-data-db-id").val(),f=o.find(".menu-item-title").text(),l=e('.menu-item .menu-item-data-parent-id[value="'+u+'"]'),i=e(l.parents(".menu-item").get().reverse()).index(h)+1,s=menus.subMenuFocus.replace("%1$s",v).replace("%2$d",i).replace("%3$s",f)),c.prop("title",s).html(s)})},refreshKeyboardAccessibility:function(){e(".item-edit").off("focus").on("focus",function(){e(this).off("keydown").on("keydown",function(n){var r,i=e(this),s=i.parents("li.menu-item"),o=s.getItemData();if((37==n.which||38==n.which||39==n.which||40==n.which)&&(i.off("keydown"),1!==e("#menu-to-edit li").length)){switch(r={38:"up",40:"down",37:"left",39:"right"},e("body").hasClass("rtl")&&(r={38:"up",40:"down",39:"left",37:"right"}),r[n.which]){case"up":t.moveMenuItem(i,"up");break;case"down":t.moveMenuItem(i,"down");break;case"left":t.moveMenuItem(i,"left");break;case"right":t.moveMenuItem(i,"right")}return e("#edit-"+o["menu-item-db-id"]).focus(),!1}})})},initToggles:function(){postboxes.add_postbox_toggles("nav-menus"),columns.useCheckboxesForHidden(),columns.checked=function(t){e(".field-"+t).removeClass("hidden-field")},columns.unchecked=function(t){e(".field-"+t).addClass("hidden-field")},t.menuList.hideAdvancedMenuItemFields(),e(".hide-postbox-tog").click(function(){var t=e(".accordion-container li.accordion-section").filter(":hidden").map(function(){return this.id}).get().join(",");e.post(ajaxurl,{action:"closed-postboxes",hidden:t,closedpostboxesnonce:jQuery("#closedpostboxesnonce").val(),page:"nav-menus"})})},initSortables:function(){function n(e){var n;l=e.placeholder.prev(),c=e.placeholder.next(),l[0]==e.item[0]&&(l=l.prev()),c[0]==e.item[0]&&(c=c.next()),h=l.length?l.offset().top+l.height():0,p=c.length?c.offset().top+c.height()/3:0,u=c.length?c.menuItemDepth():0,f=l.length?(n=l.menuItemDepth()+1)>t.options.globalMaxDepth?t.options.globalMaxDepth:n:0}function r(e,t){e.placeholder.updateDepthClass(t,g),g=t}function i(){if(!w[0].className)return 0;var e=w[0].className.match(/menu-max-depth-(\d+)/);return e&&e[1]?parseInt(e[1],10):0}function s(n){var r,i=E;if(0!==n){if(n>0)r=m+n,r>E&&(i=r);else if(0>n&&m==E)for(;!e(".menu-item-depth-"+i,t.menuList).length&&i>0;)i--;w.removeClass("menu-max-depth-"+E).addClass("menu-max-depth-"+i),E=i}}var o,u,f,l,c,h,p,d,v,m,g=0,y=t.menuList.offset().left,w=e("body"),E=i();0!==e("#menu-to-edit li").length&&e(".drag-instructions").show(),y+=t.isRTL?t.menuList.width():0,t.menuList.sortable({handle:".menu-item-handle",placeholder:"sortable-placeholder",start:function(i,s){var u,f,l,c,h;t.isRTL&&(s.item[0].style.right="auto"),v=s.item.children(".menu-item-transport"),o=s.item.menuItemDepth(),r(s,o),l=s.item.next()[0]==s.placeholder[0]?s.item.next():s.item,c=l.childMenuItems(),v.append(c),u=v.outerHeight(),u+=u>0?1*s.placeholder.css("margin-top").slice(0,-2):0,u+=s.helper.outerHeight(),d=u,u-=2,s.placeholder.height(u),m=o,c.each(function(){var t=e(this).menuItemDepth();m=t>m?t:m}),f=s.helper.find(".menu-item-handle").outerWidth(),f+=t.depthToPx(m-o),f-=2,s.placeholder.width(f),h=s.placeholder.next(),h.css("margin-top",d+"px"),s.placeholder.detach(),e(this).sortable("refresh"),s.item.after(s.placeholder),h.css("margin-top",0),n(s)},stop:function(e,n){var r,i,u=g-o;r=v.children().insertAfter(n.item),i=n.item.find(".item-title .is-submenu"),g>0?i.show():i.hide(),0!==u&&(n.item.updateDepthClass(g),r.shiftDepthClass(u),s(u)),t.registerChange(),n.item.updateParentMenuItemDBId(),n.item[0].style.top=0,t.isRTL&&(n.item[0].style.left="auto",n.item[0].style.right=0),t.refreshKeyboardAccessibility(),t.refreshAdvancedAccessibility()},change:function(e,r){r.placeholder.parent().hasClass("menu")||(l.length?l.after(r.placeholder):t.menuList.prepend(r.placeholder)),n(r)},sort:function(i,s){var o=s.helper.offset(),l=t.isRTL?o.left+s.helper.width():o.left,v=t.negateIfRTL*t.pxToDepth(l-y);v>f||o.top<h?v=f:u>v&&(v=u),v!=g&&r(s,v),p&&o.top+d>p&&(c.after(s.placeholder),n(s),e(this).sortable("refreshPositions"))}})},initManageLocations:function(){e("#menu-locations-wrap form").submit(function(){window.onbeforeunload=null}),e(".menu-location-menus select").on("change",function(){var t=e(this).closest("tr").find(".locations-edit-menu-link");e(this).find("option:selected").data("orig")?t.show():t.hide()})},attachMenuEditListeners:function(){var t=this;e("#update-nav-menu").bind("click",function(e){if(e.target&&e.target.className){if(-1!=e.target.className.indexOf("item-edit"))return t.eventOnClickEditLink(e.target);if(-1!=e.target.className.indexOf("menu-save"))return t.eventOnClickMenuSave(e.target);if(-1!=e.target.className.indexOf("menu-delete"))return t.eventOnClickMenuDelete(e.target);if(-1!=e.target.className.indexOf("item-delete"))return t.eventOnClickMenuItemDelete(e.target);if(-1!=e.target.className.indexOf("item-cancel"))return t.eventOnClickCancelLink(e.target)}}),e('#add-custom-links input[type="text"]').keypress(function(t){13===t.keyCode&&(t.preventDefault(),e("#submit-customlinkdiv").click())})},setupInputWithDefaultTitle:function(){var t="input-with-default-title";e("."+t).each(function(){var n=e(this),r=n.attr("title"),i=n.val();if(n.data(t,r),""===i)n.val(r);else{if(r==i)return;n.removeClass(t)}}).focus(function(){var n=e(this);n.val()==n.data(t)&&n.val("").removeClass(t)}).blur(function(){var n=e(this);""===n.val()&&n.addClass(t).val(n.data(t))}),e(".blank-slate .input-with-default-title").focus()},attachThemeLocationsListeners:function(){var t=e("#nav-menu-theme-locations"),n={};n.action="menu-locations-save",n["menu-settings-column-nonce"]=e("#menu-settings-column-nonce").val(),t.find('input[type="submit"]').click(function(){return t.find("select").each(function(){n[this.name]=e(this).val()}),t.find(".spinner").show(),e.post(ajaxurl,n,function(){t.find(".spinner").hide()}),!1})},attachQuickSearchListeners:function(){var n;e(".quick-search").keypress(function(r){var i=e(this);return 13==r.which?(t.updateQuickSearchResults(i),!1):(n&&clearTimeout(n),void (n=setTimeout(function(){t.updateQuickSearchResults(i)},400)))}).attr("autocomplete","off")},updateQuickSearchResults:function(n){var r,i,s=2,o=n.val();o.length<s||(r=n.parents(".tabs-panel"),i={action:"menu-quick-search","response-format":"markup",menu:e("#menu").val(),"menu-settings-column-nonce":e("#menu-settings-column-nonce").val(),q:o,type:n.attr("name")},e(".spinner",r).show(),e.post(ajaxurl,i,function(e){t.processQuickSearchQueryResponse(e,i,r)}))},addCustomLink:function(n){var r=e("#custom-menu-item-url").val(),i=e("#custom-menu-item-name").val();return n=n||t.addMenuItemToBottom,""===r||"http://"==r?!1:(e(".customlinkdiv .spinner").show(),void this.addLinkToMenu(r,i,n,function(){e(".customlinkdiv .spinner").hide(),e("#custom-menu-item-name").val("").blur(),e("#custom-menu-item-url").val("http://")}))},addLinkToMenu:function(e,n,r,i){r=r||t.addMenuItemToBottom,i=i||function(){},t.addItemToMenu({"-1":{"menu-item-type":"custom","menu-item-url":e,"menu-item-title":n}},r,i)},addItemToMenu:function(t,n,r){var i,s=e("#menu").val(),o=e("#menu-settings-column-nonce").val();n=n||function(){},r=r||function(){},i={action:"add-menu-item",menu:s,"menu-settings-column-nonce":o,"menu-item":t},e.post(ajaxurl,i,function(t){var s=e("#menu-instructions");t=e.trim(t),n(t,i),e("li.pending").hide().fadeIn("slow"),e(".drag-instructions").show(),!s.hasClass("menu-instructions-inactive")&&s.siblings().length&&s.addClass("menu-instructions-inactive"),r()})},addMenuItemToBottom:function(n){e(n).hideAdvancedMenuItemFields().appendTo(t.targetList),t.refreshKeyboardAccessibility(),t.refreshAdvancedAccessibility()},addMenuItemToTop:function(n){e(n).hideAdvancedMenuItemFields().prependTo(t.targetList),t.refreshKeyboardAccessibility(),t.refreshAdvancedAccessibility()},attachUnsavedChangesListener:function(){e("#menu-management input, #menu-management select, #menu-management, #menu-management textarea, .menu-location-menus select").change(function(){t.registerChange()}),0!==e("#menu-to-edit").length||0!==e(".menu-location-menus select").length?window.onbeforeunload=function(){return t.menusChanged?navMenuL10n.saveAlert:void 0}:e("#menu-settings-column").find("input,select").end().find("a").attr("href","#").unbind("click")},registerChange:function(){t.menusChanged=!0},attachTabsPanelListeners:function(){e("#menu-settings-column").bind("click",function(n){var r,i,s,o,u=e(n.target);if(u.hasClass("nav-tab-link"))i=u.data("type"),s=u.parents(".accordion-section-content").first(),e("input",s).removeAttr("checked"),e(".tabs-panel-active",s).removeClass("tabs-panel-active").addClass("tabs-panel-inactive"),e("#"+i,s).removeClass("tabs-panel-inactive").addClass("tabs-panel-active"),e(".tabs",s).removeClass("tabs"),u.parent().addClass("tabs"),e(".quick-search",s).focus(),n.preventDefault();else if(u.hasClass("select-all")){if(r=/#(.*)$/.exec(n.target.href),r&&r[1])return o=e("#"+r[1]+" .tabs-panel-active .menu-item-title input"),o.length===o.filter(":checked").length?o.removeAttr("checked"):o.prop("checked",!0),!1}else{if(u.hasClass("submit-add-to-menu"))return t.registerChange(),n.target.id&&"submit-customlinkdiv"==n.target.id?t.addCustomLink(t.addMenuItemToBottom):n.target.id&&-1!=n.target.id.indexOf("submit-")&&e("#"+n.target.id.replace(/submit-/,"")).addSelectedToMenu(t.addMenuItemToBottom),!1;if(u.hasClass("page-numbers"))return e.post(ajaxurl,n.target.href.replace(/.*\?/,"").replace(/action=([^&]*)/,"")+"&action=menu-get-metabox",function(t){if(-1!=t.indexOf("replace-id")){var n=e.parseJSON(t),r=document.getElementById(n["replace-id"]),i=document.createElement("div"),s=document.createElement("div");n.markup&&r&&(s.innerHTML=n.markup?n.markup:"",r.parentNode.insertBefore(i,r),i.parentNode.removeChild(r),i.parentNode.insertBefore(s,i),i.parentNode.removeChild(i))}}),!1}})},eventOnClickEditLink:function(t){var n,r,i=/#(.*)$/.exec(t.href);return i&&i[1]&&(n=e("#"+i[1]),r=n.parent(),0!==r.length)?(r.hasClass("menu-item-edit-inactive")?(n.data("menu-item-data")||n.data("menu-item-data",n.getItemData()),n.slideDown("fast"),r.removeClass("menu-item-edit-inactive").addClass("menu-item-edit-active")):(n.slideUp("fast"),r.removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive")),!1):void 0},eventOnClickCancelLink:function(t){var n=e(t).closest(".menu-item-settings"),r=e(t).closest(".menu-item");return r.removeClass("menu-item-edit-active").addClass("menu-item-edit-inactive"),n.setItemData(n.data("menu-item-data")).hide(),!1},eventOnClickMenuSave:function(){var n="",r=e("#menu-name"),i=r.val();return i&&i!=r.attr("title")&&i.replace(/\s+/,"")?(e("#nav-menu-theme-locations select").each(function(){n+='<input type="hidden" name="'+this.name+'" value="'+e(this).val()+'" />'}),e("#update-nav-menu").append(n),t.menuList.find(".menu-item-data-position").val(function(e){return e+1}),window.onbeforeunload=null,!0):(r.parent().addClass("form-invalid"),!1)},eventOnClickMenuDelete:function(){return window.confirm(navMenuL10n.warnDeleteMenu)?(window.onbeforeunload=null,!0):!1},eventOnClickMenuItemDelete:function(n){var r=parseInt(n.id.replace("delete-",""),10);return t.removeMenuItem(e("#menu-item-"+r)),t.registerChange(),!1},processQuickSearchQueryResponse:function(t,n,r){var i,s,o,u={},f=document.getElementById("nav-menu-meta"),l=/menu-item[(\[^]\]*/,c=e("<div>").html(t).find("li");return c.length?(c.each(function(){if(o=e(this),i=l.exec(o.html()),i&&i[1]){for(s=i[1];f.elements["menu-item["+s+"][menu-item-type]"]||u[s];)s--;u[s]=!0,s!=i[1]&&o.html(o.html().replace(new RegExp("menu-item\\["+i[1]+"\\]","g"),"menu-item["+s+"]"))}}),e(".categorychecklist",r).html(c),void e(".spinner",r).hide()):(e(".categorychecklist",r).html("<li><p>"+navMenuL10n.noResultsFound+"</p></li>"),void e(".spinner",r).hide())},removeMenuItem:function(t){var n=t.childMenuItems();t.addClass("deleting").animate({opacity:0,height:0},350,function(){var r=e("#menu-instructions");t.remove(),n.shiftDepthClass(-1).updateParentMenuItemDBId(),0===e("#menu-to-edit li").length&&(e(".drag-instructions").hide(),r.removeClass("menu-instructions-inactive"))})},depthToPx:function(e){return e*t.options.menuItemDepthPerLevel},pxToDepth:function(e){return Math.floor(e/t.options.menuItemDepthPerLevel)}},e(document).ready(function(){wpNavMenu.init()})}(jQuery);