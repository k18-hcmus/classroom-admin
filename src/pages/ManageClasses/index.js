import React from 'react'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import {
  Grid,
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Layout from 'src/Layout/Layout'
import axiosClient from 'src/axiosClient'
import { CLASSROOM_ROLE } from 'src/utils/constants'
import _ from 'lodash'
import format from 'date-fns/format'
import { useHistory } from 'react-router-dom'
import ConfirmDialog from './ConfirmDialog'

function ManageClasses() {
  const [classrooms, setClassrooms] = useState()
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  const [idClassroom, setIdClassroom] = useState()
  let history = useHistory()
  useEffect(() => {
    async function fetchClassrooms() {
      const result = await axiosClient.get('/api/classrooms/admin/classrooms')

      const editTime = result.data.map((classroom) => {
        return {
          ...classroom,
          createdAt: format(new Date(classroom.createdAt), 'MMM,dd,yyyy'),
        }
      })
      setClassrooms(editTime)
    }
    return fetchClassrooms()
  }, [])
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Classroom', width: 130 },
    { field: 'createdAt', headerName: 'Created Time', width: 170 },
    {
      field: 'teacher',
      headerName: 'Teacher',
      width: 170,
      valueGetter: (params) => {
        return params.getValue(params.id, 'Owner').email
      },
    },
    {
      field: 'Action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => history.push(`/classrooms/${params.row.id}`)}
            >
              <EditIcon />
            </Button>
            <Button
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: 'Are you sure to Delete classroom',
                  subTitle: "you can't undo this operation",
                })
                setIdClassroom(params.row.id)
              }}
            >
              <DeleteIcon />
            </Button>
          </>
        )
      },
    },
  ]
  return (
    // <Layout>
    //   <Box sx={{ flexGrow: 1 }}>
    //     <Grid container spacing={3}>
    //       <Grid item xs></Grid>
    //       <Grid item xs={8} sx={{ mt: 3 }}>
    //         <div style={{ height: 400, width: '100%' }}>
    //           <DataGrid
    //             rows={classrooms}
    //             columns={columns}
    //             pageSize={5}
    //             rowsPerPageOptions={[5]}
    //             disableSelectionOnClick
    //           />
    //           <ConfirmDialog
    //             confirmDialog={confirmDialog}
    //             setConfirmDialog={setConfirmDialog}
    //             idClassroom={idClassroom}
    //           />
    //         </div>
    //       </Grid>
    //       <Grid item xs></Grid>
    //     </Grid>
    //   </Box>
    // </Layout>

    <Layout>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Manage Classrooms
          </Typography>
        </Stack>

        <Card>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={classrooms}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </div>
        </Card>
      </Container>
    </Layout>
  )
}

export default ManageClasses
