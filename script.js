const green = new Audio('./Sound1.mp3');
const red = new Audio('./Sound2.mp3');
const yellow = new Audio('./Sound3.mp3');
const blue = new Audio('./Sound4.mp3');
const errSound = new Audio('./error.wav');
const colors = ['green', 'red', 'yellow', 'blue'];
const btns = document.querySelectorAll('.btn');
const sequence = [];

for (let i = 1; i <= 16; i++) {
	sequence.push(colors[Math.floor(Math.random() * colors.length)]);
}

// for testing
(function() {
	console.log(sequence);
})();


for (let btn of btns) {
	btn.addEventListener('click', (evt) => playSound(evt.currentTarget.id));
}

function playSound(str) {

	// Button animation
	let btn = document.querySelector(`#${str}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 150);


	// Sound playback
	switch (str) {

		case 'green': {
			green.currentTime = 0;
			green.play();
			break;
		}

		case 'red': {
			red.currentTime = 0;
			red.play();
			break;
		}

		case 'yellow': {
			yellow.currentTime = 0;
			yellow.play();
			break;
		}

		case 'blue': {
			blue.currentTime = 0;
			blue.play();
			break;
		}
	}
} 