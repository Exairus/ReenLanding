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

    function sliderIntro() {
        const introSliderContainer = document.querySelector(".intro-carousel-container"),
              introArrowPrev = document.querySelector(".intro-carousel-container .fas.fa-arrow-left"),
              introArrowNext = document.querySelector(".intro-carousel-container .fas.fa-arrow-right"),
              introSlider = document.querySelector(".intro-carousel-slides"),
              introSlides = document.querySelectorAll(".intro-carousel-slide");

        let counter = 1;

        let width = introSlides[0].offsetWidth;
         
        console.log(width);
        introSlider.style.transform = `translateX(${-width * counter}px)`;

        introSlides.forEach(slide => {
            slide.style.width = width;
        });

        // creating indicators
        const indicators = document.createElement("ol");
        indicators.classList.add("intro-carousel-indicators");
        introSliderContainer.prepend(indicators);

        const dots = [];

        for (let i = 0; i < introSlides.length - 2; i++) {
            const dot = document.createElement("li");
            dot.classList.add("intro-carousel-indicators-dot");
            dot.setAttribute('data-slide-to', i + 1);
            if (i == 0) {
                dot.classList.add("active");
            }
            indicators.append(dot);
            dots.push(dot);
        }

        introArrowNext.addEventListener("click", () => {
            if(counter >= introSlides.length - 1) return;
            counter++;
            introSlider.style.transition = 'transform 0.5s ease';
            introSlider.style.transform = `translateX(${-width * counter}px)`;

            dots.forEach(dot => {
                dot.classList.remove("active");
            });

            if(counter < introSlides.length - 1) {
                dots[counter - 1].classList.add("active");
            }
        });

        introArrowPrev.addEventListener("click", () => {
            if(counter <= 0) return;
            counter--;
            introSlider.style.transition = 'transform 0.5s ease';
            introSlider.style.transform = `translateX(${-width * counter}px)`;

            dots.forEach(dot => {
                dot.classList.remove("active");
            });

            if (counter > 0) {
                dots[counter - 1].classList.add("active");
            }
            
        });

        introSlider.addEventListener("transitionend", () => {
            if(introSlides[counter].id === "lastClone") {
                introSlider.style.transition = 'none';
                counter = introSlides.length - 2;
                dots[counter - 1].classList.add("active");
                introSlider.style.transform = `translateX(${-width * counter}px)`;
                
            }
            if(introSlides[counter].id === "firstClone") {
                introSlider.style.transition = 'none';
                counter = introSlides.length - counter;
                dots[counter - 1].classList.add("active");
                introSlider.style.transform = `translateX(${-width * counter}px)`;
            }
        });

        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                const slideTo = e.target.getAttribute("data-slide-to");
                counter = slideTo;
                introSlider.style.transform = `translateX(${-width * counter}px)`;

                dots.forEach(dot => {
                    dot.classList.remove("active");
                });
                dots[counter - 1].classList.add("active");
            });
        });

    }

    sliderIntro();

    // window.addEventListener(`resize`, () => {
    //     sliderIntro();
    // }, false);

});



