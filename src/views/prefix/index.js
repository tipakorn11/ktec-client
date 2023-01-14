import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Update = React.lazy(() => import('./update'))
const Insert = React.lazy(() => import('./insert'))

const Prefix = ({ SESSION }) => {
  const {permission_view, permission_edit,permission_add } = SESSION.PERMISSION

  return (
    <Switch>
      {permission_add == 1 ? <Route path={`/prefix/insert`} render={props => <Insert {...props} {...SESSION} />} /> : null }
      {permission_edit == 1 ? <Route path={`/prefix/update/:code`} render={props => <Update {...props} {...SESSION} />} /> : null }
      {permission_add == 1 ?<Route path={`/prefix/view`} render={props => <View {...props} {...SESSION} />} /> : null }
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Prefix