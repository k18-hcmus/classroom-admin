import React, { useState, useEffect } from 'react'
import { Container, Stack, Typography, Button, Card } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import { CLASSROOM_ROLE } from 'src/utils/constants'
import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import MoreMenu from 'src/components/Admin/MoreMenu'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'createdAt', headerName: 'Create Time', width: 200 },
  {
    field: 'action',
    headerName: '',
    width: 100,
    renderCell: (params) => {
      console.log(params)
      return <MoreMenu />
    },
  },
]

const ManageAdmins = () => {
  const [adminData, setAdminData] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await axiosClient.get('/api/user/all', {
        params: {
          roles: [CLASSROOM_ROLE.ADMIN],
        },
      })
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
            Admin
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
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
