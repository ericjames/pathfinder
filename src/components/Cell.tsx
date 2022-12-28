import { CellStatus, CellType, GridForm, OnCellClick } from './types';

import styled from 'styled-components';

type CellProps = {
    cell: CellStatus;
    onCellClick: OnCellClick;
    gridForm: GridForm;
};

const CellWrapper = styled.div`
flex: 1 1 auto;
height: 10em;
flex-wrap: wrap;
border: 1px solid #ccc;
box-sizing: border-box;
`;

export default function Cell({ cell, gridForm, onCellClick }: CellProps) {
    // console.log("CELL", cell);

    // Visual rows via CSS
    let backgroundColor = '';
    switch (cell.type) {
        case CellType.Start:
            backgroundColor = 'green';
            break;
        case CellType.End:
            backgroundColor = '#aa0000';
            break;
        case CellType.Blocked:
            backgroundColor = '#eee';
            break;
        default:
    }

    const style = {
        flexBasis: (100 / gridForm.rows) + '%',
        backgroundColor,
    };

    return (
        <CellWrapper onClick={() => onCellClick(cell)} style={style}>
            col x: {cell && cell.x}<br />
            row y: {cell && cell.y}<br />
            type: {cell && CellType[cell.type]}<br />
            {/* traversed: {cell && cell.traversed} */}

        </CellWrapper>
    )
}