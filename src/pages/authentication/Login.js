import React, { useState } from 'react'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Container,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { styled } from '@mui/styles'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import axiosClient from '../../axiosClient'
import { useHistory } from 'react-router-dom'
import { showSuccessMsg, showErrMsg } from '../../utils/Notifications'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin, selectLoadingUser, selectUser } from 'src/redux/userSlice'

const SubmitButton = styled(Button)({
  width: '100%',
  border: 0,
  borderRadius: 3,
  color: 'white',
  height: 48,
  padding: '0 30px',
  marginBottom: '15px',
})
export default function SignIn() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [msg, setMsg] = useState({ err: '', success: '' })
  const loading = useSelector(selectLoadingUser)
  const user = useSelector(selectUser)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setDisabled(true)
    const data = new FormData(event.currentTarget)
    try {
      const response = await axiosClient.post('/api/auth/login', {
        username: data.get('email'),
        password: data.get('password'),
      })
      if (response.data.success) {
        setMsg({ err: '', success: response.data.message })
        localStorage.setItem('token', response.data.token)

        axiosClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${localStorage.getItem('token')}`

        const { user } = response.data
        dispatch(userLogin(user))
        history.push('/home')
      }
      if (!response.data.success) {
        setMsg({ err: response.data.message, success: '' })
      }
    } catch (err) {
      setMsg({ err: get(err, 'response.data.message', 'error'), success: '' })
    } finally {
      setDisabled(false)
    }
  }

  if (loading) {
    return <div>'loading'</div>
  }

  if (!isEmpty(user)) {
    history.push('/')
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {msg.success && showSuccessMsg(msg.success)}
        {msg.err && showErrMsg(msg.err)}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={disabled}
          >
            Sign In
          </SubmitButton>
        </Box>
      </Box>
    </Container>
  )
}
