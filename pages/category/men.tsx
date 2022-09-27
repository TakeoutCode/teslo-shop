import type { NextPage } from 'next';
import { Typography } from '@mui/material';
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks/useProducts';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=men');

  return (
    <ShopLayout
      title={'Teslo-Shop - Men'}
      pageDescription={'Encuentra los mejores productos para Hombre aqui'}
    >
      <Typography variant='h1' component='h1'>
        Hombre
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Productos para Hombre
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
