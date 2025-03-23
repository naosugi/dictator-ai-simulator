import React from 'react';
import styled from 'styled-components';
import { useGame } from './contexts/GameContext';
import { PHASES } from './contexts/gameReducer';

// コンポーネントのインポート
import MainMenu from './components/MainMenu';
import GameHeader from './components/GameHeader';
import ParameterPanel from './components/ParameterPanel';
import PreTurnPhase from './components/phases/PreTurnPhase';
import CardSelectionPhase from './components/phases/CardSelectionPhase';
import CardEffectPhase from './components/phases/CardEffectPhase';
import PostTurnPhase from './components/phases/PostTurnPhase';
import GameOverScreen from './components/GameOverScreen';
import EndingScreen from './components/EndingScreen';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const GameContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #16213e;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

function App() {
  const { state } = useGame();
  
  // 現在のフェーズに基づいて表示するコンポーネントを選択
  const renderPhaseContent = () => {
    switch (state.phase) {
      case PHASES.MENU:
        return <MainMenu />;
      case PHASES.PRE_TURN:
        return <PreTurnPhase />;
      case PHASES.CARD_SELECTION:
        return <CardSelectionPhase />;
      case PHASES.CARD_EFFECT:
        return <CardEffectPhase />;
      case PHASES.POST_TURN:
        return <PostTurnPhase />;
      case PHASES.GAME_OVER:
        return <GameOverScreen />;
      case PHASES.ENDING:
        return <EndingScreen />;
      default:
        return <div>Unknown phase</div>;
    }
  };

  return (
    <AppContainer>
      {state.phase !== PHASES.MENU && (
        <GameContainer>
          <GameHeader />
          <MainContent>
            {renderPhaseContent()}
          </MainContent>
          <ParameterPanel />
        </GameContainer>
      )}
      {state.phase === PHASES.MENU && renderPhaseContent()}
    </AppContainer>
  );
}

export default App;