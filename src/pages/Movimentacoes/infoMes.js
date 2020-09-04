import React from 'react'
import { useMesApi } from '../../api'
import Spinner from '../../elements/Spinner'

const InfoMes = ({ data }) => {
  const { infoMes, alterarMes } = useMesApi(data)

  const changeFormPrev = evt => {
    alterarMes({ [evt.target.name]: Number(evt.target.value) })
  }

  if (infoMes.loading) return <Spinner />
  if (infoMes.data) {
    return (
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex justify-content-start'>
            <div className='d-flex align-items-center px-3'>
              <span className='w-100'>
                Previsão entrada: {infoMes.data.previsao_entrada}{' '}
              </span>
              <input
                type='text'
                className='form-control form-control-sm'
                name='previsao_entrada'
                onBlur={changeFormPrev}
              />
            </div>{' '}
            <div className='align-items-center d-flex'>/</div>{' '}
            <div className='d-flex align-items-center px-3'>
              <span className='w-100'>
                Previsão saída: {infoMes.data.previsao_saida}{' '}
              </span>
              <input
                type='text'
                className='form-control form-control-sm'
                name='previsao_saida'
                onBlur={changeFormPrev}
              />
            </div>
            <div className='align-items-center d-flex font-weight-bold ml-auto'>
              Entradas: {infoMes.data.entradas} / Saídas: {infoMes.data.saidas}
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}
export default InfoMes
