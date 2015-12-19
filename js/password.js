(function() {


	// Create password validator object
	var passwordValidator = {

		// cache DOM elements
		textArea: document.getElementById('input-area'),
		submitButton: document.getElementById('submit-button'),
		outputArea: document.getElementById('output-container'),

		// Initialize event listener and bind to 'this'
		init: function() {
			this.submitButton.addEventListener('click', this, false);
		},

		// addEventListener will automatically look for a 'handleEvent' method when submitButton is clicked
		// This method validates passwords when submitButton is clicked
		handleEvent: function() {

			// Scan text area contents line by line
			var arrayOfPasswords = this.textArea.value.split('\n');

			// Iterate over text area lines and assign each line to 'input'
			for (var i = 0; i < arrayOfPasswords.length; i++) {
				input = arrayOfPasswords[i];

				// Create text elements to designate whether password passes
				var acceptableText = document.createElement('p');
				var acceptable = document.createTextNode('<' + input + '> is acceptable.');
				acceptableText.appendChild(acceptable);

				var notAcceptableText = document.createElement('p');
				notAcceptableText.style.color = "red";
				var notAcceptable = document.createTextNode('<' + input + '> is not acceptable.');
				notAcceptableText.appendChild(notAcceptable);
				

				// Use regexs to validate conditions on input
				var checkVowels = input.match(/[aeiou]/gi);
				var checkDoubleE = /ee/.test(input);
				var checkDoubleO = /oo/.test(input);
				var checkThreeConsecutiveLetters = /[aiueo]{3,}|[AIUOE]{3,}|[qwrtypsdfghjklzxcvbnm]{3,}|[QWRTYPSDFGHJKLZXCVBNM]{3,}/i.exec(input);
				var checkTwoSameLetter = /(.)\1/.test(input);

				// First check for blank or non-letter input
				// Second check for validation of conditions
				if (typeof input !== 'string' || input === ' ') {
					this.outputArea.appendChild(notAcceptableText);
				} else if (input === "end") {
					return 0;
				} else if (checkVowels < 1 || checkThreeConsecutiveLetters || (checkTwoSameLetter && (!checkDoubleE && !checkDoubleO))) {
					this.outputArea.appendChild(notAcceptableText);
				} else {
					this.outputArea.appendChild(acceptableText);
				}
			};
		},


	};

	// Initialize event listener
	passwordValidator.init();


}());