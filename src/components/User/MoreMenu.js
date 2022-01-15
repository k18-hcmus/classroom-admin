import { useRef, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import {
  Box,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
} from '@mui/icons-material'
import { ACCOUNT_STATUS } from 'src/utils/constants'

import ConfirmDialog from 'src/components/ConfirmDialog'
// ----------------------------------------------------------------------

export default function UserMoreMenu({
  user,
  handleChangeUserStatus,
  handleDeleteUser,
}) {
  const userId = user.id
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenConfirmBanDialog, setIsOpenConfirmBanDialog] = useState(false)
  const [isOpenConfirmDeleteDialog, setIsOpenConfirmDeleteDialog] =
    useState(false)

  const handleClickBanUser = () => setIsOpenConfirmBanDialog(true)

  const handleCloseBanDialog = () => setIsOpenConfirmBanDialog(false)

  const handleConfirmBanDialog = async () => {
    if (isUserBanned) {
      await handleChangeUserStatus(userId, ACCOUNT_STATUS.ACTIVE)
    } else {
      await handleChangeUserStatus(userId, ACCOUNT_STATUS.BAN)
    }
    handleCloseBanDialog()
  }

  const handleClickDeleteUser = () => setIsOpenConfirmDeleteDialog(true)

  const handleCloseDeleteDialog = () => setIsOpenConfirmDeleteDialog(false)

  const handleConfirmDeleteDialog = async () => {
    await handleDeleteUser(userId)
    handleCloseDeleteDialog()
    setIsOpen(false)
  }

  const isUserBanned = user.status === ACCOUNT_STATUS.BAN

  return (
    <Box sx={{ justifyContent: 'center' }}>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 150, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          component={RouterLink}
          to={`/user-details/${userId}`}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="View Detail"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem sx={{ color: 'text.secondary' }} onClick={handleClickBanUser}>
          <ListItemIcon>
            <BlockIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary={isUserBanned ? 'Un Ban' : 'Ban'}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
        <MenuItem
          sx={{ color: 'text.secondary' }}
          onClick={handleClickDeleteUser}
        >
          <ListItemIcon>
            <DeleteIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete User"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </MenuItem>
      </Menu>
      <ConfirmDialog
        open={isOpenConfirmBanDialog}
        handleClose={handleCloseBanDialog}
        handleConfirm={handleConfirmBanDialog}
        title={
          isUserBanned
            ? `Un Ban user ${user.username}?`
            : `Ban user ${user.username}?`
        }
      />
      <ConfirmDialog
        open={isOpenConfirmDeleteDialog}
        handleClose={handleCloseBanDialog}
        handleConfirm={handleConfirmDeleteDialog}
        title={`Delete User ${user.username}?`}
      />
    </Box>
  )
}
