import React from 'react'
import {
  TheContent,
  TheSidebar,
  //TheFooter,
  TheHeader
} from './index'

import { AuthConsumer, } from '../role-access/authContext'

const Login = React.lazy(() => import('../views/pages/Login'))

const TheLayout = () => {
  return (
    
    <AuthConsumer>
      {({ authenticated, user, permissions }) => (
        authenticated ? (
          <div className="c-app c-default-layout">
            <TheSidebar PERMISSIONS={permissions} />
            <div className="c-wrapper">
              <TheHeader />
              <div className="c-body">
                <TheContent PERMISSIONS={permissions} USER={user} />
              </div>
              {/* <TheFooter /> */}
            </div>
          </div>
        ) : <Login />
      )}
    </AuthConsumer>
  )
}

export default TheLayout