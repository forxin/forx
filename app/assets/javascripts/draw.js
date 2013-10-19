function draw(count)
{
	var centerX = 500;
	var centerY = 200;
	var maxDistanse = 200; 
	var u;
	var a;
	var radius = new Array();
	var x = new Array();
	var y = new Array();
	
	/*
	for (i=0; i < count; i++) {
		radius[i] = rating[i] + 100;
		}
	
	maxDistanse = Math.max.apply(Math, radius) + 50;
		
		*/
	
	u = Math.PI;
	a = Math.PI * 2 / count;
	
	for (i=0; i< count; i++)
	{
		x[i] = centerX+maxDistanse*Math.cos(u);
		y[i] = centerY+maxDistanse*Math.sin(u);
		u = u + a;
	}
	
	$('.repository').each(function( index ) { 
	($(this).css( {"position":"absolute","left":x[index],"top":y[index],"background-color":"cadetblue","width":"100px","height":"100px"}))//color, width, height need to change
	});
}

