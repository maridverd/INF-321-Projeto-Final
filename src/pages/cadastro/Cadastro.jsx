import { Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/wormbox.svg'
import worm from '../../assets/worm.png'
import '../login/Login.css'
import './Cadastro.css'

// Formata enquanto digita: (31) 99999-9999
const formatarTelefone = (valor = '') => {
  const n = valor.replace(/\D/g, '').slice(0, 11)
  if (n.length <= 2) return n
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`
}

export default function Cadastro() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log(values) // { nome, usuario, email, telefone, senha, confirmarSenha }
    navigate('/') // volta para o login depois de cadastrar
  }

  return (
    <main className="login cadastro">
      <section className="login__panel login__panel--wide">
        <img className="login__logo" src={logo} alt="Wormboxd" />

        <h1 className="login__title">Crie sua conta!</h1>
        <p className="login__subtitle">
          Preencha seus dados para começar a organizar sua estante
        </p>

        <Form layout="vertical" requiredMark={false} onFinish={onFinish}>
          <div className="cadastro__grid">
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: 'Informe seu nome' }]}
            >
              <Input autoComplete="name" />
            </Form.Item>

            <Form.Item
              label="Nome de usuário"
              name="usuario"
              rules={[
                { required: true, message: 'Escolha um nome de usuário' },
                {
                  pattern: /^[a-zA-Z0-9_.]{3,20}$/,
                  message: 'Use de 3 a 20 letras, números, _ ou .',
                },
              ]}
            >
              <Input autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: 'Informe seu e-mail' },
                { type: 'email', message: 'E-mail inválido' },
              ]}
            >
              <Input type="email" autoComplete="email" />
            </Form.Item>

            <Form.Item
              label="Telefone"
              name="telefone"
              getValueFromEvent={(e) => formatarTelefone(e.target.value)}
              rules={[
                { required: true, message: 'Informe seu telefone' },
                {
                  pattern: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                  message: 'Telefone inválido',
                },
              ]}
            >
              <Input type="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="senha"
              rules={[
                { required: true, message: 'Crie uma senha' },
                { min: 6, message: 'Mínimo de 6 caracteres' },
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>

            <Form.Item
              label="Confirmar senha"
              name="confirmarSenha"
              dependencies={['senha']}
              rules={[
                { required: true, message: 'Confirme sua senha' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('senha') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('As senhas não coincidem'))
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="new-password" />
            </Form.Item>
          </div>

          <div className="login__actions">
            <button className="btn" type="submit">Cadastrar</button>
            <Link className="link" to="/">Já tenho conta</Link>
          </div>
        </Form>
      </section>

      <aside className="login__art">
        <img src={worm} alt="Minhoca de óculos lendo sobre uma pilha de livros" />
      </aside>
    </main>
  )
}