import React from 'react';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';
import { PHASES } from '../contexts/gameReducer';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #16213e;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const TurnInfo = styled.div`
  display: flex;
  flex-direction: column;
  
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: #e94560;
  }
  
  span {
    font-size: 1rem;
    color: #cccccc;
  }
`;

const PhaseInfo = styled.div`
  background-color: #0f3460;
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #e94560;
  
  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #e94560;
  }
`;

const MenuButton = styled.button`
  background-color: transparent;
  color: #e94560;
  border: 1px solid #e94560;
  padding: 8px 15px;
  font-size: 0.9rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e94560;
    color: #16213e;
  }
`;

const getPhaseDisplay = (phase) => {
  switch (phase) {
    case PHASES.PRE_TURN:
      return 'イベント発生フェーズ';
    case PHASES.CARD_SELECTION:
      return 'カード選択フェーズ';
    case PHASES.CARD_EFFECT:
      return 'カード効果発動フェーズ';
    case PHASES.POST_TURN:
      return 'ターン終了フェーズ';
    case PHASES.GAME_OVER:
      return 'ゲームオーバー';
    case PHASES.ENDING:
      return 'エンディング';
    default:
      return '不明なフェーズ';
  }
};

const GameHeader = () => {
  const { state, resetGame } = useGame();
  
  return (
    <HeaderContainer>
      <TurnInfo>
        <h2>ターン {state.turn} / {state.maxTurns}</h2>
        <span>独裁者AIシミュレーター</span>
      </TurnInfo>
      
      <PhaseInfo>
        <h3>{getPhaseDisplay(state.phase)}</h3>
      </PhaseInfo>
      
      <MenuButton onClick={resetGame}>
        メニューに戻る
      </MenuButton>
    </HeaderContainer>
  );
};

export default GameHeader;