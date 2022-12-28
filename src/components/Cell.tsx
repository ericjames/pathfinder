import { CellStatus, GridForm } from './types';

import styled from 'styled-components';

type CellProps = {
    cell: CellStatus | null;
};

const CellWrapper = styled.div`
`;

export default function Cell({ cell }: CellProps) {
    return (
        <CellWrapper>

        </CellWrapper>
    )
}