say = function(speech)  {
	if (responsiveVoice.voiceSupport) {
		console.log(speech);
		responsiveVoice.speak(speech, "Brazilian Portuguese Female");
	}
}

rowADice = function(max) {
	return Math.floor((Math.random() * max) + 1);
}

string = '';

Template.body.rendered = function () {
	var show = $('h1');
	var called = 0;


	if (annyang) {

		annyang.setLanguage('pt-br');

		var test = {
			'diga *text': function(text) {
				say(text);
			}
		}

		// var who = {
		// 	'(hello) who are you': function() {
		// 		string = "my name is Ada. How can I help you?";
		// 		say('Hi, '+string);
		// 	}
		// }

		// var old = {
		// 	'(Ada) how old are you': function() {
		// 		string = "age is not a constant in my actual world";
		// 		say(string);
		// 	}
		// }

		// var repeat = {
		// 	'(sorry) can you repeat': function() {
		// 		say(string);
		// 	}
		// }

		var hername = {
			'(Ailise) (hey) (hey Ailise) (você esta aí) (você esta me escutando) (pode me ouvir)': function() {
				var options = [
					"A deusa está aqui!",
					"Estou aqui",
					"O que?",
					"Diga"
				]
				if (called < 4) {
					string = options[rowADice(3)];
					called ++;
				} else {
					string = "Você esta surdo?";
					called = 0;	
				} 
				say(string);
			}
		}

		annyang.addCommands(test);
		annyang.addCommands(hername);
		// annyang.addCommands(sayThat);
		// annyang.addCommands(repeat);
		// annyang.addCommands(who);
		// annyang.addCommands(old);
		// annyang.addCommands(music);

		annyang.start();
	}

};

controller = 0;
Template.body.helpers({
	getCommands: function () {
		if (!controller && annyang) {
			var commands = Commands.find().fetch();
			if (commands[0]) {
				controller = 1;
				commands.forEach(function(item) {
					var command = {};
					command[item.name] = {};
					command[item.name][item.trigger] = function() {
						string = item.action;
						say(string);
					}
					console.log(command);
					annyang.addCommands(command[item.name]);
				})
			}
		}
	}
});

// // annyang will capture anything after a splat (*) and pass it to the function.
// // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
// 'show me *term': showFlickr,

// // A named variable is a one word variable, that can fit anywhere in your command.
// // e.g. saying "calculate October stats" will call calculateStats('October');
// 'calculate :month stats': calculateStats,

// // By defining a part of the following command as optional, annyang will respond to both:
// // "say hello to my little friend" as well as "say hello friend"
// 'say hello (to my little) friend': greeting