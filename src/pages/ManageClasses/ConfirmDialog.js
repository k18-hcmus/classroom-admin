import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from '@mui/material'
import React from 'react'
import axiosClient from 'src/axiosClient'

function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog, idClassroom } = props
  const handleClickNo = () => {
    setConfirmDialog({ isOpen: false })
  }
  const handleClickYes = async () => {
    setConfirmDialog({ isOpen: false })
    const deleteClass = await axiosClient.delete(
      `/api/classrooms/delete/${idClassroom}`
    )
  }
  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography variant="h6">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickNo}>No</Button>
        <Button onClick={handleClickYes}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog
