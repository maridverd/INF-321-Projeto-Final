import { useState } from "react";
import "./StarRating.css";

const Star = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
  </svg>
);

const formatar = (n) => n.toLocaleString("pt-BR", { minimumFractionDigits: n % 1 ? 1 : 0 });

/**
 * Estrelas de 0 a 5, de meia em meia.
 * - Mouse: a metade esquerda da estrela vale ".5", a direita vale inteiro.
 *   Clicar de novo no valor atual zera.
 * - Teclado: setas ←/→ diminuem/aumentam meia estrela.
 *
 * @param {number}   value
 * @param {function} onChange  recebe o novo valor
 * @param {number}   size      tamanho de cada estrela em px
 * @param {boolean}  readOnly  só exibe, sem interação
 */
export default function StarRating({ value = 0, onChange, size = 32, readOnly = false }) {
  const [hover, setHover] = useState(null);
  const exibido = hover ?? value;

  const valorNoPonteiro = (e, i) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    return e.clientX - left < width / 2 ? i + 0.5 : i + 1;
  };

  const onKeyDown = (e) => {
    if (["ArrowRight", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      onChange?.(Math.min(5, value + 0.5));
    }
    if (["ArrowLeft", "ArrowDown"].includes(e.key)) {
      e.preventDefault();
      onChange?.(Math.max(0, value - 0.5));
    }
  };

  const acessibilidade = readOnly
    ? { role: "img", "aria-label": `${formatar(value)} de 5 estrelas` }
    : {
        role: "slider",
        tabIndex: 0,
        "aria-label": "Nota",
        "aria-valuemin": 0,
        "aria-valuemax": 5,
        "aria-valuenow": value,
        "aria-valuetext": `${formatar(value)} de 5 estrelas`,
        onKeyDown,
        onMouseLeave: () => setHover(null),
      };

  return (
    <div className={`stars${readOnly ? " readonly" : ""}`} {...acessibilidade}>
      {[0, 1, 2, 3, 4].map((i) => {
        const preenchimento = Math.max(0, Math.min(1, exibido - i)) * 100;
        return (
          <span
            key={i}
            className="star"
            style={{ width: size, height: size }}
            onMouseMove={readOnly ? undefined : (e) => setHover(valorNoPonteiro(e, i))}
            onClick={
              readOnly
                ? undefined
                : (e) => {
                    const v = valorNoPonteiro(e, i);
                    onChange?.(v === value ? 0 : v);
                  }
            }
          >
            <span className="star-empty"><Star size={size} /></span>
            <span className="star-fill" style={{ width: `${preenchimento}%` }}><Star size={size} /></span>
          </span>
        );
      })}
    </div>
  );
}

export { formatar as formatarNota };
