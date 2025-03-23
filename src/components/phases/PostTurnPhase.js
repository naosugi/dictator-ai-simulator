import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../../contexts/GameContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #e94560;
  font-size: 1.6rem;
  margin-bottom: 30px;
`;

const StatusUpdatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
`;

const StatusUpdateRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0f3460;
  border-radius: 10px;
  padding: 15px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateX(0)' : 'translateX(-30px)'};
  transition: opacity 0.5s, transform 0.5s;
  border-left: 5px solid ${props => 
    props.type === 'aiPower' ? '#3498db' : 
    props.type === 'energy' ? '#e67e22' : 
    props.type === 'economy' ? '#2ecc71' : 
    '#f1c40f'
  };
`;

const StatusName = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  span {
    color: #f0f0f0;
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

const StatusChange = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const OldValue = styled.span`
  color: #aaa;
  font-size: 1rem;
  text-decoration: line-through;
`;

const Arrow = styled.span`
  color: #aaa;
  font-size: 1.2rem;
`;

const NewValue = styled.span`
  color: ${props => {
    if (props.type === 'aiPower') return '#3498db';
    if (props.change > 0) return '#4caf50';
    if (props.change < 0) return '#ff5252';
    return '#f0f0f0';
  }};
  font-size: 1.2rem;
  font-weight: bold;
  animation: ${props => props.change !== 0 ? 'pulse 1s' : 'none'};
  
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
  
  &:hover {
    background-color: #d3405c;
  }
`;

const Description = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 600px;
`;

const PostTurnPhase = () => {
  const { state, nextPhase } = useGame();
  
  // アニメーションの状態
  const [visibleRows, setVisibleRows] = useState({
    aiPower: false,
    energy: false,
    economy: false,
    stability: false,
  });
  const [showNextButton, setShowNextButton] = useState(false);
  
  // 前回の値を計算（変化を表示するため）
  const previousValues = {
    aiPower: state.aiPower - state.aiPowerChange,
    energy: state.energy - state.energyChange,
    economy: state.economy - state.economyChange,
    stability: state.stability - state.stabilityChange,
  };
  
  useEffect(() => {
    // 順番にアニメーション表示
    const timers = [];
    
    const params = ['aiPower', 'energy', 'economy', 'stability'];
    params.forEach((param, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleRows(prev => ({ ...prev, [param]: true }));
        }, 500 + index * 500)
      );
    });
    
    // 最後にボタンを表示
    timers.push(
      setTimeout(() => {
        setShowNextButton(true);
      }, 500 + params.length * 500 + 500)
    );
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);
  
  return (
    <Container>
      <Title>国家状況の更新</Title>
      
      <Description>
        実施した政策とその変動により、国家のパラメータが更新されました。
      </Description>
      
      <StatusUpdatesContainer>
        <StatusUpdateRow 
          type="aiPower" 
          visible={visibleRows.aiPower}
        >
          <StatusName>
            <span>AI力</span>
          </StatusName>
          <StatusChange>
            <OldValue>{previousValues.aiPower}</OldValue>
            <Arrow>→</Arrow>
            <NewValue 
              type="aiPower" 
              change={state.aiPowerChange}
            >
              {state.aiPower}
            </NewValue>
          </StatusChange>
        </StatusUpdateRow>
        
        <StatusUpdateRow 
          type="energy" 
          visible={visibleRows.energy}
        >
          <StatusName>
            <span>電力</span>
          </StatusName>
          <StatusChange>
            <OldValue>{previousValues.energy}</OldValue>
            <Arrow>→</Arrow>
            <NewValue 
              type="energy" 
              change={state.energyChange}
            >
              {state.energy}
            </NewValue>
          </StatusChange>
        </StatusUpdateRow>
        
        <StatusUpdateRow 
          type="economy" 
          visible={visibleRows.economy}
        >
          <StatusName>
            <span>財力</span>
          </StatusName>
          <StatusChange>
            <OldValue>{previousValues.economy}</OldValue>
            <Arrow>→</Arrow>
            <NewValue 
              type="economy" 
              change={state.economyChange}
            >
              {state.economy}
            </NewValue>
          </StatusChange>
        </StatusUpdateRow>
        
        <StatusUpdateRow 
          type="stability" 
          visible={visibleRows.stability}
        >
          <StatusName>
            <span>体制秩序</span>
          </StatusName>
          <StatusChange>
            <OldValue>{previousValues.stability}</OldValue>
            <Arrow>→</Arrow>
            <NewValue 
              type="stability" 
              change={state.stabilityChange}
            >
              {state.stability}
            </NewValue>
          </StatusChange>
        </StatusUpdateRow>
      </StatusUpdatesContainer>
      
      <NextButton 
        visible={showNextButton}
        onClick={nextPhase}
      >
        次のターンへ
      </NextButton>
    </Container>
  );
};

export default PostTurnPhase;