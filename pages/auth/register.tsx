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
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';

import { AuthLayout } from '../../components/layouts';
import { tesloApi } from '../../api';
import { validations } from '../../utils';
import { AuthContext } from '../../context';

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);
  const [disabledButtom, setDisabledButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setDisabledButton(true);
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
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
    <AuthLayout title='Register'>
      <form onSubmit={handleSubmit(onRegisterForm)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Create Account
              </Typography>
              <Chip
                label='El correo ya ha sido registrado'
                color='error'
                icon={<ErrorOutline />}
                className='fadeIn'
                sx={{ display: showError ? 'flex' : 'none' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='text'
                label='Nombre'
                variant='filled'
                fullWidth
                {...register('name', {
                  required: 'Este campo es requerido',
                  minLength: { value: 2, message: 'Minimo 2 caracteres' },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                  Create Account
                </Button>
              ) : (
                <Button
                  type='submit'
                  color='secondary'
                  className='circular-btn'
                  size='large'
                  fullWidth
                >
                  Create Account
                </Button>
              )}
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='center'>
              <NextLink
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : '/auth/login'
                }
                passHref
              >
                <Link underline='always'>Ya tienes cuenta?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
