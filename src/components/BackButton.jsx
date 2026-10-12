import { useNavigate } from "react-router-dom";
import "./BackButton.css";

const IconBack = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

/* Volta para a tela anterior. Se a página foi aberta direto pela URL
   (não há histórico), leva para a rota `para`. */
export default function BackButton({ para = "/home" }) {
  const navigate = useNavigate();
  const voltar = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate(para));

  return (
    <button type="button" className="back-btn" onClick={voltar}>
      <IconBack /> Voltar
    </button>
  );
}
