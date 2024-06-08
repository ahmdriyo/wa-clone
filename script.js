const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content ul');
const nav = document.querySelector('.nav ul');
const rotet = document.querySelector('.gres i');
const menuToggle = document.querySelector('.menu-toggle');

dropbtn.addEventListener('click', function(){
  dropdownContent.classList.toggle('slide');
  nav.classList.toggle('slide');
  rotet.classList.toggle('rotet');
});

menuToggle.addEventListener('click', function () {
  nav.classList.toggle('burger');
});


let languageSelector = document.getElementById('language');
let greeting = document.getElementById('greeting');

function setLanguage(lang) {
  let langData = {
    en: {
      greeting: '',
    },
    id: {
      greeting: '',
    },
    fr: {
      greeting: '',
    },
    es: {
      greeting: '',
    }
  };
  greeting.innerHTML = langData[lang].greeting;
}
setLanguage('en');
languageSelector.onchange = function() {
  setLanguage(languageSelector.value);
}





const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".promo i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[1].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

const autoSlide = () => {
  if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
  positionDiff = Math.abs(positionDiff); 
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;
  if(carousel.scrollLeft > prevScrollLeft) {
      return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
  }
  carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if(!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
}

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if(!isDragging) return;
  isDragging = false;
  autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);