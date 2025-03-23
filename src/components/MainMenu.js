import React, { useState } from 'react';
import styled from 'styled-components';
import { useGame } from '../contexts/GameContext';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1a1a2e;
  text-align: center;
`;

const Logo = styled.h1`
  font-size: 2.5rem;
  color: #e94560;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  color: #cccccc;
  margin-bottom: 60px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 350px;
  width: 100%;
`;

const MenuButton = styled.button`
  background-color: ${props => props.primary ? '#e94560' : '#16213e'};
  color: ${props => props.primary ? '#16213e' : '#e94560'};
  border: 2px solid #e94560;
  padding: 15px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    background-color: ${props => props.primary ? '#d3405c' : '#0f3460'};
  }
`;

const RulesContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const RulesContent = styled.div`
  background-color: #16213e;
  border: 2px solid #e94560;
  border-radius: 10px;
  padding: 30px;
  max-width: 800px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  
  h2 {
    color: #e94560;
    margin-top: 0;
    margin-bottom: 20px;
  }
  
  p {
    color: #f0f0f0;
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  h3 {
    color: #e94560;
    margin-top: 25px;
    margin-bottom: 15px;
  }
  
  ul {
    color: #f0f0f0;
    margin-bottom: 15px;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
      line-height: 1.6;
    }
  }
  
  button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: transparent;
    border: none;
    color: #e94560;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  margin-top: 60px;
  color: #888888;
  font-size: 0.9rem;
  
  a {
    color: #e94560;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const MainMenu = () => {
  const { startNewGame } = useGame();
  const [showRules, setShowRules] = useState(false);
  
  return (
    <MenuContainer>
      <Logo>独裁者AI国家シミュレーター</Logo>
      <Subtitle>AIを駆使して最強の国家を作り上げろ</Subtitle>
      
      <ButtonContainer>
        <MenuButton primary onClick={startNewGame}>
          ゲームスタート
        </MenuButton>
        <MenuButton onClick={() => setShowRules(true)}>
          ゲームルール
        </MenuButton>
      </ButtonContainer>
      
      <Footer>
        ※注意: これは架空のシミュレーションゲームです。現実の政治や国際関係を意図的に風刺したブラックジョークです。<br />
        実際の国家運営や政治とは関係ありません
      </Footer>
      
      {showRules && (
        <RulesContainer>
          <RulesContent>
            <h2>ゲームルール</h2>
            <button onClick={() => setShowRules(false)}>×</button>
            
            <p>
              あなたは一国の独裁者となり、AI技術を駆使して国家を強靭にするシミュレーションゲームです。
              25ターンの間に様々な選択をして、最終的に強力な国家を構築しましょう。
            </p>
            
            <h3>ゲームの流れ</h3>
            <ol>
              <li>各ターンは4つのフェーズで構成されています</li>
              <li><strong>イベント発生フェーズ</strong>: ランダムなイベントが発生し、国家に影響を与えます</li>
              <li><strong>カード選択フェーズ</strong>: 選択可能なカードの中から1枚を選び、国家に実装する政策を決定します</li>
              <li><strong>カード効果発動フェーズ</strong>: 選択したカードの効果が適用されます</li>
              <li><strong>ターン終了フェーズ</strong>: 各パラメータが更新され、次のターンへ移行します</li>
            </ol>
            
            <h3>ゲームの目的</h3>
            <p>
              25ターン目が終了した時点で、あなたの選択と構築した国家の状態に基づいて、
              8種類のエンディングのいずれかが決定します。最も強力な国家を構築して、
              最高のエンディングを目指しましょう。
            </p>
            
            <h3>パラメータについて</h3>
            <ul>
              <li><strong>AI力</strong>: 国家のAI技術力を表します。高いほど高度なAI技術が利用可能になります</li>
              <li><strong>電力</strong>: 国家のエネルギー資源を表します。0になるとゲームオーバーです</li>
              <li><strong>財力</strong>: 国家の経済力を表します。0になるとゲームオーバーです</li>
              <li><strong>体制秩序</strong>: 国家の安定度を表します。0になるとゲームオーバーです</li>
            </ul>
            
            <p>
              各パラメータには「変動値」があり、ターン終了時にパラメータに加算されます。
              様々なカードやイベントを通じて、パラメータとその変動値をうまく管理しましょう。
            </p>
            
            <h3>カードの種類</h3>
            <p>
              カードは6つのカテゴリに分類されています：
            </p>
            <ul>
              <li><strong>基盤構築</strong>: 国家のAI基盤を構築するための基本的なカード</li>
              <li><strong>AI開発</strong>: AIの能力を発展させるカード</li>
              <li><strong>産業・インフラ</strong>: 国家の産業基盤を強化するカード</li>
              <li><strong>統治・管理</strong>: 国家の秩序と効率を維持するカード</li>
              <li><strong>経済</strong>: 国家の財力を強化するカード</li>
              <li><strong>国内秩序</strong>: 体制秩序を維持するカード</li>
            </ul>
            
            <p>
              各カードには選択条件があり、条件を満たした場合のみ選択が可能になります。
              戦略的にカードを選択し、最終的なエンディングにつなげましょう。
            </p>
          </RulesContent>
        </RulesContainer>
      )}
    </MenuContainer>
  );
};

export default MainMenu;