
/*=========================
  1. DROPDOWN MENU HANDLING
==========================*/
document.addEventListener("DOMContentLoaded", function () {
    setupDropdownMenus();
    setupGifHoverEffects();
    setupGifScrollEffect();
    setupElementScrollReveal();
    setupHoverEffects(".concept-item");
    setupHoverEffects(".premium-item");
    setupMobileMenu();
});

function setupDropdownMenus() {
    let dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("mouseover", function () {
            if (window.innerWidth > 768) {
                this.querySelector(".mega-menu").style.display = "grid";
            }
        });

        dropdown.addEventListener("mouseleave", function () {
            if (window.innerWidth > 768) {
                this.querySelector(".mega-menu").style.display = "none";
            }
        });

        dropdown.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();

                dropdowns.forEach(item => {
                    if (item !== this) {
                        item.classList.remove("active");
                        item.querySelector(".mega-menu").style.display = "none";
                    }
                });

                this.classList.toggle("active");
                let megaMenu = this.querySelector(".mega-menu");
                megaMenu.style.display = megaMenu.style.display === "grid" ? "none" : "grid";
            }
        });
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest(".dropdown")) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove("active");
                let megaMenu = dropdown.querySelector(".mega-menu");
                if (megaMenu) {
                    megaMenu.style.display = "none";
                }
            });
        }
    });
}

/*=========================
  2. MOBILE MENU TOGGLE
==========================*/
function toggleMenu() {
    // const drop = document.querySelector(".dropdown");
    const navLinks = document.querySelector(".nav-links");
    const searchBar = document.querySelector(".search-bar");
    const loginBtn = document.querySelector(".login-btn");
    navLinks.classList.toggle("active");
    searchBar.classList.toggle("active");
    loginBtn.classList.toggle("active");
    // drop.classList.toggle("active");
}

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


window.addEventListener("load", function() {
    setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        const content = document.querySelector(".hero"); // Target the main content

        preloader.classList.add("hide");
        content.classList.add("fade-in"); // Apply fade-in effect
    }, 3000); // 10 seconds delay
});


