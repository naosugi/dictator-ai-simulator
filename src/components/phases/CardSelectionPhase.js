import React from 'react';
import styled from 'styled-components';
import { useGame } from '../../contexts/GameContext';
import Card from '../Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  color: #e94560;
  font-size: 1.6rem;
  margin-bottom: 30px;
`;

const NoCards = styled.div`
  color: #ccc;
  font-size: 1.2rem;
  background-color: #0f3460;
  padding: 40px;
  border-radius: 12px;
  border: 2px dashed #e94560;
  margin-top: 20px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const CardWrapper = styled.div`
  transition: all 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const DescriptionContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 30px;
  background-color: #0f3460;
  border-radius: 10px;
  padding: 15px;
`;

const Description = styled.p`
  color: #f0f0f0;
  font-size: 1rem;
  line-height: 1.6;
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button`
  background-color: ${props => props.active ? props.color : 'transparent'};
  color: ${props => props.active ? '#fff' : props.color};
  border: 1px solid ${props => props.color};
  border-radius: 20px;
  padding: 6px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.color};
    color: #fff;
  }
`;

const getCategoryColor = (category) => {
  switch (category) {
    case '基盤構築': return '#3498db';
    case 'AI開発': return '#9b59b6';
    case '産業・インフラ': return '#e67e22';
    case '統治・管理': return '#e74c3c';
    case '経済': return '#2ecc71';
    case '国内秩序': return '#f1c40f';
    default: return '#e94560';
  }
};

const CardSelectionPhase = () => {
  const { state, selectCard, nextPhase } = useGame();
  const { availableCards, selectedCard } = state;
  
  // カードの選択を処理する関数
  const handleCardSelection = (cardId) => {
    selectCard(cardId);
    nextPhase();
  };
  
  // 使用可能なカードの種類を取得
  const categories = [...new Set(availableCards.map(card => card.category))];
  
  // カテゴリーでフィルターするのはReactを使ってデモで表現するだけ（今回は実装しない）
  
  return (
    <Container>
      <Title>政策の選択</Title>
      
      <DescriptionContainer>
        <Description>
          以下の政策の中から1つを選択してください。あなたの決断が国家の未来を左右します。
        </Description>
      </DescriptionContainer>
      
      <CategoryFilter>
        {categories.map(category => (
          <CategoryButton 
            key={category}
            color={getCategoryColor(category)}
            active={true} // 実際のフィルター機能は省略
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilter>
      
      {availableCards.length > 0 ? (
        <CardsContainer>
          {availableCards.map(card => (
            <CardWrapper key={card.id}>
              <Card 
                card={card} 
                onClick={() => handleCardSelection(card.id)}
                selected={selectedCard?.id === card.id}
              />
            </CardWrapper>
          ))}
        </CardsContainer>
      ) : (
        <NoCards>
          選択可能な政策がありません。条件を満たすとより多くの政策が選択できるようになります。
          <br /><br />
          <button onClick={nextPhase}>次のフェーズへ</button>
        </NoCards>
      )}
    </Container>
  );
};

export default CardSelectionPhase;