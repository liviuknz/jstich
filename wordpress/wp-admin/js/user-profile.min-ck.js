!function(e){function t(){var t,n=e("#pass1").val(),r=e("#pass2").val();if(e("#pass-strength-result").removeClass("short bad good strong"),!n)return void e("#pass-strength-result").html(pwsL10n.empty);switch(t=wp.passwordStrength.meter(n,wp.passwordStrength.userInputBlacklist(),r)){case 2:e("#pass-strength-result").addClass("bad").html(pwsL10n.bad);break;case 3:e("#pass-strength-result").addClass("good").html(pwsL10n.good);break;case 4:e("#pass-strength-result").addClass("strong").html(pwsL10n.strong);break;case 5:e("#pass-strength-result").addClass("short").html(pwsL10n.mismatch);break;default:e("#pass-strength-result").addClass("short").html(pwsL10n["short"])}}e(document).ready(function(){var n,r,i,s,o=e("#display_name");e("#pass1").val("").keyup(t),e("#pass2").val("").keyup(t),e("#pass-strength-result").show(),e(".color-palette").click(function(){e(this).siblings('input[name="admin_color"]').prop("checked",!0)}),o.length&&e("#first_name, #last_name, #nickname").bind("blur.user_profile",function(){var t=[],n={display_nickname:e("#nickname").val()||"",display_username:e("#user_login").val()||"",display_firstname:e("#first_name").val()||"",display_lastname:e("#last_name").val()||""};n.display_firstname&&n.display_lastname&&(n.display_firstlast=n.display_firstname+" "+n.display_lastname,n.display_lastfirst=n.display_lastname+" "+n.display_firstname),e.each(e("option",o),function(e,n){t.push(n.value)}),e.each(n,function(r,i){if(i){var s=i.replace(/<\/?[a-z][^>]*>/gi,"");n[r].length&&-1===e.inArray(s,t)&&(t.push(s),e("<option />",{text:s}).appendTo(o))}})}),n=e("#color-picker"),r=e("#colors-css"),i=e("input#user_id").val(),s=e('input[name="checkuser_id"]').val(),n.on("click.colorpicker",".color-option",function(){var t,n=e(this);if(!n.hasClass("selected")&&(n.siblings(".selected").removeClass("selected"),n.addClass("selected").find('input[type="radio"]').prop("checked",!0),i===s)){if(0===r.length&&(r=e('<link rel="stylesheet" />').appendTo("head")),r.attr("href",n.children(".css_url").val()),"undefined"!=typeof wp&&wp.svgPainter){try{t=e.parseJSON(n.children(".icon_colors").val())}catch(o){}t&&(wp.svgPainter.setColors(t),wp.svgPainter.paint())}e.post(ajaxurl,{action:"save-user-color-scheme",color_scheme:n.children('input[name="admin_color"]').val(),nonce:e("#color-nonce").val()})}})})}(jQuery);