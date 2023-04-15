import { FC } from "react";
import "./MemoryGame.scss";

type Props = any;
export const SingleCard: FC<Props> = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? " flipped front content" : "front content"}>{card.card}</div>
      <div className={flipped ? " flipped back content" : "back content"} onClick={handleClick}></div>
    </div>
  );
};
