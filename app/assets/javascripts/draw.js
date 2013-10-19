function draw(count)
{
	var centerX = 300;
	var centerY = 300;
	
	var maxDistanse = 100;
	var u = Math.PI;
	var a = Math.PI * 2 / count;
	var x = new Array();
	var y = new Array();
	
	for (i=0; i< count; i++)
	{
		x[i] = centerX+maxDistanse*Math.cos(u);
		y[i] = centerY+maxDistanse*Math.sin(u);
		u = u + a;
	}
	
	$('.repository').addClass('circle animated bounceInUp')
	$('.repository').each(function( index ) { 
	($(this).css( {"position":"absolute","left":x[index],"top":y[index],"background-color":"red","width":"50px","height":"50px"}))
	});
}
