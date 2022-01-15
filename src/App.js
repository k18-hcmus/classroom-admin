import React, { useRef } from 'react'
import Router from './Routes'
import { CssBaseline } from '@mui/material'
import './app.css'
import { fetchUser, setLoading } from './redux/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SnackbarProvider } from 'notistack'
import axiosClient from 'src/axiosClient'
import { Button, Slide } from '@mui/material'

function App() {
  const dispatch = useDispatch()
  const notistackRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axiosClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${localStorage.getItem('token')}`
      dispatch(fetchUser())
    } else {
      dispatch(setLoading(false))
    }
  }, [])

  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key)
  }

  return (
    <div className="App">
      <SnackbarProvider
        ref={notistackRef}
        action={(key) => (
          <Button
            onClick={onClickDismiss(key)}
            sx={{ color: (theme) => theme.palette.primary.contrastText }}
          >
            Dismiss
          </Button>
        )}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        TransitionComponent={Slide}
      >
        <CssBaseline />
        <Router />
      </SnackbarProvider>
    </div>
  )
}

export default App
