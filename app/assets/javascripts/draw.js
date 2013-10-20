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
			if (radius[i]<30) { radius[i] = 40;}
		}
	
		for (i=1; i<count; i++){
			if (maxRadius < radius[i]) { maxRadius = radius[i]}
		}
		
		maxDistanse = maxRadius + radius[0] + 50;
		$('#repocontainer').css({"height": (maxRadius * 2 + radius[0])*2 + 140 });
		centerX = $( '#repocontainer' ).width() / 2;
		centerY = maxDistanse + maxRadius;
		console.log(centerX);
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
		/*if (index % 4 == 3) {$(this).addClass("rightanimation")};*/
		});
		
		
		$('.circle').each(function( index ) { 
		($(this).css( {"height":radius[index]*2}))
		});
		
	})
}
