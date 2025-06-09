// const sudokuPuzzle = [
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],

//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],

//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9],
// ];

// const sudoku = (array: number[][]) => {
//   const baseOnCols = generateColArray(array);
//   array.forEach((row, rowIndex) => {
//     row.forEach((cell, colIndex) => {
//       if (cell !== 0) return;
//       const choices = assignToCell(rowIndex, colIndex);
//       if (choices.length === 0) {
//         let prev = 1;
//         assignToCell(rowIndex, colIndex - 1, prev);
//       }
//     });
//   });
//   function assignToCell(
//     rowIndex: number,
//     colIndex: number,
//     selected: number = 0
//   ) {
//     const choices = cellChoices(array, baseOnCols, rowIndex, colIndex);
//     if (!choices[selected]) assignToCell(rowIndex, colIndex - 1, 1);
//     array[rowIndex][colIndex] = choices[selected];
//     return choices;
//   }
//   return array;
// };
// const cellChoices = (
//   array: number[][],
//   colArray: number[][],
//   rowIndex: number,
//   colIndex: number
// ) => {
//   const choices = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   return choices.filter(
//     (number) =>
//       !array[rowIndex].includes(number) && !colArray[colIndex].includes(number)
//   );
// };
// const generateColArray = (array: number[][]) => {
//   const baseOnCols: number[][] = [[], [], [], [], [], [], [], [], []];
//   array.forEach((row) => {
//     row.forEach((cell, index) => {
//       baseOnCols[index].push(cell);
//     });
//   });
//   return baseOnCols;
// };

// Trying to Implement 3*3 grid first
const sudoku4x4 = [
  [0, 0, 0, 2],
  [0, 0, 3, 0],
  [0, 2, 0, 0],
  [4, 0, 0, 0],
];
const Sudoku4 = (array: number[][]) => {
  const newArray = structuredClone(array);
  const baseOnCols = generateColArray(array);
  newArray.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell !== 0) return;
      const choices = cellChoices(newArray, baseOnCols, rowIndex, colIndex);
      if (choices?.length === 0) {
        let rowPrev = 0;
        let colPrev = 1;

        let prevChoices = cellChoices(
          array,
          baseOnCols,
          rowIndex - rowPrev,
          colIndex - colPrev
        );
        // console.log(prevChoices, rowIndex - rowPrev, colIndex - colPrev);
        while (prevChoices.length < 2) {
          if (array[rowIndex][colIndex - colPrev] !== 0) {
            colPrev++;
          } else if (colIndex - colPrev === -1) {
            colPrev = 0;
            rowPrev++;
          }
          console.log(array[rowIndex - rowPrev][colIndex - colPrev]);
          prevChoices = cellChoices(
            array,
            baseOnCols,
            rowIndex - rowPrev,
            colIndex - colPrev
          );
        }
      }
      newArray[rowIndex][colIndex] = choices[0];
      baseOnCols[colIndex][rowIndex] = choices[0];
    });
  });
  // return newArray;
};

const generateColArray = (array: number[][]) => {
  const baseOnCols: number[][] = [[], [], [], []];
  array.forEach((row) => {
    row.forEach((cell, index) => {
      baseOnCols[index].push(cell);
    });
  });
  return baseOnCols;
};
function cellChoices(
  array: number[][],
  colArray: number[][],
  rowIndex: number,
  colIndex: number
) {
  const choices = [1, 2, 3, 4];
  return choices.filter(
    (number) =>
      !array[rowIndex].includes(number) && !colArray[colIndex].includes(number)
  );
}
console.log(Sudoku4(sudoku4x4));
