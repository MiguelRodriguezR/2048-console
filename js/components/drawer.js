class Drawer {
  constructor() {
    this.boardView = document.querySelector('#board');
    this.scoreView = document.querySelector('#score');
    this.logView = document.querySelector('#log');
  }

  drawScore(board){
    this.scoreView.innerHTML = board.scoreSum;
  }

  drawLogs(logs){
    this.logView.innerHTML = '';
    const clogs = [...logs].reverse();
    clogs.forEach( log =>{
      let newDiv = document.createElement('div');
      newDiv.addEventListener("click", () => {game.setBoard(log)});
      newDiv.className = 'output';
      newDiv.className += game.selectedLog == log ? ' selected-Log' : '';
      newDiv.innerHTML = log.text;
      this.logView.appendChild(newDiv);
    });
  }

  drawBoard(board) {
    this.boardView.innerHTML = '';
    this.boardView.style.gridTemplateColumns = `repeat(${board.width}, 1fr)`;
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        let newDiv = document.createElement('div');
        newDiv.className = 'card section ';
        newDiv.className += board.actualBoardArray[x][y].value != 0 ? 'showed ' : 'hidden ';
        newDiv.className += board.actualBoardArray[x][y].new ? 'new ' : '';
        newDiv.innerHTML = board.actualBoardArray[x][y].value;
        this.boardView.appendChild(newDiv);

      }
    }
  }

  drawGameOver(){
    this.boardView.style.gridTemplateColumns = '1fr';
    this.boardView.innerHTML = '<div class="centered"> GAME OVER... </div> <div class="centered"> press any key to restart </div>';
  }
}
