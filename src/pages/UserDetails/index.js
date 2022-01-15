import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { styled } from '@mui/styles'
import * as Yup from 'yup'
import { useFormik, FormikProvider } from 'formik'
import { useDispatch } from 'react-redux'
import Layout from 'src/Layout/Layout'
import { updateUser } from 'src/redux/userSlice'
import accountDefault from 'src/_mocks_/account'
import { useSnackbar } from 'notistack'
import { useParams } from 'react-router-dom'
import axiosClient from 'src/axiosClient'
import { CLASSROOM_ROLE } from 'src/utils/constants'
import get from 'lodash/get'

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
})
const LabelBox = styled(Typography)({
  color: '#172b4d',
  fontWeight: '600',
  letterSpacing: '-0.096px',
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

export default function UserDetails() {
  const [isEdit, setIsEdit] = useState(false)
  const [inputDisabled, setInputDisabled] = useState(true)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axiosClient.get(`/api/user/${id}`)
        setUser(response.data)
      } catch (error) {
        enqueueSnackbar(`Error when fetch user with id: ${id}`, {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAPI()
  }, [])

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().max(50, 'Too Long!'),
    lastName: Yup.string().max(50, 'Too Long!'),
    studentId: Yup.string().max(50, 'Too Long!'),
    phone: Yup.string().max(50, 'Too Long!'),
  })

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      phone: user.phone || '',
      studentId: user.studentId,
    },
    enableReinitialize: true,
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        console.log(values)
        const response = await axiosClient.put(`/api/user/${id}`, values)
        setUser(get(response, 'data.user', user))
        setIsEdit(false)
        enqueueSnackbar('Update User Success.', { variant: 'success' })
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

  const handleEdit = () => {
    setIsEdit(true)
    setInputDisabled(false)
  }

  const showButtonEdit = () => {
    return (
      <Button onClick={handleEdit} variant="contained">
        Edit User Profile
      </Button>
    )
  }

  const showTextInput = (field, value) => {
    return (
      <TextField
        fullWidth
        variant="standard"
        {...getFieldProps(field)}
        error={Boolean(touched[field] && errors[field])}
        helperText={touched[field] && errors[field]}
      ></TextField>
    )
  }

  // --- Render Method --- //

  if (loading) {
    return (
      <Layout>
        <Container component="main" maxWidth="sm">
          <CircularProgress />
        </Container>
      </Layout>
    )
  }

  if (user.role === CLASSROOM_ROLE.ADMIN) {
    return (
      <Layout>
        <Container component="main" maxWidth="sm">
          <div>You can not see Admin details in User Details page</div>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{ width: 120, height: 120 }}
            src={user.picture ? user.picture : accountDefault.photoURL}
          ></Avatar>
          <Typography component="h1" variant="h5" mt={2}>
            Profile
          </Typography>
        </Box>
        <Grid
          container
          justifyContent="space-between"
          direction="row"
          alignItems="center"
        >
          {/* Label Information */}
          <Grid item>
            <LabelBox component="h1" variant="h5" mt={2}>
              Information
            </LabelBox>
          </Grid>
          <Grid item>{isEdit === false && showButtonEdit()}</Grid>
        </Grid>

        <FormikProvider value={formik}>
          <MyBox component="form" onSubmit={handleSubmit} noValidate>
            <InputBox>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LabelInput elevation={0}>Username</LabelInput>
                </Grid>
                <Grid item xs={8}>
                  <WrapInforInput elevation={0}>{user.username}</WrapInforInput>
                </Grid>
              </Grid>
            </InputBox>

            <InputBox>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LabelInput elevation={0}>Email</LabelInput>
                </Grid>
                <Grid item xs={8}>
                  <WrapInforInput elevation={0}>{user.email}</WrapInforInput>
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
                    {isEdit
                      ? showTextInput('firstName', user.lastName)
                      : user.lastName}
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
                    {isEdit
                      ? showTextInput('lastName', user.lastName)
                      : user.lastName}
                  </WrapInforInput>
                </Grid>
              </Grid>
            </InputBox>

            <InputBox>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LabelInput elevation={0}>Student ID</LabelInput>
                </Grid>
                <Grid item xs={8}>
                  <WrapInforInput elevation={0}>
                    {isEdit
                      ? showTextInput('studentId', user.studentId)
                      : user.studentId}
                  </WrapInforInput>
                </Grid>
              </Grid>
            </InputBox>

            <InputBox>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <LabelInput elevation={0}>Phone Number</LabelInput>
                </Grid>
                <Grid item xs={8}>
                  <WrapInforInput elevation={0}>
                    {isEdit ? showTextInput('phone', user.phone) : user.phone}
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
              Update
            </LoadingButton>
          </MyBox>
        </FormikProvider>
      </Container>
    </Layout>
  )
}
