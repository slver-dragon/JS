let labyrint = document.querySelector("table");
let service = document.querySelector(".service")
let map = [];
let stack = [];
let labWidth = 15;
let labHeight = 15;
let coordX = 1;
let coordY = 1;

start();

function start() {
  initialization();
  mapMatrix();
  generator();
  coordX = 1;
  coordY = 1;
}

function labyrintOutput(play) {
  row = labyrint.querySelectorAll("tr");
  for (i = 0; i < labWidth; i++) {
    collumn = row[i].querySelectorAll("td");
    for (j = 0; j < labHeight; j++) {
      if (map[i][j]) {
        collumn[j].classList.remove("wall");
      } else {
        collumn[j].classList.add("wall");
      }
    }
  }
}

function mapMatrix() {
  for (i = 0; i < labWidth; i++) {
    map[i] = [];
    map[i].length = labHeight;
    map[i].fill(false);
  }
  console.log('Создание матрицы');
}

function generator() {
  stack.push([coordX, coordY]);
  map[coordX][coordY] = true;
  do {
    newStep(coordX, coordY);
    map[coordX][coordY] = true;
    labyrintOutput(false);
  } while (stack.length > 1);
  console.log('Генерация');
}

function newStep(tempX, tempY) {
  u = 0;
  do {
    rand = Math.round(Math.random() * 3);
    switch (rand) {
      case 0:
        if (tempX - 2 > 0) {
          if (!map[tempX - 2][tempY]) {
            tempX = coordX - 2;
          } else {
            coordX;
          }
        } else {
          coordX;
        }
        break;
      case 1:
        if (tempY - 2 > 0) {
          if (!map[tempX][tempY - 2]) {
            tempY = coordY - 2;
          } else {
            coordY;
          }
        } else {
          coordY;
        }
        break;
      case 2:
        if (tempX + 2 < labWidth) {
          if (!map[tempX + 2][tempY]) {
            tempX = coordX + 2;
          } else {
            coordX;
          }
        } else {
          coordX;
        }
        break;
      case 3:
        if (tempY + 2 < labHeight) {
          if (!map[tempX][tempY + 2]) {
            tempY = coordY + 2;
          } else {
            coordY;
          }
        } else {
          coordY;
        }
    }

    u++;
    if (u > 25) {
      stack.pop();
      if (stack.length != 0) {
        coordX = tempX = stack[stack.length - 1][0];
        coordY = tempY = stack[stack.length - 1][1];
      } else {
        coordX = tempX + 2;
      }
      u = 0;
    }
  } while (coordX == tempX && coordY == tempY);

  if (stack.length != 0) {
    map[coordX + (tempX - coordX) / 2][coordY + (tempY - coordY) / 2] = true;
    stack.push([tempX, tempY]);
    coordX = tempX;
    coordY = tempY;
  }
}

window.addEventListener("keydown", function (event) {
  event.preventDefault();
  clearCharacter();
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "ц":
      coordY = map[coordY - 1][coordX] ? coordY - 1 : coordY;
      break;
    case "ArrowDown":
    case "s":
    case "ы":
      coordY = map[coordY + 1][coordX] ? coordY + 1 : coordY;
      break;
    case "ArrowLeft":
    case "a":
    case "ф":
      coordX = map[coordY][coordX - 1] ? coordX - 1 : coordX;
      break;
    case "ArrowRight":
    case "d":
    case "в":
      coordX = map[coordY][coordX + 1] ? coordX + 1 : coordX;
      break;
  }
  printCharacter();
  console.log(labWidth,labHeight,' ',coordX,coordY);
  if ((coordX == (labHeight - 2)&&coordY == (labWidth - 2))) {
    winner();
  }
});

function printCharacter() {
  row = labyrint.querySelectorAll("tr");
  collumn = row[coordY].querySelectorAll("td");
  collumn[coordX].classList.add("player");
}

function clearCharacter() {
  row = labyrint.querySelectorAll("tr");
  collumn = row[coordY].querySelectorAll("td");
  collumn[coordX].classList.remove("player");
}

document.querySelector(".labyrint-generator").addEventListener("click", function () {
  labyrint.innerHTML = "";
  labWidth = document.querySelector(".labyrint-width").querySelector("input").value;
  labHeight = document.querySelector(".labyrint-height").querySelector("input").value;
  console.log(labWidth,labHeight,' ',coordX,coordY);
  initialization();
  mapMatrix();
  generator();
});

document.querySelector(".play-game").addEventListener("click", function () {
  service.querySelector('span').classList.add('hider');
  clearCharacter();
  coordX = 1;
  coordY = 1;
  console.log(labWidth,labHeight,' ',coordX,coordY);
  printCharacter();
});

function initialization() {
  for (i = 0; i < labWidth; i++) {
    let tr = document.createElement("tr");
    for (j = 0; j < labHeight; j++) {
      let td = document.createElement("td");
      tr.appendChild(td);
    }
    labyrint.appendChild(tr);
    console.log('Инициализация');
  }
  coordX = 1;
  coordY = 1;
  service.querySelector('span').classList.add('hider');
}

function winner() {
  service.querySelector('span').classList.remove('hider');
}