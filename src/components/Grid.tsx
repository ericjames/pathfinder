import GridType from './types';
import styled from 'styled-components';

type GridProps = {
    grid: GridType | null;
};

const GridWrapper = styled.div`
`;

export default function Grid({ grid }: GridProps) {
    return (
        <GridWrapper>

        </GridWrapper>
    )
}