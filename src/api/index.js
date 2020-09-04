import Rest from '../utils/rest'

const baseURL = 'https://mymoney-a7442.firebaseio.com/'
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL)

export const useMesApi = data => {
  const infoMes = useGet(`meses/${data}`)
  const [, alterarMes] = usePatch(`meses/${data}`)
  return { infoMes, alterarMes }
}

export const useMovimentacaoApi = data => {
  const movimentacoes = useGet(`movimentacoes/${data}`)
  const [, salvarNovaMovimentacao] = usePost(`movimentacoes/${data}`)
  const [, removeMovimentacao] = useDelete()
  return { movimentacoes, salvarNovaMovimentacao, removeMovimentacao }
}
