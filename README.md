# Content Warning Macro
A macro that greatly simplifies the process of hiding sensitive content unless clicked, to readers who opt-in for the content warnings.

* Ease — Quick and simple to install and implement, reducing effort and time required, as well as potential error
* Readability — Improves code readability by moving all the hard-to-read stuff in the Story JavaScript
* Customizable — Since the code natively uses HTML elements, it is possible to style the macro as desired
* Backwards and forwards engine compatible!

# Installation
Add either the contents of ``original_js.js`` or ``minified_js.js`` to your Story JavaScript. The latter is recommended if you have no intentions of revising the code to reduce the space it takes in your Story JavaScript, as well as improve its speed marginally.

Please keep in mind that the demo additionally includes ChapelR's Dialog API Macro to bring up the dialog box that allows the reader to toggle for their triggers.

# Demo
Click on (this link) to take you to the itch.io demo! The project is downloadable under Downloads.

# Setting Up
To set it up, allow the user to toggle what content warnings they need. Multi-selection checkboxes are recommended. Use ``<<link>>`` to call ``<<cwList>>`` on the page you give readers the choice to toggle. ``<<cwList>>`` will store the variables you used for each trigger that you can reference later. It is recommended that the name of the variables for each trigger is self-explanatory (ex. $violence for violence warnings).
```<<checkbox "$violence" false true autocheck>> Violence
<<checkbox "$death" false true autocheck>> Death
<<checkbox "$cannibalism" false true autocheck>> Cannibalism
<<checkbox "$sa" false true autocheck>> Sexual Assault

<<link "Confirm" "test">><<cwList "violence death cannibalism sa" true>><</link>>
```

Your ``<<cwList>>`` should list ALL the content warnings to be expected in the game, and should be referenced exactly the same as each variable.

If your story needs to include more content warnings later down the line, you can call ``<<cwList>>`` with an updated list of warnings.

# Usage
When there is content that you want to "spoiler", or hide unless clicked, enclose the content within a span tag and give it a unique ID, like so:

```<span id="cw1">This paragraph potentially has triggering material, including graphic depictions of violence and torture.</span>```

You will then need to use ``<<warn>>``, and the syntax follows:

``<<warn "id" "warning variables" "warning names">>``
* id - the id that corresponds to the content you want to warn.
* warning variables - the variables that corresponds to the content warnings you want to issue. For example, $violence warns for violence, and $animal_abuse warns for animal abuse, and so on.
* warning names - OPTIONAL. The name of the warning variables is used to list the warnings that are relevant to the user, so if the name of the warning variables is different from how they would normally be written, write how they should appear in this argument in the same order as you wrote the warning variables. Each variable should be separated with a comma AND a space.

So for the example above, you can call this macro anywhere in the passage: ``<<warn "cw1" "violence torture">>``. This is read as, "In the element with the ID 'cw1', warn that there is violence and torture in that section." This will output as:

``CW: Violence, torture`` -> (clicked) -> ``This paragraph potentially has triggering material, including graphic depictions of violence and torture.``

It is possible to add more text in the same line that will not be spoilered.

In the case that your variable is not written exactly like the trigger (for example, the variable for animal abuse is written as $animal_abuse or $aa), then you will need an additional argument. In this additional argument, write within quotes the proper names for each content warning, separated by a comma AND space, and in the same order you wrote the warning variables. See above for syntax, and below for an example.

``<<warn "cw1" "violence animal_abuse" "violence, animal abuse">>`` and the content warning will look like ``CW: Violence, animal abuse`` or ``CW: Violence`` or ``CW: Animal abuse`` depending on what content warnings the reader toggles.

# Credit
Credit is not necessary, BUT if you are using this for your story, PLEASE let me know so I can look at it! <3 I really enjoy seeing when others use it! In the case you would like to credit me, please credit me as "Mistyrious."

