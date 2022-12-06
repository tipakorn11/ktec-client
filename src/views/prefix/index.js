import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Update = React.lazy(() => import('./update'))
const Insert = React.lazy(() => import('./insert'))

const Prefix = ({ SESSION }) => {
//   const { permission_view } = SESSION.PERMISSION
  return (
    <Switch>
      {/* <Route path={`/prefix/insert`} render={props => <Insert {...props} {...SESSION} />} /> */}
      <Route path={`/prefix/update/:code`} render={props => <Update {...props} {...SESSION} />} />
      <Route path={`/prefix/view`} render={props => <View {...props} {...SESSION} />} />
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Prefix