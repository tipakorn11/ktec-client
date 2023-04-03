import React from 'react'
import { Route, Switch } from 'react-router-dom'

const View = React.lazy(() => import('./view'))
const Insert = React.lazy(() => import('./insert'))
const Update = React.lazy(() => import('./update'))
const Detail = React.lazy(() => import('./detail'))



const Users = ({ SESSION }) => {
  const { permission_view ,permission_edit ,permission_add } = SESSION.PERMISSION
  return (
    <Switch>
      {permission_edit === '1' ?<Route path={`/file-approve/update/:code`} render={props => <Update {...props} {...SESSION} />} />:null}
      {permission_add === '1'  ?<Route path={`/file-approve/insert`} render={props => <Insert {...props} {...SESSION} />} />:null} 
      {permission_view === '1' ? <Route path = {`/file-approve/detail/:code`} render = {props => <Detail {...props}{...SESSION}/>}/>: null}
      {permission_view === '1' ? <Route path={`/file-approve/view`} render={props => <View {...props} {...SESSION} />} /> : null}
      <Route path={`/`} render={props => <View {...props} {...SESSION} />} />

    </Switch>
  )
}

export default Users