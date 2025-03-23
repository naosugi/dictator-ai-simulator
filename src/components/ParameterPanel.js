import React from 'react';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';

const PanelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  background-color: #16213e;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ParameterBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || '#0f3460'};
  border: 1px solid ${props => props.borderColor || '#e94560'};
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ParameterName = styled.h3`
  margin: 0 0 5px 0;
  color: ${props => props.color || '#e94560'};
  font-size: 1.1rem;
  font-weight: bold;
`;

const ParameterValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

const ParameterChange = styled.div`
  font-size: 0.9rem;
  color: ${props => props.isPositive ? '#4caf50' : props.isNegative ? '#ff5252' : '#aaaaaa'};
  display: flex;
  align-items: center;
  
  span {
    margin-left: 5px;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #1a1a2e;
  border-radius: 3px;
  margin-top: 8px;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => Math.min(100, props.percent)}%;
    background-color: ${props => props.barColor};
    transition: width 0.5s ease;
  }
`;

const getStatusColor = (value, type) => {
  if (type === 'aiPower') return '#3498db';
  
  if (value < 30) return '#ff5252';
  if (value < 60) return '#ffa726';
  return '#4caf50';
};

const ParameterPanel = () => {
  const { state } = useGame();
  
  return (
    <PanelContainer>
      <ParameterBlock bgColor="#0d253f" borderColor="#3498db">
        <ParameterName color="#3498db">AI力</ParameterName>
        <ParameterValue>{state.aiPower}</ParameterValue>
        <ParameterChange 
          isPositive={state.aiPowerChange > 0}
          isNegative={state.aiPowerChange < 0}
        >
          {state.aiPowerChange > 0 ? '↑' : state.aiPowerChange < 0 ? '↓' : '→'}
          <span>{state.aiPowerChange > 0 ? `+${state.aiPowerChange}` : state.aiPowerChange}</span>
        </ParameterChange>
        <ProgressBar percent={(state.aiPower / 1200) * 100} barColor="#3498db" />
      </ParameterBlock>
      
      <ParameterBlock>
        <ParameterName>電力</ParameterName>
        <ParameterValue>{state.energy}</ParameterValue>
        <ParameterChange 
          isPositive={state.energyChange > 0}
          isNegative={state.energyChange < 0}
        >
          {state.energyChange > 0 ? '↑' : state.energyChange < 0 ? '↓' : '→'}
          <span>{state.energyChange > 0 ? `+${state.energyChange}` : state.energyChange}</span>
        </ParameterChange>
        <ProgressBar 
          percent={(state.energy / 300) * 100} 
          barColor={getStatusColor(state.energy, 'energy')} 
        />
      </ParameterBlock>
      
      <ParameterBlock>
        <ParameterName>財力</ParameterName>
        <ParameterValue>{state.economy}</ParameterValue>
        <ParameterChange 
          isPositive={state.economyChange > 0}
          isNegative={state.economyChange < 0}
        >
          {state.economyChange > 0 ? '↑' : state.economyChange < 0 ? '↓' : '→'}
          <span>{state.economyChange > 0 ? `+${state.economyChange}` : state.economyChange}</span>
        </ParameterChange>
        <ProgressBar 
          percent={(state.economy / 300) * 100} 
          barColor={getStatusColor(state.economy, 'economy')} 
        />
      </ParameterBlock>
      
      <ParameterBlock>
        <ParameterName>体制秩序</ParameterName>
        <ParameterValue>{state.stability}</ParameterValue>
        <ParameterChange 
          isPositive={state.stabilityChange > 0}
          isNegative={state.stabilityChange < 0}
        >
          {state.stabilityChange > 0 ? '↑' : state.stabilityChange < 0 ? '↓' : '→'}
          <span>{state.stabilityChange > 0 ? `+${state.stabilityChange}` : state.stabilityChange}</span>
        </ParameterChange>
        <ProgressBar 
          percent={(state.stability / 300) * 100} 
          barColor={getStatusColor(state.stability, 'stability')} 
        />
      </ParameterBlock>
    </PanelContainer>
  );
};

export default ParameterPanel;