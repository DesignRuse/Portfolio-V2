window.addEventListener('DOMContentLoaded', function () {

	var contactForm = document.getElementById('contact-form');
	var memoModal = document.getElementById('memo-modal');
	var memo = document.getElementById('memo');
	var memoText = document.getElementById('memo-text');

	// Success and Error functions for after the form is submitted
	function success(form) {
		form.reset();
		memo.classList.add('success');
		memoText.innerHTML = 'Thanks!<br /> Your message has been sent.';
		memoModal.style.opacity = '1';
		memoModal.style.display = 'block';
		setTimeout(function () {
			memoModal.style.opacity = '0';
			memoModal.style.display = 'none';
			memo.classList.remove('success');
			memoText.innerHTML = '';
		}, 4000);
	}

	function error() {
		memo.classList.add('error');
		memoText.innerHTML = 'Oops!<br /> There was a problem.';
		memoModal.style.opacity = '1';
		memoModal.style.display = 'block';
		setTimeout(function () {
			memoModal.style.opacity = '0';
			memoModal.style.display = 'none';
			memo.classList.remove('error');
			memoText.innerHTML = '';
		}, 4000);
	}

	// Handles the button click event and the subsequent form submission event
	contactForm.getElementsByTagName('button')[0].addEventListener('click', function (ev) {
		ev.preventDefault();
		var data = new FormData(contactForm);
		// // Submits form data to a Google Spreadsheet
		// if (contactForm == document.forms[1]) {
		// 	var scriptURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdNo8tURNDtQ-rbsIdvxIOKXGeZFtQmSXFQ0NNJ8W8QyXGa3w/formResponse?';
		// 	fetch(scriptURL, {
		// 			method: 'POST',
		// 			mode: 'no-cors',
		// 			cache: 'no-cache',
		// 			credentials: 'omit',
		// 			headers: {
		// 				'Content-Type': 'application/json'
		// 			},
		// 			redirect: 'follow',
		// 			body: data
		// 		})
		// 		.then(response => console.log('Success!', response))
		// 		.catch(error => console.error('Error!', error.message));
		// }
		ajax(contactForm.method, contactForm.action, data, contactForm, success, error);
	});
});

// helper function for sending an AJAX request
function ajax(method, url, data, form, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.open(method, url);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE) return;
		if (xhr.status === 200) {
			success(form);
		} else {
			error();
		}
	};
	xhr.send(data);
}
