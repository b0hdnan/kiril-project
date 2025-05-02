function scrollFooter(scrollY, heightFooter, contentHeight, windowHeight) {
    const footer = document.querySelector('footer');
    const threshold = contentHeight + windowHeight - heightFooter; // Точка, де футер з’являється

    if (scrollY >= threshold) {
        footer.style.bottom = '0px';
    } else {
        footer.style.bottom = `-${heightFooter}px`;
    }
}

window.addEventListener('load', function() {
    const windowHeight = window.innerHeight;
    const footer = document.querySelector('footer');
    const footerHeight = footer.offsetHeight;
    const content = document.querySelector('.site-content');
    const contentHeight = content.offsetHeight;
    const heightDocument = windowHeight + contentHeight + footerHeight - 20;

    const scrollAnimate = document.getElementById('scroll-animate');
    const scrollAnimateMain = document.getElementById('scroll-animate-main');
    scrollAnimate.style.height = `${heightDocument}px`;
    scrollAnimateMain.style.height = `${heightDocument}px`;

    const header = document.querySelector('header');
    header.style.height = `${windowHeight}px`;
    header.style.lineHeight = `${windowHeight}px`;

    const wrapperParallax = document.querySelector('.wrapper-parallax');
    wrapperParallax.style.marginTop = `${windowHeight}px`;

    scrollFooter(window.scrollY, footerHeight, contentHeight, windowHeight);

    window.onscroll = function() {
        const scroll = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        const heroSectionHeight = heroSection.offsetHeight;

        const laserPosition = Math.max(100 - (scroll / heroSectionHeight) * 100, 0);

        const maxScroll = heightDocument - windowHeight;

        if (laserPosition > 0) {
            scrollAnimateMain.style.top = `0px`;
        } else {
            const remainingScroll = scroll - heroSectionHeight;
            const remainingDocumentHeight = heightDocument - heroSectionHeight - windowHeight;
            const scrollFraction = remainingScroll / remainingDocumentHeight;
            const adjustedScroll = scrollFraction * maxScroll;
            scrollAnimateMain.style.top = `-${Math.min(adjustedScroll, maxScroll)}px`;
        }

        header.style.backgroundPositionY = `${50 - (scroll * 100 / heightDocument)}%`;

        scrollFooter(scroll, footerHeight, contentHeight, windowHeight);
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
	}

	// Продовжуємо анімацію
	requestAnimationFrame(animate);
}

// Запускаємо анімацію
requestAnimationFrame(animate);


let scrollTimeout;

window.addEventListener('scroll', () => {
  // Додаємо клас "scrolling" до body під час прокрутки
  document.body.classList.add('scrolling');

  // Видаляємо клас після завершення прокрутки
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    document.body.classList.remove('scrolling');
  }, 150); // Затримка 150 мс
});



// toggle menu
const menuToggle = document.querySelector('.menu-toggle');
const navbarCollapse = document.querySelector('#navbarSupportedContent');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navbarCollapse.classList.toggle('show'); // Або інший клас, який використовує Bootstrap для відображення меню
});


// loader
document.addEventListener("DOMContentLoaded", function() {
  const loader = document.querySelector(".loader");

  // Показати лоадер при завантаженні сторінки
  loader.style.display = "block";

  // Сховати лоадер після завершення завантаження
  window.addEventListener("load", function() {
    loader.style.display = "none";
  });

  // Показати лоадер при асинхронних запитах (приклад)
  document.addEventListener("ajaxStart", function() {
    loader.style.display = "block";
  });

  document.addEventListener("ajaxComplete", function() {
    loader.style.display = "none";
  });
});