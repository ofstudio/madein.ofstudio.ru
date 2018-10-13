'use strict';

(function (document, window, undefined) {

    (function ($) {

        $(document).ready(function () {

            // ========== Sticky footer feature ==========
            $(window).resize(function (sel1, sel2) {
                var spacer = $(sel1),
                    footer = $(sel2);
                return function () {
                    var diff = $(window).height() - footer.position().top + spacer.height() - footer.outerHeight(true);
                    if (diff > 0) {
                        spacer.css('height', diff + 'px');
                    }
                    else {
                        spacer.css('height', 0);
                    }
                };
            }('#footer-spacer', '#footer'));
            

            // ========== Plugins initialization ==========
            $('.button-collapse').sideNav({
                edge: 'right',
                menuWidth: 200
            });


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
                    $(this.parentNode.parentNode).find('.madein-card-href')
                        .fadeTo(200, 0);
                }
            });

            $('.madein-card').mouseleave(function () {
                $(this).find('.madein-card-href')
                    .fadeTo(200, 1);
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


            // ========== Assets render (via Ghost footnotes feature) ==========
            var context = {
                assets: []
            };
            $('li.footnote').each(function (index, asset) {
                var a = {};
                a.description = $(asset).find('em')[0].innerHTML;
                a.links = [];
                $(asset).find('a:not([href^="#fnref"])').each(function (index, link) {
                    a.links.push({
                        url: $(link).attr('href'),
                        title: $(link).text(),
                        external: ($(link).attr('href').indexOf('://') >= 0),
                        download: ($(link).attr('href').indexOf('://dl.madein.ofstudio.ru') >= 0)
                    });
                });
                context.assets.push(a);
            });
            $('#post-assets').html(Handlebars.templates['post-assets.hbs'](context));


            // ========== Aside render ==========
            context = {
                aside: []
            };
            $('aside').each(function (index, aside) {
                context.aside.push({
                    content: $(aside).html()
                });
            });
            $('#aside-container').html(Handlebars.templates['aside.hbs'](context));


            // ========== Open external links in new window ==========
            $('main a[href^="http://"]').attr('target', '_blank');
            $('main a[href^="https://"]').attr('target', '_blank');

        }); // $(document).ready


        // ========== Sticky footer initialization ==========
        window.onload = function () {
            $(window).resize();
        };

    })(jQuery);

})(document, window);
