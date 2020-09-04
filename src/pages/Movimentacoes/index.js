import React from 'react'
import { Redirect } from 'react-router-dom'

import { useMovimentacaoApi } from '../../api'
import InfoMes from './infoMes'
import AdcionarMovimentacao from './adicionarMovimentacao'

import ContentHeader from '../../elements/ContentHeader'

const Movimentacoes = ({ match }) => {
  const {
    movimentacoes,
    salvarNovaMovimentacao,
    removeMovimentacao,
  } = useMovimentacaoApi(match.params.data)

  const sleep = time => new Promise(resolve => setTimeout(resolve, time))

  const salvarMovimentacao = async dados => {
    await salvarNovaMovimentacao(dados)
    movimentacoes.refetch()
    await sleep(3000)
    // infoMes.refetch()
  }

  const removerMovimentacao = async id => {
    await removeMovimentacao(`/movimentacoes/${match.params.data}/${id}`)
    movimentacoes.refetch()
    await sleep(3000)
    // infoMes.refetch()
  }

  if (movimentacoes.error === 'Permission denied') {
    return <Redirect to="/" />
  }

  const token = localStorage.getItem('token')

  if (token) {
    return (
      <div className="container">
        <ContentHeader text={`Movimentações em ${match.params.data}`} />
        <div className="bg-white container my-3 p-3 rounded shadow-sm">
          <InfoMes data={match.params.data} />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {movimentacoes.data &&
                Object.keys(movimentacoes.data).map(movimentacao => {
                  return (
                    <tr key={movimentacao}>
                      <td>{movimentacoes.data[movimentacao].descricao}</td>
                      <td>{movimentacoes.data[movimentacao].valor} </td>
                      <td>
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removerMovimentacao(movimentacao)}
                        >
                          -
                        </button>
                      </td>
                    </tr>
                  )
                })}
              <AdcionarMovimentacao
                salvarNovaMovimentacao={salvarMovimentacao}
              />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  return <Redirect to="/" />
}
export default Movimentacoes
