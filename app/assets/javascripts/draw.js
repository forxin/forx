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
		var padding = radius.length > 3 ? 140 : 70;
		$('#repocontainer').css({"height": (maxRadius * 2 + radius[0])*2 + padding });
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
	$(".circle").hover(
  function(){
	var index = $(this).parent().index();
	//$(this).addClass("display-percentage");
	if (index % 2 == 1) {
		$(this).children().removeClass("moreupanimation")
		$(this).parent().children().removeClass("shadowmoreupanimation");
		
		};
	if (index % 2 == 0) {
		$(this).children().removeClass("upanimation")
		$(this).parent().children().removeClass("shadowupanimation");
		};

    //$(this).children().css({"-webkit-animation-play-state": "paused","animation-play-state":"paused"});
	//$(this).parent().children().css({"-webkit-animation-play-state": "paused","animation-play-state":"paused"});
},
  function(){
	//$(this).removeClass("display-percentage");
	var index = $(this).parent().index();
	if (index % 2 == 1) {
		$(this).children(".repository").addClass("moreupanimation")
		$(this).parent().children(".shadow").addClass("shadowmoreupanimation");
		};
	if (index % 2 == 0) {
		$(this).children(".repository").addClass("upanimation")
		$(this).parent().children(".shadow").addClass("shadowupanimation");
		};
    //$(this).children().css({"-webkit-animation-play-state": "running","animation-play-state":"running"});
	//$(this).parent().children().css({"-webkit-animation-play-state": "running","animation-play-state":"running"});
});
	/*$(".repository").hover(function(){
		var index = $(this).parent().parent().index();
		$(this).filter(':not(:animated)').animate({ "width": +=25,"height":+=25 });
		$(this).parent().addClass("display-percentage");
		
		
	}, function() {
		var index = $(this).parent().parent().index();
		$(this).filter(':not(:animated)').animate({ "width": -=25, "height": -=25 });
		$(this).parent().removeClass("display-percentage");
		if (index % 2 == 1) {$(this).addClass("moreupanimation")};
		if (index % 2 == 0) {$(this).addClass("upanimation")};
	});	*/
	
	$(".circle").click(function() {
		var repo = $(this).data("repo");
		window.open('https://github.com/' + repo, '_blank');
	});
});
