// Main object with global variables
var dayna = dayna || {

    // Embedded YouTube Videos
    videos: {

        learn: function () {
            $('#d_modal_title').html('Intro to Impulse IQ<sup>&reg;</sup>');
            $('#d_modal iframe').attr('src', 'https://www.youtube.com/embed/aLmD1uMQ2Pc?rel=0');
            $('#d_modal').modal('show');
        },

        why: function () {
            $('#d_modal_title').html('Impulse IQ<sup>&reg;</sup> vs the Competition');
            $('#d_modal iframe').attr('src', 'https://www.youtube.com/embed/nz-V2xojVoI');
            $('#d_modal').modal('show');
        },

        pause: function () {
            $('#d_modal iframe').attr('src', '');
        },

        init: function () {
            $('#d_learn').on('click', dayna.videos.learn);
            $('#d_why').on('click', dayna.videos.why);
            $('#d_close_1, #d_close_2').on('click', dayna.videos.pause);
        }
    },

    // Testimonials in a Slick carousel
    testimonials: function () {
        $('#d_testimonials').slick({
            autoplay: true,
            autoplaySpeed: 10000,
            prevArrow: '<i class="s-ico-left-open"></i>',
            nextArrow: '<i class="s-ico-right-open"></i>',
            dots: true,
            dotsClass: 'd_dots',
            initialSlide: Math.floor(Math.random() * $('#d_testimonials').children().length),
            lazyLoad: 'progressive',
            mobileFirst: true,
            swipeToSlide: true
        });
    },

    // Keep the hours up to date
    hours: function () {
        var date = new Date(),
            now = date.getHours() * 60 + date.getMinutes(),
            day = date.getDay();
        switch (true) {
            default:
            // Closed day
            case (day % 2 === 0 || day === 7):
            // 6:30PM
            case now >= 1110:
                $('.s-hours-ico').removeClass('s-ico-hourglass').removeClass('s-ico-check');
                var text = 'Sorry, We\'re Closed<br/>Be Back ';
                switch (day) {
                    // Monday / Tuesday
                    case 1:
                    case 2:
                        text += 'Wednesday';
                        break;
                    // Wednesday / Thursday
                    case 3:
                    case 4: 
                        text += 'Friday';
                        break;
                    // Friday / Saturday / Sunday
                    default:
                        text += 'Monday';
                        break;
                }
                $('.s-hours-text').html(text);
                break;
            // 6:00PM
            case now >= 1080:
                $('.s-hours-ico').removeClass('s-ico-check').addClass('s-ico-hourglass');
                $('.s-hours-text').html('Closing soon!');
                break;
            // 10:30AM
            case now >= 630:
                $('.s-hours-ico').removeClass('s-ico-hourglass').addClass('s-ico-check');
                $('.s-hours-text').html('Open!');
                break;
            // 10:00AM
            case now >= 600:
                $('.s-hours-ico').removeClass('s-ico-check').addClass('s-ico-hourglass');
                $('.s-hours-text').html('Opening soon!');
                break;
        }
        setTimeout(dayna.hours, 10000);
    },

    // Interactive Map
    map: {
        map: {},
        pins: [
            {
                name: 'Dr. Dayna D\'Acierno',
                lat: 40.331128,
                lng: -80.022874,
                icon: 's-ico-dr-dayna',
                color: 'cadetblue',
                popup: '<div class="text-center"><strong>Dr. Dayna D\'Acierno</strong><br/>(412)-854-6900<br/>dayna23@verizon.net<br/><a href="https://www.google.com/maps/dir//ProCare+Chiropractic+Center,+5250+Library+Rd,+Bethel+Park,+PA+15102/@40.331128,-80.0250667,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x8834f99b9c9fb6cb:0x94fe8adf17dddbdc!2m2!1d-80.022878!2d40.331128!3e0" target="_blank">Directions</a></div>'
            },
            {
                name: 'Papa John\'s',
                lat: 40.329853,
                lng: -80.022193,
                icon: 's-ico-food',
                color: 'blue',
            },
            {
                name: 'Pasta Too',
                lat: 40.330761,
                lng: -80.022719,
                icon: 's-ico-food-1',
                color: 'green',
            },
            {
                name: 'Burger King',
                lat: 40.331448,
                lng: -80.023116,
                icon: 's-ico-fast-food',
                color: 'red',
            },
            {
                name: 'GetGo',
                lat: 40.331333,
                lng: -80.022075,
                icon: 's-ico-droplet',
                color: 'darkpurple',
            },
            {
                name: 'Bethel Park Community Center',
                lat: 40.33071177805965,
                lng: -80.02875924110414,
                icon: 's-ico-bp',
                color: 'orange',
            }
        ],
        init: function() {
            dayna.map.map = new L.map('d_map', {
                center: [40.331128, -80.022874],
                zoom: 17,
                zoomControl: false,
                gestureHandling: true
            });
            new L.tileLayer('//{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 15,
                attribution: '&copy; <a href="//www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="//www.sunderapps.com" target="_blank">Sunder Applications</a>&nbsp;&nbsp;&nbsp;'
            }).addTo(dayna.map.map);
            dayna.markers = new L.layerGroup().addTo(dayna.map.map);
            $.each(dayna.map.pins, function (index, pin) {
                var icon = new L.AwesomeMarkers.icon({
                    prefix: '',
                    icon: pin.icon,
                    markerColor: pin.color
                });
                var marker = new L.Marker([pin.lat, pin.lng], { icon: icon }).addTo(dayna.markers);
                if (pin.popup) {
                    marker.bindPopup(pin.popup);
                    marker.openPopup();
                }
            });
        }
    },

    lax: {
        init: function () {
            var controller = new ScrollMagic.Controller();
            var lax_1 = new ScrollMagic.Scene({
                triggerElement: '.d_lax_impulse',
                triggerHook: 'onEnter',
                duration: '200%'
            });
            lax_1.setTween(TweenMax.from('.d_lax_impulse', 1, { y: '20%' }))
                 .addTo(controller);
        }
    },

    // Initialize the website
    init: function () {
        sunder.anime.fade.in.init('.container-fluid');
        sunder.lax.init();
        //dayna.lax.init();
        sunder.nav.init('.container-fluid', 'a[href^="#d_"]');
        dayna.hours();
        dayna.map.init();
        dayna.testimonials();
        dayna.videos.init();
    }
};

// $(document).ready(dayna.init);
$(dayna.init);