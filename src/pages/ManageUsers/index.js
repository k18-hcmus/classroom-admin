import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography, Card, Grid, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useSnackbar } from 'notistack'
import get from 'lodash/get'
import format from 'date-fns/format'
import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import MoreMenu from 'src/components/User/MoreMenu'

const ManageUsers = () => {
  const [userData, setUserData] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axiosClient.get('/api/user/admin/users')
      const editTime = response.data.map((user) => {
        return {
          ...user,
          createdAt: format(new Date(user.createdAt), 'MMM,dd,yyyy'),
        }
      })
      setUserData(editTime)
    }

    fetchAPI()
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name', width: 100 },
    { field: 'lastName', headerName: 'Last Name', width: 100 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'createdAt', headerName: 'Create Time', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'studentId', headerName: 'Student ID', width: 100 },
    {
      field: 'action',
      headerName: '',
      width: 100,
      renderCell: (params) => {
        return (
          <MoreMenu
            type="user"
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
            Manage Users
          </Typography>
        </Stack>

        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={userData} columns={columns} pageSize={5} />
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default ManageUsers
