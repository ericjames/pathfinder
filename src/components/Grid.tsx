import { CellStatus, GridForm } from './types';

import Cell from './Cell';
import styled from 'styled-components';

type GridProps = {
    gridForm: GridForm | null;
    cells: Array<Array<CellStatus>> | null;
};

const GridWrapper = styled.div`
min-height: 40vh;
.Row {
    display: flex;
}
`;

export default function Grid({ gridForm, cells }: GridProps) {
    console.log(cells);
    return (
        <GridWrapper>

            {cells && cells.length > 0 && cells.map((row, i) => (
                <div className="Row" key={i}>
                    {row.map((cell, i) => (<Cell key={i} cell={cell} />))}
                </div>
            ))}

        </GridWrapper>
    )
}