// Preloader handling: Hides the preloader after page load
window.addEventListener('load', () => {
	const loader = document.getElementById('loader');
	loader.classList.add('hidden');
	// Remove preloader from DOM after transition
	setTimeout(() => {
			loader.style.display = 'none';
	}, 500); // Matches CSS transition duration
});

// Hero section animation: Animates laser, background clip-path, and content opacity
function animate() {
	const laser = document.querySelector('.laser');
	const content = document.querySelector('.hero-section .content');
	const secondBackground = document.querySelector('.background-layer-2');
	const heroSection = document.querySelector('.hero-section');
	const heroSectionHeight = heroSection.offsetHeight;

	function updateAnimation(scrollPosition) {
			// Calculate laser position as a percentage
			const laserPosition = Math.max(100 - (scrollPosition / heroSectionHeight) * 100, 0);
			laser.style.top = `${laserPosition}%`;
			secondBackground.style.clipPath = `inset(${laserPosition}% 0 0 0)`;
			// Show content when laser is past halfway
			content.style.opacity = laserPosition < 50 ? '1' : '0';
	}

	// Update animation based on scroll position
	window.addEventListener('scroll', () => {
			updateAnimation(window.scrollY);
	});

	// Continue animation loop
	requestAnimationFrame(animate);
}

// Parallax and footer visibility with Intersection Observer
function setupParallax() {
	const windowHeight = window.innerHeight;
	const footer = document.querySelector('footer');
	const footerHeight = footer.offsetHeight;
	const content = document.querySelector('.main-content');
	const heightDocument = windowHeight + content.offsetHeight + footerHeight - 20;

	// Set up parallax elements
	const scrollAnimate = document.getElementById('scroll-animate');
	const scrollAnimateMain = document.getElementById('scroll-animate-main');
	const header = document.querySelector('header');
	const wrapperParallax = document.querySelector('.wrapper-parallax');

	// Configure element heights
	scrollAnimate.style.height = `${heightDocument}px`;
	scrollAnimateMain.style.height = `${heightDocument}px`;
	header.style.height = `${windowHeight}px`;
	header.style.lineHeight = `${windowHeight}px`;
	wrapperParallax.style.marginTop = `${windowHeight}px`;

	// Function to update footer position
	function updateFooter(scrollY) {
			footer.style.bottom = scrollY >= footerHeight ? '0px' : `-${footerHeight}px`;
	}

	// Intersection Observer for parallax effect
	const heroSection = document.querySelector('.hero-section');
	const heroSectionHeight = heroSection.offsetHeight;
	const maxScroll = heightDocument - windowHeight;

	const observer = new IntersectionObserver(
			(entries, observer) => {
					entries.forEach((entry) => {
							const scrollY = window.scrollY;
							const laserPosition = Math.max(100 - (scrollY / heroSectionHeight) * 100, 0);

							// Handle scroll-animate-main movement for main content scrolling
							if (laserPosition > 0) {
									scrollAnimateMain.style.top = `0px`; // Fix position during laser animation
							} else {
									// Calculate scroll after hero section for smooth content scrolling
									const remainingScroll = scrollY - heroSectionHeight;
									const remainingDocumentHeight = heightDocument - heroSectionHeight - windowHeight;
									const scrollFraction = remainingScroll / remainingDocumentHeight;
									const adjustedScroll = scrollFraction * maxScroll;
									scrollAnimateMain.style.top = `-${Math.min(adjustedScroll, maxScroll)}px`;
							}

							// Update header background position for parallax
							header.style.backgroundPositionY = `${50 - (scrollY * 100 / heightDocument)}%`;

							// Update footer position
							updateFooter(scrollY);
					});
			},
			{
					root: null,
					threshold: Array.from({ length: 101 }, (_, i) => i / 100), // Fine-grained thresholds for smooth updates
					rootMargin: `0px 0px -${windowHeight}px 0px`
			}
	);

	// Observe the entire document wrapper for continuous scroll updates
	observer.observe(wrapperParallax);

	// Initial footer position
	updateFooter(window.scrollY);
}

// Initialize animations and parallax on load
window.addEventListener('load', () => {
	setupParallax();
	requestAnimationFrame(animate);
});