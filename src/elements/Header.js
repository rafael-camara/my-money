import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [logado, setLogado] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogado(true)
      document.body.classList.remove('body-signin')
    } else {
      setLogado(false)
      document.body.classList.add('body-signin')
    }
    token ? setLogado(true) : setLogado(false)
  }, [])
  const logout = () => {
    localStorage.removeItem('token')
    setLogado(false)
    window.location.reload()
  }
  return (
    <nav className="bg-secondary fixed-top navbar navbar-dark shadow">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MyMoney
        </Link>
        {logado && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button type="button" onClick={logout} className="btn nav-link">
                Sair
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}
export default Header
