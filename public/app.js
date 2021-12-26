'strict  mode';

const form = document.getElementsByClassName('form')[0];
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmationPassword = document.getElementById('confirmation-password');

// function showError(input, message) {
//     const formControl = input.parentElement;
// 	formControl.classList.add('error');
// 	formControl.classList.remove('success');
// 	formControl.lastChild.textContent = message;
//     console.log('show error');
// }

function getName(input) {
	let name = input.id.trim();
	name = name.split('-').join(' ');
	name = name.charAt(0).toUpperCase() + name.slice(1);
	return name;
}

function showError(inputElement, message) {
	const formControl = inputElement.parentElement;
	formControl.classList.add('error');
	formControl.classList.remove('success');
	formControl.querySelector('em').innerText = message;
}

function showSuccess(inputElement) {
	const formControl = inputElement.parentElement;
	formControl.classList.add('success');
	formControl.classList.remove('error');
}

function checkRequired(inputArr) {
	inputArr.forEach(function (input) {
		if (input.value.trim() === '') {
			showError(input, `${getName(input)} cannot be empty`);
		} else {
			showSuccess(input);
		}
	});
}

function checkEmail(input) {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Looks like this is not an email');
	}
}

const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${getName(input)} must be at least ${min} characters`
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getInputName(input)} must be less than ${max} characters`
		);
	}
};

function checkPassword(password, confirmationPassword) {
	if (password.value !== confirmationPassword.value) {
		showError(confirmationPassword, 'Passwords do not match');
	} else if (password.value === confirmationPassword.value) {
		showSuccess(confirmationPassword);
	}
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	checkRequired([firstName, lastName, email, password, confirmationPassword]);
	checkLength(password, 3, 15);
	checkEmail(email);
	checkPassword(password, confirmationPassword);
});
