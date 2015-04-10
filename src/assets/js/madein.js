'use strict';

(function (document, window, undefined) {

    (function ($) {
        $(document).ready(function () {

            $('main a[href^="http://"]').attr('target', '_blank');
            $('main a[href^="https://"]').attr('target', '_blank');

            // ========== Plugins initialization ==========
            $('.button-collapse').sideNav();
            $('.parallax').parallax();
            
            
            // ========== materilbox-fullscreen init ==========
            //
            // Markdown syntax:
            // __![image title](image/url)__
            //
            $('.post-container strong>img').addClass('materialbox-fullscreen').addClass('responsive-img');
            $('.materialbox-fullscreen').materialbox_fullscreen();


            // ========== Card functions ==========
            $('.madein-card').on('click', function () {
                window.location.href = $(this).find('.madein-card-href').attr('href');
            });

            $('.madein-card-activator').on('mouseover', function () {
                if (!Modernizr.touch) {
                    $(this.parentNode.parentNode).find('.card-reveal')
                        .css({display: 'block'})
                        .velocity('stop', true)
                        .velocity({translateY: '-100%'}, {
                            duration: 300,
                            queue: false,
                            easing: 'easeInOutQuad'
                        });
                }
            });

            $('.madein-card').mouseleave(function () {
                $(this).find('.card-reveal')
                    .velocity({translateY: 0}, {
                        duration: 225,
                        queue: false,
                        easing: 'easeInOutQuad',
                        complete: function () {
                            $(this).css({display: 'none'});
                        }
                    }
                );
            });

        });
    })(jQuery);

})(document, window);
