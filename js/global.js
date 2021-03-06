$(document).ready(function(){
    var Input = $('#search-text');
    var default_value = Input.val();

    $(Input).focus(function() {
        if($(this).val() == default_value)
        {
             $(this).val("");
        }
    }).blur(function(){
        if($(this).val().length == 0) /*Small update*/
        {
            $(this).val(default_value);
        }
    });
    $('.favourite').click(
    	function(e){
       		e.preventDefault();
        	$(this).toggleClass("favourited",200,"easeOutSine");
    	});
      
     $('.showCategories').click(
      	function(e){
       		e.preventDefault();
        	$(this).toggleClass("hideCategories",200,"easeOutSine").promise().done(function(){
        		$('#categories').slideToggle(function() {$('.showCategories').text($(this).is(':visible') ? "HIDE CHANNELS" : "SHOW CHANNELS"); });
        	});
    	});
    	
    	 $('.mMenu').click(
      	function(e){
       		e.preventDefault();
       		 if($('.mSearch').is(":visible")) {
	       		 $('.mSearchForm').slideUp();
	       		 $('.mSearch').removeClass("mSearchSelected").addClass("mSearch");
	       	}
        	$(this).toggleClass("mMenuSelected",200,"easeOutSine").promise().done(function(){
        		$('.expandedMenu').slideToggle();
        	});
    	});
    	
    	$('.mSearch').click(
      	function(e){
       		e.preventDefault();
       		 if($('.mMenu').is(":visible")) {
	       		 $('.expandedMenu').slideUp();
	       		 $('.mMenu').removeClass("mMenuSelected").addClass("mMenu");
	       	}
       		
        	$(this).toggleClass("mSearchSelected",200,"easeOutSine").promise().done(function(){
        		$('.mSearchForm').slideToggle();
        	});
    	});
      
      
      function sliderInit(){
         console.log("slider init started")
        $('.slider > ul').each(function(i, o){
        arrowCallback = function(arrowFlags) {
           console.log(arrowFlags);
           $(o).parent().siblings('.leftArrow').css({display: arrowFlags.left ? 'block' : 'none'});
          $(o).parent().siblings('.rightArrow').css({display: arrowFlags.right ? 'block' : 'none'});
        }  
        $(o).column_slider({buttonCallback: arrowCallback});
        $(o).parent().parent().children('.rightArrow').on('click', {slider: $(o)}, function(evt) {
          console.log(".rightArrow clicked")
          evt.preventDefault();
          evt.data.slider.column_slider('stepRight');
        });
        $(o).parent().parent().children('.leftArrow').on('click', {slider: $(o)}, function(evt) {
          console.log(".leftArrow clicked")
          evt.preventDefault();
          evt.data.slider.column_slider('stepLeft');
        });
      });
      }
      
      sliderInit();
      
      var resize_handler = function(){
        console.log("resize funtion")
        $('.slider > ul').each(function(i, o){
          $(o).column_slider("setWidth");
        });        
      };
      var resize_listener;
    	enquire.register("screen and (max-width:480px)", {
		    
      setup : function() {
        console.log("setup init")
        $('.slider > ul').each(function(i, o){
          $(o).column_slider("setWidth");
        }); 
      },  
        
			match : function() {
        console.log("480px matched");
        $('.slider > ul').removeAttr('style');   
        $(window).off('resize', resize_handler);
        console.log( $('.slider > ul').attr('style'));
				$('.feed > h3').click(
		      function(e){
            console.log("h3 clicked");
	       		e.preventDefault();
	        	$(this).children("a").toggleClass("hideFeed");
	        	$(this).siblings(".accordian").slideToggle();
		    	});
			},
			unmatch : function() {
        console.log("larger than 480px matched");
        $('.slider').removeAttr('style');  
        $('.feed > h3 > a').removeClass("hideFeed").addClass("showFeed");
        $('.feed > h3').unbind('click');  
        $(window).on('resize', resize_handler);
			}
		});
})