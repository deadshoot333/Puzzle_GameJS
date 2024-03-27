var turns = 0;
function shuffle(array) {
  return array.sort(() => Math.random() - Math.random());
}

function dragStart() {
  currTile = this;
}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}
function dragLeave(e) {}
function dragDrop() {
  otherTile = this;
}
function dragEnd() {
  let currCoords = currTile.id.split("-");
  let r1 = parseInt(currCoords[0]);
  let c1 = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]);
  let c2 = parseInt(otherCoords[1]);

  let moveLeft = r1 == r2 && c2 == c1 - 1;
  let moveRight = r1 == r2 && c2 == c1 + 1;
  let moveUP = r2 == r1 - 1 && c2 == c1;
  let moveDown = r2 == r1 + 1 && c2 == c1;

  let isAdjacent = moveDown || moveLeft || moveUP || moveRight;
  console.log(isAdjacent);
  if (isAdjacent) {
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;
    turns += 1;

    document.getElementById("turn").innerText = turns;
  }
}

var currTile, otherTile;

var img_array_solved = [];
for (let i = 1; i <= 25; i++) {
  img_array_solved.push(i.toString());
}
var img_arr = shuffle(img_array_solved.slice());

window.onload = function () {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let tile = document.createElement("img");
      tile.id = i.toString() + "-" + j.toString();
      tile.src = "./assets/" + img_arr.shift() + ".jpg";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
    }
  }
};
