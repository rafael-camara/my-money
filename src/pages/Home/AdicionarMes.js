import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router'

const minAno = 2019
const maxAno = 2022

const AdicionarMes = () => {
  const refAno = useRef()
  const refMes = useRef()
  const [redir, setRedir] = useState('')

  const anos = []
  const meses = []

  for (let i = minAno; i <= maxAno; i++) anos.push(i)
  for (let i = 1; i <= 12; i++) meses.push(i)

  const zeroPad = num => (num < 10 ? `0${num}` : num)

  const verMes = () => {
    setRedir(`${refAno.current.value}-${refMes.current.value}`)
  }

  if (redir !== '') return <Redirect to={`/movimentacoes/${redir}`} />

  return (
    <>
      <div className='row mb-2'>
        <div className='col-2'>
          <select className='custom-select' ref={refAno}>
            {anos.map(ano => (
              <option key={ano} value={ano}>
                {ano}
              </option>
            ))}
            <option value='2020'>2020</option>
          </select>
        </div>
        <div className='col-1'>
          <select className='custom-select' ref={refMes}>
            {meses.map(zeroPad).map(mes => (
              <option key={mes} value={mes}>
                {mes}
              </option>
            ))}
          </select>
        </div>
        <button className='btn btn-outline-primary' onClick={verMes}>
          Adicionar mês
        </button>
      </div>
    </>
  )
}
export default AdicionarMes
