const sudokuPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],

  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],

  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const sudoku = (array: number[][]) => {
  const baseOnCols = generateColArray(array);
  array.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== 0) return;
      const choices = assignToCell(rowIndex, colIndex);
      if (choices.length === 0) {
        let prev = 1;
        assignToCell(rowIndex, colIndex - 1, prev);
      }
    });
  });
  function assignToCell(
    rowIndex: number,
    colIndex: number,
    selected: number = 0
  ) {
    const choices = cellChoices(array, baseOnCols, rowIndex, colIndex);
    if (!choices[selected]) assignToCell(rowIndex, colIndex - 1, 1);
    array[rowIndex][colIndex] = choices[selected];
    return choices;
  }
  // return array;
};
const cellChoices = (
  array: number[][],
  colArray: number[][],
  rowIndex: number,
  colIndex: number
) => {
  const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return choices.filter(
    (number) =>
      !array[rowIndex].includes(number) && !colArray[colIndex].includes(number)
  );
};
const generateColArray = (array: number[][]) => {
  const baseOnCols: number[][] = [[], [], [], [], [], [], [], [], []];
  array.forEach((row) => {
    row.forEach((cell, index) => {
      baseOnCols[index].push(cell);
    });
  });
  return baseOnCols;
};

console.log(sudoku(sudokuPuzzle));
