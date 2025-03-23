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
  flex-direction: column;
  padding: 12px 15px;
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

const EffectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const EffectDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 6px 10px;
  margin-top: 5px;
`;

const EffectLabel = styled.span`
  color: #f0f0f0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  
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

const StatusChange = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const OldValue = styled.span`
  color: #aaa;
  font-size: 0.9rem;
  text-decoration: line-through;
`;

const Arrow = styled.span`
  color: #aaa;
  font-size: 1rem;
`;

const NewValue = styled.span`
  color: ${props => props.change > 0 ? '#4caf50' : props.change < 0 ? '#ff5252' : '#f0f0f0'};
  font-weight: bold;
  font-size: 1rem;
`;

const EffectTypeLabel = styled.span`
  font-size: 0.8rem;
  color: #aaa;
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
  
  // カードの効果を取得
  const effects = selectedCard.effects ? Object.entries(selectedCard.effects).filter(([_, value]) => value !== 0) : [];
  
  // パラメータの以前の値と変更後の値を計算
  const paramChanges = {
    aiPower: {
      oldValue: state.aiPower - (selectedCard.effects?.aiPower || 0),
      newValue: state.aiPower,
      change: selectedCard.effects?.aiPower || 0
    },
    energy: {
      oldValue: state.energy - (selectedCard.effects?.energy || 0),
      newValue: state.energy,
      change: selectedCard.effects?.energy || 0
    },
    economy: {
      oldValue: state.economy - (selectedCard.effects?.economy || 0),
      newValue: state.economy,
      change: selectedCard.effects?.economy || 0
    },
    stability: {
      oldValue: state.stability - (selectedCard.effects?.stability || 0),
      newValue: state.stability,
      change: selectedCard.effects?.stability || 0
    },
    aiPowerChange: {
      oldValue: state.aiPowerChange - (selectedCard.effects?.aiPowerChange || 0),
      newValue: state.aiPowerChange,
      change: selectedCard.effects?.aiPowerChange || 0
    },
    energyChange: {
      oldValue: state.energyChange - (selectedCard.effects?.energyChange || 0),
      newValue: state.energyChange,
      change: selectedCard.effects?.energyChange || 0
    },
    economyChange: {
      oldValue: state.economyChange - (selectedCard.effects?.economyChange || 0),
      newValue: state.economyChange,
      change: selectedCard.effects?.economyChange || 0
    },
    stabilityChange: {
      oldValue: state.stabilityChange - (selectedCard.effects?.stabilityChange || 0),
      newValue: state.stabilityChange,
      change: selectedCard.effects?.stabilityChange || 0
    }
  };
  
  // 変化のあるパラメータをグループ化
  const currentParams = ['aiPower', 'energy', 'economy', 'stability'];
  const changeParams = ['aiPowerChange', 'energyChange', 'economyChange', 'stabilityChange'];
  
  // 変化のあるパラメータだけをフィルタリング
  const activeParams = Object.keys(paramChanges).filter(key => paramChanges[key].change !== 0);
  
  // 現在値パラメータと変化率パラメータに分類
  const activeCurrentParams = activeParams.filter(param => currentParams.includes(param));
  const activeChangeParams = activeParams.filter(param => changeParams.includes(param));
  
  return (
    <Container>
      <Title>政策の実行</Title>
      
      <EffectAnimation>
        <CardContainer>
          <Card card={selectedCard} />
        </CardContainer>
        
        <EffectsContainer visible={showEffects}>
          {/* 現在値パラメータ */}
          {activeCurrentParams.length > 0 && (
            <>
              <EffectTypeLabel>即時効果</EffectTypeLabel>
              {activeCurrentParams.map(key => (
                <EffectRow key={key} type={key}>
                  <EffectHeader>
                    <EffectLabel>{paramNames[key]}</EffectLabel>
                    <EffectValue value={paramChanges[key].change}>
                      {paramChanges[key].change > 0 ? `+${paramChanges[key].change}` : paramChanges[key].change}
                    </EffectValue>
                  </EffectHeader>
                  <EffectDetails>
                    <span>現在値:</span>
                    <StatusChange>
                      <OldValue>{paramChanges[key].oldValue}</OldValue>
                      <Arrow>→</Arrow>
                      <NewValue change={paramChanges[key].change}>
                        {paramChanges[key].newValue}
                      </NewValue>
                    </StatusChange>
                  </EffectDetails>
                </EffectRow>
              ))}
            </>
          )}
          
          {/* 変化率パラメータ */}
          {activeChangeParams.length > 0 && (
            <>
              <EffectTypeLabel>ターン毎の変化</EffectTypeLabel>
              {activeChangeParams.map(key => (
                <EffectRow key={key} type={key.replace('Change', '')}>
                  <EffectHeader>
                    <EffectLabel>{paramNames[key]}</EffectLabel>
                    <EffectValue value={paramChanges[key].change}>
                      {paramChanges[key].change > 0 ? `+${paramChanges[key].change}` : paramChanges[key].change}
                    </EffectValue>
                  </EffectHeader>
                  <EffectDetails>
                    <span>1ターンあたり:</span>
                    <StatusChange>
                      <OldValue>{paramChanges[key].oldValue}</OldValue>
                      <Arrow>→</Arrow>
                      <NewValue change={paramChanges[key].change}>
                        {paramChanges[key].newValue}
                      </NewValue>
                    </StatusChange>
                  </EffectDetails>
                </EffectRow>
              ))}
            </>
          )}
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