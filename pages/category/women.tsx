import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks/useProducts';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=women');

  return (
    <ShopLayout
      title={'Teslo-Shop - Women'}
      pageDescription={'Encuentra los mejores productos para Mujer aqui'}
    >
      <Typography variant='h1' component='h1'>
        Mujeres
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Productos para Mujeres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
