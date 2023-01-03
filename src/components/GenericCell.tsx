import { CellStatus, CellType, GridForm, OnCellClick } from './types';

import { ReactNode } from 'react';
import styled from 'styled-components';

type CellProps = {
    cell: CellStatus;
    gridForm: GridForm | null;
    children?: JSX.Element[] | JSX.Element;
    onCellClick?: OnCellClick;
    style?: {};
};

const CellWrapper = styled.div`
flex: 0 0 auto;
height: auto;
overflow: hidden;
flex-wrap: wrap;
border: 1px solid #ccc;
box-sizing: border-box;
position: relative;
`;

export default function GenericCell({ cell, style, gridForm, onCellClick, children }: CellProps) {
    // console.log("CELL", cell);

    let cellStyle = {};
    if (gridForm) {
        cellStyle = {
            flexBasis: (100 / gridForm.columns) + '%',
            height: (100 / gridForm.rows) + '%',
        };
    }

    const onGenericCellClick = () => {
        if (onCellClick) {
            onCellClick(cell);
        }
    }

    return (
        <CellWrapper onClick={onGenericCellClick} style={{ ...cellStyle, ...style }}>
            {children}
        </CellWrapper>
    )
}