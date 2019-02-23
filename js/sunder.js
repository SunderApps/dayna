var sunder = sunder || {

    // Parallax backgrounds
    lax: {
        resize: function (event) {
            var $window = $(window),
                h = $window.height(),
                w = $window.width(),
                z = 100 + (20000 / w);
                //z = 100 + (Math.pow(h, 2) / Math.pow(w, 2)) * 50;
            $('.s_lax').css({ 'background-size': z + '%' });
        },

        // Update parallax objects
        update: function (event) {
            $.each($('.s_lax'), function (index, element) {
                $(element).css({ 'background-position-y': Math.floor(($(this).offset().top - $(window).scrollTop())  / 10) + '%' });
                /*
                var $distance = $(this).offset().top,
                    $window = $(window);
                var percent = ($distance - $window.scrollTop()) / 10;
                $(element).css({ 'background-position': '50% ' + percent + '%' });
                */
                //console.log(percent);
            });
        },

        // Initialize parallax effect
        init: function () {
            //$('.container-fluid').on('scroll', sunder.lax.update);
            $(window).on('resize', sunder.lax.resize);
            sunder.lax.resize();
            sunder.lax.update();

            var magic = new ScrollMagic.Controller();
            var scene = new ScrollMagic.Scene({
                triggerElement: '#s_lax_1',
                triggerHook: 'onEnter',
                duration: $(window).height() * 2
            })
            .setTween(new TimelineMax()
                .add(new TweenMax.fromTo('#s_lax_1', 1, { 'background-position-y': '30%' }, { 'background-position-y': '70%' }), 0))
            .addTo(magic);
            var scene = new ScrollMagic.Scene({
                triggerElement: '#s_lax_2',
                triggerHook: 'onEnter',
                duration: $(window).height() * 2
            })
            .setTween(new TimelineMax()
                .add(new TweenMax.fromTo('#s_lax_2', 1, { 'background-position-y': '30%' }, { 'background-position-y': '70%' }), 0))
            .addTo(magic);
            var scene = new ScrollMagic.Scene({
                triggerElement: '#s_lax_3',
                triggerHook: 'onEnter',
                duration: $(window).height() * 2
            })
            .setTween(new TimelineMax()
                .add(new TweenMax.fromTo('#s_lax_3', 1, { 'background-position-y': '30%' }, { 'background-position-y': '70%' }), 0))
            .addTo(magic);
        },

        // CSS parallax
        css: {
            // Update parallax zoomage
            update: function () {
                var $window = $(window),
                    h = $window.height(),
                    w = $window.width(),
                    z = 100 + (Math.pow(h, 2) / Math.pow(w, 2)) * 50;
                    $('.s_lax_css_bck').css({ 'background-size': z + '%' });
                //console.log(z + '%');
            },

            // Initialize parallax effect
            init: function () {
                $(window).on('resize', sunder.lax.css.update);
                sunder.lax.css.update();
            }
        }
    },

    // Scrollspy
    nav: {
        container: 'window',
        selector: 'a[href ^= "#s_"]',
        height: 50,

        update: function () {
            $.each($(sunder.nav.selector), function (index, element) {
                //console.log($(this.hash).offset().top + $(sunder.nav.container).scrollTop() - sunder.nav.height);
                var top = $(this.hash).offset().top - sunder.nav.height;
                if (top <= 0) {
                    $(sunder.nav.selector).removeClass('active');
                    $(this).addClass('active');
                }
            });
        },

        scroll: function (e) {
            e.preventDefault();
            var hash = this.hash;
            $(sunder.nav.container).animate({
                scrollTop: $(hash).offset().top + $(sunder.nav.container).scrollTop() - sunder.nav.height
            }, 1000, function () {
                // Do something after scrolling
            });
        },

        init: function (container, selector, height) {
            sunder.nav.container = container || 'window';
            sunder.nav.selector = selector || 'a[href ^= "#s_"]';
            sunder.nav.height = height || 50;

            $(sunder.nav.selector).on('click', sunder.nav.scroll);
            $(sunder.nav.container).on('scroll', sunder.nav.update);
        }
    },
	
	// Lightbox
	box: {
		selector: '.s_box',
		back: '.s_box_back',
		active: '.s_box_active',
		speed: 750,
		
		update: function() {
			
			// Wait for the animation to stop
			if(!$(this).is(':animated')) {
				
				// If closing the lightbox 
				if($(this).hasClass(sunder.box.active)){
					
					// Get the parent div
					var $parent = $(this).parent();
					
					// Calculate the image's dimensions and position
					var width = $parent.width(),
					    height = $parent.height(),
						left = $parent.offset().left,
						right = $parent.offset().right,
						top = ($parent.offset().top - $(window).scrollTop()),
						bottom = ($parent.offset().bottom - $(window).scrollTop());
						
					// Animate the transition back to normal
					$(this).animate({
						'top'		: top + 'px',
						'right' 	: right + 'px',
						'bottom'	: bottom + 'px',
						'left'		: left + 'px',
						'width'		: width + 'px',
						'height'	: height + 'px',
						'margin'	: '0px'	
					}, sunder.box.speed).promise().done(function() {
						$(this).removeClass('s_box_in');
						$(this).attr('style', '');
						$parent.attr('style', '');
						$(sunder.box.back).attr('style', '');
					});
				
				// If opening the lightbox
				} else {
					
					// Calculate the image's dimensions and position
					var width = $(this).width(),
						height = $(this).height(),
						ratio = $(window).height() * 0.95 / height,
						left = ($(window).width() - width * ratio) / 2,
						right = left + width * ratio,
						top = ($(window).height() * 0.05) / 2,
						bottom = top + height * ratio;
						
                    if (($(window).height() > $(window).width() && width > height) || $(window).width() < width * ratio) {
						ratio = $(window).width() * 0.95 / width;
						left = ($(window).width() * 0.025);
						right = left + width * ratio;
						top = ($(window).height() - height * ratio) / 2;
						bottom = top + height * ratio;
						$(this).addClass('s_box_h');
					} else {
						$(this).removeClass('s_box_h');
					}
					
					// Prepare for the animation
					$(this).css({
						'position'  : 'fixed',
						'z-index'   : '99998',
						'top'       : ($(this).offset().top - $(window).scrollTop()) + 'px',
						'right'     : $(this).offset().right + 'px',
						'bottom'    : ($(this).offset().bottom - $(window).scrollTop()) + 'px',
						'left'      : $(this).offset().left + 'px',
						'width'     : $(this).width() + 'px',
						'height'    : $(this).height() + 'px',
						'margin'    : '0px',
					});
					
					// Preserve the height of the parent
					$(this).parent().css({
					  'width'  : $(this).width() + 'px',
					  'height' : $(this).height() + 'px'
					});
					
					// Show the lightbox background
					$(sunder.box.back).addClass(sunder.box.active);
					
					// Animate the image to the center of the screen
					$(this).animate({
						'top'      : top + 'px',
						'right'    : right + 'px',
						'bottom'   : bottom + 'px',
						'left'     : left + 'px',
						'width'    : width * ratio + 'px',
						'height'   : height * ratio + 'px',
						'margin'   : 'auto',
					}, sunder.box.speed).promise().done(function() {
						$(this).addClass(sunder.box.active);
						$(sunder.box.back).css('pointer-events', 'auto');
					});
				}
			}
		},
		
		init: function (selector, back, active, speed) {
			sunder.box.selector = selector || '.s_box';
			sunder.box.back = back || '.s_box_back';
			sunder.box.active = active || '.s_box_active';
			sunder.box.speed = speed || 750;
			
			$(sunder.box.selector).on('click', sunder.box.update);
			$(sunder.box.back).on('click', function() { $('img' + sunder.box.active).click(); });
		}
	},
	
	// Zoom in on mouse hover
	zoom: {
        selector: '.s_zoom',

        update: function (x, y, zoom, $this) {

            // Calculate dimensions
            var width = $this.width(),
                height = $this.height();

            // Apply a buffer to the outer 10% of the sides of the image
            // X-Axis
            if (x > -$this.width() / 10) x = 0;
            else if (x < -$this.width() * 0.9) x = -$this.width();
            else if (x > -$this.width() / 2) x += $this.width() / 10 + (x + $this.width() / 10) * ($this.width() / 10) / ($this.width() / 2 - $this.width() / 10);
            else x -= $this.width() / 10 - (x + $this.width() * 0.9) * ($this.width() / 10) / ($this.width() / 2 - $this.width() / 10);

            // Y-Axis
            if (y > -$this.height() / 10) y = 0;
            else if (y < -$this.height() * 0.9) y = -$this.height();
            else if (y > -$this.height() / 2) y += $this.height() / 10 + (y + $this.height() / 10) * ($this.height() / 10) / ($this.height() / 2 - $this.height() / 10);
            else y -= $this.height() / 10 - (y + $this.height() * 0.9) * ($this.height() / 10) / ($this.height() / 2 - $this.height() / 10);

            // Move the larger image to the mouse position
            $this.css('backgroundPosition', x * (zoom - 1) + 'px ' + y * (zoom - 1) + 'px');

        },
		
		init: function() {
			
			$(sunder.zoom.selector).each(function(index, image) {
				
				// Get the zoom factor specified by the user (default is 2x)
				var zoom = $.isNumeric($(image).data('s_zoom')) ? $(image).data('s_zoom') : 2;
				
				// Wrap the image with a <div>
				var container = $(image).wrap('<div></div>').parent();
				
				// Set the width and height of the parent so that it stays the
				// same size without the <img> inside of it
				container.css('width', '100%');
				container.css('height', $(image).height() + 'px');
				
				// Add the source of the <img> as the background of the parent
				container.css('background-image', 'url(\'' + $(image).attr('src') + '\')');
				container.css('background-repeat', 'no-repeat');
				
				// Make the image bigger by the specified zoom factor (2x by default) in the parent
				container.css('background-size', $(image).width() * zoom + 'px ' + $(image).height() * zoom + 'px');
				
				// When the user hovers over the image, hide it
                $(image).on('mouseover', function () { $(this).hide(); });
                $(image).on('touchstart', function () { $(this).hide(); });

                // When the user leaves the image area, show the regular-sized image again
                container.on('mouseleave', function () { $(image).show(); });
                container.on('touchend', function () { $(image).show(); });
				
				// When the user moves their mouse within the image area...
				container.on('mousemove', function(e) {
					
					// Get the mouse position within the image
					var x = -e.pageX + $(this).offset().left,
						y = -e.pageY + $(this).offset().top;

                    // Update the image position
                    sunder.zoom.update(x, y, zoom, $(this));
                });

                // When the user moves their finger within the image area...
                container.on('touchmove', function (e) {

                    // Prevent the page from scrolling
                    e.preventDefault();

                    // Get the mouse position within the image
                    var x = -e.targetTouches[0].pageX + $(this).offset().left,
                        y = -e.targetTouches[0].pageY + $(this).offset().top;

                    // Update the image position
                    sunder.zoom.update(x, y, zoom, $(this));
                });

                // Make this responsive
                $(window).on('resize', function () {
                    container.css('height', $(image).height() + 'px');
                    container.css('background-size', $(image).width() * zoom + 'px ' + $(image).height() * zoom + 'px');
                });
			});
		}
	},

    // Fade in things
    anime: {
        fade: {
            in: {
                container: 'window',
                selector: '.s_fade_in',
                now: '.s_fade_now',
                modifier: 0.5,

                init: function (container, selector, now, modifier) {
                    sunder.anime.fade.in.container = container || sunder.anime.fade.in.container;
                    sunder.anime.fade.in.selector = selector || sunder.anime.fade.in.selector;
                    sunder.anime.fade.in.now = now || sunder.anime.fade.in.now;
                    sunder.anime.fade.in.modifier = modifier || sunder.anime.fade.in.modifier;
                    $(sunder.anime.fade.in.container).on('scroll', function () {
                        $.each($(sunder.anime.fade.in.selector), function (index, element) {
                            var $element = $(element);
                            if ($element.offset().top - $(window).height() * sunder.anime.fade.in.modifier < 0) {
                                $element.css({ opacity: 1 });
                            }
                        });
                    });
                    setTimeout(function () { $(sunder.anime.fade.in.selector + sunder.anime.fade.in.now).css({ opacity: 1 }) }, 500);
                }
            }
        }
    }
};
