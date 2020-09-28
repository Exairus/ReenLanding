window.addEventListener("DOMContentLoaded", () => {

    // dropdown

    function dropDown() {
        const megaBtn = document.querySelector(".mega-menu-btn");
        const dropMenu = document.querySelector(".nav-dropdown");

        megaBtn.addEventListener("click", () => {
            dropMenu.classList.toggle("active");
        });
    }

    dropDown();

    // intro slider

    function sliderSettings(contSel, arrowPrevSel, arrowNextSel, sliderSel, slidesSel) {
        const sliderContainer = document.querySelector(contSel),
              arrowPrev = document.querySelector(arrowPrevSel),
              arrowNext = document.querySelector(arrowNextSel),
              slider = document.querySelector(sliderSel),
              slides = document.querySelectorAll(slidesSel);

        let counter = 1;

        let width = slides[0].offsetWidth;
         
        slider.style.transform = `translateX(${-width * counter}px)`;

        slides.forEach(slide => {
            slide.style.width = width;
        });

        // creating indicators
        function creatingIndicators(slides, sliderContainer) {
            const indicators = document.createElement("ol");
            indicators.classList.add("intro-carousel-indicators");
            sliderContainer.prepend(indicators);

            const dots = [];

            for (let i = 0; i < slides.length - 2; i++) {
                const dot = document.createElement("li");
                dot.classList.add("intro-carousel-indicators-dot");
                dot.setAttribute('data-slide-to', i + 1);
                if (i == 0) {
                    dot.classList.add("active");
                }
                indicators.append(dot);
                dots.push(dot);
            }

            return dots;
        }

        let sliderDots = creatingIndicators(slides, sliderContainer);

        function nextDot(sliderDots, slides) {
            sliderDots.forEach(dot => {
                dot.classList.remove("active");
            });

            if(counter < slides.length - 1) {
                sliderDots[counter - 1].classList.add("active");
            }
        }

        function prevDot(sliderDots) {
            sliderDots.forEach(dot => {
                dot.classList.remove("active");
            });

            if (counter > 0) {
                sliderDots[counter - 1].classList.add("active");
            }
        }

        function removeAddActiveDot(dots) {
            dots.forEach(dot => {
                dot.classList.remove("active");
            });
            dots[counter - 1].classList.add("active");
        }

        function dotSliderTranslate(slider, event) {
            const slideTo = event.target.getAttribute("data-slide-to");
            counter = slideTo;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-width * counter}px)`;
        }
        

        arrowNext.addEventListener("click", () => {
            if(counter >= slides.length - 1) return;
            counter++;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-width * counter}px)`;

            nextDot(sliderDots, slides);
        });

        arrowPrev.addEventListener("click", () => {
            if(counter <= 0) return;
            counter--;
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-width * counter}px)`;

            prevDot(sliderDots, counter);
            
        });

        slider.addEventListener("transitionend", () => {
            if(slides[counter].id === "lastClone") {
                slider.style.transition = 'none';
                counter = slides.length - 2;
                sliderDots[counter - 1].classList.add("active");
                slider.style.transform = `translateX(${-width * counter}px)`;
                
            }
            if(slides[counter].id === "firstClone") {
                slider.style.transition = 'none';
                counter = slides.length - counter;
                sliderDots[counter - 1].classList.add("active");
                slider.style.transform = `translateX(${-width * counter}px)`;
            }
        });

        sliderDots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                dotSliderTranslate(slider, e);
                removeAddActiveDot(sliderDots);       
            });
        });
    }

    sliderSettings(".intro-carousel-container",
                ".intro-carousel-container .fas.fa-arrow-left",
                ".intro-carousel-container .fas.fa-arrow-right",
                ".intro-carousel-slides",
                ".intro-carousel-slide");

    sliderSettings(".works-carousel-wrapper",
    ".works-carousel-wrapper .fa-arrow-circle-left",
    ".works-carousel-wrapper .fa-arrow-circle-right",
    ".works-slides",
    ".works-slide");

    // window.addEventListener(`resize`, () => {
    //     sliderIntro();
    // }, false);

});



