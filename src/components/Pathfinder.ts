import { CellGrid, CellIndex, CellStatus, CellType, MatrixCell, MatrixGrid, PathSearchResult, PathsThroughMatrix, QueueCell } from "./types";

export function getReachablePaths(cellGrid: CellGrid) {
    // console.log(cellGrid);
    const paths = findPaths(cellGrid);
    if (paths && paths.length > 0) {
        // Now only pass back completed paths
        const reachablePaths = paths.filter((path) => path.indexOf(PathSearchResult.Reached) > -1);
        // @TODO loop through passed paths and see if we can make lemonade out of it
        return reachablePaths;
    }
    return [];
}


function findPaths(cellGrid: CellGrid) {

    // Create new matrix from existing cell grid
    // [1,2,2,2]
    // [2,3,2,2]
    // [2,3,0,2]

    const matrix = cellGrid.map((row) => (
        row.map((cell) => (
            { cellIndex: cell.index, type: cell.type } as MatrixCell
        ))
    )) as MatrixGrid;

    const rows = matrix.length;
    const columns = matrix[0].length;

    // console.log(matrix, rows, columns);

    // 1) Create a Queue!
    let q = [] as Array<QueueCell>;

    // 2) Find Start
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < columns; ++j) {
            if (cellGrid[i][j].type === CellType.Start) {
                q.push({ cellIndex: cellGrid[i][j].index, x: i, y: j } as QueueCell);
                break;
            }
        }
    }

    let paths = [] as PathsThroughMatrix;

    let loops = 0;

    while (q.length !== 0) {
        const queueCell = q.shift();
        console.log("queueCell", queueCell);
        if (!queueCell) continue; // TypeScript needs this

        const y = queueCell.y as number;
        const x = queueCell.x as number;
        const index = queueCell.cellIndex as CellIndex;

        // Separate out queue from matrix cells to avoid recursive refs and var pollution
        let matrixCell = matrix[y][x] as MatrixCell;

        if (index === undefined) {
            console.warn("Loop problem, cell didnt provide index")
            break;
        }

        // Extend path with this cell, the previous iteration validated this move
        if (queueCell.path) {
            console.log("Extend", index);
            queueCell.path.push(index);
        } else {
            // Generate new path with this cell
            const newPath = [index];
            const i = paths.push(newPath);
            console.log("Generate new path", newPath);
            queueCell.path = paths[i - 1];
        }

        // We reached a block end
        if (matrixCell.type === CellType.Blocked) {
            queueCell.path.push(index); // Mark the path blocked
            queueCell.path.push(PathSearchResult.Blocked); // Mark the path blocked
            continue; // Path is done
        }

        // A passed block is considered blocked for now too
        // TODO allow up to a certain amount of passes
        if (matrixCell.type === CellType.Passed) {
            queueCell.path.push(index); // Mark the path blocked
            queueCell.path.push(PathSearchResult.Passed); // Mark the path blocked
            continue; // Path is done
        }

        // We reached the end
        if (matrixCell.type === CellType.End) {
            queueCell.path.push(index); // Mark the path resolved
            queueCell.path.push(PathSearchResult.Reached); // Mark the path blocked
            continue; // Path is done
        }

        // Queue cell is entered with a single path, all other direction paths diverge
        let previousPathWasUsed = false;
        const getFollowPath = () => {
            if (previousPathWasUsed) {
                const clonePath = [...queueCell.path];
                const i = paths.push(clonePath);
                return paths[i - 1];
            } else {
                previousPathWasUsed = true;
                return queueCell.path;
            }
        }

        // Now move in each direction only if it exists and wont exceed the boundary 
        // The next loop will evaluate what to do with the queue cell

        // Down
        if (matrix[y + 1] && y + 1 <= rows) {
            console.log("Go down");

            let followPath = getFollowPath();
            q.push({ cellIndex: matrix[y + 1][x].cellIndex, y: y + 1, x: x, path: followPath } as QueueCell);
        }

        // Up
        if (matrix[y - 1] && y - 1 >= 0) {
            console.log("Go up");

            let followPath = getFollowPath();
            q.push({ cellIndex: matrix[y - 1][x].cellIndex, y: y - 1, x: x, path: followPath } as QueueCell);
        }

        // Right
        if (matrix[y][x + 1] && x + 1 <= columns) {
            console.log("Go right");

            let followPath = getFollowPath();
            q.push({ cellIndex: matrix[y][x + 1].cellIndex, y: y, x: x + 1, path: followPath } as QueueCell);
        }

        // Left
        if (matrix[y][x - 1] && x - 1 >= 0) {
            console.log("Go left");

            let followPath = getFollowPath();
            q.push({ cellIndex: matrix[y][x - 1].cellIndex, y: y, x: x - 1, path: followPath } as QueueCell);
        }

        // Block this cell as traversed
        if (matrixCell.type === CellType.Open) {
            matrixCell.type = CellType.Passed;
        }

        console.log("Paths", paths, '\n');
        console.log("----------", '\n');

        loops += 1;
        if (loops > 1000) {
            console.warn("Too many loops\n\n");
            break;
        }
    }
    console.log("Final Paths", paths, '\n');
    return paths;
}