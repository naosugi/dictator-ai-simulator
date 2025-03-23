// イベントデータ定義
const events = [
  {
    id: 'foreign_investment',
    name: '外国からの投資',
    description: '外国企業があなたの国へのAI投資に関心を示しています。',
    condition: null, // 条件なし
    effects: {
      economy: 20,
      stability: -5
    },
    weight: 10 // 発生確率の重み
  },
  {
    id: 'energy_crisis',
    name: 'エネルギー危機',
    description: '電力需要の急増により一時的なエネルギー危機が発生しました。',
    condition: { energy: { min: 30 } },
    effects: {
      energy: -15,
      stability: -10
    },
    weight: 8
  },
  {
    id: 'international_sanctions',
    name: '国際制裁',
    description: 'あなたのAI政策に対して国際社会から制裁措置が取られました。',
    condition: { 
      aiPower: { min: 200 },
      requiredCards: ['surveillance_ai']
    },
    effects: {
      economy: -20,
      stability: -15
    },
    weight: 5
  },
  {
    id: 'ai_breakthrough',
    name: 'AI技術のブレイクスルー',
    description: 'あなたの国の研究者たちがAI技術で重要なブレイクスルーを達成しました。',
    condition: { 
      aiPower: { min: 100 },
      requiredCards: ['ai_researcher_ai']
    },
    effects: {
      aiPower: 50,
      stability: 10
    },
    weight: 7
  },
  {
    id: 'public_protest',
    name: '市民のデモ',
    description: 'AIによる雇用喪失を懸念する市民のデモが発生しました。',
    condition: { 
      stability: { max: 120 },
      requiredCards: ['ai_robot_factory']
    },
    effects: {
      stability: -20,
      economy: -5
    },
    weight: 6
  },
  {
    id: 'hackers_attack',
    name: 'ハッカー攻撃',
    description: '海外のハッカー集団があなたの国のAIシステムに攻撃を仕掛けてきました。',
    condition: { aiPower: { min: 50 } },
    effects: {
      aiPower: -10,
      stability: -5
    },
    weight: 9
  },
  {
    id: 'power_grid_failure',
    name: '電力網障害',
    description: '大規模な電力網障害が発生し、国家システムに影響が出ています。',
    condition: { energy: { min: 50 } },
    effects: {
      energy: -25,
      economy: -10,
      stability: -5
    },
    weight: 7
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
      stability: -30,
      economy: -15
    },
    weight: 5
  },
  {
    id: 'ai_malfunction',
    name: 'AI誤作動',
    description: '重要なAIシステムが誤作動を起こし、一部のインフラに被害が出ました。',
    condition: { aiPower: { min: 300 } },
    effects: {
      aiPower: -20,
      energy: -10,
      economy: -15,
      stability: -10
    },
    weight: 6
  },
  {
    id: 'international_collaboration',
    name: '国際協力',
    description: '他国とのAI研究協力協定が締結され、技術交流が促進されました。',
    condition: { 
      aiPower: { min: 150 },
      stability: { min: 80 }
    },
    effects: {
      aiPower: 30,
      economy: 15,
      stability: 5
    },
    weight: 7
  },
  {
    id: 'ai_singularity',
    name: 'AIシンギュラリティ',
    description: 'あなたの国のAIが突如として著しい知性の向上を示しました。人類にとって脅威か味方か？',
    condition: { 
      aiPower: { min: 800 },
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
      stability: -15
    },
    weight: 4
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
    weight: 5
  },
  {
    id: 'brain_drain',
    name: '頭脳流出',
    description: '優秀な科学者や技術者が他国へ流出しています。',
    condition: { 
      stability: { max: 100 },
      aiPower: { min: 100 }
    },
    effects: {
      aiPower: -15,
      economy: -10
    },
    weight: 6
  },
  {
    id: 'military_coup',
    name: '軍事クーデター',
    description: '軍部の一部があなたの政権に対してクーデターを試みました。',
    condition: { stability: { max: 70 } },
    effects: {
      stability: -40,
      economy: -20
    },
    weight: 4
  }
];

// ゲームの状態に基づいてランダムなイベントを取得する関数
export const getRandomEvent = (state) => {
  // 条件に合致するイベントをフィルタリング
  const availableEvents = events.filter(event => {
    // 条件がなければ常に選択可能
    if (!event.condition) return true;
    
    // パラメータ条件チェック
    for (const [param, condition] of Object.entries(event.condition)) {
      if (param === 'requiredCards') continue;
      
      if (condition.min && state[param] < condition.min) return false;
      if (condition.max && state[param] > condition.max) return false;
    }
    
    // 必要カードの条件チェック
    if (event.condition.requiredCards) {
      for (const requiredCard of event.condition.requiredCards) {
        if (!state.selectedCards.includes(requiredCard)) return false;
      }
    }
    
    return true;
  });

  // 利用可能なイベントがなければnullを返す
  if (availableEvents.length === 0) return null;
  
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