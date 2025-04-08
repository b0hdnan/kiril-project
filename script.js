function scrollFooter(scrollY, heightFooter) {
	console.log(scrollY);
	console.log(heightFooter);

	const footer = document.querySelector('footer');

	if (scrollY >= heightFooter) {
			footer.style.bottom = '0px';
	} else {
			footer.style.bottom = `-${heightFooter}px`;
	}
}

window.addEventListener('load', function() {
	const windowHeight = window.innerHeight;
	const footer = document.querySelector('footer');
	const footerHeight = footer.offsetHeight;
	const content = document.querySelector('.content');
	const heightDocument = windowHeight + content.offsetHeight + footerHeight - 20;

	// Definindo o tamanho do elemento pra animar
	const scrollAnimate = document.getElementById('scroll-animate');
	const scrollAnimateMain = document.getElementById('scroll-animate-main');
	scrollAnimate.style.height = `${heightDocument}px`;
	scrollAnimateMain.style.height = `${heightDocument}px`;

	// Definindo o tamanho dos elementos header e conteúdo
	const header = document.querySelector('header');
	header.style.height = `${windowHeight}px`;
	header.style.lineHeight = `${windowHeight}px`;

	const wrapperParallax = document.querySelector('.wrapper-parallax');
	wrapperParallax.style.marginTop = `${windowHeight}px`;

	scrollFooter(window.scrollY, footerHeight);

	// ao dar rolagem
	window.onscroll = function() {
			const scroll = window.scrollY;

			scrollAnimateMain.style.top = `-${scroll}px`;

			header.style.backgroundPositionY = `${50 - (scroll * 100 / heightDocument)}%`;

			scrollFooter(scroll, footerHeight);
	};
});



