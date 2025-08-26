function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // remove active from all
    tabButtons.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    // activate current
    btn.classList.add("active");
    document.getElementById(btn.dataset.target).classList.add("active");
  });
});

document.querySelectorAll(".slideshow-container").forEach((slideshow) => {
  let slides = slideshow.querySelectorAll(".slide");
  let dots = slideshow.parentElement.querySelectorAll(".dot");
  let prevArrow = slideshow.parentElement.querySelector(".prev");
  let nextArrow = slideshow.parentElement.querySelector(".next");
  let slideIndex = 0;
  let autoPlay = true;
  let interval;

  function showSlide(n) {
    slides.forEach((s, i) => {
      s.classList.remove("active");
      dots[i].classList.remove("active", "filling");
    });
    slides[n].classList.add("active");
    dots[n].classList.add("active", "filling");
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  function startAuto() {
    interval = setInterval(nextSlide, 10000);
  }

  function stopAuto() {
    autoPlay = false;
    clearInterval(interval);
    dots.forEach((d) => d.classList.remove("filling"));
  }

  // Initialize
  showSlide(slideIndex);
  startAuto();

  // Dot click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      slideIndex = i;
      showSlide(slideIndex);
      stopAuto(); // stop autoplay on manual click
    });
  });

  // Arrow click
  if (prevArrow)
    prevArrow.addEventListener("click", () => {
      prevSlide();
      stopAuto();
    });

  if (nextArrow)
    nextArrow.addEventListener("click", () => {
      nextSlide();
      stopAuto();
    });
});
