import React from 'react'
import Router from './Routes'
import { CssBaseline } from '@mui/material'
import './app.css'
import { fetchUser, setLoading } from './redux/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axiosClient from 'src/axiosClient'

function App() {
  const dispatch = useDispatch()

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

  return (
    <div className="App">
      <CssBaseline />
      <Router />
    </div>
  )
}

export default App
