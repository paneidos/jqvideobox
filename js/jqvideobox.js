(function($) {
	$.fn.videobox = function(options) {
		var defaults = {
			autoClose: true,
			autoSize: true,
			closeCancelTimeout: 10,
			onstatechange: function(video) {},
			onready: function(video) {}
		}
		var options = $.extend(defaults, options);
		return this.each(function() {
			obj = $(this);
			//var flashvars = "flv=" + 
			var flashvars = {
				flv: options.flv,
				autoSize: (options.autoSize?"1":"0"),
				fn: "jQuery.videobox_callback(#{fn},{width:#{width},height:#{height}})"
			};
			var params = { scale: "noscale", salign: "lt" };
			var attributes = {};
			obj.click(function () {
				//c.preventDefault();
				//alert(options.flv);
				$.videobox_resize(320,240);
				$.videobox_open();
				/*$('#videobox_stretcher').height(240);
				$('#videobox_stretcher').width(320);*/
				swfobject.embedSWF("flashplayer.swf", "videobox", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars, params, attributes);
			});
		});
	}
	$.videobox_resize = function(w,h)
	{
		$('#videobox_container').width(w);
		$('#videobox_container').height(h);
		$('#videobox_stretcher').width(w);
		$('#videobox_stretcher').height(h);
		$('#videobox_container').css('margin-top',(-h/2));
		$('#videobox_container').css('margin-left',(-w/2));
	}
	$.videobox_open = function()
	{
		if($('#videobox_container').is(':visible'))
		{
			
		}
		else
		{
			document.title="Opening...";
			$('#videobox_overlay').add($('#videobox_container')).fadeIn('normal',function() {
			});

		}
	}
	$.videobox_close = function()
	{
		if($('#videobox_container').is(':visible'))
		{
			swfobject.removeSWF('videobox');
			$('#videobox_overlay').add($('#videobox_container')).fadeOut('normal',function() {
			});
		}
	}
	$.videobox_callback = function(eventName,video)
	{
		if(eventName == "ready")
		{
			//document.title="width: "+video.width;
			//$('#videobox_stretcher').width(video.width);
			//$('#videobox_stretcher').height(video.height);
			$.videobox_resize(video.width,video.height);
		}
		//document.title=eventName;
	}
	$.videobox_init = function()
	{
		var videobox_overlay;
		var videobox_container;
		var videobox_target;
		videobox_overlay = $(jQuery('<div id="videobox_overlay" style="display:none;"></div>'));
		videobox_container = $(jQuery('<div id="videobox_container" style="display: none"></div>'));
		videobox_target = $(jQuery('<div id="videobox_target"></div>'));
		videobox_stretcher = $(jQuery('<div id="videobox_stretcher"></div>'));
		videobox = $(jQuery('<div id="videobox"></div>'));
		$('body').append(videobox_overlay).append(videobox_container);
		videobox_container.append(videobox_target);
		videobox_target.append(videobox_stretcher);
		videobox_stretcher.append(videobox);
		videobox_overlay.click(function() {
			$.videobox_close();
		});
		

	}
	$.videobox_update = function()
	{
		
	}
	$(document).ready(function() {
		$.videobox_init();
	});
})(jQuery);
