const spreadSheetContainer = document.querySelector("#spreadsheet-container");
const exportBtn = document.querySelector("#export-btn");
const ROWS = 10;
const COLS = 10;
const spreadsheet = [];
const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// 문자열이 아닌 객체 데이터로 생성
class Cell {
  constructor(
    isHeader,
    disabled,
    data,
    row,
    column,
    rowName,
    columnName,
    active = false
  ) {
    this.isHeader = isHeader;
    this.disabled = disabled;
    this.data = data;
    this.row = row;
    this.rowName = rowName;
    this.column = column;
    this.columnName = columnName;
    this.active = active;
  }
}

exportBtn.onclick = function (e) {
  let csv = ""; // 1,2,3, , , , , ,
                // 4,5,6, , , , , , ... 형태로 만들어야 함
  for (let i = 0; i < spreadsheet.length; i++) {
    if(i === 0) continue;
    csv +=
        spreadsheet[i]
            .filter(item => !item.isHeader) // header 부분이 아닌 것만 배열로 반환
            .map(item => item.data) // data만 array로 반환
            .join(",") + "\r\n";
  }

  const csvObj = new Blob([csv]); // Blob 객체 생성
                                 // Blob: 매개변수로 제공한 배열의 모든 데이터를 합친 데이터를 담은 새로운 Blob 객체를 반환
  const csvUrl = URL.createObjectURL(csvObj); // URL 객체로 Blob 객체를 생성

  const a = document.createElement("a");
  a.href = csvUrl;
  a.download = "spreadsheet name.csv"; // csv file name
  a.click(); // a tag click
};

initSpreadsheet();

function initSpreadsheet() {
  for (let i = 0; i < ROWS; i++) {
    let spreadsheetRow = [];
    for (let j = 0; j < COLS; j++) {
      let cellData = "";
      let isHeader = false;
      let disabled = false;

      if (j == 0) {
        cellData = i;
        isHeader = true;
        disabled = true;
      }

      // 첫 행은 a, b, c,... z
      if (i == 0) {
        cellData = alphabets[j - 1]; // 한 칸 띄고 A 시작, 첫번째 칸은 undefined
        isHeader = true;
        disabled = true;
      }

      // 첫 번째 row 칼럼은 "";
      if (!cellData) {
        // cellData is undefined
        cellData = "";
      }

      const rowName = i;
      const columnName = alphabets[j - 1]; // A, B, C,... Z

      const cell = new Cell(
        isHeader,
        disabled,
        cellData,
        i,
        j,
        rowName,
        columnName,
        false
      );
      spreadsheetRow.push(cell); // 0-0 0-1 0-2 ... 9-9
    }
    spreadsheet.push(spreadsheetRow);
  }
  drawSheet();
  console.log(spreadsheet);
}

// cell 만들기
function createCellEl(cell) {
  const cellEl = document.createElement("input");
  cellEl.className = "cell";
  cellEl.id = "cell_" + cell.row + cell.column;
  cellEl.value = cell.data;
  cellEl.disabled = cell.disabled;

  if (cell.isHeader) {
    cellEl.classList.add("header");
  }

  cellEl.onclick = () => handleCellClick(cell);
  cellEl.onchange = (e) => handleOnChange(e.target.value, cell);

  return cellEl;
}

function handleOnChange(data, cell) {
  cell.data = data;
}

function handleCellClick(cell) {
  clearHeaderActiveStates(); // 이전 active 상태 초기화

  const columnHeader = spreadsheet[0][cell.column];
  const rowHeader = spreadsheet[cell.row][0];
  // 클릭한 셀의 row, column header
  const columnHeaderEl = getElFromRowCol(columnHeader.row, columnHeader.column);
  const rowHeaderEl = getElFromRowCol(rowHeader.row, rowHeader.column);
  columnHeaderEl.classList.add("active");
  rowHeaderEl.classList.add("active");

  document.querySelector("#cell-status").innerHTML = cell.columnName + cell.rowName;
}

function clearHeaderActiveStates() {
  const headers = document.querySelectorAll(".header");

  headers.forEach((header) => {
    header.classList.remove("active");
  });
}
function getElFromRowCol(row, col) {
  return document.querySelector("#cell_" + row + col);
}

// cell 렌더링 하기
function drawSheet() {
  for (let i = 0; i < spreadsheet.length; i++) {
    const rowContainerEl = document.createElement("div");
    rowContainerEl.className = "cell-row";

    for (let j = 0; j < spreadsheet[i].length; j++) {
      const cell = spreadsheet[i][j];
      rowContainerEl.append(createCellEl(cell));
    }
    spreadSheetContainer.append(rowContainerEl);
  }
}
