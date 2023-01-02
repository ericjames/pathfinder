import { CellGrid, CellStatus, CellType, Direction, GridForm, OnCellClick, Path, PathsThroughMatrix } from './types';

import styled from 'styled-components';

type ArrowProps = {
    prevDirection: Direction | undefined;
    nextDirection: Direction | undefined;
};

const ArrowWrapper = styled.div`
`;

// Yes I know ideally I would abstract a grid style layout component that both the Grid and Paths components could use
export default function Arrow({ prevDirection, nextDirection }: ArrowProps) {
    return (
        <ArrowWrapper>
            {prevDirection}<br/>
            {nextDirection}
        </ArrowWrapper>

    );
};