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
			radius[i] = Math.round(rating[i] + 40);
		}
	
		for (i=1; i<count; i++){
			if (maxRadius < rating[i]) { maxRadius = rating[i]}
		}
	
		maxDistanse = maxRadius + radius[0] + 10;
		console.log(maxDistanse);
		console.log(maxRadius);
		
		var centerX = maxDistanse; 
		var centerY = maxDistanse;
		
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
	
		$('.repository').each(function( index ) { 
		($(this).css( {"position":"absolute","left":x[index],"top":y[index],"background-color":"cadetblue","width":radius[index]*2,"height":radius[index]*2}))//color need to change
		if (index % 4 == 0) {$(this).addClass("upanimation")}; 
		if (index % 4 == 1) {$(this).addClass("downanimation")};
		if (index % 4 == 2) {$(this).addClass("leftanimation")};
		if (index % 4 == 3) {$(this).addClass("rightanimation")};
		});
		
		//$('.shadow').css({"width":"60%","position":"relative"});
		
	})
}
