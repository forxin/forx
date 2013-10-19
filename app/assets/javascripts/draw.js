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
			radius[i] = Math.round(rating[i]) + 40;
		}
	
		for (i=1; i<count; i++){
			if (maxRadius < radius[i]) { maxRadius = radius[i]}
		}
		
		maxDistanse = maxRadius + radius[0];
		
		//var offset = $('#repocontainer').offset();
		//$('#repocontainer').css({"height": (maxRadius * 2 + radius[0] + 10)*2 });
		centerX = maxDistanse + 40;
		centerY = maxDistanse + 40;
		x[0] = maxDistanse + 40;
		y[0] = maxDistanse + 40;
		
		u = Math.PI;
		a = Math.PI * 2 / (count - 1);
	
		for (i=1; i < count; i++)
		{			
			x[i] = centerX+maxDistanse*Math.cos(u);
			y[i] = centerY+maxDistanse*Math.sin(u);
			u = u + a;
	
		}
	
		$('.repository').each(function( index ) { 
		($(this).css( {"position":"absolute","left":x[index]-radius[index],"top":y[index]-radius[index],"background-color":"cadetblue","width":radius[index]*2,"height":radius[index]*2}))//color need to change
		if (index % 4 == 0) {$(this).addClass("upanimation")}; 
		if (index % 4 == 1) {$(this).addClass("downanimation")};
		if (index % 4 == 2) {$(this).addClass("leftanimation")};
		if (index % 4 == 3) {$(this).addClass("rightanimation")};
		});
		
	})
}
