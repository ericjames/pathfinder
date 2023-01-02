import { CellStatus, CellType, GridForm, OnCellClick } from './types';

import GenericCell from './GenericCell';
import GenericGrid from './GenericGrid';
import React from 'react';
import styled from 'styled-components';

type GridProps = {
    gridForm: GridForm | null;
    cells: Array<CellStatus> | [];
    selectCellAndChangeAppState: OnCellClick;
};

type UICellProps = {
    type: CellType
}

const GridWrapper = styled.div`
    margin-top: 2em;
`;

const UICell = styled.div`
position: absolute;
width: 100%;
height: 100%;
top: 0;
left: 0;

display: flex;
align-items: center;
justify-content: center;

cursor: pointer;
&:hover {
    background-color: #eee;
}
`;

const Indicator = styled.div<UICellProps>`
width: 80%;
height: 80%;
margin: 5% auto;
box-sizing: border-box;
border-radius: 2em;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
font-weight: bold;
font-size: 1.2em;
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
`;



export default function InteractiveGrid({ gridForm, cells, selectCellAndChangeAppState }: GridProps) {
    // console.log("Grid changed", cells);

    return (
        <GenericGrid>
            <>
                {cells && cells.length > 0 && cells.map((cell, i) => (
                    <GenericCell key={i} cell={cell} gridForm={gridForm} onCellClick={selectCellAndChangeAppState}>
                        <UICell>
                            <Indicator type={cell.type}>
                                {cell.type === CellType.Start ? 'Starting Point' : ''}
                                {cell.type === CellType.End ? 'Ending Point' : ''}
                                {cell.type === CellType.Blocked ? 'Blocked!' : ''}
                                {/* {cell.index} */}
                                {/* INDEX: {cell && cell.index}<br />
                            col x: {cell && cell.x}<br />
                            row y: {cell && cell.y}<br />
                            type: {cell && CellType[cell.type]}<br /> */}
                            </Indicator>
                        </UICell>
                    </GenericCell>
                ))}
            </>
        </GenericGrid>
    )
}