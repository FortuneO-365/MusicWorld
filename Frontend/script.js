
/*=========================
  1. DROPDOWN MENU HANDLING
==========================*/
document.addEventListener("DOMContentLoaded", function () {
    setupGifHoverEffects();
    setupGifScrollEffect();
    setupElementScrollReveal();
    setupHoverEffects(".concept-item");
    setupHoverEffects(".premium-item");
    checkUser();
});


/*=========================
  3. GIF HOVER EFFECTS
==========================*/
function setupGifHoverEffects() {
    const gifImage = document.querySelector(".gif-image");

    if (gifImage) {
        const staticSrc = gifImage.getAttribute("data-static");
        const animatedSrc = gifImage.getAttribute("data-animated");

        gifImage.addEventListener("mouseenter", function () {
            this.src = staticSrc;
        });

        gifImage.addEventListener("mouseleave", function () {
            this.src = animatedSrc;
        });

        gifImage.addEventListener("click", function () {
            this.src = staticSrc;
        });
    }
}

/*=========================
  4. GIF SCROLL EFFECT
==========================*/
function setupGifScrollEffect() {
    const gif = document.getElementById("flying-gif");

    if (gif) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 50) {
                gif.classList.add("fly");
            } else {
                gif.classList.remove("fly");
            }
        });
    }
}

/*=========================
  5. ELEMENT SCROLL REVEAL
==========================*/
function setupElementScrollReveal() {
    const steps = document.querySelectorAll(".step");

    function revealSteps() {
        steps.forEach(step => {
            const position = step.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (position < windowHeight - 50) {
                step.style.opacity = "1";
                step.style.transform = "translateY(0)";
            }
        });
    }

    window.addEventListener("scroll", revealSteps);
}

/*=========================
  6. HOVER EFFECTS
==========================*/
function setupHoverEffects(selector) {
    const items = document.querySelectorAll(selector);

    items.forEach(item => {
        item.addEventListener("mouseover", () => {
            item.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
        });

        item.addEventListener("mouseleave", () => {
            item.style.boxShadow = "none";
        });
    });
}

/*=========================
  7. CHECK USER
==========================*/

function checkUser() {
    const user = localStorage.getItem("user");
    if (user) {
        document.getElementById('registerNow').style.display = 'none';
    } else {
        document.getElementById('registerNow').style.display = 'none';
    }
}

/*=========================
  7. START LISTENING
==========================*/

function startListening() {
    window.location.href = "songlist/index.html";
}

window.addEventListener("load", function() {
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        const content = document.querySelector(".hero"); // Target the main content

        preloader.classList.add("hide");
        content.classList.add("fade-in"); // Apply fade-in effect
    }, 3000); // 10 seconds delay
});


