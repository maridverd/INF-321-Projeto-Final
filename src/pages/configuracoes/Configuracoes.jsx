import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import avatarPadrao from "../../assets/avatar.svg";
import "./Configuracoes.css";

const LIMITE_BIO = 160;

/* Regras de validação. Cada uma devolve a mensagem de erro, ou nada se estiver ok. */
function validar(form) {
  const erros = {};
  if (form.nome.trim().length < 2) erros.nome = "Informe um nome com pelo menos 2 letras.";
  if (!/^[a-z0-9_.]{3,20}$/i.test(form.username))
    erros.username = "Use de 3 a 20 caracteres: letras, números, ponto ou _.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) erros.email = "Informe um e-mail válido.";
  if (form.bio.length > LIMITE_BIO) erros.bio = `A bio pode ter no máximo ${LIMITE_BIO} caracteres.`;
  return erros;
}

function Campo({ id, label, erro, dica, children }) {
  return (
    <div className={`field${erro ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children}
      {erro ? (
        <span className="field-error" id={`${id}-erro`}>{erro}</span>
      ) : (
        dica && <span className="field-hint">{dica}</span>
      )}
    </div>
  );
}

export default function Configuracoes() {
  const { usuario, setUsuario } = useUser();
  const [form, setForm] = useState(usuario);
  const [erros, setErros] = useState({});
  const [salvo, setSalvo] = useState(false);
  const inputFoto = useRef(null);

  const alterado = JSON.stringify(form) !== JSON.stringify(usuario);

  const atualizar = (campo, valor) => {
    setForm((f) => ({ ...f, [campo]: valor }));
    setErros((e) => ({ ...e, [campo]: undefined }));
    setSalvo(false);
  };

  const escolherFoto = (e) => {
    const arquivo = e.target.files?.[0];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo
    if (!arquivo) return;
    if (!arquivo.type.startsWith("image/")) {
      setErros((er) => ({ ...er, foto: "Escolha um arquivo de imagem." }));
      return;
    }
    // Pré-visualização local; no back-end, aqui seria o upload
    atualizar("foto", URL.createObjectURL(arquivo));
  };

  const salvar = (e) => {
    e.preventDefault();
    const encontrados = validar(form);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    const limpo = { ...form, nome: form.nome.trim(), username: form.username.toLowerCase() };
    setUsuario(limpo);
    setForm(limpo);
    setSalvo(true);
  };

  const cancelar = () => {
    setForm(usuario);
    setErros({});
    setSalvo(false);
  };

  return (
    <div className="settings">
      <h1 className="settings-title">Configurações</h1>

      <form className="settings-card" onSubmit={salvar} noValidate>
        <div className="settings-card-header">
          <h2>Editar Perfil</h2>
          <p>Essas informações aparecem no seu perfil.</p>
        </div>

        {/* ---------- Foto ---------- */}
        <div className="photo-row">
          <div className="photo-preview">
            <img src={form.foto || avatarPadrao} alt="Foto de perfil" />
          </div>
          <div className="photo-actions">
            <div className="photo-buttons">
              <button type="button" className="btn btn-soft" onClick={() => inputFoto.current?.click()}>
                Alterar foto
              </button>
              {form.foto && (
                <button type="button" className="btn btn-ghost" onClick={() => atualizar("foto", null)}>
                  Remover
                </button>
              )}
            </div>
            <span className={erros.foto ? "field-error" : "field-hint"}>
              {erros.foto || "JPG, PNG ou GIF."}
            </span>
          </div>
          <input ref={inputFoto} type="file" accept="image/*" onChange={escolherFoto} hidden />
        </div>

        {/* ---------- Campos ---------- */}
        <div className="fields-grid">
          <Campo id="nome" label="Nome" erro={erros.nome}>
            <input
              id="nome"
              type="text"
              value={form.nome}
              onChange={(e) => atualizar("nome", e.target.value)}
              aria-invalid={!!erros.nome}
              autoComplete="name"
            />
          </Campo>

          <Campo id="username" label="Nome de usuário" erro={erros.username}>
            <div className="input-prefix">
              <span>@</span>
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => atualizar("username", e.target.value.replace(/\s/g, ""))}
                aria-invalid={!!erros.username}
                autoComplete="username"
              />
            </div>
          </Campo>

          <Campo id="email" label="E-mail" erro={erros.email} dica="Usado para login e notificações.">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => atualizar("email", e.target.value)}
              aria-invalid={!!erros.email}
              autoComplete="email"
            />
          </Campo>

          <Campo id="bio" label="Bio" erro={erros.bio}>
            <textarea
              id="bio"
              rows={3}
              value={form.bio}
              maxLength={LIMITE_BIO}
              onChange={(e) => atualizar("bio", e.target.value)}
              placeholder="Conte um pouco sobre você e o que gosta de ler."
            />
            <span className="bio-counter">{form.bio.length}/{LIMITE_BIO}</span>
          </Campo>
        </div>

        {/* ---------- Ações ---------- */}
        <div className="settings-actions">
          {salvo && <span className="saved-msg" role="status">✓ Alterações salvas</span>}
          <button type="button" className="btn btn-ghost" onClick={cancelar} disabled={!alterado}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={!alterado}>
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  );
}
