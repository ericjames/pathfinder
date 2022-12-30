import { CellStatus, CellType, GridForm, OnCellClick } from './types';

import GenericCell from './GenericCell';
import GenericGrid from './GenericGrid';
import React from 'react';
import styled from 'styled-components';

type GridProps = {
    gridForm: GridForm;
    cells: Array<CellStatus> | [];
    selectCellAndChangeAppState: OnCellClick;
};

type UICellProps = {
    type: CellType
}

const GridWrapper = styled.div`
    margin-top: 2em;
`;

const UICell = styled.div<UICellProps>`
width: 80%;
height: 80%;
margin: 5% auto;
box-sizing: border-box;
border-radius: 2em;
// padding: 1em;
text-align: center;
background: ${props => {
        switch (props.type) {
            case CellType.Start:
                return 'green';
            case CellType.End:
                return '#aa0000';
            case CellType.Blocked:
                return '#ccc';
            default:
        }
    }};
&:hover {
    background-color: #eee;
}
`;



export default function InteractiveGrid({ gridForm, cells, selectCellAndChangeAppState }: GridProps) {
    // console.log("Grid changed", cells);


    return (
        <GenericGrid>
            <>
                {cells && cells.length > 0 && cells.map((cell, i) => (
                    <GenericCell key={i} cell={cell} gridForm={gridForm} onCellClick={selectCellAndChangeAppState}>
                        <UICell type={cell.type}>
                            {cell.type === CellType.Start ? 'Starting Point' : ''}
                            {cell.type === CellType.End ? 'Ending Point' : ''}
                            {cell.type === CellType.Blocked ? 'Blocked!' : ''}
                            {/* {cell.index} */}
                            {/* INDEX: {cell && cell.index}<br />
                            col x: {cell && cell.x}<br />
                            row y: {cell && cell.y}<br />
                            type: {cell && CellType[cell.type]}<br /> */}
                        </UICell>
                    </GenericCell>
                ))}
            </>
        </GenericGrid>
    )
}