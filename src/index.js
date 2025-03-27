import "./style.css";
import dotFilled from "./icons/dot-filled.svg";
import dotEmpty from "./icons/dot.svg";

const enableDropdowns = function DropdownFunctionality() {
	const dropdownDivs = document.querySelectorAll(".dropdown");

	dropdownDivs.forEach((div) => {
		const dropdownButton = div.querySelector("button");
		dropdownButton.addEventListener("click", (e) => {
			const content = e.target.parentNode.querySelector(".dropdown-content");

			if (content.classList.contains("hidden")) {
				content.classList.remove("hidden");
			} else {
				content.classList.add("hidden");
			}
		});

		const dropdownItems = div.querySelectorAll(".dropdown-item");
		dropdownItems.forEach((item) => {
			item.addEventListener("click", (e) => {
				e.target.closest(".dropdown").id = e.target.id;
				e.target.parentNode.classList.add("hidden");
			});
		});
	});
};

const enableCarousels = function CarouselFunctionality() {
	const carouselDivs = document.querySelectorAll(".carousel");

	carouselDivs.forEach((div) => {
		const nextSlideButton = div.querySelector(".arrow-next");
		const previousSlideButton = div.querySelector(".arrow-previous");
		const navDots = div.querySelectorAll(".dot");

		nextSlideButton.addEventListener("click", (e) => {
			const carousel = e.target.closest(".carousel");
			const slidesMaxLength = carousel.querySelectorAll(".slide").length;
			const currentSlide = parseInt(e.target.parentNode.dataset.slideNum);

			let nextSlide;
			if (currentSlide < slidesMaxLength) {
				nextSlide = currentSlide + 1;
			} else {
				nextSlide = 1;
			}

			changeSlide(carousel, nextSlide);
			resetInterval();
		});
		previousSlideButton.addEventListener("click", (e) => {
			const carousel = e.target.closest(".carousel");
			const slidesMaxLength = carousel.querySelectorAll(".slide").length;
			const currentSlide = parseInt(e.target.parentNode.dataset.slideNum);

			let nextSlide;
			if (currentSlide > 1) {
				nextSlide = currentSlide - 1;
			} else {
				nextSlide = slidesMaxLength;
			}

			changeSlide(carousel, nextSlide);
			resetInterval();
		});

		navDots.forEach((dot) => {
			dot.addEventListener("click", (e) => {
				const nextSlide = parseInt(e.target.dataset.num);
				changeSlide(e.target.closest(".carousel"), nextSlide);
				resetInterval();
			});
		});

		const slidesMaxLength = div.querySelectorAll(".slide").length;

		let slideInterval = setInterval(() => {
			let currentSlide = parseInt(div.dataset.slideNum);
			let nextSlide;
			if (currentSlide < slidesMaxLength) {
				nextSlide = currentSlide + 1;
			} else {
				nextSlide = 1;
			}
			changeSlide(div, nextSlide);
		}, 5000);

		const resetInterval = () => {
			clearInterval(slideInterval);
			slideInterval = setInterval(() => {
				let currentSlide = parseInt(div.dataset.slideNum);
				let nextSlide;
				if (currentSlide < slidesMaxLength) {
					nextSlide = currentSlide + 1;
				} else {
					nextSlide = 1;
				}
				changeSlide(div, nextSlide);
			}, 5000);
		};
	});
};

const changeSlide = function ChangeSlide(carousel, nextSlide) {
	const currentSlide = parseInt(carousel.dataset.slideNum);
	carousel.dataset.slideNum = nextSlide;
	carousel.querySelector(".frame").style.transform =
		"translateX(" + -(nextSlide - 1) * 100 + "%)";

	const navDots = carousel.querySelector(".nav-dots").children;
	navDots[currentSlide - 1].querySelector("img").src = dotEmpty;
	navDots[nextSlide - 1].querySelector("img").src = dotFilled;
};

enableDropdowns();
enableCarousels();
