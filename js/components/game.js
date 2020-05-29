class Game {
  constructor() {
    this.reset();
    window.addEventListener("keyup", this.keyPressed);
  }

  keyPressed(event){
    if(game.gameOver){
      game.reset();
    } else{
      const arrow = ARROWS.find( a => a.key == event.key);
      arrow ? game.move(arrow) : void(0);
    }
  }

  reset(){
    this.boardObj = new Board(4,4);
    this.drawer = new Drawer();
    this.actualscore = 0;
    this.logs = [];
    this.selectedLog = null;
    this.gameOver = false;
    this.draw();
  }

  draw(){
    this.drawer.drawBoard(this.boardObj);
    this.drawer.drawScore(this.boardObj);
    this.drawer.drawLogs(this.logs);
  }

  move(arrow){
    this.boardObj.move(arrow, () => {
      this.setLog(arrow);
    });
    if (!this.boardObj.canContinue()) {
      this.drawer.drawGameOver();
      this.gameOver = true;
      return;
    }
    this.draw();
  }

  setLog(arrow){
    const achieve = this.boardObj.scoreSum - this.actualscore;
    const nBoard = new Board(4,4);
    this.assign(nBoard, this.boardObj);
    this.logs.push(new Log('player 1 press ' + arrow.key + ' and achieve ' + achieve + ' points ', nBoard));
    this.actualscore = this.boardObj.scoreSum;
  }

  setBoard(log){
    this.selectedLog = log;
    this.assign(this.boardObj,log.board);
    this.draw();
  }

  assign(receiver,seed){
    Object.assign(receiver,JSON.parse(JSON.stringify(seed)));
    return receiver;
  }
}

class Log{
  constructor(text, board){
    this.text = text;
    this.board = board;
  }
}