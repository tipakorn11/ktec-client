import React, { Component } from 'react'
import Swal from 'sweetalert2'
//import jwt_decode from "jwt-decode"

import { AuthProvider } from '../../role-access/authContext'

import Authoring from './Authoring'

import GLOBAL from '../../GLOBAL'

import { UserModel, } from '../../models'

const user_model = new UserModel()

class Auth extends Component {
  state = {
    authcertifying: true,
    authenticated: false,
    permissions: [],
    user: {},
  }

  componentDidMount() {
    this._initiateAuthentication()
  }

  _checkLogin = async ({ username, password, }) => {
    const res_login = await user_model.checkLogin({ username, password, })
    if (res_login.require === false) {
      this.setState({ authcertifying: false, }, () => {
        Swal.fire({ title: "ไม่สามารถล็อคอินได้ !", text: 'คำขอเกิดข้อผิดพลาด', icon: "error", })
      })
    } else if (res_login.data.length === 0) {
      this.setState({ authcertifying: false, }, () => {
        Swal.fire({ title: "ไม่สามารถล็อคอินได้ !", text: 'โปรดตรวจสอบชื่อผู้ใช้และรหัสผ่านของคุณ', icon: "warning", })
      })
    } else {
      try {
        localStorage.setItem('x-access-token', res_login.token)
        localStorage.setItem('session-user', JSON.stringify(res_login.data[0]))
        localStorage.setItem('permission',JSON.stringify(res_login.permission[0]));
        localStorage.setItem('temp_permission',JSON.stringify(res_login.permission));
       

        GLOBAL.ACCESS_TOKEN = { 'x-access-token': res_login.token }
        GLOBAL.PERMISSION.permission = res_login.permission[0].permission;

        this.setState({
          authcertifying: false,
          authenticated: true,
          permissions: GLOBAL.PERMISSION.permission || [],
          user: res_login.data[0],
        })
      } catch (e) {
        this.setState({
          authcertifying: false,
        }, () => {
          console.log('_checkLogin ', e)
        })
      }
    }
  }
  _isAuth = async () => {
    const auth = await user_model.auth();
    if (auth.require === false) {
      this.setState({ authcertifying: false, }, () => {
        Swal.fire({ title: "ไม่สามารถระบุตัวตนได้!", text: 'กรุณาล็อคอินอีกครั้ง', icon: "error", })
      })
    }else{
      let permission = JSON.parse(localStorage.getItem('permission') );
      GLOBAL.ACCESS_TOKEN = { 'x-access-token': localStorage.getItem('x-access-token') }
      GLOBAL.PERMISSION.permission = permission.permission;
     
      this.setState({
        authcertifying: false,
        authenticated: true,
        permissions: permission.permission || [],
        user: JSON.parse(localStorage.getItem('session-user') ),
      })
    }
  }
  _initiateAuthentication = () => {
    try {
      if (this.state.authcertifying && !this.state.authenticated) {
        const token = localStorage.getItem('x-access-token')
        if (token) {
          this._isAuth();
        } else {
          this.setState({ authcertifying: false, })
        }
      }
    } catch (e) {
      this.setState({
        authcertifying: false,
      }, () => {
        localStorage.clear()

        console.log('_initiateAuthentication ', e)
      })
    }
  }
  _handleLogin = (data) => !this.state.authcertifying && this.setState({ authcertifying: true, }, () => this._checkLogin(data))
  _handleLogout = () => {
    try {
      localStorage.clear()
      window.location.reload()
    } catch (e) {
      console.log('_handleLogout ', e)
    }
  }

  render() {
    return (
      <AuthProvider
        value={{
          ...this.state,
          _handleLogin: this._handleLogin,
          _handleLogout: this._handleLogout,
          _initiateAuthentication: this._initiateAuthentication,
        }}
      >
        {this.state.authcertifying ? <Authoring /> : this.props.children}
      </AuthProvider>
    )
  }
}

export default Auth