import { CellGrid, CellStatus, CellType, GridForm, OnCellClick, PathsThroughMatrix } from './types';

import GenericCell from './GenericCell';
import GenericGrid from './GenericGrid';
import PathOverlay from './PathOverlay';
import styled from 'styled-components';

type PathsProps = {
    paths: PathsThroughMatrix;
    gridForm: GridForm;
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
z-index: 1;
`;

const PathCell = styled.div`
font-size: 2em;
font-weight: bold;
display: flex;
align-items: center;
height: 100%;
`;

export default function Paths({ gridForm, cellGrid, paths, cells }: PathsProps) {

    const colors = ['#ff00ff', '#FFB399', '#00ff00', '#0000ff', '#00B3E6',
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC'];

    return <>
        {paths && paths.map((path, p) => {
            console.log("PATH", path);
            return (
                <PathsWrapper>
                    <GenericGrid key={p}>
                        {cells && cells.map((cell, c) =>
                            <GenericCell key={c} gridForm={gridForm} cell={cell}>
                                <PathCell style={{
                                    color: colors[p],
                                    marginLeft: p * 30
                                }}>
                                    {path.indexOf(cell.index) !== -1 ? path.indexOf(cell.index) : ''}
                                </PathCell>
                            </GenericCell>
                        )}
                    </GenericGrid>
                </PathsWrapper>
            )
        })
        }
    </>
}