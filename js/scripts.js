// =============================================================================
// DECLARE GLOBAL APP OBJECT & variables
// =============================================================================
var app = {};
// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){
	// =============================================================================
	// Slick init
	// =============================================================================
	$('.highlights-gallery').slick({
		autoplay: true,
	    speed: 300,
	    slidesToShow: 3,
	    slidesToScroll: 1,
        infinite: true,
        responsive:[
        	{
        		breakpoint:768,
        		settings:{
        			slidesToShow: 2
        		}
        	}
        ]
	});
	// =============================================================================
	// Mobile Menu
	// =============================================================================
	$('.js-menu-trigger, .js-menu-close').on('click touchstart',function (e) {
	    $('body').toggleClass('mobile-nav-active');
	    $('main').toggleClass('mobile-menu-active');
	    $('.mobile-menu-wrapper').toggleClass('mobile-menu-open');
	    $('.mobile-menu-wrapper').fadeToggle(100);
	    e.preventDefault();
	  });
	// =============================================================================
	// Smooth Scroll
	// =============================================================================
	$('a').smoothScroll();

	// =============================================================================
	// Mobile Check / turn off effect
	// =============================================================================
	if (window.innerWidth < 650){
		$('.hideme').css('opacity', 1);
		$('.nav-top').css('background', 'white');

	} else{
		// =============================================================================
		// Fade In Effect
		// =============================================================================
		/* Every time the window is scrolled ... */
	   $(window).scroll( function(){
	       /* Check the location of each desired element */
	       $('.hideme').each( function(i){
	           
	           var bottom_of_object = $(this).offset().top + $(this).outerHeight();
	           var bottom_of_window = $(window).scrollTop() + $(window).height();
	           
	           /* If the object is completely visible in the window, fade it in */
	           if( bottom_of_window > (bottom_of_object - 100) ){
	               $(this).animate({'opacity':'1'},500);
	           }
	       }); 
	   });

	   // =============================================================================
	   // Drop Down Nav
	   // =============================================================================
	   $(window).scroll(function () {
	       if($(this).scrollTop() > 150){
	           if (!$('.header').hasClass('nav-sticky')){
	               $('.header').stop().addClass('nav-sticky').css('top', '-150px').animate({
	                       'top': '0px'
	                   }, 500);
	           }
	       }
	       else
	       {
	           $('.header').removeClass('nav-sticky');
	       }
	   });
	}
	
	// =============================================================================
	// Typed.JS Options
	// =============================================================================
    // $(".typing").typed({
    //            strings: ["LEARN", "TEACH", "CREATE"],
    //            typeSpeed: 150,
    //            backSpeed: 70,
    //            startDelay: 800,
    //            backDelay: 1500,
    //            showCursor: true,
    //            loop: true,
    //            //loopCount: 3,
    //            callback: function() {
    //            		//$('.typed-cursor').css('opacity', 0);
               		
    //            }
    // });
	
   // =============================================================================
   // Parallax Scroll
   // =============================================================================
   //cache the window object...makes loading a little faster
   var $window = $(window);
   //Parallax Effect
   $('section[data-type="background"]').each(function(){

   		var $bgobj = $(this); //assigning the object

   		$($window).scroll(function(){
   			//scroll the bg at var speed...the yPos is a negative val casue we're scrolling up
   			var yPos = -($window.scrollTop() / $bgobj.data('speed'));
   			//put together our final bg position
   			var coords = '50% '+ yPos + 'px';
   			//move the background
   			$bgobj.css({backgroundPosition: coords});


   		});//end window scroll
   });

   // =============================================================================
   // Share Button Pop-up
   // =============================================================================

   $('.popup').click(function(event) {
       var width  = 575,
           height = 400,
           left   = ($(window).width()  - width)  / 2,
           top    = ($(window).height() - height) / 2,
           url    = this.href,
           opts   = 'status=1' +
                    ',width='  + width  +
                    ',height=' + height +
                    ',top='    + top    +
                    ',left='   + left;
       
       window.open(url, 'twitter', opts);
    
       return false;
     });

   // =============================================================================
   // Isotope Init
   // =============================================================================

   // init Isotope
   // var $grid = $('.grid').isotope({
   // 	itemSelector: '.color-shape'
   // });

   var $grid = $('.grid').isotope({
     // init Isotope after all images have loaded
   		itemSelector: '.color-shape',
   		percentPosition: true
   });

   $grid.imagesLoaded().progress( function() {
     $grid.isotope('layout');
   });  

   // store filter for each group
   var filters = {};

   $('.filters').on( 'click', '.button', function() {
	   	var $this = $(this);
	     // get group key
	     var $buttonGroup = $this.parents('.button-group');
	     var filterGroup = $buttonGroup.attr('data-filter-group');
	     // set filter for group
	     filters[ filterGroup ] = $this.attr('data-filter');
	     // combine filters
	     var filterValue = concatValues( filters );
	     // set filter for Isotope
	     $grid.isotope({ filter: filterValue });
 	});

   // change is-checked class on buttons
   $('.button-group').each( function( i, buttonGroup ) {
   	var $buttonGroup = $( buttonGroup );
   	$buttonGroup.on( 'click', 'button', function() {
   		$buttonGroup.find('.is-checked').removeClass('is-checked');
   		$( this ).addClass('is-checked');
   	});
   });

   // flatten object by concatting values
   function concatValues( obj ) {
	   	var value = '';
	   	for ( var prop in obj ) {
	   		value += obj[ prop ];
	   	}
	   	return value;
   }

}; // end init function

// =============================================================================
// DOC READY RUN app.init()
// =============================================================================
$(function(){
	app.init();
}); // end document ready



