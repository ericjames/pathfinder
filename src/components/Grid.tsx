import { CellStatus, GridForm } from './types';

import Cell from './Cell';
import styled from 'styled-components';

type GridProps = {
    gridForm: GridForm | null;
    cells: Array<CellStatus> | null;
};

const GridWrapper = styled.div`
box-shadow: 0 0.2em 1em #ddd;
margin: 2em;
min-height: 40vh;

`;

export default function Grid({ gridForm, cells }: GridProps) {
    return (
        <GridWrapper>

            {cells && cells.map((cell, i) => <Cell key={i} cell={cell} />)}

        </GridWrapper>
    )
}