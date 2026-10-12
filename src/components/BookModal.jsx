import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { sinopseDe } from "../data/detalhesLivros.js";
import StarRating, { formatarNota } from "./StarRating.jsx";
import "./BookModal.css";

const LIMITE_RESENHA = 1000;

const IconClose = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const IconBack = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

/**
 * Modal do livro. Tem dois modos:
 *  - "detalhes": capa, título, autor, sinopse e botão Avaliar
 *  - "avaliar":  estrelas + resenha, com Confirmar/Cancelar
 *
 * @param {object}   livro
 * @param {object}   avaliacao  avaliação já feita pelo usuário (ou undefined)
 * @param {function} onAvaliar  recebe { nota, resenha, data }
 * @param {function} onClose
 * @param {string}   modoInicial  "detalhes" (padrão) ou "avaliar" para abrir direto na avaliação
 * @param {boolean}  linkPagina   mostra o link para a página do livro (padrão: true)
 */
export default function BookModal({ livro, avaliacao, onAvaliar, onClose, modoInicial = "detalhes", linkPagina = true }) {
  const [modo, setModo] = useState(modoInicial);
  const sinopse = sinopseDe(livro);
  const [nota, setNota] = useState(avaliacao?.nota ?? 0);
  const [resenha, setResenha] = useState(avaliacao?.resenha ?? "");
  const dialogRef = useRef(null);

  // Guarda a função mais recente sem precisar refazer o efeito abaixo
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Ao abrir: trava a rolagem da página, foca o modal e fecha com Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCloseRef.current();
    const { overflow, paddingRight } = document.body.style;

    // Ao travar a rolagem a barra some e a página pularia para o lado;
    // compensamos com um padding do mesmo tamanho da barra (0 no celular).
    const larguraBarra = window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (larguraBarra > 0) document.body.style.paddingRight = `${larguraBarra}px`;
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, []);

  const abrirAvaliacao = () => {
    setNota(avaliacao?.nota ?? 0);
    setResenha(avaliacao?.resenha ?? "");
    setModo("avaliar");
  };

  const publicar = (e) => {
    e.preventDefault();
    onAvaliar({ nota, resenha: resenha.trim(), data: new Date().toISOString() });
    setModo("detalhes");
  };

  return createPortal(
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          <IconClose />
        </button>

        <div className="modal-cover">
          {livro.capa && <img src={livro.capa} alt={`Capa de ${livro.titulo}`} />}
        </div>

        <div className="modal-body">
          {modo === "detalhes" ? (
            <>
              <h2 id="modal-titulo" className="modal-title">{livro.titulo}</h2>
              <p className="modal-author">{livro.autor}</p>

              <hr className="modal-divider" />

              <h3 className="modal-label">Sinopse</h3>
              <p className={`modal-synopsis${sinopse ? "" : " empty"}`}>
                {sinopse || "Sinopse ainda não cadastrada."}
              </p>

              {linkPagina && (
                <Link to={`/livro/${livro.id}`} className="link-btn modal-page-link" onClick={onClose}>
                  Ver página do livro
                </Link>
              )}

              {avaliacao && (
                <div className="my-review">
                  <h3 className="modal-label">Sua avaliação</h3>
                  <div className="my-review-stars">
                    <StarRating value={avaliacao.nota} size={20} readOnly />
                    <span>{formatarNota(avaliacao.nota)}</span>
                  </div>
                  {avaliacao.resenha && <p className="my-review-text">“{avaliacao.resenha}”</p>}
                </div>
              )}

              <div className="modal-actions">
                {avaliacao ? (
                  <>
                    <button className="link-btn" onClick={abrirAvaliacao}>Editar avaliação</button>
                    <button className="btn btn-primary" onClick={onClose}>Publicar avaliação</button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={abrirAvaliacao}>★ Avaliar</button>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={publicar} className="review-form">
              <div className="review-header">
                {/* Seta de voltar só na primeira avaliação; na edição basta o Cancelar */}
                {!avaliacao && (
                  <button type="button" className="icon-btn" onClick={() => setModo("detalhes")} aria-label="Voltar">
                    <IconBack />
                  </button>
                )}
                <div>
                  <h2 id="modal-titulo" className="modal-title small">Avaliar livro</h2>
                  <p className="modal-author">{livro.titulo} · {livro.autor}</p>
                </div>
              </div>

              <div className="review-field">
                <span className="modal-label">Sua nota</span>
                <div className="review-stars">
                  <StarRating value={nota} onChange={setNota} size={36} />
                  <span className="review-score">{nota > 0 ? formatarNota(nota) : "—"}</span>
                </div>
              </div>

              <label className="review-field">
                <span className="modal-label">Resenha <span className="optional">(opcional)</span></span>
                <textarea
                  value={resenha}
                  onChange={(e) => setResenha(e.target.value.slice(0, LIMITE_RESENHA))}
                  placeholder="O que você achou do livro?"
                  rows={5}
                />
                <span className="counter">{resenha.length}/{LIMITE_RESENHA}</span>
              </label>

              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setModo("detalhes")}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={nota === 0}>
                  Confirmar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
