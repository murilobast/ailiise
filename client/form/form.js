Template.form.events({
	'submit #addCommand': function (e) {
		e.preventDefault();
		var name = e.target.name;
		var trigger =  e.target.trigger;
		var action =  e.target.action;
		
		var command = {
			by: Meteor.userId(),
			at: new Date(),
			trigger: trigger.value,
			action: action.value,
			name: name.value
		}

		Commands.insert(command, function(err) {
			if (!err) {
				Materialize.toast('Comando inserido!', 4000)
			} else {
				Materialize.toast('Algum erro ocorreu!', 4000)
			}
		});
	}
});