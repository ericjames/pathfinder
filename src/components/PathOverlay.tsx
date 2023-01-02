import { CellGrid, CellStatus, CellType, GridForm, OnCellClick, Path, PathsThroughMatrix } from './types';

import styled from 'styled-components';

type PathsProps = {
    path: Path;
    gridForm: GridForm;
    cellGrid: CellGrid;
};

const CellWrapper = styled.div`
flex: 1 1 auto;
height: 10em;
flex-wrap: wrap;
border: 1px solid #ccc;
box-sizing: border-box;
`;

// Yes I know ideally I would abstract a grid style layout component that both the Grid and Paths components could use
export default function PathOverlay({ gridForm, path, cellGrid }: PathsProps) {

    return (
        <CellWrapper>

        </CellWrapper>
    )
}