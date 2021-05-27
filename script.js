const green = new Audio('./Sound1.mp3');
const red = new Audio('./Sound2.mp3');
const yellow = new Audio('./Sound3.mp3');
const blue = new Audio('./Sound4.mp3');
const errSound = new Audio('./error.wav');
const winSound = new Audio('./win.mp3');
const btns = document.querySelectorAll('.btn');
const startGameBtn = document.querySelector('button');
const p = document.querySelector('p');
const colors = ['green', 'red', 'yellow', 'blue'];
const sequence = [];
const timeouts = [];
let isGameInProgress = false;
let hasWon = false;
let counter = 0; 
let level = 1;

startGameBtn.addEventListener('click', () => startGame())

for (let btn of btns) {
	btn.addEventListener('click', (evt) => {
		if (isGameInProgress) {
			gameOn(evt.currentTarget.id);
		} else {
			playSound(evt.currentTarget.id);
			animateBtn(evt.currentTarget.id);
		}
	});
}

function startGame() {
	// Initialize
	level = 1;
	isGameInProgress = true;
	startGameBtn.disabled = true;
	p.classList.remove('grayed-out');
	p.classList.remove('transparent');
	p.innerText = `Level ${level} of 10`;

	// Reset and populate the sequence array
	sequence.length = 0;
	for (let i = 1; i <= 10; i++) {
		sequence.push(colors[Math.floor(Math.random() * colors.length)]);
	}

	// Play first sound
	setTimeout(() => {
		playSound(sequence[0]);
		animateBtn(sequence[0]);
	}, 450);
}

function playSequence(scalar, timeout) {
	// Store timeouts in an array for easy clearing
	timeouts.push(setTimeout(() => {
		playSound(sequence[scalar - 1]);
		animateBtn(sequence[scalar - 1]);
	}, scalar * timeout));
}

function gameOn(color) {
	p.classList.remove('transparent');
	p.innerText = `Level ${level} of 10`;
	if (color === sequence[counter]) {
		playSound(color);
		animateBtn(color);
		counter++;
		if (counter === level) {
			if (level === 10) {		// Winning game condition
				hasWon = true;
				animateBtn(color);
				playSound('win');
				gameOver();
			} else {
				level++;
				counter = 0;
				
				// Outer setTimeout to add a little bit more delay at the start of the next sequence of sounds (to avoid user confusion)
				setTimeout(() => {
					p.innerText = `Level ${level} of 10`;
					for (let i = 1; i <= level; i++) {
						playSequence(i, 500);
					}
				}, 450);
			}
		}
	} else {
		animateBtn(color);
		playSound('error');
		gameOver();
	}
}

function gameOver() {

	if (hasWon) {
		throwConfetti();
		p.innerText = 'You win!';
		hasWon = false;
	} else {
		p.innerText = `Level ${level} of 10`;
		p.classList.add('grayed-out')
	}
	for (let timeout of timeouts) {
		clearTimeout(timeout);
	}
	startGameBtn.disabled = false;
	isGameInProgress = false;
	counter = 0;
}

function throwConfetti() {

	const duration = 2000
	const endTime = Date.now() + duration;

	const interval = setInterval(() => {

		window.confetti({
			particleCount: 15,
			angle: 60,
			spread: 50,
			origin: { x: 0 }
		});
	
		window.confetti({
			particleCount: 15,
			angle: 120,
			spread: 50,
			origin: { x: 1 }
		});

		if (Date.now() >= endTime) clearInterval(interval);

	}, 100);

}

function playSound(str) {
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

		case 'win': {
			winSound.volume = 0.1;
			winSound.play();
			break;
		}

		case 'error': {
			errSound.play();
			break;
		}
	}
}

function animateBtn(id) {
	let btn = document.querySelector(`#${id}`);
	btn.classList.add('pressed');
	setTimeout(() => btn.classList.remove('pressed'), 150);
}
