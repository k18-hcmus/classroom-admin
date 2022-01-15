import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/authentication/Login'
import NotFound from './pages/NotFound'
import DetailClassroom from './pages/DetailClassroom'
import Profile from './pages/Profile'
import DetailGrades from './pages/DetailGrade'
import NotHavePermission from 'src/components/NotHavePermission'
import ManageAdmins from 'src/pages/ManageAdmins'
import CreateAdmin from 'src/pages/CreateAdmin'
import AdminDetails from 'src/pages/AdminDetails'
import ManageUsers from 'src/pages/ManageUsers'
import UserDetails from 'src/pages/UserDetails'

export default function Routes() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute path="/about" component={About} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute
            exact
            path="/classrooms/:id"
            component={DetailClassroom}
          />
          <ProtectedRoute
            exact
            path="/classrooms/:id/detail-grades"
            component={DetailGrades}
          />
          <ProtectedRoute
            exact
            path="/manage-admins"
            component={ManageAdmins}
          />
          <ProtectedRoute
            exact
            path="/admin-details/:id"
            component={AdminDetails}
          />
          <ProtectedRoute exact path="/manage-users" component={ManageUsers} />
          <ProtectedRoute
            exact
            path="/user-details/:id"
            component={UserDetails}
          />
          <ProtectedRoute path="/create-admins" component={CreateAdmin} />
          <Route path="/no-permission" component={NotHavePermission} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}
