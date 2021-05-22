const green = new Audio('./Sound1.mp3');
const red = new Audio('./Sound2.mp3');
const yellow = new Audio('./Sound3.mp3');
const blue = new Audio('./Sound4.mp3');
const errSound = new Audio('./error.wav');
const winSound = new Audio('./win.mp3');
winSound.volume = 0.5;
const colors = ['green', 'red', 'yellow', 'blue'];
const btns = document.querySelectorAll('.btn');
const startGameBtn = document.querySelector('button');
const sequence = [];
const timeouts = [];
const p = document.querySelector('p');
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
	// isFirstLoad = false;
	startGameBtn.disabled = true;
	p.classList.remove('grayed-out');
	p.classList.remove('transparent');
	p.innerText = level;

	// Reset and populate the sequence array
	sequence.length = 0;
	for (let i = 1; i <= 10; i++) {
		sequence.push(colors[Math.floor(Math.random() * colors.length)]);
	}

	// Play first sound
	setTimeout(() => {
		playSound(sequence[0]);
	}, 450);
}

function playSequence(scalar, timeout) {
	// Store timeouts in an array for easy clearing
	timeouts.push(setTimeout(() => {
		playSound(sequence[scalar - 1])
	}, scalar * timeout));
}


function gameOn(color) {
	p.classList.remove('transparent');
	p.innerText = level;
	if (color === sequence[counter]) {
		playSound(color);
		counter++;
		if (counter === level) {
			if (level === 5) {	// Winning game condition
				winSound.play();
				gameOver();
			} else {
				level++;
				counter = 0;
				p.innerText = level;
	
				// Outer setTimeout to add a little bit more delay at the start of the next sequence of sounds (to avoid user confusion)
				setTimeout(() => {
					for (let i = 1; i <= level; i++) {
						playSequence(i, 500);
					}
				}, 450);
			}
		}
	} else {
		errSound.play();
		gameOver();
	}
}


// function gameOn(color) {
// 	p.classList.remove('transparent');
// 	p.innerText = level;
// 	console.log(level);
// 	if (level === 3) {
// 		winSound.play();
// 		gameOver();
// 		console.log(level);
// 	} else if (color === sequence[counter]) {
// 		console.log(level);
// 		playSound(color);
// 		counter++;
// 		if (counter === level) {
// 			level++;
// 			console.log(level);
// 			counter = 0;
// 			p.innerText = level;

// 			// Outer setTimeout to add a little bit more delay at the start of the next sequence of sounds (to avoid user confusion)
// 			setTimeout(() => {
// 				for (let i = 1; i <= level; i++) {
// 					playSequence(i, 500);
// 				}
// 			}, 450);
// 		}
// 	} else {
// 		errSound.play();
// 		gameOver();
// 		console.log(level);
// 	}
// }
































function gameOver() {
	startGameBtn.disabled = false;
	startGameBtn.disabled = false;
	p.classList.remove('transparent')
	p.classList.add('grayed-out')
	isGameInProgress = false;
	counter = 0;
	for (let timeout of timeouts) {
		clearTimeout(timeout);
	}
	p.innerText = level;
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
























// let isFirstLoad = true;


// const randHighlight = setInterval(() => {
// 	let i = Math.floor(Math.random() * colors.length);
// 	setTimeout(() => {
// 		btns[i].classList.toggle('pressed');
// 	}, 800);
// 	btns[i].classList.toggle('pressed');
// }, 800);

// for (let btn of btns) {
// 	Math.floor(Math.random() * colors.length)
// }

// for (let i = 1; i <= 10; i++) {
// 	sequence.push(colors[Math.floor(Math.random() * colors.length)]);
// }


// const conf = document.querySelector('#conf');
// const body = document.querySelector('body');


// conf.addEventListener('click', () => {
// 	window.confetti({particleCount: 400, spread: 120, origin: {y: 1}});
// })