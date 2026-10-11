import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/wormbox.svg'
import worm from '../../assets/worm.png'
import '../login/Login.css'

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log(values) // { email, senha }
    navigate('/home')
  }

  return (
    <main className="login">
      <section className="login__panel">
        <img className="login__logo" src={logo} alt="Wormboxd" />

        <h1 className="login__title">Seja bem vindo!</h1>
        <p className="login__subtitle">
          Faça o login ou cadastre-se para começar a organizar sua estante
        </p>

        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <Form.Item label="E-mail" name="email">
            <Input type="email" autoComplete="email" />
          </Form.Item>

          <Form.Item label="Senha" name="senha">
            <Input.Password autoComplete="current-password" />
          </Form.Item>

          <a className="link link--forgot" href="#">Esqueci minha senha</a>

          <div className="login__actions">
            <button className="btn" type="submit">Entrar</button>
            <a className="link" href="/cadastro">Ou cadastrar-se</a>
          </div>
        </Form>
      </section>

      <aside className="login__art">
        <img src={worm} alt="Minhoca de óculos lendo sobre uma pilha de livros" />
      </aside>
    </main>
  )
}