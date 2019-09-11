import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='bg-secondary fixed-top navbar navbar-dark shadow'>
      <div className='container'>
        <Link to='/' className='navbar-brand'>
          MyMoney
        </Link>
      </div>
    </nav>
  )
}
export default Header
