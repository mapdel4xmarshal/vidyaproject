(function(){    
	
	function doResponsive()
	{
		var leftpanel = ((window.innerWidth - 50 - document.getElementById("survey").offsetWidth)/2) + "px";
		document.getElementById("survey").style.left = leftpanel;
        document.getElementById("error").style.left = leftpanel;
	}
	
	window.onresize = function()
	{
		doResponsive();
	}
	
	window.onload = function()
	{
		doResponsive();
	}
    
})();



