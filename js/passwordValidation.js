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
			this.passCount = document.getElementById('passValue');
			this.failCount = document.getElementById('failValue');
			this.totalCount = document.getElementById('totalValue');
		},
		check: {
			// Regexs to validate conditions on input
			vowels: function(password) {
				return password.match(/[aeiou]/gi);
			},
			doubleE: function(password) {
				return /ee/.test(password);
			},
			doubleO: function(password) {
				return /oo/.test(password);
			},
			threeConsecutiveLetters: function(password) {
				return /[aiueo]{3,}|[AIUOE]{3,}|[qwrtypsdfghjklzxcvbnm]{3,}|[QWRTYPSDFGHJKLZXCVBNM]{3,}/i.exec(password);
			},
			twoSameLetters: function(password) {
				return /(.)\1/.test(password);
			}
		},
		handleEvent: function() {

			if (this.passCount.innerHTML > 1 || this.failCount.innerHTML > 1) {
				this.passCount.innerHTML = 0;
				this.failCount.innerHTML = 0;
				this.outputArea.innerHTML = '';
			}

			
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
			this.acceptableText.className = "acceptableText";
			var acceptable = document.createTextNode('<' + text + '> is acceptable.');
			this.acceptableText.appendChild(acceptable);

			this.notAcceptableText = document.createElement('p');
			this.notAcceptableText.className = "notAcceptableText";
			var notAcceptable = document.createTextNode('<' + text + '> is not acceptable.');
			this.notAcceptableText.appendChild(notAcceptable);
		},
		updatePassFail: function(result) {

			if (result === "pass") {
				this.passCount.innerHTML++
			} else {
				this.failCount.innerHTML++
			}

			this.totalCount.innerHTML = Number(this.passCount.innerHTML) + Number(this.failCount.innerHTML);
			
		},
		checkPasswords: function(passwords) {

			for (var i = 0; i < passwords.length; i++) {
				var input = passwords[i];

				this.createTextElements(input);

				// 1: check for blank or non-letter input
				// 2: check for validation of conditions
				if (typeof input !== 'string' || input === ' ') {
					this.outputArea.appendChild(this.notAcceptableText);
					this.updatePassFail();
				} else if (input === "end") {
					return 0;
				} else if (this.check.vowels(input) < 1 || this.check.threeConsecutiveLetters(input) || (this.check.twoSameLetters(input) && (!this.check.doubleE(input) && !this.check.doubleO(input)))) {
					this.outputArea.appendChild(this.notAcceptableText);
					this.updatePassFail();
				} else {
					this.outputArea.appendChild(this.acceptableText);
					this.updatePassFail('pass');
				}
			}
		
		}
	};

	passwordValidator.init();

})();