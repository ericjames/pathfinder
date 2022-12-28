import { CellStatus, GridForm, OnCellClick } from './types';

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
    console.log("CELL", cell);

    const style = { flexBasis: (100 / gridForm.rows) + '%' };

    return (
        <CellWrapper onClick={() => onCellClick(cell)} style={style}>
            col x: {cell && cell.x}<br />
            row y: {cell && cell.y}<br />
            marked: {cell && cell.marked === 1 && 'X'}<br />
            {/* traversed: {cell && cell.traversed} */}

        </CellWrapper>
    )
}