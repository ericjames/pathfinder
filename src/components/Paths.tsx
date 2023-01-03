import { CellGrid, CellStatus, CellType, GridForm, OnCellClick, PathsThroughMatrix, colors } from './types';

import GenericCell from './GenericCell';
import GenericGrid from './GenericGrid';
import PathArrow from './PathArrow';
import styled from 'styled-components';

type PathsProps = {
    paths: PathsThroughMatrix;
    gridForm: GridForm | null;
    cellGrid: CellGrid;
    cells: Array<CellStatus>;
};

// Super imposed upon the UI grid
const PathsWrapper = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
`;

const PathCell = styled.div`
position: relative;
font-size: 1em;
font-weight: bold;
display: flex;
flex-wrap: wrap;
align-items: center;
height: 100%;
`;

export default function Paths({ gridForm, cellGrid, paths, cells }: PathsProps) {


    if (paths) {
        let displayedPaths = paths;
        displayedPaths.sort(function (a, b) {
            // ASC  -> a.length - b.length
            // DESC -> b.length - a.length
            return a.length - b.length;
        });

        // Limit solutions
        let limitedPaths = displayedPaths.slice(0, 5);

        // console.log(limitedPaths);

        // Theres just one solution and its direct
        if (limitedPaths[0] && limitedPaths[0].length <= 3) {
            limitedPaths = [limitedPaths[0]];
        }

        return <>
            {limitedPaths.map((path, p) => {
                // console.log("PATH", path);

                const pathIndexes = path.map((cell) => cell.cellIndex);
                // console.log(p);

                return (
                    <PathsWrapper>
                        <GenericGrid key={p}>
                            {cells && cells.map((cell, c) => {

                                const pathIndex = pathIndexes.indexOf(cell.index);
                                const pathCell = pathIndexes.indexOf(cell.index) ? path[pathIndex] : null;
                                return (
                                    <GenericCell key={c} gridForm={gridForm} cell={cell} style={{ border: 0 }}>
                                        <PathCell style={{
                                            color: colors[p],
                                            zIndex: p + 1 // Let alternate paths show up
                                        }}>
                                            {/* {pathCell ? pathIndex : ''} */}
                                            <PathArrow color={colors[p]} pathNumber={p + 1} prevDirection={pathCell?.prevDirection} nextDirection={path[pathIndex + 1]?.prevDirection} />
                                        </PathCell>
                                    </GenericCell>
                                )
                            })}
                        </GenericGrid>
                    </PathsWrapper>
                )
            })
            }
        </>
    }
    return null;
}