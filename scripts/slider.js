let pos = 0;
let sliderWindow = document.getElementById("slider-window");
let sliderElement = document.getElementById("slider-element");
let sliderMarker = document.getElementById("slider-marker");
let slideCount = 7;
let elementNum = 1;

initialization();

function rightMove() {
  if (elementNum == slideCount) {
    elementNum = 1;
    elementReplace(+elementNum);
  } else {
    elementReplace(+elementNum + 1);
  }
  windowSize();
  changeMarker();
}

function leftMove() {
  if (elementNum == 1) {
    elementNum = slideCount;
    elementReplace(+elementNum);
  } else {
    elementReplace(+elementNum - 1);
  }
  windowSize();
  changeMarker();
}

document
  .querySelector(".element-forward")
  .addEventListener("click", function () {
    rightMove();
});

document.querySelector(".element-back").addEventListener("click", function () {
  leftMove();
});

function windowSize() {
  elementPrev = sliderElement.querySelectorAll("img")[+elementNum - 1];
  elementTek = sliderElement.querySelectorAll("img")[+elementNum];
  elementNext = sliderElement.querySelectorAll("img")[+elementNum + 1];
  /*sliderWindow.style.width =
    elementPrev.naturalWidth +
    elementTek.naturalWidth +
    elementNext.naturalWidth +
    60 +
    "px";*/
  if (elementPrev.naturalHeight <= elementTek.naturalHeight) {
    if (elementTek.naturalHeight <= elementNext.naturalHeight) {
      sliderWindow.style.height = `${elementNext.naturalHeight}px`;
    } else {
      sliderWindow.style.height = `${elementTek.naturalHeight}px`;
    }
  } else {
    sliderWindow.style.height = `${elementPrev.naturalHeight}px`;
  }
  elementPrev.style.height = `${elementPrev.naturalHeight}px`;
  elementTek.style.height = `${elementTek.naturalHeight}px`;
  elementNext.style.height = `${elementNext.naturalHeight}px`;
}

sliderMarker.addEventListener("click", function (event) {
  if (event.target.tagName === "SPAN") {
    targetRadio = event.target.id;
  } else return;
  elementReplace(targetRadio.slice(7, targetRadio.length));
  changeMarker();
  windowSize();
});

function elementReplace(Number) {
  pos = 0;
  elementNum = Number;
  for (i = 0; i < Number - 1; i++) {
    pos = pos + 20 + sliderElement.querySelectorAll("img")[i].naturalWidth;
  }
  sliderElement.style.left = -pos + "px";
}

function changeMarker() {
  for (i = 1; i < slideCount + 1; i++) {
    document.getElementById(`marker-${i}`).classList.remove("marker-active");
  }
  document
    .getElementById(`marker-${elementNum}`)
    .classList.add("marker-active");
}

let startTouch = 0;

sliderElement.addEventListener("touchstart", function (event) {
  startTouch = event.touches[0].pageX;
});

sliderElement.addEventListener("touchend", function (event) {
  startTouch - event.changedTouches[0].pageX > 0 ? rightMove() : leftMove();
});

function initialization() {
  for (let i = slideCount + 1; i > -1; i--) {
    switch (i) {
      case 0:
        element = `<img class="slider-picture" src="img/img-${slideCount}.png" alt=""/>`;
        marker = "";
        break;
      case slideCount + 1:
        element = `<img class="slider-picture" src="img/img-1.png" alt=""/>`;
        marker = "";
        break;
      default:
        element = `<img class="slider-picture" src="img/img-${i}.png" alt=""/>`;
        marker = `<span class="marker-element" id="marker-${i}"></span>`;
    }
    sliderElement.insertAdjacentHTML("afterbegin", element);
    sliderMarker.insertAdjacentHTML("afterbegin", marker);
  }
  heightMax = 0;
  for (let i = 1; i < slideCount + 1; i++) {
    elementTek = sliderElement.querySelectorAll("img")[i].naturalHeight;
    heightMax = heightMax < elementTek ? elementTek : heightMax;
  }
  sliderElement.style.height = `${heightMax}px`;
  changeMarker();
  windowSize();
}
