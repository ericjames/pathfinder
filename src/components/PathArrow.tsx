import { CellGrid, CellStatus, CellType, Direction, GridForm, OnCellClick, Path, PathsThroughMatrix } from './types';

import styled from 'styled-components';

interface ArrowProps {
    prevDirection: Direction | undefined;
    nextDirection: Direction | undefined;
    color: string;
    pathNumber: number;
};

interface ArrowWrapperProps {
    prev: Direction | undefined;
    next: Direction | undefined;
}

const l = '2px solid'; // Default border thickness

const ArrowWrapper = styled.div<ArrowWrapperProps>`
    width: 50.5%; // Imperfect way to line things up
    height: 50.5%;
    position: absolute;
    border-color: #222;
    border-top: ${l};
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
     ${({ prev, next }) => {
        if (!prev) {
            switch (next) {
                case (Direction.Right):
                    return `bottom: 0; right: 0;`;
                case (Direction.Left):
                    return `bottom: 0; left: 0;`;
                case (Direction.Up):
                    return `top: 0; left: 0; border: 0; border-right: ${l};`;
                case (Direction.Down):
                    return `bottom: 0; left: 0; border: 0; border-right: ${l};`;
            }
        } else if (!next) {
            switch (prev) {
                case (Direction.Right):
                    return `bottom: 0; left: 0;`;
                case (Direction.Left):
                    return `bottom: 0; right: 0;`;
                case (Direction.Up):
                    return `bottom: 0; left: 0; border: 0; border-right: ${l};`;
                case (Direction.Down):
                    return `top: 0; left: 0; border: 0; border-right: ${l};`;
            }
        } else {
            if (prev === next) { // up up down down etc
                switch (prev) {
                    case (Direction.Right):
                        return `bottom: 0; right: 0; width: 100%;`;
                    case (Direction.Left):
                        return `bottom: 0; left: 0; width: 100%;`;
                    case (Direction.Up):
                        return `border: 0; border-right: ${l}; top: 0; left: 0; height: 100%;`;
                    case (Direction.Down):
                        return `border: 0; border-right: ${l}; top: 0; left: 0; height: 100%;`;
                }
            } else if (prev === Direction.Right) {
                switch (next) {
                    case (Direction.Down):
                        return `border: 0; border-right: ${l}; border-top: ${l}; bottom: 0; left: 0;`;
                    case (Direction.Up):
                        return `border: 0; border-right: ${l}; border-bottom: ${l}; top: 0; left: 0;`;
                }
            } else if (prev === Direction.Left) {
                switch (next) {
                    case (Direction.Down):
                        return `border: 0; border-left: ${l}; border-top: ${l}; bottom: 0; right: 0;`;
                    case (Direction.Up):
                        return `border: 0; border-left: ${l}; border-bottom: ${l}; top: 0; right: 0;`;
                }
            } else if (prev === Direction.Down) {
                switch (next) {
                    case (Direction.Left):
                        return `border: 0; border-right: ${l}; border-bottom: ${l}; top: 0; left: 0;`;
                    case (Direction.Right):
                        return `border: 0; border-left: ${l}; border-bottom: ${l}; top: 0; right: 0;`;
                }
            } else if (prev === Direction.Up) {
                switch (next) {
                    case (Direction.Left):
                        return `border: 0; border-right: ${l}; border-top: ${l}; bottom: 0; left: 0;`;
                    case (Direction.Right):
                        return `border: 0; border-left: ${l}; border-top: ${l}; bottom: 0; right: 0;`;
                }
            }
        }
    }};
`;


export default function PathArrow({ color, pathNumber, prevDirection, nextDirection }: ArrowProps) {
    if (prevDirection || nextDirection) {
        return (
            <ArrowWrapper prev={prevDirection} next={nextDirection} style={{ borderWidth: -(pathNumber * 3) + 15, borderColor: color }}>
                {/* Prev: {prevDirection}<br />
                Next: {nextDirection} */}
            </ArrowWrapper>

        );
    }
    return null;
};