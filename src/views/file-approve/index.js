import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))

const Users = ({ SESSION }) => {
//   const { permission_view } = SESSION.PERMISSION
  return (
    <Switch>
      <Route path={`/manage-users/view`} render={props => <View {...props} {...SESSION} />} />
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Users