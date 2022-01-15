import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography, Card } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import MoreMenu from 'src/components/User/MoreMenu'

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
      return <MoreMenu userId={params.row.id} />
    },
  },
]

const ManageAdmins = () => {
  const [adminData, setAdminData] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axiosClient.get('/api/user/admin/users')
      setAdminData(response.data)
    }
    fetchAPI()
  }, [])

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
            <DataGrid rows={adminData} columns={columns} pageSize={12} />
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default ManageAdmins
