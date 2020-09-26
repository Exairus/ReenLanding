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

    function sliderIntro(sliderWrapper, arrowPrev, arrowNext, slider, slides) {
        const introSliderContainer = document.querySelector(".intro-carousel-container"),
              introArrowPrev = document.querySelector(".intro-carousel-container .fas.fa-arrow-left"),
              introArrowNext = document.querySelector(".intro-carousel-container .fas.fa-arrow-right"),
              introSlider = document.querySelector(".intro-carousel-slides"),
              introSlides = document.querySelectorAll(".intro-carousel-slide");

        let counter = 1;

        let width = introSlides[0].offsetWidth;
         
        introSlider.style.transform = `translateX(${-width * counter}px)`;

        introSlides.forEach(slide => {
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

        let sliderDots = creatingIndicators(introSlides, introSliderContainer);

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
            introSlider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-width * counter}px)`;
        }
        

        introArrowNext.addEventListener("click", () => {
            if(counter >= introSlides.length - 1) return;
            counter++;
            introSlider.style.transition = 'transform 0.5s ease';
            introSlider.style.transform = `translateX(${-width * counter}px)`;

            nextDot(sliderDots, introSlides);
        });

        introArrowPrev.addEventListener("click", () => {
            if(counter <= 0) return;
            counter--;
            introSlider.style.transition = 'transform 0.5s ease';
            introSlider.style.transform = `translateX(${-width * counter}px)`;

            prevDot(sliderDots, counter);
            
        });

        introSlider.addEventListener("transitionend", () => {
            if(introSlides[counter].id === "lastClone") {
                introSlider.style.transition = 'none';
                counter = introSlides.length - 2;
                sliderDots[counter - 1].classList.add("active");
                introSlider.style.transform = `translateX(${-width * counter}px)`;
                
            }
            if(introSlides[counter].id === "firstClone") {
                introSlider.style.transition = 'none';
                counter = introSlides.length - counter;
                sliderDots[counter - 1].classList.add("active");
                introSlider.style.transform = `translateX(${-width * counter}px)`;
            }
        });

        sliderDots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                dotSliderTranslate(introSlider, e);
                removeAddActiveDot(sliderDots);       
            });
        });


        

    }

    sliderIntro();

    // window.addEventListener(`resize`, () => {
    //     sliderIntro();
    // }, false);

});



