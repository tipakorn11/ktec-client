import React, { useState } from 'react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { Link } from 'react-router-dom';
import { AuthConsumer, } from '../role-access/authContext'
import UserModal from './UserModal';
//import GLOBAL from "../GLOBAL"
import icon_user from '../assets/icons/default-team.jpg'
const TheHeaderDropdown = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('session-user')));
  const [position, setPosition] = useState(JSON.parse(localStorage.getItem('permission')))
  const [show,setShow] = useState(false)

  return (
    <>
      <AuthConsumer>
        {({ user, _handleLogout }) => (
          <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <div className="c-avatar">
                <CImg src={icon_user} className="c-avatar-img" alt="user-profile" />
              </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem divider />
              {position.position_name != "บุคคลทั่วไป" ?

                <CDropdownItem onClick={() => setShow(true)}>
                  <CIcon name="cil-credit-card" className="mfe-2" />{user.firstname + ' ' + user.lastname + ' (' + position.position_name + ')'} <CBadge color="secondary" className="mfs-auto"></CBadge>
                </CDropdownItem>
                :
                <CDropdownItem onClick={() => setShow(true)}>
                  <CIcon name="cil-credit-card" className="mfe-2" />{'' + position.position_name + ''} <CBadge color="secondary" className="mfs-auto"></CBadge>
                </CDropdownItem>
              }
              <CDropdownItem onClick={() => _handleLogout()}>
                <CIcon name="cil-lock-locked" className="mfe-2" />Logout</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        )}
      </AuthConsumer>
      <UserModal 
        show = {show}
        onRefresh={() => setShow(false)}
      />
    </>
  )
}

export default TheHeaderDropdown