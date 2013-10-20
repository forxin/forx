function draw()
{ 	
	$(document).ready(function() { 
		var centerX;
		var centerY;
		var maxDistanse; 
		var u;
		var a;
		var count;
		var maxRadius = 0;
		var radius = new Array();
		var x = new Array();
		var y = new Array();
	
		rating = $('.repository').map(function() { return parseFloat($(this).attr('data-score'));});
		count = rating.length;
		for (i=0; i < count; i++) {
			radius[i] = Math.round(rating[i]);
			if (radius[i]<40) { radius[i] = 40;}
		}
	
		for (i=1; i<count; i++){
			if (maxRadius < radius[i]) { maxRadius = radius[i]}
		}
				
		maxDistanse = maxRadius + radius[0] + 60;
		$('#repocontainer').css({"height": (maxRadius * 2 + radius[0])*2 + 140 });
		centerX = $( '#repocontainer' ).width() / 2;
		centerY = maxDistanse + maxRadius;
		x[0] = centerX;
		y[0] = centerY;
		
		u = Math.PI;
		a = Math.PI * 2 / (count - 1);
	
		for (i=1; i < count; i++)
		{			
			x[i] = centerX+maxDistanse*Math.cos(u);
			y[i] = centerY+maxDistanse*Math.sin(u);
			u = u + a;
		}
		
		$('.circlecontent').each(function( index ) { 
		($(this).css( {"position":"absolute","left":x[index]-radius[index],"top":y[index]-radius[index],"width":radius[index]*2}))
		});
		
		$('.repository').each(function( index ) { 
		var imageUrl = ($(this).attr('user-avatar'));
		($(this).css( {"position": "absolute","width":radius[index]*2 ,"height":radius[index]*2}))
		$(this).css('background-image', 'url(' + imageUrl + ')');
		if (index % 2 == 1) {$(this).addClass("moreupanimation")};
		if (index % 2 == 0) {$(this).addClass("upanimation")};
		});
		
		$('.shadow').each(function( index ) { 
		if (index % 2 == 1) {$(this).addClass("shadowmoreupanimation")};
		if (index % 2 == 0) {$(this).addClass("shadowupanimation")};
		});
		
		$('.circle').each(function( index ) { 
		($(this).css( {"height":radius[index]*2}))
		});
		
	})
}

$(document).ready(function(){
	$(".repository").hover(function(index){
		$(this).animate({ width: "+=50px", height: "+=50" });
		$(this).addClass("blur");
		if (index % 2 == 1) {$(this).removeClass("moreupanimation")};
		if (index % 2 == 0) {$(this).removeClass("upanimation")};
	}, function(index) {
		$(this).animate({ width: "-=50px", height: "-=50" });
		$(this).removeClass("blur");
		if (index % 2 == 1) {$(this).addClass("moreupanimation")};
		if (index % 2 == 0) {$(this).addClass("upanimation")};
	});	
	$(".circle").click(function() {
		var repo = $(this).data("repo");
		window.open('https://github.com/' + repo, '_blank');
	});
});
