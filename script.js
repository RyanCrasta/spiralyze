function isTablet() {
  if (window.matchMedia("(max-width: 1241px)").matches) {
    return true;
  } else {
    return false;
  }
}

function isMobile() {
  if (window.matchMedia("(max-width: 761px)").matches) {
    return true;
  } else {
    return false;
  }
}

const images = isMobile()
  ? document.querySelector(".sliderMobile")
  : document.querySelector(".slider");
const dots = isMobile()
  ? document.querySelectorAll(".dotMobile")
  : document.querySelectorAll(".dot");
const totalImages = 3;

let index = 1;
let isTransitioning = false;
let autoPlayInterval;

images.style.transform = `translateX(${-index * 100}%)`;

function updateCarousel() {
  images.style.transition = "transform 0.5s ease-in-out";
  images.style.transform = `translateX(${-index * 100}%)`;

  let dotIndex = index - 1;
  if (index === 0) dotIndex = totalImages - 1;
  if (index === totalImages + 1) dotIndex = 0;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[dotIndex].classList.add("active");
}

function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  index++;
  updateCarousel();
}

function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;
  index--;
  updateCarousel();
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

document.querySelector(".leftArrow").addEventListener("click", () => {
  prevSlide();
  stopAutoPlay();
});
document.querySelector(".rightArrow").addEventListener("click", () => {
  nextSlide();
  stopAutoPlay();
});

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    index = i + 1;
    updateCarousel();
    stopAutoPlay();
  });
});

images.addEventListener("transitionend", () => {
  if (index === 0) {
    images.style.transition = "none";
    index = totalImages;
    images.style.transform = `translateX(${-index * 100}%)`;
  }
  if (index === totalImages + 1) {
    images.style.transition = "none";
    index = 1;
    images.style.transform = `translateX(${-index * 100}%)`;
  }
  isTransitioning = false;
});

autoPlayInterval = setInterval(nextSlide, 3000);

const playButton = isTablet()
  ? document.getElementById("playButtonMobile")
  : document.getElementById("playButton");

const video = isTablet()
  ? document.getElementById("myVideoMobile")
  : document.getElementById("myVideo");

playButton.addEventListener("click", () => {
  if (isTablet()) {
    document.querySelector("#playButtonMobile img").src =
      "./images/active-desktop-play-btn.png";
  } else {
    document.querySelector("#playButton img").src =
      "./images/active-desktop-play-btn.png";
  }
  video.classList.add("playing");
  video.play();
});

const form = document.querySelector(".submitButton");

function showFormErrors(tooltipText, formInput, formInputLabel) {
  document.querySelector(tooltipText).style.visibility = "visible";
  document.querySelector(formInput).style.border = "1px solid #FF7777";
  document.querySelector(formInputLabel).style.color = "#FF7777";
}

function hideFormErrors(tooltipText, formInput, formInputLabel) {
  document.querySelector(tooltipText).style.visibility = "hidden";
  document.querySelector(formInput).style.border = "1px solid #ffffff80";
  document.querySelector(formInputLabel).style.color = "#fff";
}

document.querySelector(".formCtn").addEventListener("submit", (e) => {
  e.preventDefault();
});

form.addEventListener("click", function (event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value;
  const businessEmail = document.getElementById("businessEmail").value;
  const company = document.getElementById("company").value;

  if (firstName === "") {
    showFormErrors(
      ".tooltiptextFirstName",
      ".formInputFirstName",
      ".formInputLabelFirstName"
    );
  } else if (lastName === "") {
    showFormErrors(
      ".tooltiptextLastName",
      ".formInputLastName",
      ".formInputLabelLastName"
    );
  } else if (businessEmail === "") {
    showFormErrors(
      ".tooltiptextEmail",
      ".formInputEmail",
      ".formInputLabelEmail"
    );
  } else if (company === "") {
    showFormErrors(
      ".tooltiptextCompany",
      ".formInputCompany",
      ".formInputLabelComapny"
    );
  } else {
    window.location.replace("/thankyou.html");
  }
});

const dropdown = document.querySelector(".dropdown");
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");
const btnText = document.querySelector(".btn-text");
const dropdownLinks = document.querySelectorAll(".dropdown-content a");

dropdownBtn.addEventListener("click", function () {
  dropdown.classList.toggle("show");
});

window.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown-btn")) {
    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
    }
  }
});

dropdownLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const selectedValue = event.target.getAttribute("data-value");
    btnText.textContent = selectedValue;
    dropdown.classList.remove("show");
  });
});

function formInputLabelFn(
  event,
  formLabel,
  tooltipText,
  formInput,
  formInputLabel
) {
  document.querySelector(formLabel).style.top = "-10px";
  document.querySelector(formLabel).style.left = "15px";
  document.querySelector(formLabel).style.fontSize = "small";
  document.querySelector(formLabel).style.color = "#fff";
  document.querySelector(formLabel).style.background = "#2a7d6c";
  document.querySelector(formLabel).style.padding = "0 5px 0 5px";
  document.querySelector(formLabel).style.transform = "translateY(0%)";
  hideFormErrors(tooltipText, formInput, formInputLabel);
}

function formInputLabelFnBlur(event, formLabel) {
  if (event.target.value === "") {
    document.querySelector(formLabel).style.top = "50%";
    document.querySelector(formLabel).style.left = "10px";
    document.querySelector(formLabel).style.transform = "translateY(-50%)";
    document.querySelector(formLabel).style.fontSize = "unset";
    document.querySelector(formLabel).style.background = "unset";
  }
}

document.querySelector(".hamburgerCtn").addEventListener("click", function () {
  document.querySelector(".hamburgerNavigation").classList.toggle("open");
});
