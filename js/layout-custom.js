//Custom Script 
//Created By )*)&!(*!
//Date 10/10/2012

//Page Height, Map Script
var toolBarHeight, toolsContainerHeight, totalHeightExceeds, nosExceededIcons, nosLis, advancedToolMenu, iconsToRemove, totalLis, winHeight, activeLayerTxt, activeLayerTxtId;
var flag = false;
function Resize(ResultGrid){		
		
		//var screenHeight = document.documentElement.clientHeight;		
		var screenHeight = $(window).height();
		
		//document.getElementById('content-wrapper').style.height = (screenHeight-112)+'px';
		//document.getElementById('google-earth-wrapper').style.height = (screenHeight-112)+'px';				
		
		/*toolBarHeight = document.getElementById('toolPnl').style.height = (screenHeight-112)+'px';
		toolBarHeight = parseInt(toolBarHeight);		
		
		//On Result Grid Expand
		if(ResultGrid){
			toolBarHeight = toolBarHeight - 290;			
			$("#toolPnl").height(toolBarHeight);			
		} */
		//console.log(toolBarHeight)		
		toolsContainerHeight = $("#toolPnl ul").height();
		
		
		//console.log("toolPnl ul" + $("#toolPnl ul").height());
		//console.log("toolPnl" + $("#toolPnl").height());
		
		if( toolBarHeight < toolsContainerHeight ){
			totalHeightExceeds = toolsContainerHeight - toolBarHeight;			
			
			nosExceededIcons = Math.round(totalHeightExceeds/40) + 1; //1.5725695 			
			//console.log("toolBarHeight < toolsContainerHeight");
					
			
			nosLis = $("#toolPnl ul li.barIcon").size();
			//alert(nosLis);
			totalLis = $("#toolPnl ul").html();
			//alert(totalLis);
			iconsToRemove = nosLis - nosExceededIcons;			
			//console.log("nosExceededIcons:" + nosExceededIcons);			
			
			//Append exceeded icons into tools popover box
			for(var i = 0; i <= nosExceededIcons ; i++){												
				//console.log("iconsToRemove:" + iconsToRemove);
				//alert("icons to remove")
				$("#popo7 ul").append($("#toolPnl ul li.barIcon:nth-child("+ iconsToRemove + ")").removeClass("barIcon"));
				}
			$(".advancedToolMenu").show();				
		}		
		var mode;
		$("#advancedToolMenu").click(function(){								
			if(mode == "basic"){				
				$("#advanced-mode").hide();
				$("#basic-mode").show();
			}
			if(mode == "advanced"){
				$("#basic-mode").hide();
				$("#advanced-mode").show();
			}
			$("#popo7").show();
		});
		$(".popover").mouseleave(function(){	
			$(this).fadeOut(200);
		});
		
		
		
		//On Result Grid Collapse
		if(ResultGrid == false){			
			var nosLis1 = nosLis;
			//alert(totalLis)
			$("#toolPnl ul").empty();
			$("#popo7 ul").empty();
			$("#toolPnl ul").append(totalLis);			
			Resize();			
		}		
		
		/*$("#layerPnl").height(screenHeight-112);
		
		var height = $(".left_pnl").height() - 78 + "px";
		var height2 = $(".left_pnl").height() - 62 + "px";
		var height3 = $(".left_pnl").height() - 131 + "px";
			
			//set height of layer panel and layer-holder
			
			$(".layer-holder").css({'height': height});
			
			$(".tab-legend").css({'height': height2});
			//$(".view-content").css({'height': height3});
		/*var screenWidth = document.documentElement.clientWidth;
		document.getElementById('content-wrapper').style.width = (screenWidth-0)+'px';
		var width = $(".footer").width() - 0 + "px";
			$(".tbl-result").css({'width': width});*/							
			
	}
	

	
jQuery(window).resize(function() {
    setHeight();    
});
jQuery(document).ready(function() {
	setHeight();    
})

var setHeight = function() {
		var screenHeight = jQuery(window).height();
		
		jQuery("#layerPnl").height(screenHeight-90);		
		
		var height = $(".left_pnl").height() - 60 + "px";
		var height2 = $(".left_pnl").height() -50 + "px";		
			
		//set height of layer panel and layer-holder			
		$(".layer-holder").css({'height': height});			
		$(".tab-legend").css({'height': height2});

}
	
	
/*	$(document).ready(function(){
		winHeight = $( window ).height();
		$( window ).resize(function(){
			if ((screen.width>=winHeight) && (screen.height>=winHeight)) {
				Resize(false);
			}
		})
	})*/	
	
$(document).ready(function() {	
	gridData()		
	$("#googleSubMaps li").click(function(){		
		$("#googleSubMaps li").removeClass("active");
		$(this).addClass("active");

		if($(this).attr("id")=="lnkGoogleEarth"){
			$("#google-earth-wrapper").css("opacity","0");
			$("#google-earth-wrapper").css({"width":"100%","right":"auto","background":"url(images/Google_Earth.jpg) no-repeat 0 0","background-size":"100%"}).delay(200).fadeTo('slow', 1);
			$("#google-earth-wrapper").fadeIn("slow");
			$(".om-holder").hide();
			$("#footer-icons").hide();
			$("#map-help").show();
			$(".google-earth-info").show();
			$("#toolPnlGoogleEarth").show();
			$("#toolPnl-streetView").hide();
			$("#toolPnl-specific-icons").show();
			$("#toolPnl-all-icons").hide();

			
		}
		if($(this).attr("id")=="lnkGoogleRoads"){
			$("#google-earth-wrapper").fadeOut("slow");
			$(".om-holder").show();
			$("#footer-icons").show();
			$("#map-help").hide();
			$(".google-earth-info").hide();
			$("#toolPnlGoogleEarth").hide();
			$("#toolPnl-streetView").hide();
			$("#toolPnl-specific-icons").hide();
			$("#toolPnl-all-icons").show();	
			$("#left-wrapper").show();			
		}
		if($(this).attr("id")=="lnkGoogleStreet"){
			$("#google-earth-wrapper").css("opacity","0");
			$("#google-earth-wrapper").css({"width":"50%","right":"0", "background":"url(images/Google_Earth_Street.jpg) no-repeat 0 0", "border-left":"1px solid #333"}).delay(200).fadeTo('slow', 1);
			$("#toolPnl-all-icons").hide();
			$("#toolPnl-specific-icons").hide();
			$("#toolPnl-streetView").show();
			$("#left-wrapper").hide();
		}
	});	
	$(".close-info-window").click(function(){
		$(".google-earth-info").fadeOut("slow");
	})
	/*$("#back-Google-Earth").click(function(){
		$("#google-earth-wrapper").slideUp("slow");
		$(".top-bar").slideDown();
		$(".top-bar2").slideUp();
	})*/
	
	//Tool Window Mouse Animation
	$(".right-wrapper-anchOpen").click(function(){
		  $("#right-wrapper").css("margin-right", "0px");
          $("#right-wrapper").animate({marginRight:"0px"}, 100 );
		  $(".btnpnlHolder").toggle();
        
	});
	$(".right-wrapper-anchClose").click(function(){
		$("#right-wrapper").animate({marginRight:"-37px"}, 100 );
		$("#right-wrapper").css("margin-right", "-37px");
		$(".btnpnlHolder").toggle();
		$( ".toolAdMenu" ).hide();
		$("#advancedToolMenu").removeClass("");
		$( "#advancedToolMenu img" ).hide();
		$( "#advancedToolMenu img" ).first().show();
	});
	
	$(".left-wrapper-anchOpen").click(function(){
    console.log($("#bottompanel").css("height"));
    if($("#bottompanel").css("height") != "45px")
    {
      $("#close_bottom").hide();
      $("#open_bottom").show();
      $(".btm_panel_bar").show();
      $("#bottompanel").animate({"top":"+="+($("#pnlbottom").height()-25),"height":"-="+($("#pnlbottom").height()-25)});
      setHeight();
      Resize(false);
    }
    
    $("#left-wrapper").css("margin-left", "0px");
    $("#left-wrapper").animate({marginLeft:"0px"}, 100 );
    $(".btnpnlHolderleft").toggle();
		  //$("#left-wrapper").addClass("op5");
	});
	
	$(".left-wrapper-anchClose").click(function(){
			$("#left-wrapper").animate({marginLeft:"-86px"}, 100 );
			$("#left-wrapper").css("margin-left", "-86px");
			$(".btnpnlHolderleft").toggle();
			$("#left-wrapper").removeClass("active");
	});
	
	//Advanced Tool Popup Start popo7
	
	$("#advancedToolMenu").click(function(){
		//$(".toolAdMenu").toggle();
		//$("#advancedToolMenu").toggleClass("active");
		//$(".advIcon").toggle();			
		$("#popo7").fadeIn();
	});
	/*$("#popo7 li a").on("click", function(){
		$("#popo7").fadeOut();
		});*/
		
	$("#popo7 li a").on("click", function(){
		$("#popo7").fadeOut();
		})
	
	/*$(".toolBoxAdv li a").click(function(){
		$(".toolAdMenu").fadeOut(200);		
		$("#advancedToolMenu").removeClass("active");
		$(".advIcon").toggle();
	});*/
	
	
	//Advanced Tool Popup End
	
	//Bottom Panel -------------- Start -----------------------	 .tab-legend
	// Expand Panel
	
  $("#open_bottom").click(function(){
    // Hide left panel only if open
    console.log($("#left-wrapper").css("margin-left"));
    if($("#left-wrapper").css("margin-left") != "-86px")
    {
      $("#left-wrapper").animate({marginLeft:"-86px"}, 100 );
      $("#left-wrapper").css("margin-left", "-86px");
      $(".btnpnlHolderleft").toggle();
      $("#left-wrapper").removeClass("active");
    }
    
		//$("#pnlbottom").slideToggle();
		$("#open_bottom").hide();
		$(".btm_panel_bar").hide();
		var heightLayes = $("#layerPnl").height() - 290 + "px";
		var holderLayes = $(".layer-holder").height() - 290 + "px";
		var holderLegend = $(".tab-legend").height() - 290 + "px";
		$("#layerPnl").animate({'height': heightLayes});
		$(".layer-holder").animate({'height': holderLayes});
		$(".tab-legend").animate({'height': holderLegend});
		if($("#MaxSize").hasClass("active")){
			$("#close_bottom").hide();
			}
		else{
			$("#close_bottom").show();
			}
		//Interact with Toolbar: bring hidden icons to more option menu
		var resultGridHeight = "290";
		
		$("#bottompanel").animate({"top":"-="+($("#pnlbottom").height()-25),"height":"+="+($("#pnlbottom").height()-25)});
		setHeight();
		Resize(true);
	});
  
	// Collapse Panel
	$("#close_bottom").click(function(){
		$("#close_bottom").hide();
		$("#open_bottom").show();
		$(".btm_panel_bar").show();
    $("#bottompanel").animate({"top":"+="+($("#pnlbottom").height()-25),"height":"-="+($("#pnlbottom").height()-25)});
		setHeight();
		Resize(false);
	});
  
	$("#btn-full .vs3").click(function(){
		$("#pnlbottom").slideToggle();
		$('#toggle_bottom').show();
		$('#open_bottom').show();
		$("#close_bottom").hide();
		setHeight();		
		Resize();
		
	});		
	
	$("#MaxSize").click(function () {
		var heightMapCanvas = $("#map_canvas").height()- 0 + "px";
		var screenGridHeight = document.documentElement.clientHeight;
		$("#pnlbottom").animate({'height': heightMapCanvas});
		$("#MaxSize").addClass('active');
		$("#MinSize").removeClass('active');
		$('#toggle_bottom').hide();
		$('#btn-full').show();
		$(".tbl-result").css({'height': (screenGridHeight - 202 +"px")});
		//$('#pnlbottom .tbl-result').css('height','auto');
	});
	
	$("#MinSize").click(function () {
		$("#pnlbottom").animate({'height': 290});
		$("#MaxSize").removeClass('active');
		$(".tbl-result").css('height', '223px');
		$("#MinSize").addClass('active');
		$('#toggle_bottom').show();
		$("#close_bottom").show();
		$('#btn-full').hide();
	});
		
	$('#pnlbottom .results').hide(); 
	$('#pnlbottom .results:first').show(); 
	$('.gt li:first').addClass('active'); 
		
	$('.gt li a').click(function(){ 
		$('.gt li').removeClass('active');
		$('.gt li').addClass('g2');
		$(this).parent().removeClass('g2');
		$(this).parent().addClass('active');
		
		var currentTab = $(this).attr('href');
		$('#pnlbottom .results').hide(); 
		$(currentTab).show();
		return false;
	});	
	
	$('.view-btn').click(function(){
		$('.vc-wrapper').fadeToggle();
		$(this).toggleClass('op5');
		})
	
	$('.view-tabs a').click(function(){
		$('.view-tabs a').addClass('g5');		
		$('.view-tabs a').removeClass('active');
		$(this).addClass('active');
		$(this).removeClass('g5');
		
		var currentTab = $(this).attr('href');
		$('.vc-wrapper .view-content').hide(); 
		$(currentTab).show();
		return false;
	});
	
	$(".context-open").contextMenu({ menu: 'myMenu', leftButton: true});
	
	//Bottom Panel -------------- End -----------------------
	
	$("#loginLink").click(function(){
		$("#popo3").hide();
		$("#popo4").hide();
		$("#popo5").hide();
		$("#afterLogin").show();
		$("#loginLink").hide();
		//$("#popo1").slideDown();
		
		});
	$("#login").click(function(){
		$("#afterLogin").show();
		$("#loginLink").hide();
		$(".popover").fadeOut(200);
		$('#getText').html($('#userName').val());
		});
	$("#logout").on("click",function(){
		$("#loginLink").show();
		$("#afterLogin").hide();
		$(".popover").fadeOut(200);
		});
	
	$(".popover").mouseleave(function(){	
		//$(this).fadeOut(200);
	});
	
	
	//$(".toolBoxTop li a").click(function(){	
		//$("#popo2").fadeOut(200);
		//$(".tog-icon").removeClass("active");
		//$(".tog-icon img").toggleClass('d-none');
		//$( "#openMyArea" ).find("img").toggle();
	//});
	
	$(".openMyArea").click(function(){
		$("#popo2").fadeToggle();
		//$( this ).find("img").toggle();	
		//$(this).toggleClass('active');		
	});
	$("#savedLink").click(function(){
		$("#popo1").hide();
		$("#popo4").hide();
		$("#popo5").hide();
		$("#popo3").slideDown();
		})
	$("#outputOptions").click(function(){
		$("#popo1").hide();
		$("#popo3").hide();
		$("#popo5").hide();
		$("#popo4").slideDown();
		})
	$("#settings").click(function(){
		$("#popo1").hide();
		$("#popo4").hide();
		$("#popo3").hide();
		$("#popo5").slideDown();
		})
	
	$("#topNav ul li").click(function(){		
		var height4 = $(".right_pnl").height() - 0 + "px";
		$(".subType").css({'max-height': height4});		
		$(this).children().next().stop().delay(200).slideDown();
		//$(this).addClass("selected");
	});
	$("#topNav li").mouseleave(function(){
		$(this).children().next().slideUp();
		$(this).removeClass("selected");
	});
	
	/*$("#addMapbtn").click(function(){
		
		if($("#newMaptab").is(":checked")){
			var li = "<li class='last'><a class='mapIcon' href='#'>" +  $("#maptabname").val() +"</a></li>"
			$("#mapTabs").find("li").removeClass("last");
			$("#mapTabs").append(li);
		}
		
		 $( "#AddtoMap" ).dialog( "close" );
		 $( "#dialogTool" ).dialog( "close" );
		   
	});*/	
	
	$("#navTool").click(function(){
		$( "#dialogTool" ).dialog( "open" );
	});
	
	$("#geoPortalLink").click(function(){
		$("#geoPortal" ).dialog( "open" );
	});
	
	$("#CancelgeoPortal").click(function(){
		$( "#geoPortal" ).dialog( "close" );
	});
	
	$("#FormSearchbtn").click(function(){
		$( "#geoPortal" ).dialog( "close" );
		$( "#geoPortalResult" ).dialog( "open" );
	});
	$(".search_result li").click(function(){
		$(this).children().next().slideToggle();
	});
	

	$(".addTomapLink").click(function(){
		 $( "#geoPortalResult" ).dialog( "close" );
		 $( "#AddtoMap" ).dialog( "open" );
	});
	
	$("#addTomapClose").click(function(){
		 $( "#AddtoMap" ).dialog( "close" );
	});
	
	$("#newMaptab").click(function(){
		 $( "#ExMapTab" ).hide( );
		 $( "#newMap" ).show( );
	});
	$("#exMap").click(function(){
		 $( "#newMap" ).hide( );
		 $( "#ExMapTab" ).show( );		   
	});
	
	$(".tog-icon").click(function(){
		$(".tog-icon input").toggleClass('d-none');
		$(".tog-icon input:last").addClass('active');
	});
		
	
	$("#layer").click(function(){
		$('.lay-header div').removeClass('active g4 bs');
		$('#layer').addClass('active');
		$('#legend').addClass('g4 bs');
		$('.tab-layer').show();
		$('.tab-legend').hide();
	});
	$("#legend").click(function(){
		$('.lay-header div').removeClass('active g4 bs');
		$('#legend').addClass('active');
		$('#layer').addClass('g4 bs');
		$('.tab-legend').show();
		$('.tab-layer').hide();
	});
		
		
	// footer 
	$("#tog-xy").click(function(){
		$(".xy-c").parent().toggleClass("w2");
		$(".xy-c").toggle(200);
	});
		
	$("#tog-om").click(function(){
		$("#tog-om input").toggle();
		$("#tog-om").toggleClass("op5");
		$(".view-om").toggle(200);
	});
	
	/*$(".flip").hover(function() {
		 $( this ).find("img").toggle();
	});*/
	
	$("#toolPnl").mouseenter(function(){
		$(this).animate({opacity: 1}, 500 );
		$(".right-wrapper-anchClose").animate({opacity: 1}, 500 );
	});
	
	$("#toolPnl").mouseleave(function(){
		$(this).animate({opacity: 0.5}, 500 );
		$(".right-wrapper-anchClose").animate({opacity: 0.5}, 500 );
	});
		
	$(".right-wrapper-anchClose").mouseleave(function(){
		$("#toolPnl").animate({opacity: 0.5}, 500 );
		$(this).animate({opacity: 0.5}, 500 );
	});		
		
	$(".right-wrapper-anchClose").mouseenter(function(){
		$("#toolPnl").animate({opacity: 1}, 500 );
		$(this).animate({opacity: 1}, 500 );
	});
	
// daialog box opacity setup
	$(".ui-dialog").on("mouseenter",function(){
		$(this).animate({opacity: 1}, 200 );
	});
	
	$(".ui-dialog").on("mouseleave",function(){
		$(this).animate({opacity: 0.5}, 1000 );
	});
	
	$('.tog-mt').click(function(){
		$(this).parent().find('.mt-cont').fadeToggle();
		})
	
	$('.left-tabs a').click(function(){
		$('.left-tabs a').addClass('g5');		
		$('.left-tabs a').removeClass('active');
		$(this).addClass('active');
		$(this).removeClass('g5');
		
		
		//$('.left-tabs a').removeClass('active'); 
//		$(this).addClass('active');
		
		var currentTab = $(this).attr('href');
		$('.cont-sty').hide(); 
		$(currentTab).show();
		$("#myProfile").height( $(".left-tab-content").height() + 10);
		return false;
	});
// Checkbox custom style	
	$(".chk").wrap("<span class='chk-sty c-off'></span>");
	
	$(".chk").each(function(index, element) {
        if($(element).attr("checked") == true){
			$(this).removeClass("c-off");
			$(this).parent().addClass("c-on");
		}
    });
	$(".chk").each(function(index, element) {
        if($(element).attr("disabled") == true){
			$(this).removeClass("c-off");
			$(this).parent().addClass("c-dis");
		}
    });

	
	$(".chk-sty").click(function(){		
		if ($(this).hasClass("c-off")){				
				$(this).removeClass("c-off");
				$(this).addClass("c-on");
				$(this).find(".chk").attr("checked","checked");				
			}
		else{
			$(this).addClass("c-off");
			$(this).removeClass("c-on");
			$(this).find(".chk").removeAttr("checked");
			
		}
		});
// radio button custom style		
	$(".radi").wrap("<span class='radi-sty r-off'></span>");
	$(".radi").each(function(index, element) {
        if($(element).attr("checked") == true){
			$(this).removeClass("r-off");
			$(this).parent().addClass("r-on");
		}
    });	
	$(".radi-sty").click(function(){
		var radioName = $(this).find(".radi").attr("name");
		$("[name='"+ radioName + "']").parent().removeClass("r-on");
		if ($(this).hasClass("r-off")){
				$(this).removeClass("r-off");
				$(this).addClass("r-on");
			}
		});
	$(".radi-sty").click(function(){
		$(this).addClass("r-on");
		$(this).removeClass("r-off");
		});
	
	
		
	
	$(".navi-wrap").mouseenter(function(){
			$(".navi-wrap").children().fadeToggle(200);
		});
	$(".navi-wrap").mouseleave(function(){
			$(".navi-wrap").children().fadeToggle(200);
		});
	$("#databasSearch").click(function () {
		$("#right-wrapper").css({"z-index":1000});
		var heightMapCanvas = $("#map_canvas").height()- 0 + "px";
		$("#pnlbottom").animate({'height': heightMapCanvas});
		$("#MaxSize").removeClass('active');
		$("#MinSize").removeClass('active');
		$('#toggle_bottom').hide();
		$('#btn-full').show();
		//$("#MinSize").unbind("click");
		//$("#MaxSize").unbind("click");
		$("#btn-full .vs3").unbind("click");
		$("#MinSize").css('cursor',"default");
		$("#MaxSize").css('cursor',"default");
		$("#btn-full .vs3 input").css('cursor',"default");
		
		$("#btn-full div").addClass("op6");
		$(".togg-view").addClass("op6");
	});
	
	//restore database search click
	$(".grid-tabs ul li a").click(function(){
			if($(this).attr("id")=="databasSearch"){return};			
			$("#pnlbottom").animate({'height': 290});			
			//Restore defaults			
			$("#right-wrapper").css({"z-index":1000});
			$("#MinSize").addClass('active');
			$('#toggle_bottom').show();
			$('#btn-full').hide();
			$(".tbl-result").css('height', '223px');
			
			$("#btn-full .vs3").unbind("click");
			$("#MinSize").css('cursor',"default");
			
			$("#btn-full .vs3 input").css('cursor',"default");
			
			$("#btn-full div").addClass("op6");
			$(".togg-view").removeClass("op6");
		});
	//Selected state on toolbar
	$("#toolPnl ul li").click(function(){
		if($(this).attr("id")=="advancedToolMenu"){
			return;
		}else{
			$("#toolPnl ul li").removeClass("active");				
			$(this).addClass("active");
		}
		
	})
	
});
// Ready end

$(function() {
	$( "#dialogTool" ).dialog({
		create: function(event, ui) { 
		  var widget = $(this).dialog("widget");
		  $(".ui-dialog-titlebar-close span", widget)
			  .removeClass("ui-icon ui-icon-closethick")
			  .addClass("closeIconDialog");
	   },
		autoOpen: false,
		width:"200px",
		resizable: false,
		position: [100,200]
	});
});

$(function() {
	$( "#geoPortal" ).dialog({
		create: function(event, ui) { 
		  var widget = $(this).dialog("widget");
		  $(".ui-dialog-titlebar-close span", widget)
			  .removeClass("ui-icon ui-icon-closethick")
			  .addClass("closeIconDialog");
	   },
		autoOpen: false,
		width:"300px",
		resizable: false
	});
});	

$(function() {
	$( "#geoPortalResult" ).dialog({
		create: function(event, ui) { 
		  var widget = $(this).dialog("widget");
		  $(".ui-dialog-titlebar-close span", widget)
			  .removeClass("ui-icon ui-icon-closethick")
			  .addClass("closeIconDialog");
	   },
		autoOpen: false,
		width:"350px",
		resizable: false
	});
});		

$(function() {
	$( "#AddtoMap" ).dialog({
		create: function(event, ui) { 
		  var widget = $(this).dialog("widget");
		  $(".ui-dialog-titlebar-close span", widget)
			  .removeClass("ui-icon ui-icon-closethick")
			  .addClass("closeIconDialog");
	   },
		autoOpen: false,
		width:"400px",
		resizable: false
	});
});		


$(function() {
	$( "#myProfile" ).dialog({	
	create: function(event, ui) {
	$(this).parent().find('.ui-dialog-titlebar').append('<a href="#" class="t-btn mr1 tog-mm"><span class="ico-min"></span><span class="ico-max d-none"></span></a><div class="v-line-blue"></div><a href="#" class="t-btn"><span class="ico-help"></span></a><a href="#" class="t-btn mr2"><span class="ico-setting-b"></span></a>');
	var widget = $(this).dialog("widget");	
	$(".ui-dialog-titlebar-close span", widget)	
	.removeClass("ui-icon ui-icon-closethick")	
	.addClass("closeIconDialog");
	},
	
	autoOpen: false,	
	width:"482px",
	resizable: false
	});	
	$( ".tog-mm" ).click(function() {
		$(".tog-mm span").toggleClass("d-none");
		$("#myProfile").slideToggle("slow");
	});
});

$(function() {
	$( "#msgConfirm" ).dialog({
		closeOnEscape: false,
	   	dialogClass: "no-close",
		autoOpen: false,
		width:"250px",
		resizable: false
	});
	$( "#msgConfirm" ).hover(function(){
		return false;
	});
});		
	
// function for layer manager

$(function($){	
	$(".ly1 .tog-arrow").click(function(){
		$(this).find("img").toggle();	
		$('.layer-holder UL LI UL').slideToggle(400);
		/*$(this).parent().parent().find(".ly2").slideToggle("20");
		$(this).parent().parent().parent().find(".ly3").hide();*/
	})
	$(".ly2 .tog-arrow").click(function(){
		$(this).find("img").toggleClass('d-none');		
		$(this).parent().parent().find(".ly3").slideToggle(400);
	})
	
	
	/*List Setting */
	$(".bg-o").mouseenter(function(){
			$(this).append('<div class="lay-options"><img src="images/map-icons/options-layer.png" width="20" height="20" class="option"></div>');
			activeLayerTxt = $(this).find(".layerText").text();
			activeLayerTxtId = $(this).parent().attr("id");
		})
	$(".bg-o").mouseleave(function(){
			if($("#layer-setting-popup").is(":visible")==true){
				$(".lay-options").show();
			}else{
				$(".lay-options").remove();
				return false;			
			}
			
		})
	$("#layer-setting-popup").on({		
		mouseenter:function(){
			$(".lay-options").show();
			//$(".option").delay(200).removeClass("active");
		},
		mouseleave:function(){
			$(this).hide();
			$(".lay-options").hide();
						
			$(".list-setting-subinfo").on("mouseenter", function(){
				$("#layer-setting-popup").show();
				$(".lay-options").show();
			})			
			$(".list-setting-subinfo").hide();
		}		
	});
		
	
	$(".option").on("click",function(){
		//$(".list-setting").hide();
		var pos = $(this).offset();
		$("#layer-setting-popup").css({"left":pos.left - 87, "top":pos.top + 30});
		$("#layer-setting-popup").show(400);
		$(this).addClass("active");
			
	})
	
	$("#layer-filter").click(function(){
		var pos = $(this).offset();
		//$(".list-setting-subinfo").css({"left":pos.left + 117, "top":pos.top});
		$(".list-setting-subinfo").show();
	});
	
	
	/*End*/
	$(".tog-check").click(function(){
		$(this).find("img").toggle();
	})
	
	
	
	
	$(".icon1").click(function(){
			$(".pop-down").slideDown(200);
		});
	$(".pop-down").mouseleave(function(){
			$(this).slideUp(200);
		});
	$("#more1").click(function(){
		$("#popo6").slideDown();
		})
})

function closeDialog(dialogId){
	$('#' + dialogId).dialog("close");
}
function openDialog(dialogId){
	$('#' + dialogId).dialog("open");
}
function closeSPanel(dialogId){
	$('#' + dialogId).fadeOut();
	$("#msgConfirm").dialog("close");
	Resize();
	}
	
function gridData(){
	var screenWidth = document.documentElement.clientWidth;
	$(".tbl-result").css('height', '223px');			
	$(".tbl-result").css({'width': screenWidth});
}

function changeActiveLayer(select){
   var index = $("#ActiveLayer option:selected").attr("id")
	$(".layer-holder").find("#" + index).trigger( "click" );
}


$(document).ready(function(){
	$(".chkEditLayersAll").parent().click(function(){
		$(this).removeClass("c-partially-on");
		
		if($(".chkEditLayersAll").parent().hasClass("c-on")){						
			$( ".chkEditLayers" ).attr( "checked", "checked" );
			$( ".chkEditLayers" ).parent().removeClass("c-off");			
			$( ".chkEditLayers" ).parent().addClass("c-on");						
		}
		if($(".chkEditLayersAll").parent().hasClass("c-off")){			
			$( ".chkEditLayers" ).removeAttr("checked");
			$( ".chkEditLayers" ).parent().removeClass("c-on");
			$( ".chkEditLayers" ).parent().addClass("c-off");
		}
	  //$("#chkTransportation").parent().addClass("c-partially-on")	  
	})
	
	
	
	
	$("#editLayerSubList .chk-sty").click(function(){
		
			if($("#editLayerSubList .chk-sty").hasClass("c-on")){
				$( ".chkEditLayersAll" ).attr( "checked", "checked" );
				$(".chkEditLayersAll").parent().addClass("c-partially-on");
			}else{
				$( ".chkEditLayersAll" ).removeAttr("checked");;
				$(".chkEditLayersAll").parent().removeClass("c-partially-on");
				$(".chkEditLayersAll").parent().removeClass("c-on");
				$(".chkEditLayersAll").parent().addClass("c-off");		
			}
			var count = 0;
			var editLayerSubListLen = $("#editLayerSubList li").length;	
				for(var i = 0; i <= editLayerSubListLen; i++){
					if($("#editLayerSubList li:eq(" + i +") .chk-sty").hasClass("c-on")){
						count = count + 1
					}
				};			
				
			if(count == 3){
				$(".chkEditLayersAll").parent().removeClass("c-partially-on");
				$(".chkEditLayersAll").parent().addClass("c-on");
			}
	})

	//set active layer text
	$("#popover-make-layer-active").click(function(){		
		$(".layerSelectedText").text(activeLayerTxt); 		
		$(".layer-level-two li").removeClass("active");		
		$("#" + activeLayerTxtId).addClass("active");		
	})
	$(".list-setting, .left_pnl").hover(function(){
		$(".left_pnl").css({"opacity":"1"})
		}).mouseleave(function(){
		$(".left_pnl").animate({opacity: 1}, 0 );
	})	
	
})


//$(".left_pnl").css({"opacity":"1"});

	

