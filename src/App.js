import React, { Component } from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './scss/style.scss'

import Auth from "./component/auth/Auth"

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = React.lazy(() => import('./containers/Layout'))
const Register = React.lazy(() => import('./views/pages/Register'))
class App extends Component {
  render() {
    return (
      <Auth>
        <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch >
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} /> */}
              <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
              <Route path="/" name="หน้าแรก" render={props => <TheLayout {...props} />} />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </Auth>
    )
  }
}

export default App