import React from 'react'
import { Box, Grid, Paper, TextField } from '@mui/material'
import * as Yup from 'yup'
import { useFormik, FormikProvider } from 'formik'
import { LoadingButton } from '@mui/lab'

import { styled } from '@mui/styles'
import { useSnackbar } from 'notistack'
import axiosClient from 'src/axiosClient'
import get from 'lodash/get'
import { CLASSROOM_ROLE } from 'src/utils/constants'

const MyBox = styled(Box)({
  borderRadius: 3,
  boxShadow: '#091e42 0px 1px 1px 0px',
  color: '#172b4d',
  padding: '20px 16px',
  marginBottom: '15px',
  lineHeight: '20px',
  fontSize: '14px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const InputBox = styled(Box)({
  display: 'flex',
  lineHeight: '20px',
  padding: '10px 16px',
  width: '100%',
})
const LabelInput = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: '#6b778c',
  fontWeight: '600',
}))
const WrapInforInput = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  color: '#172b4d',
}))

export default function CreateAdminForm() {
  const { enqueueSnackbar } = useSnackbar()

  const CreateAdminSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .email('Invalid email address')
      .required('Email required'),
    username: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Username required'),
    password: Yup.string().required('Password is required'),
    firstName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!'),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: CreateAdminSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosClient.post('/api/auth/create', {
          ...values,
          role: CLASSROOM_ROLE.ADMIN,
        })
        enqueueSnackbar('Create Account Success.', { variant: 'success' })
        resetForm()
      } catch (err) {
        enqueueSnackbar(
          get(err, 'response.data.message', 'Error when create account'),
          { variant: 'error' }
        )
      }
    },
  })

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik

  return (
    <FormikProvider value={formik}>
      <MyBox component="form" onSubmit={handleSubmit} noValidate>
        <InputBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelInput elevation={0}>Email</LabelInput>
            </Grid>
            <Grid item xs={8}>
              <WrapInforInput elevation={0}>
                <TextField
                  fullWidth
                  variant="standard"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </WrapInforInput>
            </Grid>
          </Grid>
        </InputBox>

        <InputBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelInput elevation={0}>Username</LabelInput>
            </Grid>
            <Grid item xs={8}>
              <WrapInforInput elevation={0}>
                <TextField
                  fullWidth
                  variant="standard"
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                />
              </WrapInforInput>
            </Grid>
          </Grid>
        </InputBox>

        <InputBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelInput elevation={0}>Password</LabelInput>
            </Grid>
            <Grid item xs={8}>
              <WrapInforInput elevation={0}>
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </WrapInforInput>
            </Grid>
          </Grid>
        </InputBox>

        <InputBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelInput elevation={0}>First Name</LabelInput>
            </Grid>
            <Grid item xs={8}>
              <WrapInforInput elevation={0}>
                <TextField
                  fullWidth
                  variant="standard"
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </WrapInforInput>
            </Grid>
          </Grid>
        </InputBox>

        <InputBox>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelInput elevation={0}>Last Name</LabelInput>
            </Grid>
            <Grid item xs={8}>
              <WrapInforInput elevation={0}>
                <TextField
                  fullWidth
                  variant="standard"
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </WrapInforInput>
            </Grid>
          </Grid>
        </InputBox>

        <LoadingButton
          size="medium"
          disabled={!formik.isValid || !formik.dirty}
          loading={isSubmitting}
          type="submit"
          variant="contained"
        >
          Create Account
        </LoadingButton>
      </MyBox>
    </FormikProvider>
  )
}
