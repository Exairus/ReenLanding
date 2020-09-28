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

        function sliderMoveTransition(slider) {
            slider.style.transition = 'transform 0.5s ease';
            slider.style.transform = `translateX(${-width * counter}px)`;
        }

        function dotSliderTranslate(slider, event) {
            const slideTo = event.target.getAttribute("data-slide-to");
            counter = slideTo;
            sliderMoveTransition(slider);
        }
        

        arrowNext.addEventListener("click", () => {
            if(counter >= slides.length - 1) return;
            counter++;
            sliderMoveTransition(slider)

            nextDot(sliderDots, slides);
        });

        arrowPrev.addEventListener("click", () => {
            if(counter <= 0) return;
            counter--;
            sliderMoveTransition(slider);

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

    // sliderSettings(".works-carousel-wrapper",
    // ".works-carousel-wrapper .fa-arrow-circle-left",
    // ".works-carousel-wrapper .fa-arrow-circle-right",
    // ".works-slides",
    // ".works-slide");

    // window.addEventListener(`resize`, () => {
    //     sliderIntro();
    // }, false);

    // smooth scroll
    function smoothScroll(target, duration) {
        // how much pxls i scrolled from viewport
        const startPosition = window.pageYOffset;
        let socialHeight = document.querySelector(".social").offsetHeight;
        let headerHeight = document.querySelector(".header").offsetHeight;
        let introHeight = document.querySelector(".intro-carousel-container").offsetHeight;
    
        const height = socialHeight + headerHeight + introHeight;
        const distance = height - startPosition;
        // this will be used for requestAnimationFrame
        let startTime = null;
    
        function animation(currentTime) {
            if(startTime === null) startTime = currentTime;
            let timeElapsed = currentTime - startTime;
         
            const run = easeOutSine(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
    
            if(timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }
    
        const easeOutSine = function (t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        };
        
        // loop callback function for 60 fps
        requestAnimationFrame(animation);
    }
    
    const introScrollBtn = document.querySelector(".intro-scrollDown");
    introScrollBtn.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScroll(".section.about", 1000);
    });

    // burger

    const navSlide = () => {
        const burger= document.querySelector(".burger"),
              nav = document.querySelector(".nav"),
              navLinks = document.querySelectorAll(".nav-list");
        
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
            
            navLinks.forEach((link, index) => {
                if(link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `linkFade 0.5s ease forwards ${index / 7 + .3}s`;
                }
            });
        });
    }

    navSlide();

    // scroll to element - smooth scroll library

    const scroll = new SmoothScroll('.nav a[href*="#"]', {
        speed: 800,
        speedAsDuration: true
    });

});



