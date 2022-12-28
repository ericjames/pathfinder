import { CellStatus, GridForm, OnCellClick } from './types';

import Cell from './Cell';
import styled from 'styled-components';

type GridProps = {
    gridForm: GridForm;
    cells: Array<CellStatus> | [];
    onCellClick: OnCellClick;
};

const GridWrapper = styled.div`
min-height: 40vh;
    display: flex;
    flex-wrap: wrap;
`;

export default function Grid({ gridForm, cells, onCellClick }: GridProps) {
    // console.log(cells);

    const renderCells = () => {
        console.log("RENDER");
        return cells.map((cell, i) => (<Cell key={i} cell={cell} gridForm={gridForm} onCellClick={onCellClick} />));
    }
    return (
        <GridWrapper>

            {cells && cells.length > 0 && renderCells()}

        </GridWrapper>
    )
}