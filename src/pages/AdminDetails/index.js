import React, { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from '@mui/material'
import { styled } from '@mui/styles'
import { useParams } from 'react-router-dom'
import Layout from 'src/Layout/Layout'
import { useDispatch } from 'react-redux'
import accountDefault from 'src/_mocks_/account'
import axiosClient from 'src/axiosClient'
import { useSnackbar } from 'notistack'

const MyBox = styled(Box)({
  borderRadius: 3,
  boxShadow: '#091e42 0px 1px 1px 0px',
  color: '#172b4d',
  padding: '20px 16px',
  marginBottom: '15px',
  lineHeight: '20px',
  fontSize: '14px',
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

export default function Profile() {
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

  if (loading) {
    return (
      <Layout>
        <Container component="main" maxWidth="sm">
          <CircularProgress />
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
              Admin Details
            </LabelBox>
          </Grid>
        </Grid>

        <MyBox
          component="form"
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
                <WrapInforInput elevation={0}>{user.firstName}</WrapInforInput>
              </Grid>
            </Grid>
          </InputBox>

          <InputBox>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <LabelInput elevation={0}>Last Name</LabelInput>
              </Grid>
              <Grid item xs={8}>
                <WrapInforInput elevation={0}>{user.lastName}</WrapInforInput>
              </Grid>
            </Grid>
          </InputBox>

          <InputBox>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <LabelInput elevation={0}>Phone</LabelInput>
              </Grid>
              <Grid item xs={8}>
                <WrapInforInput elevation={0}>{user.phone}</WrapInforInput>
              </Grid>
            </Grid>
          </InputBox>

          <InputBox>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <LabelInput elevation={0}>Status</LabelInput>
              </Grid>
              <Grid item xs={8}>
                <WrapInforInput elevation={0}>{user.status}</WrapInforInput>
              </Grid>
            </Grid>
          </InputBox>
        </MyBox>
      </Container>
    </Layout>
  )
}
