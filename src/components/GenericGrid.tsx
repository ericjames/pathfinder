import { CellStatus, GridForm, OnCellClick } from './types';

import Cell from './GenericCell';
import styled from 'styled-components';

type GridProps = {
    children: JSX.Element[] | JSX.Element;
}

const GridWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;

export default function GenericGrid({ children }: GridProps) {
    return (
        <GridWrapper>
            {children}
        </GridWrapper>
    )
}