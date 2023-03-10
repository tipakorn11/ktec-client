import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Update = React.lazy(() => import('./update'))
const Insert = React.lazy(() => import('./insert'))

const Course = ({ SESSION }) => {
  const { permission_view,permission_edit,permission_add } = SESSION.PERMISSION

  return (
    <Switch>
      {permission_add == 1 ? <Route path={`/course/insert`} render={props => <Insert {...props} {...SESSION} />} /> : null }
      {permission_edit == 1 ? <Route path={`/course/update/:code`} render={props => <Update {...props} {...SESSION} />} /> : null }
      <Route path={`/course/view`} render={props => <View {...props} {...SESSION} />} />
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Course