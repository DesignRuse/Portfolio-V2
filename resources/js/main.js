/*----------------------------------------------------------------------------*/
/*------------- Code for Contact Section -------------------------------------*/
/*----------------------------------------------------------------------------*/

var contactModal = document.getElementById('contactSection');

var contactModalOpenBtn = document.getElementById('exposeContactBtn');

var contactModalCloseBtn = document.getElementById('concealContactBtn');

contactModalOpenBtn.addEventListener('click', exposeContactModal);

function exposeContactModal() {
	contactModal.style.display = 'block';
}

contactModalCloseBtn.addEventListener('click', concealContactModal);

function concealContactModal() {
	contactModal.style.display = 'none';
}

/*----------------------------------------------------------------------------*/
/*------------- Code for Contact Section -------------------------------------*/
/*----------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------*/
/*------------- Code for Portfolio Section -----------------------------------*/
/*----------------------------------------------------------------------------*/

var portfolioModal = document.getElementById('portfolioSection');

var portfolioModalOpenBtn = document.getElementById('exposePortfolioBtn');

var portfolioModalCloseBtn = document.getElementById('concealPortfolioBtn');

portfolioModalOpenBtn.addEventListener('click', exposePortfolioModal);

function exposePortfolioModal() {
	portfolioModal.style.display = 'block';
}

portfolioModalCloseBtn.addEventListener('click', concealPortfolioModal);

function concealPortfolioModal() {
	portfolioModal.style.display = 'none';
}

/*----------------------------------------------------------------------------*/
/*------------- Code for Portfolio Section -----------------------------------*/
/*----------------------------------------------------------------------------*/