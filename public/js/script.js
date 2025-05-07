const navHeader = document.getElementById('nav_header');


const scrollDownBtn = document.getElementById("scroll_to_Down");
// Smooth scroll to a position
if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
        console.log(scrollDownBtn)
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    });
}
let logo_height;
let logo_height_Value;

document.addEventListener('DOMContentLoaded', (event) => {
    // console.log("DOMContentLoaded - > ",event)
    setSectionPaddings(event);
    scrollToProduct();
    logo_height = getComputedStyle(document.documentElement).getPropertyValue('--logo-wrraper-height');
    logo_height = parseFloat(logo_height); // Removes "px" and converts to number
    logo_height_Value = parseFloat(logo_height) * 2; // Removes "px" and converts to number
});
window.addEventListener('resize', (event) => {
    // console.log("window resize - > ", event);
    setSectionPaddings(event);

    const imgtagIcon = document.getElementById('imgtag_icon');
    const ul = document.querySelector("nav ul");

    if (imgtagIcon) { // Ensure imgtagIcon exists
        const computedStyle = window.getComputedStyle(imgtagIcon);
        if (computedStyle.display === "none") {
            imgtagIcon.classList.add("right");
            imgtagIcon.classList.remove("left");
            ul?.classList.remove("show"); // Optional chaining to prevent errors if ul is null
        }
    }
});

document.addEventListener('loadstart', (event) => {
    // console.log("loadstart - > ",event)
    setSectionPaddings(event);
})
function setSectionPaddings() {
    const navHeader = document.getElementById('nav_header');

    if (navHeader) {
        const navHeaderRect = navHeader.getBoundingClientRect();
        var section_padding = navHeaderRect.height + 'px'; // Update section padding dynamically
        // console.log(section_padding); // Now this will work
        document.documentElement.style.setProperty('--section-padding', section_padding);
        setProductPaddings();
    } else {
        console.log(" navHeader is undefine ")
    }
}

function setProductPaddings() {
    const product_header_wrapper = document.getElementById('product_header_wrapper');
    if (product_header_wrapper) {
        const product_header_Rect = product_header_wrapper.getBoundingClientRect();
        var product_padding = product_header_Rect.height + 'px'; // Update section padding dynamically
        // console.log(product_padding); // Now this will work
        document.documentElement.style.setProperty('--product-padding', product_padding);
        if (window.scrollY > product_header_Rect.height) {
            document.documentElement.style.setProperty('--h-color', "#0f1c36");
        } else {
            document.documentElement.style.setProperty('--h-color', "white");
        }
    } else {
        // console.log(" product_header_wrapper is undefine ")
    }
}

const product = document.getElementById("products");
const product_headline = document.getElementById("product_headline");
const logo_wrraper = document.querySelector('.logo-wrraper');
console.log(logo_wrraper.getBoundingClientRect().height)

let lastScrollY = window.scrollY;
document.addEventListener('scroll', (event) => {
    // console.log("scroll - > ", event)
    setSectionPaddings()

    if (window.scrollY > window.innerHeight / 4) {
        navHeader.classList.add('scroll');
    } else {
        navHeader.classList.remove('scroll');
    }


    // giving header blur effect 
    var scrolledY = window.scrollY * 0.125;
    const stopping_point = 100;
    const min_height = logo_height;
    var header_blur = scrolledY > stopping_point ? stopping_point + "px" : scrolledY + "px";
    var x = 2;
    var new_logo_height = logo_height_Value - (scrolledY * x) >= min_height ? logo_height_Value - (scrolledY * x) + "px" : min_height + "px"

    // console.log("new_logo_height :- ",new_logo_height)
    // console.log("scrolledY :- ",scrolledY)
    // console.log("header_blur :- ",header_blur)
    document.documentElement.style.setProperty('--header-blur', header_blur);
    document.querySelector('.logo-wrraper').style.setProperty('--logo-height', new_logo_height);
    // document.documentElement.style.getProperty('--logo-height');

    // slideing animation 
    if (product) {
        var product_rect = product.getBoundingClientRect();
        if (product_rect.top < window.innerHeight) {
            const slideX = (window.scrollY / product_rect.height) * 20 + "vw";
            document.documentElement.style.setProperty('--slide-x', slideX);
        }
    }
});

const imgtagIcon = document.getElementById('imgtag_icon');
const ul = document.querySelector("nav ul")
imgtagIcon.addEventListener('click', (event) => {
    if (imgtagIcon.classList.contains("right")) {
        imgtagIcon.classList.add("left")
        imgtagIcon.classList.remove("right")
        ul.classList.add("show");
    } else {
        imgtagIcon.classList.add("right")
        imgtagIcon.classList.remove("left")
        ul.classList.remove("show");
    }
})

document.addEventListener('click', (event) => {
    const nav = document.querySelector('nav');
    const ul = document.querySelector('nav ul');
    if (!nav.contains(event.target)) {
        imgtagIcon.classList.add("right")
        imgtagIcon.classList.remove("left")
        ul.classList.remove("show");
    }
});


// Common variables
const tiles = document.querySelectorAll('.tile');
const angle = 15;

tiles.forEach(tile => {
    const wd = tile.clientWidth / 2;
    const hi = tile.clientHeight / 2;
    const sine = tile.querySelector('.sine')
    // Desktop Events
    tile.addEventListener('mouseenter', () => {
        tile.addEventListener('mousemove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            handleRotate(x, y, tile, sine, wd, hi);
        });
    });

    tile.addEventListener('mouseleave', () => {
        resetTile(tile, sine);
    });

    // Mobile Events
    tile.addEventListener('touchstart', (e) => {
        tile.addEventListener('touchmove', (e) => {
            const rect = tile.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;

            handleRotate(x, y, tile, sine, wd, hi);
        });
    });

    tile.addEventListener('touchend', () => {
        resetTile(tile, sine);
    });
})

// Function to handle rotation
function handleRotate(x, y, element, sineElement, wd, hi) {
    let rotateY = (x * angle) / wd - angle;
    let rotateX = (y * angle) / hi - angle;

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    element.style.transition = 'all 0s';

    // sineElement.style.opacity = 1;
    sineElement.style.transition = 'all 0s';
}

// Reset function for tile
function resetTile(element, sineElement) {
    element.style.transform = 'rotateX(0deg) rotateY(0deg)';
    // sineElement.style.opacity = 0;
    sineElement.style.transition = 'all 1s';
    element.style.transition = 'all 2s';
}

const backToTopButton = document.getElementById("backToTop");

// Smooth scroll to top when button is clicked
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Check if the device is touch-enabled
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
    // console.log(" isTouchDevice ")
    const list_head = document.getElementById("list_head");
    if (!list_head) {
        console.error("list_head is undefined or null");
    } else {
        const divLists = list_head.querySelectorAll(".list-div");
        if (!divLists || divLists.length === 0) {
            console.warn("No .list-div elements found in list_head -->", list_head);
        } else {
            divLists.forEach((header) => {
                header.addEventListener("click", (event) => {
                    // console.log(" isTouchDevice ")
                    const content_wrapper = header.nextElementSibling;
                    const openDiv = document.querySelector(".list-div.open");

                    // Close the previously opened item if it's not the current one
                    if (openDiv && openDiv !== header) {
                        openDiv.classList.remove("open");
                        if (openDiv.nextElementSibling) {
                            openDiv.nextElementSibling.style.height = "0px";
                        }
                    }

                    // Toggle the current item
                    if (header.classList.contains("open")) {
                        header.classList.remove("open");
                        content_wrapper.style.height = "0px";
                    } else {
                        header.classList.add("open");
                        const content_wrapper_height = content_wrapper.scrollHeight + "px";
                        content_wrapper.style.height = content_wrapper_height;
                    }
                });
            });

            // Close any open item when clicking outside of `list_head`
            document.addEventListener("click", (event) => {
                const openDiv = document.querySelector(".list-div.open");
                if (openDiv && !list_head.contains(event.target)) {
                    openDiv.classList.remove("open");
                    if (openDiv.nextElementSibling) {
                        openDiv.nextElementSibling.style.height = "0px";
                    }
                }
            });
        }
    }
}

function scrollToProduct() {
    // const product_brief = document.querySelector(".icon-div.active") // this is for bringing product icon at center
    const product_brief = document.querySelector("#product_brief")
    const product_name_header = document.querySelector(".product-name-header")
    if (product_brief) {
        const product_brief_rect = product_brief.getBoundingClientRect();
        const product_name_header_rect = product_name_header.getBoundingClientRect();
        const scrollPosition1 = window.scrollY + product_brief_rect.top - (window.innerHeight / 2 - product_brief_rect.height / 2);
        const scrollPosition2 = product_name_header_rect.top - (product_name_header_rect.height * 2)
        window.scrollTo({
            top: scrollPosition2,
            behavior: "smooth",
        });
        // Smoothly scroll to make the product_brief center of the screen
        // if(product_brief_rect.top > (window.innerHeight)/2){
        //     window.scrollTo({
        //         top: scrollPosition,
        //         behavior: "smooth",
        //     });
        // }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const acceptCookies = document.getElementById("accept-cookies");
    const declineCookies = document.getElementById("decline-cookies");

    // Check if cookies have already been accepted
    if (!localStorage.getItem("cookiesAccepted")) {
        cookieBanner.showModal(); // Opens the dialog as a modal
    } else {
        loadGoogleAnalytics();
    }

    // Handle "Accept" button
    acceptCookies.addEventListener("click", async function () {
        try {
            // Save consent in local storage
            localStorage.setItem("cookiesAccepted", "true");
            loadGoogleAnalytics();
            // Close the cookie banner
            cookieBanner.close();
        } catch (error) {
            console.error("Error in acceptCookies handler:", error);
        }
    });

    // Handle "Decline" button
    declineCookies.addEventListener("click", function () {
        localStorage.removeItem("cookiesAccepted");
        document.cookie = "_ga=; Max-Age=0; path=/;";
        document.cookie = "_gid=; Max-Age=0; path=/;";
        cookieBanner.close(); // Close the dialog
    });
});

async function loadGoogleAnalytics() {
    // Fetch the tracking ID from your server
    const response = await fetch("/Ganalytics");
    if (!response.ok) {
        throw new Error("Failed to fetch tracking ID");
    }
    const data = await response.json();
    const trackingID = atob(data.trackingID);


    if (trackingID) {
        console.log("Tracking ID:", trackingID);

        if (!document.querySelector(`script[src^="https://www.googletagmanager.com/gtag/js"]`)) {
            const script = document.createElement("script");
            script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`; // by doing all this still i can't hide my trackingID from user because when they inspect thy can see at head tag 
            script.async = true;
            document.head.appendChild(script);

            script.onload = function () {
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", trackingID);
            };
        }
    } else {
        console.error("Tracking ID is undefined");
    }
}

window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
});

// Function to observe elements
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add the visible class when in view
        }
    });
});

// Select elements to animate
const elements = document.querySelectorAll('.animate');
elements.forEach((el) => observer.observe(el));

const perspectives = document.querySelectorAll('.perspective');

perspectives.forEach(perspective => {
    perspective.addEventListener('mouseenter', () => {
        perspective.style.setProperty('--cursor-opacity', 0);
    });

    perspective.addEventListener('touchstart', () => {
        perspective.style.setProperty('--cursor-opacity', 0);
    }, { passive: true });
});

document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("video");
    if (video) {
        // video.playbackRate = 0.5; // Adjust this value (1 is normal speed, 0.5 is half speed)
    }
});

const product_image = document.querySelectorAll('.product-image')
if (product_image) {

    product_image.forEach(divImg => {
        const img = divImg.querySelector('img');

        function loaded() {
            divImg.classList.add("loaded")
        }

        if (img.complete) {
            loaded();
        } else {
            // trackImageLoading(img);
            img.addEventListener('load', loaded);
        }
    })
}