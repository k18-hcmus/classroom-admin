import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Stack, Typography, Button, Card } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import get from 'lodash/get'
import { useSnackbar } from 'notistack'

import { CLASSROOM_ROLE } from 'src/utils/constants'
import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import MoreMenu from 'src/components/User/MoreMenu'
import { selectUser } from 'src/redux/userSlice'

const ManageAdmins = () => {
  const [adminData, setAdminData] = useState([])
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar()
  const user = useSelector(selectUser)

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axiosClient.get('/api/user/admin/users', {
        params: {
          roles: [CLASSROOM_ROLE.ADMIN],
        },
      })
      setAdminData(response.data)
    }
    fetchAPI()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Create Time', width: 200 },
    { field: 'status', headerName: 'Status', width: 200 },
    {
      field: 'action',
      headerName: '',
      width: 100,
      renderCell: (params) => {
        return (
          <MoreMenu
            type="admin"
            user={params.row}
            handleChangeUserStatus={handleChangeUserStatus}
            handleDeleteUser={handleDeleteUser}
          />
        )
      },
    },
  ]

  const handleChangeUserStatus = async (userId, status) => {
    // prevent ban self
    if (userId === user.id) {
      enqueueSnackbar('Can not ban self.', { variant: 'error' })
      return
    }

    try {
      const response = await axiosClient.put(`/api/user/${userId}`, { status })
      const updatedUser = get(response, 'data.user')
      setAdminData((prevState) => {
        const updatingUserData = [...prevState]
        const updatedUserIndex = prevState.findIndex(
          (user) => user.id === updatedUser.id
        )
        updatingUserData[updatedUserIndex] = updatedUser
        return updatingUserData
      })
      enqueueSnackbar('Success.', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error.', { variant: 'error' })
    }
  }

  const handleDeleteUser = async (userId) => {
    // prevent delete self
    if (userId === user.id) {
      enqueueSnackbar('Can not delete self.', { variant: 'error' })
      return
    }

    try {
      await axiosClient.delete(`/api/user/${userId}`)
      setAdminData((prevState) => {
        const updatingUserData = [...prevState]
        return updatingUserData.filter((u) => u.id !== userId)
      })
      enqueueSnackbar('Success.', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Error.', { variant: 'error' })
    }
  }

  return (
    <Layout>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Admin
          </Typography>
          <Button
            variant="contained"
            onClick={() => history.push('/create-admins')}
            startIcon={<AddIcon />}
          >
            New Admin
          </Button>
        </Stack>

        <Card>
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid rows={adminData} columns={columns} pageSize={12} />
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default ManageAdmins
