import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Update = React.lazy(() => import('./update'))
const Insert = React.lazy(() => import('./insert'))

const Permissions = ({ SESSION }) => {
  const { permission_view,permission_add,permission_edit } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_edit == 1 ?<Route path={`/manage-permission/update/:code`} render={props => <Update {...props} {...SESSION} />} />:null}
      {permission_add == 1 ?<Route path={`/manage-permission/insert`} render={props => <Insert {...props} {...SESSION} />} />:null}
      {permission_view == 1 ? <Route path={`/manage-permission/view`} render={props => <View {...props} {...SESSION} />} />:null}
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Permissions