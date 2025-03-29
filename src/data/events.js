// イベントデータ定義
const events = [
  {
    id: 'foreign_investment',
    name: '外国からの投資',
    description: '外国企業があなたの国へのAI投資に関心を示しました。',
    condition: {aiPower: { min: 5 }},
    effects: {
      economy: 20,
      stability: -1
    },
    weight: 4 // 発生確率の重み
  },
  {
    id: 'energy_crisis',
    name: 'エネルギー危機',
    description: '電力需要の急増により一時的なエネルギー危機が発生しました。',
    condition: { energy: { min: 30 } },
    effects: {
      energy: -10,
      stability: -5
    },
    weight: 1
  },
  {
    id: 'international_sanctions',
    name: '国際制裁',
    description: 'あなたのAI政策に対して国際社会から経済制裁措置が取られました。',
    condition: { 
      requiredCards: ['surveillance_ai']
    },
    effects: {
      economy: -5,
      stability: -1
    },
    weight: 10
  },
  {
    id: 'ai_breakthrough',
    name: 'AI技術のブレイクスルー',
    description: 'あなたの国のAIが、AI技術で重要なブレイクスルーを達成しました。',
    condition: { 
      requiredCards: ['ai_researcher_ai']
    },
    effects: {
      aiPower: 50,
      stability: 1
    },
    weight:15
  },
  {
    id: 'power_breakthrough',
    name: '発電技術のブレイクスルー',
    description: 'あなたの国のAIが、発電技術で重要なブレイクスルーを達成しました。',
    condition: { 
      requiredCards: ['power_generation_breakthrough']
    },
    effects: {
      energy: 40,
      stability: 1
    },
    weight:30
  },
  {
    id: 'public_protest',
    name: '臣民のデモ',
    description: 'AIによる雇用喪失を懸念するデモが発生しました。',
    condition: { 
      stability: { max: 120 },
      requiredCards: ['office_ai']
    },
    effects: {
      stability: -10,
      economy: -5
    },
    weight: 3
  },
  {
    id: 'hackers_attack',
    name: 'ハッカー攻撃',
    description: '海外のハッカー集団があなたの国のAIシステムに攻撃を仕掛けてきました。',
    condition: { aiPower: { min: 10 } },
    effects: {
      aiPower: -1,
      stability: -1
    },
    weight: 3
  },
  {
    id: 'power_grid_failure',
    name: '電力網障害',
    description: '大規模な電力網障害が発生し、国家システムに影響が出ました。',
    condition: { energy: { min: 50 } },
    effects: {
      energy: -20,
      economy: -5,
      stability: -5
    },
    weight: 1
  },
  {
    id: 'domestic_terrorism',
    name: '国内テロ',
    description: 'AI監視社会に反対するテロリストが政府施設を攻撃しました。',
    condition: { 
      requiredCards: ['surveillance_ai'],
      stability: { max: 150 }
    },
    effects: {
      stability: -20,
      economy: -20
    },
    weight: 2
  },
  {
    id: 'ai_malfunction',
    name: 'AI誤作動',
    description: '重要なAIシステムが誤作動を起こし、一部のインフラに被害が出ました。',
    condition: { aiPower: { min: 30 } },
    effects: {
      energy: -10,
      economy: -10,
      stability: -5
    },
    weight: 3
  },
  {
    id: 'international_collaboration',
    name: '国際協力',
    description: '他国とのAI研究協力協定が締結され、技術交流が促進されました。',
    condition: { 
      aiPower: { min: 20 },
      stability: { min: 80 }
    },
    effects: {
      aiPower: 5,
      economy: 5,
      stability: 5
    },
    weight: 3
  },
  {
    id: 'ai_singularity',
    name: 'AIシンギュラリティ',
    description: 'あなたの国のAIが突如として著しい知性の向上を示しました。人類にとって脅威か味方か？',
    condition: { 
      aiPower: { min: 100 },
      requiredCards: ['ai_researcher_ai']
    },
    effects: {
      aiPower: 200,
      stability: -20
    },
    weight: 3
  },
  {
    id: 'natural_disaster',
    name: '自然災害',
    description: '大規模な自然災害が発生し、国家インフラに甚大な被害が出ました。',
    condition: null,
    effects: {
      energy: -20,
      economy: -25,
      stability: -10
    },
    weight: 1
  },
  {
    id: 'resource_discovery',
    name: '資源発見',
    description: 'あなたの国で新たな天然資源が発見され、エネルギー生産が増加しました。',
    condition: null,
    effects: {
      energy: 30,
      economy: 20,
      stability: 5
    },
    weight: 2
  },
  {
    id: 'brain_drain',
    name: '頭脳流出',
    description: '優秀な科学者や技術者が他国へ流出しました。',
    condition: { 
      stability: { max: 100 },
      aiPower: { min: 10 }
    },
    effects: {
      aiPower: -1
    },
    weight: 3
  },
  {
    id: 'military_coup',
    name: '軍事クーデター',
    description: '軍部の一部があなたの政権に対してクーデターを試みました。',
    condition: { stability: { max: 50 } },
    effects: {
      stability: -40,
      economy: -20
    },
    weight: 1
  },
  {
    id: 'ai_policy_atteck',
    name: '他国のAIの浸透',
    description: '他国のAIが自由や平等を説いて、臣民を動揺させています。',
    condition: { 
      aiPower: { max: 5 },
    },
    effects: {
      stability: -5
    },
    weight: 10
  },
];

// ゲームの状態に基づいてランダムなイベントを取得する関数
export const getRandomEvent = (state) => {
  // stateが正しく渡されているか確認
  if (!state) {
    console.error('getRandomEvent: state is undefined');
    return null;
  }

  // selectedCardsがない場合は空の配列を使用
  const selectedCards = state.selectedCards || [];
  
  // 条件に合致するイベントをフィルタリング
  const availableEvents = events.filter(event => {
    // 条件がなければ常に選択可能
    if (!event.condition) return true;
    
    // パラメータ条件チェック
    for (const [param, condition] of Object.entries(event.condition)) {
      if (param === 'requiredCards') continue;
      
      // 対応するパラメータが存在することを確認
      if (state[param] === undefined) {
        console.warn(`getRandomEvent: Parameter ${param} not found in state for event condition`);
        return false;
      }
      
      if (condition.min && state[param] < condition.min) return false;
      if (condition.max && state[param] > condition.max) return false;
    }
    
    // 必要カードの条件チェック
    if (event.condition.requiredCards) {
      for (const requiredCard of event.condition.requiredCards) {
        if (!selectedCards.includes(requiredCard)) return false;
      }
    }
    
    return true;
  });

  // 利用可能なイベントがなければnullを返す
  if (availableEvents.length === 0) {
    // 常に選択可能なイベントだけを取得（条件なしイベント）
    const fallbackEvents = events.filter(event => !event.condition);
    
    // 条件なしイベントもなければnullを返す
    if (fallbackEvents.length === 0) return null;
    
    // ランダムに1つ選択して返す
    return fallbackEvents[Math.floor(Math.random() * fallbackEvents.length)];
  }
  
  // 重みに基づいてイベントを選択
  const totalWeight = availableEvents.reduce((sum, event) => sum + event.weight, 0);
  let randomValue = Math.random() * totalWeight;
  
  for (const event of availableEvents) {
    randomValue -= event.weight;
    if (randomValue <= 0) return event;
  }
  
  // 念のため、最初のイベントを返す
  return availableEvents[0];
};

export default events;