import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useGame } from '../contexts/GameContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  70% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
  90% { transform: translateX(-1px); }
  100% { transform: translateX(0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  min-height: 60vh;
  animation: ${fadeIn} 1s ease-in-out;
`;

const GameOverTitle = styled.h1`
  color: #ff5252;
  font-size: 3rem;
  margin-bottom: 30px;
  text-shadow: 0 0 10px rgba(255, 82, 82, 0.7);
  animation: ${shake} 0.8s ease-in-out;
`;

const ReasonBox = styled.div`
  background-color: #0f3460;
  border: 2px solid #ff5252;
  border-radius: 12px;
  padding: 25px;
  max-width: 600px;
  margin-bottom: 40px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
`;

const ReasonText = styled.p`
  color: #f0f0f0;
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 15px;
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 500px;
`;

const StatItem = styled.div`
  background-color: #16213e;
  border: 1px solid #e94560;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.span`
  color: #ccc;
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

const StatValue = styled.span`
  color: ${props => props.type === 'aiPower' ? '#3498db' : '#f0f0f0'};
  font-size: 1.3rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#e94560' : 'transparent'};
  color: ${props => props.primary ? '#fff' : '#e94560'};
  border: 2px solid #e94560;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.primary ? '#d3405c' : 'rgba(233, 69, 96, 0.2)'};
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const GameOverScreen = () => {
  const { state, startNewGame, resetGame } = useGame();
  const { turn, aiPower, energy, economy, stability, gameOverReason } = state;
  
  return (
    <Container>
      <GameOverTitle>国家崩壊</GameOverTitle>
      
      <ReasonBox>
        <ReasonText>
          {gameOverReason || 'あなたの国家は内外の圧力に耐えきれず崩壊しました。'}
        </ReasonText>
        <ReasonText>
          あなたの独裁体制は {turn} ターン続きました。
        </ReasonText>
      </ReasonBox>
      
      <Stats>
        <StatItem>
          <StatLabel>最終AI力</StatLabel>
          <StatValue type="aiPower">{aiPower}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>最終電力</StatLabel>
          <StatValue>{energy}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>最終財力</StatLabel>
          <StatValue>{economy}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>最終体制秩序</StatLabel>
          <StatValue>{stability}</StatValue>
        </StatItem>
      </Stats>
      
      <ButtonContainer>
        <Button primary onClick={startNewGame}>
          再チャレンジ
        </Button>
        <Button onClick={resetGame}>
          メニューに戻る
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default GameOverScreen;