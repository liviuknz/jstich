var findPosts;!function(e){findPosts={open:function(t,n){var r=e(".ui-find-overlay");return 0===r.length&&(e("body").append('<div class="ui-find-overlay"></div>'),findPosts.overlay()),r.show(),t&&n&&e("#affected").attr("name",t).val(n),e("#find-posts").show(),e("#find-posts-input").focus().keyup(function(e){27==e.which&&findPosts.close()}),findPosts.send(),!1},close:function(){e("#find-posts-response").html(""),e("#find-posts").hide(),e(".ui-find-overlay").hide()},overlay:function(){e(".ui-find-overlay").on("click",function(){findPosts.close()})},send:function(){var t={ps:e("#find-posts-input").val(),action:"find_posts",_ajax_nonce:e("#_ajax_nonce").val()},n=e(".find-box-search .spinner");n.show(),e.ajax(ajaxurl,{type:"POST",data:t,dataType:"json"}).always(function(){n.hide()}).done(function(t){t.success||e("#find-posts-response").text(attachMediaBoxL10n.error),e("#find-posts-response").html(t.data)}).fail(function(){e("#find-posts-response").text(attachMediaBoxL10n.error)})}},e(document).ready(function(){e("#find-posts-submit").click(function(t){e('#find-posts-response input[type="radio"]:checked').length||t.preventDefault()}),e("#find-posts .find-box-search :input").keypress(function(e){return 13==e.which?(findPosts.send(),!1):void 0}),e("#find-posts-search").click(findPosts.send),e("#find-posts-close").click(findPosts.close),e("#doaction, #doaction2").click(function(t){e('select[name^="action"]').each(function(){"attach"===e(this).val()&&(t.preventDefault(),findPosts.open())})}),e(".find-box-inside").on("click","tr",function(){e(this).find(".found-radio input").prop("checked",!0)})})}(jQuery);