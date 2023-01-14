import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Insert = React.lazy(() => import('./insert'))
const Update = React.lazy(() => import('./update'))
const Detail = React.lazy(() => import('./detail'))
const News = ({ SESSION }) => {
  const { permission_view,permission_edit,permission_add } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_view == 1 ? <Route path={`/news/detail/:code`} render={props => <Detail {...props} {...SESSION} />} /> : null}
      {permission_edit == 1 ?  <Route path={`/news/update/:code`} render={props => <Update {...props} {...SESSION} />} /> : null}
      {permission_add == 1 ? <Route path={`/news/insert`} render={props => <Insert {...props} {...SESSION} />} /> : null } 
      {permission_view == 1 ? <Route path={`/news/view`} render={props => <View {...props} {...SESSION} />} /> : null }
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default News