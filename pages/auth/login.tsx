import { useState, useContext } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';

import { AuthLayout } from '../../components/layouts';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { loginUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [showError, setShowError] = useState(false);
  const [disabledButtom, setDisabledButton] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setDisabledButton(true);
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setDisabledButton(false);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    setDisabledButton(false);
    const destination = router.query.p?.toString() || '/';
    router.replace(destination);
  };
  return (
    <AuthLayout title='Ingresar'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Iniciar Sesion
              </Typography>
              <Chip
                label='No reconocemos ese usuario / contraseña'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='true'
                type='email'
                label='Correo'
                variant='filled'
                fullWidth
                {...register('email', {
                  required: 'Este campo es requerido',
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='password'
                label='Contaseña'
                variant='filled'
                fullWidth
                {...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Minimo 6 caracteres' },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              {disabledButtom ? (
                <Button
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  fullWidth
                  disabled
                >
                  Ingresar
                </Button>
              ) : (
                <Button
                  type='submit'
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  fullWidth
                >
                  Ingresar
                </Button>
              )}
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : '/auth/register'
                }
                passHref
              >
                <Link underline='always'>No tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
