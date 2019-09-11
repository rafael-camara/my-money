import React from 'react'
import AdicionarMes from './AdicionarMes'
import Meses from './Meses'
import ContentHeader from '../../elements/ContentHeader'

const Home = () => {
  return (
    <div className='container'>
      <ContentHeader text='Adicionar mês' />
      <div className='bg-white container my-3 p-3 rounded shadow-sm'>
        <AdicionarMes />
        <Meses />
      </div>
    </div>
  )
}
export default Home
