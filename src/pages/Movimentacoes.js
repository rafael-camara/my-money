import React, { useState } from 'react'

import Rest from '../utils/rest'
import Spinner from '../elements/Spinner'
import ContentHeader from '../elements/ContentHeader'

const baseURL = 'https://mymoney-a7442.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

const Movimentacoes = ({ match }) => {
  const INITIAL_FORM = { descricao: '', valor: '' }
  const data = useGet(`movimentacoes/${match.params.data}`)
  const dataMeses = useGet(`meses/${match.params.data}`)
  const [, patch] = usePatch()
  const [, salvar] = usePost(`movimentacoes/${match.params.data}`)
  const [, remover] = useDelete()
  const [form, setForm] = useState(INITIAL_FORM)

  const onChangeForm = evt => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    })
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const salvarMovimentacao = async () => {
    if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvar({
        ...form,
        valor: parseFloat(form.valor)
      })
      setForm(INITIAL_FORM)
      data.refetch()
      await sleep(3000)
      dataMeses.refetch()
    }
  }

  const removerMovimentacao = async id => {
    await remover(`/movimentacoes/${match.params.data}/${id}`)
    data.refetch()
    await sleep(3000)
    dataMeses.refetch()
  }

  const changeFormPrev = evt => {
    patch(`meses/${match.params.data}`, {
      [evt.target.name]: Number(evt.target.value)
    })
  }

  return (
    <div className='container'>
      <ContentHeader text={`Movimentações em ${match.params.data}`} />
      <div className='bg-white container my-3 p-3 rounded shadow-sm'>
        {dataMeses.loading ? (
          <Spinner />
        ) : (
          !dataMeses.loading &&
          dataMeses.data && (
            <div className='card'>
              <div className='card-body'>
                <div className='d-flex justify-content-start'>
                  <div className='d-flex align-items-center px-3'>
                    <span className='w-100'>
                      Previsão entrada: {dataMeses.data.previsao_entrada}{' '}
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
                      Previsão saída: {dataMeses.data.previsao_saida}{' '}
                    </span>
                    <input
                      type='text'
                      className='form-control form-control-sm'
                      name='previsao_saida'
                      onBlur={changeFormPrev}
                    />
                  </div>
                  <div className='align-items-center d-flex font-weight-bold ml-auto'>
                    Entradas: {dataMeses.data.entradas} / Saídas:{' '}
                    {dataMeses.data.saidas}
                  </div>
                </div>
              </div>
            </div>
          )
        )}
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {data.data &&
              Object.keys(data.data).map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td>{data.data[movimentacao].valor} </td>
                    <td>
                      <button
                        className='btn btn-outline-danger'
                        onClick={() => removerMovimentacao(movimentacao)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                )
              })}
            <tr>
              <td>
                <input
                  type='text'
                  className='form-control form-control-sm w-50'
                  value={form.descricao}
                  name='descricao'
                  placeholder='Descricao'
                  onChange={onChangeForm}
                />
              </td>
              <td>
                <input
                  type='text'
                  className='form-control form-control-sm w-50'
                  value={form.valor}
                  name='valor'
                  placeholder='Valor'
                  onChange={onChangeForm}
                />
              </td>
              <td>
                <button
                  className='btn btn-outline-success'
                  onClick={salvarMovimentacao}
                >
                  +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default Movimentacoes
