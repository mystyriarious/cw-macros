// Content Warning Macro by Mistyrious
// Last tested Sugarcube 2.36.1, March 24 2024
var sens_topics = [];
var warning_uppercase = false;

Macro.add('cwList',
{
	handler: function()
  	{
      	// Catch errors
      	if (this.args.length > 2) {
          return this.error("Too many arguments! Make sure all content warnings are in the first argument separated by spaces, and the second argument is only true or false");
        }
      	if (this.args.length == 0) {
          return this.error('Please specify the variables pertaining to each trigger in quotes, separated by a space. For example: "violence death"');
        }
      
      	var content_warnings = this.args[0].split(" ");
      	// Add toggled sensitive topics
    	for (let i = 0; i < content_warnings.length; i++) {
      		var trigger = content_warnings[i];
          	var state_var = eval('State.variables.' + trigger);
          	if (state_var === undefined) {
              return this.error("One of the content warnings is not associated with a variable! Please fix so that each warning is the same name as the variable that is being set for each trigger");
            }
          	console.log(state_var);
          // Back button can bug this, which is why these checks exist!
          	if (state_var) {
              if (!sens_topics.includes(trigger))
                sens_topics.push(trigger);
            }
          	else {
              if (sens_topics.includes(trigger))
                sens_topics.splice(sens_topics.indexOf(trigger), 1);

            }
        }
      	// If want to uppercase first letter of first CW
      	if (this.args.length > 1 && this.args[1] == true) {
          warning_uppercase = true;
        }
      console.log("Sensitive topics:");
      console.log(sens_topics);
	}
});

Macro.add('warn',
{
	handler: function()
  	{
      // Check if there are proper number of arguments
      if (this.args.length < 2) {
        return this.error("Need to specify ID and warnings!");
      }
      
      const id = this.args[0];
      
      // Make a list of warnings pertaining to the material
      var warnList = this.args[1].split(" ");
      
      // Make a list of warnings that are actually relevant
      var caution = [];
      if (this.args.length > 2) {
        var warn_names = this.args[2].split(", ");
        if (warn_names.length > warnList.length) {
          return this.error("Specified too many warning names")
        }
      	else if (warn_names.length < warnList.length) {
          return this.error("Specified too little warning names; make sure the warning names are in the same order as the warnings you specified");
      	}
      }
      var rel_warns = [];
      for (let i = 0; i < warnList.length; i++) {
        for (let j = 0; j < sens_topics.length; j++) {
          if (warnList[i] == sens_topics[j]) {
            caution.push(warnList[i]);
            if (warn_names !== undefined && !rel_warns.includes(warn_names[i])) rel_warns.push(warn_names[i]);
          }
        }
      }
      console.log("Caution: ");
      console.log(caution);
      
      // Uppercase first letter of first warning
      if (this.args.length <= 2 && (warning_uppercase == true && caution.length > 0)) {
        var firstLetter = caution[0].charAt(0).toUpperCase();
        caution[0] = firstLetter + caution[0].slice(1);
      }
      
      // Adds the warning message
      var warn_message = caution.join(', ');
      if (this.args.length > 2 && rel_warns.length > 0) {
        firstLetter = rel_warns[0].charAt(0).toUpperCase();
        rel_warns[0] = firstLetter + rel_warns[0].slice(1);
        warn_message = rel_warns.join(', ');
      }
      
      console.log(caution);
      $(document).one(':passagedisplay', function (ev) {
        // Take content of span tag
        var element = document.getElementById(id);
      	var content = element.innerText;
        // If one of the warnings is a sensitive topic
        if (caution.length > 0) {
          	element.innerText = "";
          	$(element).wiki("<<linkreplace '<b>CW:</b> " + warn_message +"' t8n>>" + content + "<</linkreplace>>");
        	//document.getElementById(id).innerHTML = "<details><summary><b>Content warnings:</b> " + caution.join(', ') + "<div>" + content + "</div></details>";
        }
      });
  	}
});
