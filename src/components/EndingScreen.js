import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useGame } from '../contexts/GameContext';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  text-align: center;
  min-height: 70vh;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const EndingTitle = styled.h1`
  color: #e94560;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 0 0 10px rgba(233, 69, 96, 0.5);
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 0.5s;
`;

const EndingDescription = styled.div`
  background-color: #0f3460;
  border: 2px solid #e94560;
  border-radius: 12px;
  padding: 25px;
  max-width: 700px;
  margin-bottom: 40px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 1.5s;
  
  p {
    color: #f0f0f0;
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 15px;
    text-align: left;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 500px;
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 2.5s;
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
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 3.5s;
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

const CardsAchieved = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  opacity: 0;
  animation: ${slideUp} 1s ease-out forwards;
  animation-delay: 3s;
  
  h3 {
    color: #e94560;
    font-size: 1.3rem;
    margin-bottom: 15px;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const CardBadge = styled.div`
  background-color: #16213e;
  border: 1px solid ${props => {
    switch (props.category) {
      case '基盤構築': return '#3498db';
      case 'AI開発': return '#9b59b6';
      case '産業・インフラ': return '#e67e22';
      case '統治・管理': return '#e74c3c';
      case '経済': return '#2ecc71';
      case '国内秩序': return '#f1c40f';
      default: return '#e94560';
    }
  }};
  color: #f0f0f0;
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const formatEndingDescription = (description) => {
  return description.split('\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));
};

const EndingScreen = () => {
  const { state, startNewGame, resetGame } = useGame();
  const { aiPower, energy, economy, stability, selectedCards, ending } = state;
  const [selectedCardDetails, setSelectedCardDetails] = useState([]);
  
  // 選択したカードの詳細を取得
  useEffect(() => {
    // 実際の実装では、カードデータからカード詳細を取得する
    // この例では簡易的に実装
    import('../data/cards').then(module => {
      const cardDetails = module.default.filter(card => 
        selectedCards.includes(card.id)
      );
      setSelectedCardDetails(cardDetails);
    });
  }, [selectedCards]);
  
  return (
    <Container>
      <EndingTitle>{ending?.name || 'ゲーム終了'}</EndingTitle>
      
      <EndingDescription>
        {formatEndingDescription(ending?.description || 'あなたの国家は20ターンを乗り切りました。')}
      </EndingDescription>
      
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
      
      {selectedCardDetails.length > 0 && (
        <CardsAchieved>
          <h3>獲得した主要政策</h3>
          <CardList>
            {selectedCardDetails.map(card => (
              <CardBadge key={card.id} category={card.category}>
                {card.name}
              </CardBadge>
            ))}
          </CardList>
        </CardsAchieved>
      )}
      
      <ButtonContainer>
        <Button primary onClick={startNewGame}>
          再プレイ
        </Button>
        <Button onClick={resetGame}>
          メニューに戻る
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default EndingScreen;