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
  Block as BlockIcon,
} from '@mui/icons-material'
import { ACCOUNT_STATUS } from 'src/utils/constants'

import ConfirmDialog from 'src/components/ConfirmDialog'
// ----------------------------------------------------------------------

export default function UserMoreMenu({ user, handleChangeUserStatus }) {
  const userId = user.id
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false)

  const handleClickBanUser = () => setIsOpenConfirmDialog(true)

  const handleCloseBanDialog = () => setIsOpenConfirmDialog(false)

  const handleConfirmBanDialog = async () => {
    if (isUserBanned) {
      await handleChangeUserStatus(userId, ACCOUNT_STATUS.ACTIVE)
    } else {
      await handleChangeUserStatus(userId, ACCOUNT_STATUS.BAN)
    }
    setIsOpenConfirmDialog(false)
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
      </Menu>
      <ConfirmDialog
        open={isOpenConfirmDialog}
        handleClose={handleCloseBanDialog}
        handleConfirm={handleConfirmBanDialog}
        title={
          isUserBanned
            ? `Un Ban user ${user.username}?`
            : `Ban user ${user.username}?`
        }
      />
    </Box>
  )
}
