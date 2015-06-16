/* Your JS code goes here! */
var pharmacyArray = [];

var kyle = {
	sickness: 10,
	immunity:0
};
var turns = 5;
var currentRoll;

$(document).on("ready", function() {

	var source   = $("#phamacyTemplate").html();
	var template = Handlebars.compile(source); //takes string and replaces values as needed

	$.ajax({
	  url: "/remedy",
	  method: "GET",
	  success: function(data) {
	  		_.each(data.remedies, function(remedy) {
	  			pharmacyArray.push(remedy);
				var htmlString = template(remedy);
			  	$("#pharmacy").append(htmlString);
	  		})	 	
	    }
	})
	
	$("#order").on("click", function() {

		//Check for game over
		// Decrease turns by 1
		turns -= 1;
		// Update turns in html
		$("#turns-left").text(turns);

		// Roll the dice
		currentRoll = Math.floor(Math.random()* 10);
		// Display result
		$("#memory").text(pharmacyArray[currentRoll].name);

		//Subtract sickness
		kyle.sickness -= pharmacyArray[currentRoll].treatment;
		// Update health
		$("#current-sickness").text(kyle.sickness);

		//Subtract sickness
		kyle.immunity += pharmacyArray[currentRoll].prevention;
		// Update health
		$("#current-immunity").text(kyle.immunity);

		// Check for game over
			// win?
			if (kyle.sickness <= 0 && kyle.immunity > 5) {
				alert("Yay! You fixed Kyle!!!! Good work keeping up that immunity too!");
			}
			if (kyle.sickness <= 0 && kyle.immunity <= 5) {
				alert("Yay! You fixed Kyle!!!! Be sure to keep up that immunity too! We don't want him to get sick every time someone sneezes...");
			}
		// Out of turns
		if (turns === 0) {
			alert("Game Over!")
		}
	})

});