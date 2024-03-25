// Content Warning Macro by Mistyrious
// Last tested Sugarcube 2.36.1, March 24 2024
var sens_topics=[],warning_uppercase=!1;Macro.add("cwList",{handler:function(){if(this.args.length>2)return this.error("Too many arguments! Make sure all content warnings are in the first argument separated by spaces, and the second argument is only true or false");if(0==this.args.length)return this.error('Please specify the variables pertaining to each trigger in quotes, separated by a space. For example: "violence death"');var content_warnings=this.args[0].split(" ");for(let i=0;i<content_warnings.length;i++){var trigger=content_warnings[i],state_var=eval("State.variables."+trigger);if(void 0===state_var)return this.error("One of the content warnings is not associated with a variable! Please fix so that each warning is the same name as the variable that is being set for each trigger");console.log(state_var),state_var?sens_topics.includes(trigger)||sens_topics.push(trigger):sens_topics.includes(trigger)&&sens_topics.splice(sens_topics.indexOf(trigger),1)}this.args.length>1&&!0==this.args[1]&&(warning_uppercase=!0),console.log("Sensitive topics:"),console.log(sens_topics)}}),Macro.add("warn",{handler:function(){if(this.args.length<2)return this.error("Need to specify ID and warnings!");let e=this.args[0];var s=this.args[1].split(" "),t=[];if(this.args.length>2){var n=this.args[2].split(", ");if(n.length>s.length)return this.error("Specified too many warning names");if(n.length<s.length)return this.error("Specified too little warning names; make sure the warning names are in the same order as the warnings you specified")}var i=[];for(let r=0;r<s.length;r++)for(let a=0;a<sens_topics.length;a++)s[r]!=sens_topics[a]||(t.push(s[r]),void 0===n||i.includes(n[r])||i.push(n[r]));if(console.log("Caution: "),console.log(t),this.args.length<=2&&!0==warning_uppercase&&t.length>0){var o=t[0].charAt(0).toUpperCase();t[0]=o+t[0].slice(1)}var h=t.join(", ");this.args.length>2&&i.length>0&&(o=i[0].charAt(0).toUpperCase(),i[0]=o+i[0].slice(1),h=i.join(", ")),console.log(t),$(document).one(":passagedisplay",function(s){var n=document.getElementById(e),i=n.innerText;t.length>0&&(n.innerText="",$(n).wiki("<<linkreplace '<b>CW:</b> "+h+"' t8n>>"+i+"<</linkreplace>>"))})}});
