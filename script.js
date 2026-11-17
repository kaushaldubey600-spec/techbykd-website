
// Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });

    // Close menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });

    });

}


// Automatic Copyright Year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


// Back to Top Button
const topBtn = document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// Active Navigation Link
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// Contact Form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {

            formStatus.textContent = "Please fill all fields.";
            return;

        }

        // Replace with your actual email address
        const recipient = "YOUR_EMAIL@example.com";

        const body =
            "Name: " + name + "\n" +
            "Email: " + email + "\n\n" +
            "Message:\n" + message;

        const mailtoLink =
            "mailto:" + recipient +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        formStatus.textContent =
            "Opening your email application...";

        window.location.href = mailtoLink;

    });

}


// ==================================
// YOUTUBE THUMBNAIL FOR PROJECT CARDS
// ==================================

document.querySelectorAll(".project-grid .card").forEach(card => {

    const projectLink = card.querySelector(".card-link");

    if (!projectLink) return;

    let videoId = "";

    try {

        const youtubeUrl = new URL(projectLink.href);

        const host = youtubeUrl.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {

            videoId = youtubeUrl.pathname
                .split("/")
                .filter(Boolean)[0] || "";

        }

        else if (
            host === "youtube.com" ||
            host === "m.youtube.com"
        ) {

            videoId = youtubeUrl.searchParams.get("v") || "";

        }

    } catch (error) {

        // Ignore invalid or empty project links

    }


    // Set YouTube Thumbnail
    if (videoId) {

        const thumbnailUrl =
            `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        card.style.setProperty(
            "--project-thumbnail",
            `url("${thumbnailUrl}")`
        );

    }

});
