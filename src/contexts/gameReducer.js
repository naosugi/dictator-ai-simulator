import { getRandomEvent } from '../data/events';
import { getAvailableCards, getCardById } from '../data/cards';
import { getEnding } from '../data/endings';

// Game Phases
export const PHASES = {
  MENU: 'MENU',
  PRE_TURN: 'PRE_TURN',
  CARD_SELECTION: 'CARD_SELECTION',
  CARD_EFFECT: 'CARD_EFFECT',
  POST_TURN: 'POST_TURN',
  GAME_OVER: 'GAME_OVER',
  ENDING: 'ENDING',
};

export const initialState = {
  phase: PHASES.MENU,
  turn: 1,
  maxTurns: 25, // 20から25ターンに変更
  
  // Current state parameters
  aiPower: 0,
  energy: 100,
  economy: 100,
  stability: 100,
  
  // Change parameters
  aiPowerChange: 0,
  energyChange: 0,
  economyChange: 0, 
  stabilityChange: 0,
  
  selectedCards: [],
  currentEvent: null,
  availableCards: [],
  selectedCard: null,
  gameOverReason: null,
  ending: null,
};

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'START_NEW_GAME':
      // 新ゲーム用の初期状態を作成
      const newGameState = {...initialState};
      
      // 初期状態に基づいてイベントを取得
      return {
        ...newGameState,
        phase: PHASES.PRE_TURN,
        currentEvent: getRandomEvent(newGameState),
      };
      
    case 'NEXT_PHASE': {
      switch (state.phase) {
        case PHASES.PRE_TURN:
          // イベント効果の適用
          const updatedAiPower = Math.max(0, state.aiPower + (state.currentEvent?.effects?.aiPower || 0));
          const updatedEnergy = Math.max(0, state.energy + (state.currentEvent?.effects?.energy || 0));
          const updatedEconomy = Math.max(0, state.economy + (state.currentEvent?.effects?.economy || 0));
          const updatedStability = Math.max(0, state.stability + (state.currentEvent?.effects?.stability || 0));
          
          // イベント効果適用後にゲームオーバー条件をチェック
          if (updatedEnergy <= 0 || updatedEconomy <= 0 || updatedStability <= 0) {
            let gameOverReason = '';
            if (updatedEnergy <= 0) gameOverReason = 'エネルギー危機により国家崩壊';
            else if (updatedEconomy <= 0) gameOverReason = '経済崩壊により国家崩壊';
            else if (updatedStability <= 0) gameOverReason = '体制秩序崩壊により国家崩壊';
            
            return {
              ...state,
              energy: Math.max(0, updatedEnergy),
              economy: Math.max(0, updatedEconomy),
              stability: Math.max(0, updatedStability),
              aiPower: updatedAiPower,
              phase: PHASES.GAME_OVER,
              gameOverReason,
            };
          }
          
          // 更新された状態
          const updatedState = {
            ...state,
            aiPower: updatedAiPower,
            energy: updatedEnergy,
            economy: updatedEconomy,
            stability: updatedStability,
          };
          
          return {
            ...updatedState,
            phase: PHASES.CARD_SELECTION,
            availableCards: getAvailableCards(updatedState),
          };
          
        case PHASES.CARD_SELECTION:
          if (!state.selectedCard) return state;
          
          // カード効果を現在のパラメータに適用
          const cardEffectAiPower = Math.max(0, state.aiPower + (state.selectedCard.effects?.aiPower || 0));
          const cardEffectEnergy = Math.max(0, state.energy + (state.selectedCard.effects?.energy || 0));
          const cardEffectEconomy = Math.max(0, state.economy + (state.selectedCard.effects?.economy || 0));
          const cardEffectStability = Math.max(0, state.stability + (state.selectedCard.effects?.stability || 0));
          
          // 変化量への影響
          const newAiPowerChange = state.aiPowerChange + (state.selectedCard.effects?.aiPowerChange || 0);
          const newEnergyChange = state.energyChange + (state.selectedCard.effects?.energyChange || 0);
          const newEconomyChange = state.economyChange + (state.selectedCard.effects?.economyChange || 0);
          const newStabilityChange = state.stabilityChange + (state.selectedCard.effects?.stabilityChange || 0);
          
          // カード効果適用後にゲームオーバー条件をチェック
          if (cardEffectEnergy <= 0 || cardEffectEconomy <= 0 || cardEffectStability <= 0) {
            let gameOverReason = '';
            if (cardEffectEnergy <= 0) gameOverReason = 'エネルギー危機により国家崩壊';
            else if (cardEffectEconomy <= 0) gameOverReason = '経済崩壊により国家崩壊';
            else if (cardEffectStability <= 0) gameOverReason = '体制秩序崩壊により国家崩壊';
            
            return {
              ...state,
              energy: Math.max(0, cardEffectEnergy),
              economy: Math.max(0, cardEffectEconomy),
              stability: Math.max(0, cardEffectStability),
              aiPower: cardEffectAiPower,
              phase: PHASES.GAME_OVER,
              gameOverReason,
            };
          }
          
          return {
            ...state,
            phase: PHASES.CARD_EFFECT,
            // Apply card effects to current state
            aiPower: cardEffectAiPower,
            energy: cardEffectEnergy,
            economy: cardEffectEconomy,
            stability: cardEffectStability,
            // Apply card effects to change parameters
            aiPowerChange: newAiPowerChange,
            energyChange: newEnergyChange,
            economyChange: newEconomyChange,
            stabilityChange: newStabilityChange,
          };
          
        case PHASES.CARD_EFFECT:
          return {
            ...state,
            phase: PHASES.POST_TURN,
          };
          
        case PHASES.POST_TURN: {
          // Apply change parameters to current state
          const newAiPower = state.aiPower + state.aiPowerChange;
          const newEnergy = state.energy + state.energyChange;
          const newEconomy = state.economy + state.economyChange;
          const newStability = state.stability + state.stabilityChange;
          
          // Check for game over conditions
          if (newEnergy <= 0 || newEconomy <= 0 || newStability <= 0) {
            let gameOverReason = '';
            if (newEnergy <= 0) gameOverReason = 'エネルギー危機により国家崩壊';
            else if (newEconomy <= 0) gameOverReason = '経済崩壊により国家崩壊';
            else if (newStability <= 0) gameOverReason = '体制秩序が崩壊し、独裁政権転覆';
            
            return {
              ...state,
              energy: Math.max(0, newEnergy),
              economy: Math.max(0, newEconomy),
              stability: Math.max(0, newStability),
              aiPower: Math.max(0, newAiPower),
              phase: PHASES.GAME_OVER,
              gameOverReason,
            };
          }
          
          // Check if last turn
          if (state.turn >= state.maxTurns) {
            // 最終ターン状態を作成
            const finalState = {
              ...state,
              energy: newEnergy,
              economy: newEconomy,
              stability: newStability,
              aiPower: newAiPower
            };
            
            return {
              ...finalState,
              phase: PHASES.ENDING,
              ending: getEnding(finalState),
            };
          }
          
          // 次のターンの状態を作成
          const nextTurnState = {
            ...state,
            turn: state.turn + 1,
            energy: newEnergy,
            economy: newEconomy, 
            stability: newStability,
            aiPower: newAiPower,
            selectedCard: null,
            availableCards: [],
          };
          
          // 更新された状態に基づいてイベントを取得
          return {
            ...nextTurnState,
            phase: PHASES.PRE_TURN,
            currentEvent: getRandomEvent(nextTurnState),
          };
        }
        
        case PHASES.GAME_OVER:
        case PHASES.ENDING:
          return {
            ...state,
            phase: PHASES.MENU,
          };
          
        default:
          return state;
      }
    }
    
    case 'SELECT_CARD': {
      const selectedCard = getCardById(action.payload);
      const updatedSelectedCards = [...state.selectedCards, selectedCard.id];
      
      return {
        ...state,
        selectedCard,
        selectedCards: updatedSelectedCards,
      };
    }
    
    case 'CONFIRM_EVENT':
      // イベント効果の適用
      const newAiPower = Math.max(0, state.aiPower + (state.currentEvent?.effects?.aiPower || 0));
      const newEnergy = Math.max(0, state.energy + (state.currentEvent?.effects?.energy || 0));
      const newEconomy = Math.max(0, state.economy + (state.currentEvent?.effects?.economy || 0));
      const newStability = Math.max(0, state.stability + (state.currentEvent?.effects?.stability || 0));
      
      // イベント効果適用後にゲームオーバー条件をチェック
      if (newEnergy <= 0 || newEconomy <= 0 || newStability <= 0) {
        let gameOverReason = '';
        if (newEnergy <= 0) gameOverReason = 'エネルギー危機により国家崩壊';
        else if (newEconomy <= 0) gameOverReason = '経済崩壊により国家崩壊';
        else if (newStability <= 0) gameOverReason = '体制秩序崩壊により国家崩壊';
        
        return {
          ...state,
          energy: Math.max(0, newEnergy),
          economy: Math.max(0, newEconomy),
          stability: Math.max(0, newStability),
          aiPower: newAiPower,
          phase: PHASES.GAME_OVER,
          gameOverReason,
        };
      }
      
      // 更新された状態
      const confirmedEventState = {
        ...state,
        aiPower: newAiPower,
        energy: newEnergy,
        economy: newEconomy,
        stability: newStability
      };
      
      return {
        ...confirmedEventState,
        phase: PHASES.CARD_SELECTION,
        // 更新された状態で利用可能なカードを取得
        availableCards: getAvailableCards(confirmedEventState),
      };
      
    case 'RESET_GAME':
      return {
        ...initialState,
      };
      
    default:
      return state;
  }
};