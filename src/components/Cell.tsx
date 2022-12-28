import { CellStatus, GridForm } from './types';

import styled from 'styled-components';

type CellProps = {
    cell: CellStatus | null;
};

const CellWrapper = styled.div`
flex: 0 1 100%;
height: 10em;
border: 1px solid #ccc;
`;

export default function Cell({ cell }: CellProps) {
    return (
        <CellWrapper>
            marked: {cell && cell.marked}<br />
            traversed: {cell && cell.traversed}

        </CellWrapper>
    )
}