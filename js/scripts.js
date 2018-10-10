(function($) {
	$(document).ready(function() {
		"use strict";
		
		
		// BUTTONS AUDIO
			document.getElementById("hamburger").addEventListener('click', function(e) {
			document.getElementById("link").play();
		  	});
		
		
		
		
		// EQUALIZER TOGGLE
			var source = "http://themezinho.net/anchor/audio/audio.mp3";
			var audio = new Audio(); // use the constructor in JavaScript, just easier that way
			audio.addEventListener("load", function() {
			  audio.play();
			}, true);
			audio.src = source;
			audio.autoplay = true;
			audio.loop = true;
			audio.volume = 0.2;

			$('.equalizer').click();		
			var playing = true;		
			$('.equalizer').click(function() {
				if (playing == false) {
			  audio.play();
					playing = true;

				} else {
					audio.pause();
					playing = false;
				}
			});
		
		
		
		// MOUSE MASK 
		var $window = $(window);
		var windowWidth = $window.width();
		var windowHeight = $window.height();
		var mousePos = {x:windowWidth/2,y:windowHeight/2};

		$(window).resize(function(){
		  windowWidth = $window.width();
		  windowHeight = $window.height();
		});

		clip(mousePos);

		$(document).mousemove(function(e){
		  mousePos = {x:e.pageX,y:e.pageY};
		  clip(mousePos);
		});

		function clip(mousePos) {
		  var pourcPos = {'x':mousePos.x * 100 / windowWidth * 2,
						  'y':mousePos.y * 100 / windowHeight};
		  var gapX = pourcPos.x * 30 / 200 - 15;
		  var gapY = (15 *(pourcPos.y * 30 / 100 - 15)) / 100;
		  var pointTop;
		  var pointBottom;
		  if (pourcPos.y<50) {
			pointTop = 150 - pourcPos.x + gapY * gapX;
			pointBottom = 150 - pourcPos.x;
		  } else {
			pointTop = 150 - pourcPos.x;
			pointBottom = 150 - pourcPos.x - gapY * gapX;
		  }
		  if (pourcPos.x<100) {
			$('.split-back').addClass('on');
			$('.split-front').removeClass('on');
		  }else if (pourcPos.x>100) {
			$('.split-back').removeClass('on');
			$('.split-front').addClass('on');
		  } else {
			$('.split-back').add('.split-front').removeClass('on');
		  }
		  $('.split-front').css({'clip-path':'polygon('+pointTop+'% 0%, 100% 0%, 100% 100%, '+pointBottom+'% 100%)'});
		}
		
		
	

		
		// INT HERO FADE
			var divs = $('.int-hero .inner');
			$(window).on('scroll', function() {
			var st = $(this).scrollTop();
			divs.css({ 'opacity' : (1 - st/300) });
			});

		
		
		// PARALLAX
			$.stellar({
				horizontalScrolling: false,
				verticalOffset: 0,
				responsive:true
			});
		
		
		
		// FOOTER HEIGHT CALCULATION	
    		$('.footer-spacing').css({'height': $('.footer').innerHeight()});
	
		
		
		// DATA BACKGROUND IMAGE
			var pageSection = $(".bg-image");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-image", "url(" + $(this).data("background") + ")");
				}
			});
	
	
		// DATA BACKGROUND COLOR
			var pageSection = $(".bg-color");
			pageSection.each(function(indx){
				if ($(this).attr("data-background")){
					$(this).css("background-color", $(this).data("background"));
				}
			});
		
		
		
		// EQUALIZER
			function randomBetween(range) {
				var min = range[0],
					max = range[1];
				if (min < 0) {
					return min + Math.random() * (Math.abs(min)+max);
				}else {
					return min + Math.random() * max;
				}
			}

			$.fn.equalizerAnimation = function(speed, barsHeight){
				var $equalizer = $(this);
				setInterval(function(){
					$equalizer.find('span').each(function(i){
					  $(this).css({ height:randomBetween(barsHeight[i])+'px' });
					});
				},speed);
				$equalizer.on('click',function(){
					$equalizer.toggleClass('paused');
				});
			}

			var barsHeight = [
			  [2, 10],
			  [5, 14],
			  [11, 8],
			  [4, 18],
			  [8, 3]
			];
			$('.equalizer').equalizerAnimation(180, barsHeight);
		
		
		
		// PAGE TRANSITION
			$('.hamburger-navigation li a').on('click', function(e) {
			$('.transition-overlay').toggleClass("show-me");
			});
		
			$('.hamburger-navigation li a').click(function (e) {
				e.preventDefault();                  
				var goTo = this.getAttribute("href"); 


			setTimeout(function(){
				window.location = goTo;
				},1000);       
				});
		
		
		// REMOVE PERSPECTIVE EFFECT ON MOBILE
			if ($(window).width() < 991) {
				$('.works figure').removeClass('perspective-box');
			}
		
			var ua = navigator.userAgent.toLowerCase(); 
			if (ua.indexOf('safari') != -1) { 
			  if (ua.indexOf('chrome') > -1) {
				$('.works figure').addClass('perspective-box');
			  } else {
				$('.works figure').removeClass('perspective-box');
			  }
			}
			
		
	});
	// END DOCUMENT READY


		// SLIDER
			var swiper = new Swiper('.swiper-container', {
				speed: 600,	
				parallax: true,
				loop: true,
					autoplay: {
					delay: 4500,
					disableOnInteraction: false,
				  },
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
				  },
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		
	
	
		// WOW ANIMATION 
			wow = new WOW(
			{
				animateClass: 'animated',
				offset:       50
			}
			);
			wow.init();
		
	
	
		// MASONRY
			$(window).load(function(){
				$('.works').isotope({
				  itemSelector: '.works li',
				  percentPosition: true
				});
			});
		
		
	
		// ISOTOPE FILTER
			var $container = $('.works');
			$container.isotope({
			filter: '*',
			animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
			}
			});

			$('.isotope-filter li a').click(function(){
			$('.isotope-filter li a.current').removeClass('current');
			$(this).addClass('current');

			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false
				}
			});
			return false;
			}); 
	

		// COUNTER 
			if (!document.getElementById("counter")) {
			} 
			else {

			var lastWasLower = false;
				$(document).scroll(function(){

				var p = $( "#counter" );
				var position = p.position();
				var position2 = position.top;

				if ($(document).scrollTop() > position2-300){
				if (!lastWasLower)
					$('#1').html("21");
					$('#2').html("37");
					$('#3').html("78");

				lastWasLower = true;
					} else {
				lastWasLower = false;
				}
				});		
			};
	

	
	
	
	
		
		
})(jQuery);