import React, { FC } from 'react';
import Guess from './Guess';

interface ShoppingListProps {
  setShowElement: (showList: boolean) => void;
    answer: string[];
}

const ShoppingList: FC<ShoppingListProps> = ({ setShowElement, answer }) => {
  return (
    <>
    3 Rice<br />
    4 Onions<br />
    2 Sour cream<br />
    4 Milk<br />
    10 Strawberries<br />
    8 Salad dressings
    <p>{<Guess setShowElement={setShowElement} answer={answer} />}</p>
    </>
  );
};

export default ShoppingList;