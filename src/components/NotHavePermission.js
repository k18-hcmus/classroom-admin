import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'

import { userLogout } from 'src/redux/userSlice'

const NotHavePermissions = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/login')
  }

  return (
    <div>
      <p>You don't have any permissions to access this page</p>
      <Button onClick={handleLogout}>Try other account</Button>
    </div>
  )
}

export default NotHavePermissions
