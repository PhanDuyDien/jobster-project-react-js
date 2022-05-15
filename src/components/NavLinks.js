import React from 'react'
import { NavLink } from 'react-router-dom'
import link from '../utils/link'

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className='nav-links'>
      {link.map((item) => {
        const { id, path, icon, text } = item
        return (
          <NavLink
            key={id}
            onClick={toggleSidebar}
            to={path}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link'
            }}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
