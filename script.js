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
	const content = document.querySelector('.site-content'); // Змінюємо на .site-content
	const heightDocument = windowHeight + content.offsetHeight + footerHeight - 20;

	console.log('windowHeight:', windowHeight);
	console.log('content.offsetHeight:', content.offsetHeight);
	console.log('footerHeight:', footerHeight);
	console.log('heightDocument:', heightDocument);

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
			const heroSection = document.querySelector('.hero-section');
			const heroSectionHeight = heroSection.offsetHeight;

			// Розраховуємо позицію лазера
			const laserPosition = Math.max(100 - (scroll / heroSectionHeight) * 100, 0);

			// Обчислюємо максимальну прокрутку
			const maxScroll = heightDocument - windowHeight;

			// Затримуємо рух #scroll-animate-main, поки лазер не досягне top: 0%
			if (laserPosition > 0) {
					scrollAnimateMain.style.top = `0px`; // Фіксуємо на місці
			} else {
					// Після того, як лазер досяг top: 0%, дозволяємо прокрутку до кінця
					const remainingScroll = scroll - heroSectionHeight; // Скільки прокрутили після heroSection
					const remainingDocumentHeight = heightDocument - heroSectionHeight - windowHeight; // Загальна висота після heroSection
					const scrollFraction = remainingScroll / remainingDocumentHeight; // Частка прокрутки
					const adjustedScroll = scrollFraction * maxScroll; // Масштабуємо рух

					// Обмежуємо рух, щоб не перевищити максимальну прокрутку
					scrollAnimateMain.style.top = `-${Math.min(adjustedScroll, maxScroll)}px`;
			}

			header.style.backgroundPositionY = `${50 - (scroll * 100 / heightDocument)}%`;

			scrollFooter(scroll, footerHeight);
	};
});

function animate() {
	const laser = document.querySelector('.laser');
	const content = document.querySelector('.hero-section .content'); // Уточнюємо, що це .content всередині .hero-section
	const secondBackground = document.querySelector('.background-layer-2');
	const scrollPosition = window.scrollY;
	const heroSection = document.querySelector('.hero-section');
	const heroSectionHeight = heroSection.offsetHeight;

	// Розраховуємо позицію лазера
	const laserPosition = Math.max(100 - (scrollPosition / heroSectionHeight) * 100, 0);

	// Оновлюємо позицію лазера
	laser.style.top = `${laserPosition}%`;

	// Синхронно оновлюємо clip-path другого фону
	secondBackground.style.clipPath = `inset(${laserPosition}% 0 0 0)`;

	// Показуємо контент, коли лазер доходить до середини
	if (laserPosition < 50) {
			content.style.opacity = '1';
	} else {
			content.style.opacity = '0';
	}

	// Продовжуємо анімацію
	requestAnimationFrame(animate);
}

// Запускаємо анімацію
requestAnimationFrame(animate);