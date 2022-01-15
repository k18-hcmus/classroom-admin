import React from 'react'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Grid, Box, Button } from '@mui/material'
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
  const [users, setUsers] = useState()
  const [classrooms, setClassrooms] = useState()
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  const [idClassroom, setIdClassroom] = useState()
  let history = useHistory()
  useEffect(() => {
    async function FetchClassrooms() {
      const result = await axiosClient.get('/api/classrooms/all-classrooms')

      const editTime = result.data.map((classroom) => {
        return {
          ...classroom,
          updatedAt: format(new Date(classroom.updatedAt), 'MMM,dd,yyyy'),
        }
      })
      setClassrooms(editTime)
    }
    return FetchClassrooms()
  }, [])
  const handleDeleClasses = () => {}
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Classroom', width: 130 },
    { field: 'updatedAt', headerName: 'Created_at', width: 170 },
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
  console.log('idClass:', idClassroom)
  return (
    <Layout>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={8} sx={{ mt: 3 }}>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={classrooms}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
              <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                idClassroom={idClassroom}
              />
            </div>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Box>
    </Layout>
  )
}

export default ManageClasses
