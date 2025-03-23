import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../../contexts/GameContext';
import Card from '../Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  color: #e94560;
  font-size: 1.6rem;
  margin-bottom: 30px;
`;

const EffectAnimation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin-bottom: 30px;
  width: 100%;
`;

const CardContainer = styled.div`
  transform: scale(1.2);
  transition: transform 0.5s;
  animation: glow 2s infinite alternate;
  
  @keyframes glow {
    from {
      box-shadow: 0 0 10px #e94560;
    }
    to {
      box-shadow: 0 0 20px #e94560, 0 0 30px #e94560;
    }
  }
`;

const EffectsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  background-color: #0f3460;
  border-radius: 10px;
  padding: 20px;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.5s, transform 0.5s;
`;

const EffectRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #16213e;
  border-radius: 8px;
  border-left: 4px solid ${props => 
    props.type === 'aiPower' ? '#3498db' : 
    props.type === 'energy' ? '#e67e22' : 
    props.type === 'economy' ? '#2ecc71' : 
    props.type === 'stability' ? '#f1c40f' : 
    '#e94560'
  };
`;

const EffectLabel = styled.span`
  color: #f0f0f0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
  }
`;

const EffectValue = styled.span`
  color: ${props => props.value > 0 ? '#4caf50' : props.value < 0 ? '#ff5252' : '#f0f0f0'};
  font-weight: bold;
  font-size: 1.1rem;
  animation: ${props => props.value !== 0 ? 'pulse 1s' : 'none'};
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;

const NextButton = styled.button`
  background-color: #e94560;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.5s, transform 0.5s, background-color 0.3s;
  margin-top: 30px;
  
  &:hover {
    background-color: #d3405c;
  }
`;

const CardEffectPhase = () => {
  const { state, nextPhase } = useGame();
  const { selectedCard } = state;
  
  const [showEffects, setShowEffects] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  
  // パラメータの表示名をマッピング
  const paramNames = {
    aiPower: 'AI力',
    energy: '電力',
    economy: '財力',
    stability: '体制秩序',
    aiPowerChange: 'AI力/ターン',
    energyChange: '電力/ターン',
    economyChange: '財力/ターン',
    stabilityChange: '体制秩序/ターン',
  };
  
  // 効果のアニメーションを制御
  useEffect(() => {
    if (!selectedCard) {
      nextPhase();
      return;
    }
    
    // エフェクトアニメーションのタイミング
    const effectsTimer = setTimeout(() => {
      setShowEffects(true);
    }, 1000);
    
    const nextButtonTimer = setTimeout(() => {
      setShowNextButton(true);
    }, 2500);
    
    return () => {
      clearTimeout(effectsTimer);
      clearTimeout(nextButtonTimer);
    };
  }, [selectedCard, nextPhase]);
  
  // カードがない場合は次のフェーズに進む
  if (!selectedCard) {
    return null;
  }
  
  // 効果のあるパラメータだけを表示
  const effects = selectedCard.effects ? Object.entries(selectedCard.effects).filter(([_, value]) => value !== 0) : [];
  
  return (
    <Container>
      <Title>政策の実行</Title>
      
      <EffectAnimation>
        <CardContainer>
          <Card card={selectedCard} />
        </CardContainer>
        
        <EffectsContainer visible={showEffects}>
          {effects.map(([key, value]) => (
            <EffectRow key={key} type={key.replace('Change', '')}>
              <EffectLabel>
                {paramNames[key] || key}
              </EffectLabel>
              <EffectValue value={value}>
                {value > 0 ? `+${value}` : value}
              </EffectValue>
            </EffectRow>
          ))}
        </EffectsContainer>
      </EffectAnimation>
      
      <NextButton 
        visible={showNextButton}
        onClick={nextPhase}
      >
        次へ進む
      </NextButton>
    </Container>
  );
};

export default CardEffectPhase;