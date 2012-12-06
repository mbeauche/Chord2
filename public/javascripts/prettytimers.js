var num = 0;
var timers = [];
var timersOnScreen = 0;

//Javascript Reservation Object
function Reservation() {
	this.id = 0;
	this._id = "";
	this.username = "";
	this.roomtype = "";
	this.location = "";
	this.startTime = "";
	this.endTime = "";
	this.startDate = "";
	this.endDate = "";
	this.inSwap = false;
	this.swapNote = "";

}
//Timer Object

$(document).ready(function() {
	
	$("#newtimer").click(function() { //Open New Timer box
			$.get("/timer/createTimerForm", function(data) { lightBox(600,400,data); });
	});

	//when page is loaded, retreive all reservations!

	retrieveTimers();
	
});

function retrieveTimers(){


	$.getJSON("/timer/getUserTimers", function(data) { //Load users timers
		//alert(data.length + " " + data[0].roomname + " " + data[1].roomname);
		for(var i=timersOnScreen; i < data.length; i++)
		{
			var t = new Reservation();
			t.roomtype = data[i].roomType;
			t.location = data[i].location;
			t.startTime = data[i].startTime;
			t.endTime = data[i].endTime;
			t.startDate = data[i].startDate;
			t.endDate = data[i].endDate;
			t.inSwap = data[i].inSwap;
			t.swapNote = data[i].swapNote;
			//t._id = data[i]._id;
			//t.type = data[i].type;
			
			addReservation(t);

			timersOnScreen ++;
		}
	});
}

function addReservation(res){ //Adds reservation to document
	
	num++;
	res.id = num; //Add an ID so the timer can be located in the dom.
	timers.push(res);
	
	//This is going to be so ugly, but its the easiest way.
	$('#timers').append(
		'<div id="'+num+'_timer" class="timerentry" >'+
			'<div class="timercomment">'+res.roomtype + " room in " + res.location + '</div>'+ 
			'<div class ="reservebutton">  </div>'+
			'<div class ="timerduration">'+ res.startDate + " " + res.startTime + " to " + res.endTime + '<div>' +
			
			//'<div id="'+num+'_ticker" class="timerdisplay"></div>'+
			//'<div class="removetimerbutton"></div>'+
			//'<div class="restarttimerbutton"></div>'+
			//'<div class="timerduration">Duration: '+timeAmount +' '+timeType+'</div>'+
			//'<div class="progressbar"><div class="progress"></div></div>'+
			'<div class="timerid">'+res._id+'</div>'+
		'</div>'
	);

	bindTimerButtons();
	
}

function bindTimerButtons(){
	
	$('.timerentry').unbind(); //Unbind all previous events so they dont overlap
	$('.restarttimerbutton').unbind(); //Unbind all previous events so they dont overlap


	//function for detecting a click on the reservation div
	$('.timerentry').click(function(){

		var index = ($(this).attr("id").substring(0,1)) - 1; //Get ID of timer in global timer array.

		//alert(timers[index].roomtype);

		var box = $(this);

		$.post("/timer/createTimerForm", {data:(timers[index]) }, function(data) { lightBox(600,400,data); });

		/*$.post("/timer/delete", { timer:(timers[index]) }, function(data){//deleteTimer in TimerControl.js
			alert("YEA");
			if(data == 1) {
				alert("REMOVING");
				timersOnScreen--;
				box.fadeOut('slow'); //Remove timer on success
			}
		}); */
	});

	$('.restarttimerbutton').click(function(){
		var index = ($(this).parent().attr("id").substring(0,1)) - 1;
		var t = timers[index];
		t.update(1);
	});
}

//Max's custom animated lightbox plugin. Quite magical.
function lightBox(w,h,content){
	$('html').prepend('<div id="lightbox"></div>').fadeIn(400); //Add outer box
	$('#lightbox').css({'height':$(document).height(), 'width':$(document).width()});
	$("#lightbox").click(function() {
		closeLightbox();
	});
	$('body').prepend('<div id="lightboxcore"></div>'); //Append inner box
	$('#lightboxcore').css({'height':5, 'width':5});
    $('#lightboxcore').css("top", (($(window).height() - $('#lightboxcore').outerHeight()) / 2) +  $(window).scrollTop() + "px");
    $('#lightboxcore').css("left", (($(window).width() - $('#lightboxcore').outerWidth()) / 2) +  $(window).scrollLeft() + "px");
	$('#lightboxcore').animate({
		width: [w, 'swing'], left: '-='+(w/2),
		height: [h, 'swing'], top: '-='+(h/2)
		}, 500, function() {
			$('#lightboxcore').append(content);
	});
}
function closeLightbox(){
	$('#lightbox').fadeOut(500);
	$('#lightboxcore').fadeOut(300);
}

/*

var unixTimestamp = Math.round((new Date()).getTime() / 1000);

var Timerschema = new Schema({ //Ref
	start		:Date,
	end			:Date,
	repeat		:Number,
	interval	:Number,
	type		:Number,
	comment		:String,
});

*/