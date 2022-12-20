/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// Step 1

// what HTML would be useful for the game board itself?
// ----------------------------------------------------
// You could have a master <div> containing 7 x 6 individual <div> elements

// how could you represent a played-piece in the HTML board?
// ----------------------------------------------------
// You could fill in a <div> using background-color: and then round the corners using border-radius

// in the JavaScript, what would be a good structure for the in-memory game board?
// ----------------------------------------------------
// You could use an array of arrays such that a master array contains six arrays with seven elements each
// For each row, you could use text or numbers to denote pieces, and null to denote empty
// So, for example ["red", "red", "blue", "blue", "red", "blue", null]
// Or [1, 1, 2, 2, 1, 2, null] if you used numbers.

// what might the flow of the game be?
// ----------------------------------------------------
// set up all the elements on the page
// start the game and designate a first player
// listen for click on a box
// when a box is clicked:
// check if box is already filled (by checking array in memory)
// if yes, do nothing
// if no, then add piece to the box (update array in memory and page)
// after piece is added (by updating the array in memory) 
// check if the game has been won (four in a row; check array in memory)
// if yes, stop the game and alert the users
// if no, then set piece to be the next player

// Zak says: 
// console log as you go
// make sure the logic is working, then you can inject HTML in the page
// then after that you can work on the animation of the button
// you mostly use arrow function when it's one line and you're using something like map to calculate the length of the string; so these are quick things


const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  let rowArray = new Array(WIDTH);
  for (let i = 0; i < rowArray.length; i++) {
    rowArray[i] = null;
  }
  for (let i = 0; i < HEIGHT; i++) {
    board.push([...rowArray])
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");


  // ---------------------- FEEDBACK --------------------------
  // the best code is self-documenting; you normally don't put comments on each line
  // you can do a block comment above but that's all
  // ---------------------- FEEDBACK --------------------------


  // TODO: add comment for this code
  const top = document.createElement("tr"); // create a table row element called top
  top.setAttribute("id", "column-top"); // set the id attribute of the top element to "column-top"
  top.addEventListener("click", handleClick); // add an event listener that runs callback handleClick()

  for (let x = 0; x < WIDTH; x++) { // iterate over the WIDTH of the table (7) and ...
    let headCell = document.createElement("td"); // create table cell element
    headCell.setAttribute("id", x); // set the id of each cell to the value of x
    top.append(headCell); // append the cell to the row, then on to the next iteration
  }
  htmlBoard.append(top); // append the row of seven new cells (with id = 0:7) to the table

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) { // iterate over the HEIGHT of the table (6) and ...
    let row = document.createElement("tr"); // create a new row
    for (let x = 0; x < WIDTH; x++) { // within each new row 
      let cell = document.createElement("td"); // create a new cell
      cell.setAttribute("id", `${y}-${x}`); // set the id attribute to 'row-colum' value
      row.append(cell); // append the cell to the row and go to next iteration
    }
    htmlBoard.append(row); // append the new labeled row "0-1", "0-2", "0-3" ... then "1-1" ... 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0

  // x is column you are clicking
  // use the column value to pull an array of 
  // board[0][x]
  // board[1][x]
  // board[2][x]
  // board[3][x]
  // board[4][x]
  // board[5][x]

  // ---------------------- FEEDBACK --------------------------
  // just need to loop through y because you know your x already
  // don't need to create an empty array or other data structure
  // I need to go from height and reverse to find an empty spot
  // Right now I'm looking top-down and finding the first empty
  // You would need to find the first occupied and then find the one above
  // hence, "gravity-defying" connect 4
  // ---------------------- FEEDBACK --------------------------

  let columnStack = [];
  for (let i = 0; i < HEIGHT; i++) {
    columnStack.push(board[i][x])
  }

  // ---------------------- FEEDBACK --------------------------
  // now find the index where there is an open spot and return it
  // otherwise, return null
  // ---------------------- FEEDBACK --------------------------

  nextAvailable = columnStack.findIndex((item) => item === null)
  if (nextAvailable === -1) {
    return null;
  } else { return nextAvailable };
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newDiv = document.createElement("div");
  newDiv.setAttribute("class", "piece");
  newDiv.classList.add("p" + currPlayer);

  // x is the column clicked
  // y is row we will put the piece
  // select the x-y pair and append the piece
  let appendElement = document.getElementById(y + "-" + x);
  console.log(appendElement);
  appendElement.append(newDiv);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
  
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id; // the + casts evt.target.id as a numeric value

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // ---------------------- FEEDBACK --------------------------
  // in an INTERVIEW ... 
  // you need to be able to talk about maintainability and extensibility
  // will this code break
  // can you change it without tons of rewrites? 
  // ---------------------- FEEDBACK --------------------------

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // ---------------------- FEEDBACK --------------------------
  // you don't have to do a terinary there; just say board[y][x] = currentPlayer before you place in the table
  // update the data source and THEN update the visual; visual should follow data source
  // change the in memory board to add "blue" or "red" to array
  // ---------------------- FEEDBACK --------------------------

  currPlayer === 1 ? board[y][x] = 1 : board[y][x] = 2;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // ---------------------- FEEDBACK --------------------------
  // if you see item that is null just break out of the loop
  // the minute a find a null, then it's not a tie
  // you don't need to check the whole thing
  // you could flatten the array and check for a single null
  // you don't need to check for === true
  // getting it to work is 25% 
  // then you refactor 2 - 3 times
  // then you send it to another engineer to review, they comment
  // are you solving the problem? are writing maintainable code? 
  // ---------------------- FEEDBACK --------------------------
  
  const spacesLeft = board.map((arr) => {
    return arr.some((items) => {
      return items === null;
    })
  }) // an array of Boolean 

  // if all members spacesLeft array are false, then end the game  
  if (!spacesLeft.some((item) => item === true)) { endGame("It's a tie!!") }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer === 1 ? currPlayer = 2 : currPlayer = 1;

}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // ---------------------- FEEDBACK --------------------------
  // Extra information ... 
  // You could just generate all the winning combinations once you know the size of the board
  // then you could check against those every time a person plays
  // rather than run this long thing for every click
  // you would put the winning combinations in an array
  // ---------------------- FEEDBACK --------------------------

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
