import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { ISize } from '../../interfaces';

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}
export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size='small'
          color={selectedSize === size ? 'primary' : 'info'}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
