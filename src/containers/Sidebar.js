import React, { useState, useEffect, } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  //CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import logo from '../assets/image/logo_sidebar_ktec.png'

import accessMenu from './menu'

const TheSidebar = (props) => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const { PERMISSIONS } = props
  let USER = JSON.parse(localStorage.getItem('session-user'));

  const [navigations, setNavigation] = useState([])
  useEffect(() => {
    setNavigation(accessMenu({ PERMISSIONS, USER}))
  }, [PERMISSIONS],[USER])

  return (
    <CSidebar show={show} onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}>
      <img src={logo} className="px-auto d-block bottom-shadow" alt="logo" />
      <CSidebarNav>
        <div style={{ color: '#6b6c6d', padding: 12, }}>
          {/* <strong>ERP</strong> - <strong style={{ color: '#818080', fontSize: '75%', }}>Enterprise resource planning</strong> */}
        </div>
        <CCreateElement
          items={navigations}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      {/* <CSidebarMinimizer className="c-d-md-down-none" /> */}
    </CSidebar>
  )
}

export default React.memo(TheSidebar)