import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../contexts/GameContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  text-align: center;
`;

const EventCard = styled.div`
  background-color: #0f3460;
  border: 2px solid #e94560;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  padding: 30px;
  width: 100%;
  max-width: 600px;
  position: relative;
  animation: fadeIn 0.5s ease-in-out;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const EventTitle = styled.h2`
  color: #e94560;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const EventDescription = styled.p`
  color: #f0f0f0;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 25px;
`;

const EffectsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`;

const EffectItem = styled.div`
  background-color: #16213e;
  border: 1px solid ${props => props.value > 0 ? '#4caf50' : '#ff5252'};
  border-radius: 8px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EffectLabel = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const EffectValue = styled.span`
  color: ${props => props.value > 0 ? '#4caf50' : '#ff5252'};
  font-weight: bold;
  font-size: 1.1rem;
`;

const ConfirmButton = styled.button`
  background-color: #e94560;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #d3405c;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const NoEvent = styled.div`
  color: #ccc;
  font-size: 1.2rem;
  background-color: #0f3460;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed #e94560;
`;

const PreTurnPhase = () => {
  const { state, confirmEvent } = useGame();
  const { currentEvent } = state;
  
  // 効果のマッピング
  const effectsMap = {
    aiPower: 'AI力',
    energy: '電力',
    economy: '財力',
    stability: '体制秩序',
  };
  
  return (
    <Container>
      {currentEvent ? (
        <EventCard>
          <EventTitle>{currentEvent.name}</EventTitle>
          <EventDescription>{currentEvent.description}</EventDescription>
          
          {currentEvent.effects && Object.keys(currentEvent.effects).length > 0 && (
            <EffectsContainer>
              {Object.entries(currentEvent.effects).map(([key, value]) => (
                <EffectItem key={key} value={value}>
                  <EffectLabel>{effectsMap[key] || key}</EffectLabel>
                  <EffectValue value={value}>
                    {value > 0 ? `+${value}` : value}
                  </EffectValue>
                </EffectItem>
              ))}
            </EffectsContainer>
          )}
          
          <ConfirmButton onClick={confirmEvent}>
            確認
          </ConfirmButton>
        </EventCard>
      ) : (
        <NoEvent>今回は特に何も起こりませんでした</NoEvent>
      )}
    </Container>
  );
};

export default PreTurnPhase;