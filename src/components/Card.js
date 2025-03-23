import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 220px;
  height: 320px;
  background-color: #16213e;
  border: 2px solid ${props => 
    props.category === '基盤構築' ? '#3498db' : 
    props.category === 'AI開発' ? '#9b59b6' : 
    props.category === '産業・インフラ' ? '#e67e22' : 
    props.category === '統治・管理' ? '#e74c3c' : 
    props.category === '経済' ? '#2ecc71' : 
    props.category === '国内秩序' ? '#f1c40f' : 
    '#e94560'
  };
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  transform: ${props => props.selected ? 'scale(1.05)' : 'scale(1)'};
  
  &:hover {
    transform: ${props => props.onClick ? 'translateY(-10px)' : 'none'};
    box-shadow: ${props => props.onClick ? '0 8px 16px rgba(0, 0, 0, 0.4)' : '0 4px 8px rgba(0, 0, 0, 0.3)'};
  }
  
  ${props => props.onClick && `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      border: 2px solid transparent;
      background: linear-gradient(45deg, rgba(233, 69, 96, 0.5), transparent) border-box;
      mask:
        linear-gradient(#fff 0 0) padding-box, 
        linear-gradient(#fff 0 0);
      mask-composite: exclude;
      animation: pulse 1.5s infinite;
      pointer-events: none;
    }
    
    @keyframes pulse {
      0% {
        opacity: 0.5;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.5;
      }
    }
  `}
`;

const CategoryBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => 
    props.category === '基盤構築' ? '#3498db' : 
    props.category === 'AI開発' ? '#9b59b6' : 
    props.category === '産業・インフラ' ? '#e67e22' : 
    props.category === '統治・管理' ? '#e74c3c' : 
    props.category === '経済' ? '#2ecc71' : 
    props.category === '国内秩序' ? '#f1c40f' : 
    '#e94560'
  };
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CardTitle = styled.h3`
  color: #e94560;
  font-size: 1.2rem;
  margin: 15px 0 10px;
  text-align: center;
  line-height: 1.3;
`;

const CardDescription = styled.p`
  color: #f0f0f0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
  flex-grow: 1;
`;

const EffectsContainer = styled.div`
  background-color: #0f3460;
  border-radius: 8px;
  padding: 10px;
  margin-top: auto;
`;

const EffectRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 5px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EffectLabel = styled.span`
  color: #ccc;
`;

const EffectValue = styled.span`
  color: ${props => props.value > 0 ? '#4caf50' : props.value < 0 ? '#ff5252' : '#ccc'};
  font-weight: bold;
`;

// カードの効果を表示するコンポーネント
const CardEffects = ({ effects }) => {
  // 効果がない場合は何も表示しない
  if (!effects || Object.keys(effects).length === 0) {
    return null;
  }
  
  // 効果の表示名をマッピング
  const effectsMap = {
    aiPower: 'AI力',
    energy: '電力',
    economy: '財力',
    stability: '体制秩序',
    aiPowerChange: 'AI力/ターン',
    energyChange: '電力/ターン',
    economyChange: '財力/ターン',
    stabilityChange: '体制秩序/ターン',
  };
  
  return (
    <EffectsContainer>
      {Object.entries(effects).map(([key, value]) => (
        <EffectRow key={key}>
          <EffectLabel>{effectsMap[key] || key}</EffectLabel>
          <EffectValue value={value}>
            {value > 0 ? `+${value}` : value}
          </EffectValue>
        </EffectRow>
      ))}
    </EffectsContainer>
  );
};

const Card = ({ card, onClick, selected }) => {
  if (!card) return null;
  
  return (
    <CardContainer 
      category={card.category} 
      onClick={onClick} 
      selected={selected}
    >
      <CategoryBadge category={card.category}>{card.category}</CategoryBadge>
      <CardTitle>{card.name}</CardTitle>
      <CardDescription>{card.description}</CardDescription>
      <CardEffects effects={card.effects} />
    </CardContainer>
  );
};

export default Card;