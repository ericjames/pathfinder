import { CellGrid, CellStatus, CellType, Direction, GridForm, OnCellClick, Path, PathsThroughMatrix } from './types';

import styled from 'styled-components';

interface ArrowProps {
    prevDirection: Direction | undefined;
    nextDirection: Direction | undefined;
    color: string;
    pathNumber: number;
};

interface ArrowPieceProps {
    prev?: Direction | undefined;
    next?: Direction | undefined;
    size?: string;
}

const ArrowWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;


const ArrowNext = styled.div<ArrowPieceProps>`
    width: 50%;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    // border-radius: 10px;
     ${({ next, size }) => {
        switch (next) {
            case (Direction.Left):
                return `top: 50%; left: 0; transform: translate(0%, -50%); height: ${size}; width: calc(50% + ${size} / 2)`;
            case (Direction.Right):
                return `top: 50%; right: 0; transform: translate(0%, -50%); height: ${size}; width: calc(50% + ${size} / 2)`;
            case (Direction.Up):
                return `top: 0; left: 50%; width: ${size}; transform: translate(-50%, 0%); height: calc(50% + ${size} / 2)`;
            case (Direction.Down):
                return `bottom: 0; left: 50%; width: ${size}; transform: translate(-50%, 0%); height: calc(50% + ${size} / 2)`;
        }
    }}
`;

const ArrowPrev = styled.div<ArrowPieceProps>`
    width: 50%;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    // border-radius: 10px;
     ${({ prev, size }) => {
        switch (prev) {
            case (Direction.Left):
                return `top: 50%; right: 0; transform: translate(0%, -50%); height: ${size}; width: calc(50% + ${size} / 2)`;
            case (Direction.Right):
                return `top: 50%; left: 0; transform: translate(0, -50%); height: ${size}; width: calc(50% + ${size} / 2)`;
            case (Direction.Up):
                return `bottom: 0; left: 50%; width: ${size}; transform: translate(-50%, 0%); height: calc(50% + ${size} / 2)`;
            case (Direction.Down):
                return `top: 0; left: 50%; width: ${size}; transform: translate(-50%, 0%); height: calc(50% + ${size} / 2)`;
        }
    }}
`;

export default function PathArrow({ color, pathNumber, prevDirection, nextDirection }: ArrowProps) {
    if (prevDirection || nextDirection) {
        const size = (pathNumber * 7) + 0 + 'px';

        const boxShadow = pathNumber === 1 ? { boxShadow: '0 0.1em 0.5em rgb(255, 166, 0)' } : {};
        return (
            <>
                <ArrowWrapper>
                    {prevDirection ? <ArrowPrev size={size} prev={prevDirection} style={{ ...boxShadow, backgroundColor: color }} /> : null}
                    {nextDirection ? <ArrowNext size={size} next={nextDirection} style={{ ...boxShadow, backgroundColor: color }} /> : null}
                    {/* Prev: {prevDirection}<br />
                    Next: {nextDirection} */}
                </ArrowWrapper>
            </>
        );
    }
    return null;
};