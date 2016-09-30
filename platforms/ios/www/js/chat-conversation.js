$(document).ready(function(){

	var location = "<p>I see you've typed 'Manager'.</p> <p>Please add the location you are seeking:</p>";
	var agent = "<p>I see you've typed 'New York'. <br> Would you like to have your assigned recruiter 'ANGELA MORENO' call you?</p>";
	var callMeBack = "<p>Great! You will hear from 'ANGELA MORENO' shortly about positions in New York.</p> <p> Would you like to see job based on your current criteria?</p>";
	var showjobs = "<p><a href='http://localhost:8100/#/swipe'>View Jobs...</a></p>";
	var wait = "<p class='loading'></p>";
	
	function delayedAnswer(k) {
	  setTimeout(function() {
	    answering(k);
	  }, 1500);
	}

	function answering(k) {
		$("p.loading").remove();
		$("div").append(k);
	}

//	$("#sendMsg").click(function(){

function sendMessage() {
		alert('static');
		var msg = $('#msg').val();

		if ( msg == 'Manager' ) {
			$("div").append(msg);
			$("div").append(wait);
			delayedAnswer(location);		
			$('#msg').val('');
		}
		if ( msg == 'New York' ) {
			$("div").append(msg);
			$("div").append(wait);
			delayedAnswer(agent);
			$('#msg').val('');
		}
		if ( msg == 'Yes call me' ) {
			$("div").append(msg);
			$("div").append(wait);
			delayedAnswer(callMeBack);
			$('#msg').val('');
		}
		if ( msg == 'Yes please show me jobs' ) {
			$("div").append(msg);
			$("div").append(wait);
			delayedAnswer(showjobs);
			$('#msg').val('');
		}
	}
//	});

	(function(win,doc) {
		if (doc.querySelectorAll) {
			var inputs = doc.querySelectorAll('input[list]'),
				  total = inputs.length;
			for (var i=0; i<total; i++) {
				var input = inputs[i],
					id = input.getAttribute('list'),
					list = doc.getElementById(id),
					options = list.getElementsByTagName('option'),
					amount = options.length
					//rand = Math.floor(Math.random()*amount),
					// option = options[rand],
					value = option.getAttribute('value');
					input.setAttribute('placeholder',value);
			}
		}
	})(this,this.document);



}); // END doc.ready

