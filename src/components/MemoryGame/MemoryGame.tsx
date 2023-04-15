import { useState, useId, useEffect } from "react";
import "./MemoryGame.scss";
import { SingleCard } from "./SingleCard";

const twoWayObject = (obj: any) => {
  const objEntries = Object.entries(obj);
  return Object.fromEntries([
    ...objEntries,
    ...objEntries.map((e) => {
      return [...e].reverse();
    }),
  ]);
};

const countriesAndCapitalsMap = twoWayObject({
  USA: "Washington D.C.",
  Canada: "Ottawa",
  Mexico: "Mexico City",
  Brazil: "Brasília",
  Argentina: "Buenos Aires",
  Colombia: "Bogotá",
});

// console.log(countriesAndCapitalsMap);

const citiesAndCountries = [...Object.keys(countriesAndCapitalsMap)];

export const MemoryGame = () => {
  const [cards, setCards] = useState<any>([]);
  const [choiceOne, setChoiceOne] = useState<any>(null);
  const [choiceTwo, setChoiceTwo] = useState<any>(null);
  const [disabled, setDisabled] = useState<any>(false);

  const shuffleCards = () => {
    const shuffledCards = citiesAndCountries
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ card, id: Math.random(), matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleChoice = (card: any) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (checkIfMatching()) {
        setCards((prevCards: any) => {
          return prevCards.map((card: any) => {
            if (card.card === choiceOne.card || card.card === choiceTwo.card) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const checkIfMatching = () => {
    if (choiceOne && choiceTwo) {
      const one = choiceOne.card;
      const two = choiceTwo.card;

      if (countriesAndCapitalsMap[one] === two || countriesAndCapitalsMap[two] === one) {
        return true;
      }
      return false;
    }
  };

  return (
    <div className="card-grid">
      {cards.map((card: any) => (
        <SingleCard
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
};
