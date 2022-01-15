import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography, Card } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import get from 'lodash/get'

import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import MoreMenu from 'src/components/User/MoreMenu'

const ManageUsers = () => {
  const [userData, setUserData] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axiosClient.get('/api/user/admin/users')
      setUserData(response.data)
    }
    fetchAPI()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Create Time', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'studentId', headerName: 'Student ID', width: 150 },
    {
      field: 'action',
      headerName: '',
      width: 100,
      renderCell: (params) => {
        return (
          <MoreMenu
            user={params.row}
            handleChangeUserStatus={handleChangeUserStatus}
            handleDeleteUser={handleDeleteUser}
          />
        )
      },
    },
  ]

  const handleChangeUserStatus = async (userId, status) => {
    try {
      const response = await axiosClient.put(`/api/user/${userId}`, { status })
      const updatedUser = get(response, 'data.user')
      setUserData((prevState) => {
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
    try {
      await axiosClient.delete(`/api/user/${userId}`)
      setUserData((prevState) => {
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
            Users
          </Typography>
        </Stack>

        <Card>
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid rows={userData} columns={columns} pageSize={12} />
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default ManageUsers
