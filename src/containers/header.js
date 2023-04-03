import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  //CBreadcrumbRouter,
} from '@coreui/react'

import { AuthConsumer, } from '../role-access/authContext'

// routes config
// import routes from '../routes'
import {
  TheHeaderDropdown,
} from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)
  let user = JSON.parse(localStorage.getItem('session-user'));
  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  }

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
      <CHeaderBrand className="mx-auto d-lg-none" to={`/`} />
      <CHeaderNav className="d-md-down-none mr-auto"></CHeaderNav>
      <CHeaderNav className="px-3">
        <>{user.thai_fname + " " + user.thai_lname}</>
        <AuthConsumer>
        {({ _handleLogout }) => (
          <div>
            <button className='btn btn-secondary' onClick={_handleLogout}>Logout</button>
          </div>
        )}
      </AuthConsumer>
      </CHeaderNav>
      <CSubheader className="px-3 justify-content-between">
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader