import React, { useState } from 'react'

const INITIAL_FORM = { descricao: '', valor: 0 }

const AdcionarMovimentacao = ({ salvarNovaMovimentacao }) => {
  const [form, setForm] = useState(INITIAL_FORM)

  const onChangeForm = evt => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value
    })
  }

  const salvarMovimentacao = async () => {
    if (!isNaN(form.valor) && form.valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await salvarNovaMovimentacao({
        ...form,
        valor: parseFloat(form.valor)
      })
      setForm(INITIAL_FORM)
    }
  }
  return (
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
  )
}
export default AdcionarMovimentacao
