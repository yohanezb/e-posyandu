document.addEventListener("DOMContentLoaded", function () {
    let sliders = document.querySelectorAll(".slider"); // Ambil semua slider

    sliders.forEach((slider, index) => {
        let slides = slider.querySelectorAll(".slide");
        let totalSlides = slides.length;
        let currentIndex = 0;

        function slideNext() {
            currentIndex = (currentIndex + 1) % totalSlides;
            let offset = -currentIndex * 100 + "%";
            slider.style.transform = "translateX(" + offset + ")";
        }

        // Set interval dengan jeda berbeda untuk setiap slider
        setInterval(slideNext, (index + 1) * 2000); // Slider 1 = 3000ms, Slider 2 = 6000ms
    });
});
