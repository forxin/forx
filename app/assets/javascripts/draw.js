function draw(count)
{
	var centerX;
	var centerY;
	var maxDistanse; 
	var u;
	var a;
	var radius = new Array();
	var x = new Array();
	var y = new Array();
	
	for (i=0; i < count; i++) {
		radius[i] = rating[i] + 100;
	}
	
	maxDistanse = Math.max.apply(Math, radius) + radius[0] + 10;
	
	centerX = $(window).width() / 2;
	centerY = $(window).scrollTop() + $(window).height() / 2;

	x[0] = certerX;
	y[0] = centerY;
		
	u = Math.PI;
	a = Math.PI * 2 / count;
	
	for (i=1; i<= count; i++)
	{
		x[i] = centerX+maxDistanse*Math.cos(u);
		y[i] = centerY+maxDistanse*Math.sin(u);
		u = u + a;
	}
	
	$('.repository').each(function( index ) { 
	($(this).css( {"position":"absolute","left":x[index],"top":y[index],"background-color":"cadetblue","width":radius[i]*2,"height":radius[i]*2}))//color need to change
	});
}

