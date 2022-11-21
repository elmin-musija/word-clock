const outputGrid = document.querySelector(`.grid`);
let outputGridElement = 0;
let initialTimeIsSet = false;
let currentTime = [{ hours: 0, minutes: 0, seconds: 0 }];

const fieldArray = `ESPISTXFÜNFZWANZIGZEHNDREIVIERTELQVORSNACHTKHALBELFÜNFPUZWEIBEINSLDREIAWEVIERSECHSKUACHTZWÖLFSIEBENZEHNEUNCUHR`;
const timeObjectHours = [
	{
		timeInt: 0,
		timeString: `ZWÖLF`,
	},
	{
		timeInt: 1,
		timeString: `EINS`,
	},
	{
		timeInt: 2,
		timeString: `ZWEI`,
	},
	{
		timeInt: 3,
		timeString: `DREI`,
	},
	{
		timeInt: 4,
		timeString: `VIER`,
	},
	{
		timeInt: 5,
		timeString: `FÜNF`,
	},
	{
		timeInt: 6,
		timeString: `SECHS`,
	},
	{
		timeInt: 7,
		timeString: `SIEBEN`,
	},
	{
		timeInt: 8,
		timeString: `ACHT`,
	},
	{
		timeInt: 9,
		timeString: `NEUN`,
	},
	{
		timeInt: 10,
		timeString: `ZEHN`,
	},
	{
		timeInt: 11,
		timeString: `ELF`,
	},
	{
		timeInt: 12,
		timeString: `ZWÖLF`,
	},
];
const timeObjectMinutes = [
	//
	{
		timeInt: 5,
		timeString: `FÜNF NACH`,
	},
	{
		timeInt: 10,
		timeString: `ZEHN NACH`,
	},
	{
		timeInt: 15,
		timeString: `VIERTEL NACH`,
	},
	{
		timeInt: 20,
		timeString: `ZWANZIG NACH`,
	},
	{
		timeInt: 25,
		timeString: `FÜNF VOR HALB`,
	},
	{
		timeInt: 30,
		timeString: `HALB`,
	},
	{
		timeInt: 35,
		timeString: `FÜNF NACH HALB`,
	},
	{
		timeInt: 45,
		timeString: `VIERTEL VOR`,
	},
	{
		timeInt: 40,
		timeString: `ZWANZIG VOR`,
	},
	{
		timeInt: 50,
		timeString: `ZEHN VOR`,
	},
	{
		timeInt: 55,
		timeString: `FÜNF VOR`,
	},
];
const createGrid = () => {
	for (let element in fieldArray) {
		let p = document.createElement(`p`);
		p.textContent = fieldArray[element];
		outputGrid.appendChild(p);
	}
	outputGridElement = document.getElementsByTagName(`p`);
};
const getCurrentTime = () => {
	let tmp = new Date();
	currentTime.hours = tmp.getHours() % 12;
	currentTime.minutes = tmp.getMinutes();
	currentTime.seconds = tmp.getSeconds();
};
const getTimeStringMinutes = () => {
	for (let element of timeObjectMinutes) {
		if (element.timeInt === currentTime.minutes) {
			return element.timeString;
		}
	}
};
const getTimeStringHours = (paramOffset = 0) => {
	for (let element of timeObjectHours) {
		if (element.timeInt === currentTime.hours + paramOffset) {
			return element.timeString;
		}
	}
};
const removeHighlight = () => {
	for (let element of outputGridElement) {
		element.classList.remove(`highlight`);
	}
};
const setInitialTime = () => {
	if (initialTimeIsSet === false) {
		currentTime.seconds = 0;
		currentTime.minutes -= currentTime.minutes % 5;
		initialTimeIsSet = true;
	}
};
const getOutputArrayHoursMinutes = (paramOffset = 0) => {
	let tmpString = ``;
	tmpString += `ES IST `;
	tmpString += getTimeStringMinutes();
	tmpString += ` `;
	tmpString += getTimeStringHours(paramOffset);
	return [...tmpString.split(` `)];
};
const getOutputArrayFullHours = (paramOffset = 0) => {
	let tmpString = ``;
	tmpString += `ES IST `;
	tmpString += getTimeStringHours(paramOffset);
	tmpString += ` UHR`;
	return [...tmpString.replace(`EINS`, `EIN`).split(` `)];
};

const fitIntoWindow = (event) => {
	for (let element of outputGridElement) {
		if (window.innerWidth > window.innerHeight) {
			element.style.width = `${Math.floor(window.innerHeight / 12)}px`;
			element.style.height = `${Math.floor(window.innerHeight / 12)}px`;
			element.style.fontSize = `${Math.floor(
				(window.innerHeight / 100.0) * 4
			)}px`;
		} else {
			element.style.width = `${Math.floor(window.innerWidth / 12)}px`;
			element.style.height = `${Math.floor(window.innerWidth / 12)}px`;
			element.style.fontSize = `${Math.floor(
				(window.innerWidth / 100.0) * 4
			)}px`;
		}
	}
};

const checkTime = () => {
	let outputTimeArray = [];
	getCurrentTime();
	setInitialTime();
	if (currentTime.seconds === 0) {
		if (currentTime.minutes === 0) {
			outputTimeArray = getOutputArrayFullHours();
		} else if (currentTime.minutes % 5 === 0) {
			if (currentTime.minutes < 30) {
				outputTimeArray = getOutputArrayHoursMinutes(0);
			} else {
				outputTimeArray = getOutputArrayHoursMinutes(1);
			}
		}
		if (outputTimeArray.length > 0) {
			removeHighlight();
			outputTimeArray.forEach((element, index) => {
				let startPosition = 0;
				if (index === outputTimeArray.length - 1 || currentTime.minutes === 0) {
					startPosition = fieldArray.lastIndexOf(element);
				} else if (index !== outputTimeArray.length - 1) {
					startPosition = fieldArray.indexOf(element);
				}
				for (let i = startPosition; i < startPosition + element.length; i++) {
					outputGridElement[i].classList.add(`highlight`);
				}
			});
		}
	}
};

window.addEventListener(`load`, fitIntoWindow);
window.addEventListener(`resize`, fitIntoWindow);
createGrid();
setInterval(checkTime, 1000);
