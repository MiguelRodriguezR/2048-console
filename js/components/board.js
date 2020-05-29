class Board {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.actualBoardArray = [];
    this.emptyPositions = [];
    this.scoreSum = 0;
    this.setupBoard();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  deleteEmpty(position) {
    if (this.emptyPositions.length > 0) {
      return this.emptyPositions.splice(position, 1);
    }
  }

  addNewNumber() {
    if(this.emptyPositions.length > 0){
      const random = this.getRandomInt(0, this.emptyPositions.length);
      const position = this.emptyPositions[random];
      this.actualBoardArray[position.x][position.y].value = Math.random() < 0.4 ? 4 : 2;
      this.actualBoardArray[position.x][position.y].new = true;
      this.deleteEmpty(random);
    }
  }

  setEmptyPositions() {
    this.emptyPositions = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.actualBoardArray[x][y].value == 0) {
          this.emptyPositions.push({x, y});
        } else{
          this.actualBoardArray[x][y].new = false;
        }
      }
    }
  }

  getBoardCard(x, y, direction, boardArray) {
    const ax = x + direction.x;
    const ay = y + direction.y;
    return ax > -1 && ax < this.width && ay > -1 && ay < this.height ? boardArray[ax][ay] : null;
  }

  moveUntilColision(x, y, direction, boardArray) {
    const actual = this.getBoardCard(x, y, {x: 0, y: 0}, boardArray);
    const next = this.getBoardCard(x, y, direction, boardArray);
    if(next && next.value === 0){
      next.value = actual.value;
      actual.value = 0;
      return this.moveUntilColision(x + direction.x, y + direction.y, direction,boardArray);
    } else if(next && next.value === actual.value && !next.matched){
      actual.value = 0;
      next.value = next.value*2;
      next.matched = true;
      return next.value
    }
    return 0;
  }

  setBoard(boardArray, direction) {
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = this.height - 1; y >= 0; y--) {
        this.scoreSum += this.moveUntilColision(x, y, direction, boardArray);
      }
    }
    return boardArray;
  }

  unMatchAll(){
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = this.height - 1; y >= 0; y--) {
        this.actualBoardArray[x][y].matched = false;
      }
    }
  }

  getArray(direction, intoarray){
    const array = [...intoarray];
    if(direction.x < 0){
      return array.reverse();
    }
    if(direction.y < 0){
      array.forEach( a => {a.reverse()});
      return array;
    }
    return array;
  }

  getDirection(direction){
    return direction.x < 0 || direction.y < 0 ? {x: (direction.x * -1) , y: (direction.y * -1)} : direction;
  }

  move(direction, callback) {
    this.actualBoardArray = this.getArray(
        direction,
        this.setBoard(this.getArray(direction,this.actualBoardArray), this.getDirection(direction))
    );
    this.unMatchAll();
    this.setEmptyPositions();
    this.addNewNumber();
    return callback();
  }

  hasMovements(x,y){
    const o = this.actualBoardArray;
    const condition1 = x > 0 ? o[ x -1][y].value === 0 || o[ x -1][y].value === o[x][y].value : false;
    const condition2 = x < this.width -1 ? o[ x + 1][y].value === 0 || o[ x + 1][y].value === o[x][y].value : false;
    const condition3 = y > 0 ? o[x][y - 1].value === 0 || o[x][y - 1].value === o[x][y].value : false;
    const condition4 = y < this.height -1 ? o[x][y + 1].value === 0 || o[x][y + 1].value === o[x][y].value : false;
    return condition1 || condition2 || condition3 || condition4
  }

  canContinue(){
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = this.height - 1; y >= 0; y--) {
        if(this.hasMovements(x,y)){
          console.log()
          return true;
        }
      }
    }
    return false;
  }

  setupBoard() {
    for (let x = 0; x < this.width; x++) {
      this.actualBoardArray[x] = [];
      for (let y = 0; y < this.height; y++) {
        this.actualBoardArray[x][y] = new BoardCard(0);
        this.emptyPositions.push({x, y});
      }
    }
    this.addNewNumber();
    this.addNewNumber();
  }
}

class BoardCard {

  constructor(value) {
    this.value = value;
    this.matched = false;
    this.new = true;
  }

}