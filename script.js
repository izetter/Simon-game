const green = new Audio('./Sound1.mp3');
const red = new Audio('./Sound2.mp3');
const yellow = new Audio('./Sound3.mp3');
const blue = new Audio('./Sound4.mp3');
const errSound = new Audio('./error.wav');
const colors = ['green', 'red', 'yellow', 'blue'];
const btns = document.querySelectorAll('.btn');
const startGameBtn = document.querySelector('button');
const sequence = [];
const userSequence = [];
const p = document.querySelector('p');
const cp = document.querySelector('.counterp');
let isGameInProgress = false;
let counter = 0; 
let level = 1;

startGameBtn.addEventListener('click', () => startGame())

for (let btn of btns) {
	btn.addEventListener('click', (evt) => {
		isGameInProgress ? gameOn(evt.currentTarget.id) : playSound(evt.currentTarget.id);
	});
}

function startGame() {
	// Initialize
	level = 1;
	isGameInProgress = true;
	startGameBtn.disabled = true;
	p.classList.remove('grayed-out')
	p.innerText = `${level}, ${counter}`;

	// Reset and populate the sequence array
	sequence.length = 0;
	for (let i = 1; i <= 10; i++) {
		sequence.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	console.log(sequence);

	// Play first sound
	setTimeout(() => {
		playSound(sequence[0]);
	}, 450);
}

// function compare(arr1, arr2, n) {
// 	for (let i = 0; i < n; i++) {
// 		if (arr1[i] !== arr2[i]) {
// 			console.log('arrays are NOT equal');
// 			return;
// 		}
// 	}
// 	console.log('arrays ARE equal');
// }


function playSequence(scalar, timeout) {
	return setTimeout(() => {
		playSound(sequence[scalar - 1])
	}, scalar * timeout);
}

// const timeouts = [];

function gameOn(color) {
	p.innerText = `${level}, ${counter}`;
	console.log(level, counter);
	if (color === sequence[counter]) {
		playSound(color);
		counter++;
		p.innerText = `${level}, ${counter}`;
		console.log(level, counter);
		if (counter === level) {
			level++;
			counter = 0;
			p.innerText = `${level}, ${counter}`;
			console.log(level, counter);
			for (let i = 1; i <= level; i++) {
				playSequence(i,600);
			}

			// Outer setTimeout to delay start of next sequence for a bit longer than the regular time between sequence sounds (avoid user confusion)
			// setTimeout(() => {
			// 	for (let i = 1; i <= level; i++) {
			// 		timeouts.push(playSequence(i,600));
			// 	}
			// }, 1000);
		}
	} else {
		errSound.play();
		startGameBtn.disabled = false;
		// p.classList.remove('transparent')
		p.classList.add('grayed-out')
		isGameInProgress = false;
		counter = 0;
		// for (let timeout of timeouts) {
		// 	clearTimeout(timeout);
		// }
		p.innerText = `${level}, ${counter}`;
		console.log(level, counter);
	}
}
	
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
	}
}
