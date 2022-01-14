import React from 'react'
import CreateAdminForm from 'src/components/Admin/CreateAdminForm'
import {
  Box,
  Container,
  Avatar,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
} from '@mui/material'
import Layout from 'src/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { showErrMsg } from 'src/utils/Notifications'
import { styled } from '@mui/styles'

const LabelBox = styled(Typography)({
  color: '#172b4d',
  fontWeight: '600',
  letterSpacing: '-0.096px',
})

const CreateAdmin = () => {
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
          <Avatar sx={{ width: 120, height: 120 }}></Avatar>
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
              Create Admin Account
            </LabelBox>
          </Grid>

          <CreateAdminForm />
        </Grid>
      </Container>
    </Layout>
  )
}

export default CreateAdmin
