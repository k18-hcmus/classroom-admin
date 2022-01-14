import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

import { selectUser, selectLoadingUser } from 'src/redux/userSlice'
import { CLASSROOM_ROLE } from 'src/utils/constants'

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const loading = useSelector(selectLoadingUser)
  const user = useSelector(selectUser)

  if (loading) {
    return <div>'loading'</div>
  }

  if (isEmpty(user)) {
    return <Redirect to="/login" />
  }

  // because this site only includes admin pages
  // so we just check role admin for all protected routes
  if (user.role !== CLASSROOM_ROLE.ADMIN) {
    return <Redirect to="/no-permission" />
  }

  return <Route {...restOfProps} render={(props) => <Component {...props} />} />
}

export default ProtectedRoute
