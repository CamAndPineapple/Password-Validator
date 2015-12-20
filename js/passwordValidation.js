(function() {

	var passwordValidator = {

		// Initialize event listener and bind to 'this'
		init: function() {
			this.cacheDOM();
			this.submitButton.addEventListener('click', this, false);
		},
		cacheDOM: function() {
			this.textArea = document.getElementById('input-area');
			this.submitButton = document.getElementById('submit-button');
			this.outputArea = document.getElementById('output-container');
		},
		handleEvent: function() {
			// Scan text area contents line by line
			this.textAreaInput = this.textArea.value.split('\n');
			var input;
			var arrayOfPasswords = [];

			// Iterate over text area lines and assign each line to 'input'
			for (var i = 0; i < this.textAreaInput.length; i++) {
				input = this.textAreaInput[i];
				arrayOfPasswords.push(input);

			}
			this.checkPasswords(arrayOfPasswords);
		},
		createTextElements: function(text) {

			// Create text elements to designate whether password passes
			this.acceptableText = document.createElement('p');
			var acceptable = document.createTextNode('<' + text + '> is acceptable.');
			this.acceptableText.appendChild(acceptable);

			this.notAcceptableText = document.createElement('p');
			this.notAcceptableText.style.color = "red";
			var notAcceptable = document.createTextNode('<' + text + '> is not acceptable.');
			this.notAcceptableText.appendChild(notAcceptable);
		},

		checkPasswords: function(passwords) {

			for (var i = 0; i < passwords.length; i++) {
				var input = passwords[i];

				this.createTextElements(input);

				// Use regexs to validate conditions on input
				var checkVowels = input.match(/[aeiou]/gi);
				var checkDoubleE = /ee/.test(input);
				var checkDoubleO = /oo/.test(input);
				var checkThreeConsecutiveLetters = /[aiueo]{3,}|[AIUOE]{3,}|[qwrtypsdfghjklzxcvbnm]{3,}|[QWRTYPSDFGHJKLZXCVBNM]{3,}/i.exec(input);
				var checkTwoSameLetter = /(.)\1/.test(input);

				// First check for blank or non-letter input
				// Second check for validation of conditions
				if (typeof input !== 'string' || input === ' ') {
					this.outputArea.appendChild(this.notAcceptableText);
				} else if (input === "end") {
					return 0;
				} else if (checkVowels < 1 || checkThreeConsecutiveLetters || (checkTwoSameLetter && (!checkDoubleE && !checkDoubleO))) {
					this.outputArea.appendChild(this.notAcceptableText);
				} else {
					this.outputArea.appendChild(this.acceptableText);
				}
			}
		}
	}

	passwordValidator.init();

})();