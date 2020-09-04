import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'

import { usePost } from '../utils/rest'

const url =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB1OKkQWIF1pmEpLKMjCWpqi_0LT93FXg'

const Login = () => {
  const [postData, signin] = usePost(url)
  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
      window.location.reload()
    }
  }, [postData])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setLogado(true)
    }
  }, [])

  const login = async () => {
    await signin({
      email,
      password: senha,
      returnSecureToken: true
    })
  }
  const onChangeEmail = evt => {
    setEmail(evt.target.value)
  }
  const onChangeSenha = evt => {
    setSenha(evt.target.value)
  }
  if (logado) return <Redirect to='/' />
  return (
    <div>
      {postData.error && postData.error.length > 0 && (
        <div className='alert alert-danger' role='alert'>
          <strong>E-mail e/ou senha</strong> inválidos.
        </div>
      )}
      <form className='form-signin'>
        <h2>MyMoney</h2>
        <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Endereço de email
        </label>
        <input
          type='email'
          id='inputEmail'
          className='form-control'
          onChange={onChangeEmail}
          placeholder='Seu e-mail'
          required
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Senha
        </label>
        <input
          type='password'
          id='inputPassword'
          className='form-control'
          onChange={onChangeSenha}
          placeholder='Sua senha'
          required
        />
        <button
          type='button'
          className='btn btn-lg btn-primary btn-block'
          onClick={login}
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
export default Login
