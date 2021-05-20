const green = new Audio('./Sound1.mp3');
const red = new Audio('./Sound2.mp3');
const yellow = new Audio('./Sound3.mp3');
const blue = new Audio('./Sound4.mp3');
const errSound = new Audio('./error.wav');
const colors = ['green', 'red', 'yellow', 'blue'];
const btns = document.querySelectorAll('.btn');
const userSequence = [];
const sequence = [];

let isGameInProgress = false;
let level = 1;

document.querySelector('button').addEventListener('click', () => startGame())

for (let btn of btns) {
	btn.addEventListener('click', (evt) => {
		isGameInProgress ? gameOn(evt.currentTarget.id) : playSound(evt.currentTarget.id);
	});
}

function startGame() {
	// Initialize
	level = 3;
	isGameInProgress = true;

	// Reset and populate the sequence array
	sequence.length = 0;
	for (let i = 1; i <= 3; i++) {
		sequence.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	console.log(sequence);

	// Play first sound
	setTimeout(() => {
		playSound(sequence[0]);
	}, 450);
}

function compare(arr1, arr2, n) {
	for (let i = 0; i < n; i++) {
		if (arr1[i] !== arr2[i]) {
			console.log('arrays are NOT equal');
			return;
		}
	}
	console.log('arrays ARE equal');
}

const a = [1,2];
const b = [1,2,3];

function gameOn(color) {
	console.log(color)



	for (let i = 0; i < level; i++) {
		setTimeout(() => {
			playSound(sequence[i])
		}, i * 600);
	}
	// playSound(sequence[level]);
}


// function playSequence(arr) {
// 	for (let i = 0; i < arr.length; i++) {
// 		setTimeout(() => {
// 			playSound(arr[i]);
// 		}, i * 600);
// 	}
// }



function playSound(color) {

	// Button animation
	let btn = document.querySelector(`#${color}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 150);

	// Sound playback
	switch (color) {

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

		default: {
			errSound.currentTime = 0;
			errSound.play();
			break;
		}
	}
}
