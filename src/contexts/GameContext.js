import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, gameReducer } from './gameReducer';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState, () => {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);

  const startNewGame = () => {
    dispatch({ type: 'START_NEW_GAME' });
  };

  const nextPhase = () => {
    dispatch({ type: 'NEXT_PHASE' });
  };

  const selectCard = (cardId) => {
    dispatch({ type: 'SELECT_CARD', payload: cardId });
  };

  const confirmEvent = () => {
    dispatch({ type: 'CONFIRM_EVENT' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        startNewGame,
        nextPhase,
        selectCard,
        confirmEvent,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};