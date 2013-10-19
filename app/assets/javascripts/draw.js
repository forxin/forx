function draw()
{
	var centerX;
	var centerY;
	var maxDistanse; 
	var u;
	var a;
	var count;
	var radius = new Array();
	var x = new Array();
	var y = new Array();
	
	rating = $('.repository').map(function() { return parseFloat($(this).attr('data-score'));});
	count = rating.length;
	
	for (i=0; i < count; i++) {
		radius[i] = Math.round(rating[i] + 50);
	}
	
	maxDistanse = Math.max.apply(Math, radius) + radius[0] + 70;
	
	var centerX = $(window).width() / 2 - radius[0]; 
	var centerY = $(window).scrollTop() + $(window).height() / 2;
	console.log(radius);
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
	});
}

