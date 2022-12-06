import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

import routes from '../routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  const {  USER } = props
  // const _generatePermission = (data) => PERMISSIONS.find(item => item.menu_name === data.key) || {
  //   permission_view: false,
  //   permission_add: false,
  //   permission_edit: false,
  //   permission_approve: false,
  //   permission_cancel: false,
  //   permission_delete: false,
  // }
  // console.log();
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              // let PERMISSION = _generatePermission({ key: route.key, })
              return ( 
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  <CFade>
                    <route.component {...props} SESSION={{ USER, }} />
                  </CFade>
                )}
              />)
            })}
            <Redirect from="/" to="/" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)