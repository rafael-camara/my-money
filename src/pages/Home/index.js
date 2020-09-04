import React from 'react'
import AdicionarMes from './AdicionarMes'
import Meses from './Meses'
import ContentHeader from '../../elements/ContentHeader'
import Login from '../Login'

const Home = () => {
  const token = localStorage.getItem('token')

  if (token) {
    return (
      <div className="container custom-container">
        <ContentHeader text="Adicionar mês" />
        <div className="bg-white container my-3 p-3 rounded shadow-sm">
          <AdicionarMes />
          <Meses />
        </div>
      </div>
    )
  }
  return <Login />
}
export default Home
