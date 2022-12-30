import { CellStatus, CellType, GridForm, OnCellClick } from './types';

import { ReactNode } from 'react';
import styled from 'styled-components';

type CellProps = {
    cell: CellStatus;
    gridForm: GridForm;
    children?: JSX.Element[] | JSX.Element;
    onCellClick?: OnCellClick;
};

const CellWrapper = styled.div`
flex: 0 0 auto;
height: auto;
flex-wrap: wrap;
border: 1px solid #ccc;
box-sizing: border-box;
`;

export default function GenericCell({ cell, gridForm, onCellClick, children }: CellProps) {
    // console.log("CELL", cell);

    const style = {
        flexBasis: (100 / gridForm.rows) + '%',
        height: (100 / gridForm.columns) + '%',
    };

    const onGenericCellClick = () => {
        if (onCellClick) {
            onCellClick(cell);
        }
    }

    return (
        <CellWrapper onClick={onGenericCellClick} style={style}>
            {children}
        </CellWrapper>
    )
}