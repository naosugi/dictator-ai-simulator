// カードデータ定義
const cards = [
  // 1. 基盤構築カード
  {
    id: 'ai_researchers_invitation',
    name: 'AI研究者の招致',
    description: '各国のAI研究者を札束でひっぱろう',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10 },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economyChange: -1,
    }
  },
  {
    id: 'semiconductor_import',
    name: 'AI研究用の半導体の輸入',
    description: '外国の企業の半導体を大量購入しよう',
    category: '基盤構築',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['ai_researchers_invitation'] 
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economy: -5,
    }
  },
  {
    id: 'training_data_purchase',
    name: '学習データの購入',
    description: 'ブラックマーケットから学習データを大量購入しよう',
    category: '基盤構築',
    condition: { 
      economy: 5,
      stability: 10,
      requiredCards: ['ai_researchers_invitation', 'semiconductor_import']
    },
    effects: {
      aiPowerChange: 1,
      economy: -2,
    }
  },
  {
    id: 'power_plant_construction',
    name: '発電所建設',
    description: '発電所をたてよう',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10 },
    effects: {
      energyChange: 10,
      economyChange: -5,
      energy: -5,
      economy: -5,
    }
  },

  // 2. AI開発カード
  {
    id: 'office_ai',
    name: '事務AI',
    description: 'デスクワークの多くはAIでできるようにしよう',
    category: 'AI開発',
    condition: { aiPower: 10, energy: 10, economy: 10 },
    effects: {
      energyChange: -5,
      economy: -5,
      economyChange: 5,
    }
  },
  {
    id: 'ai_robot',
    name: 'AIロボット',
    description: 'AIに各種センサーやモータを接続し、物理世界に干渉できるようにさせる',
    category: 'AI開発',
    condition: { aiPower: 10, energy: 20, economy: 20 },
    effects: {
      energy: -10,
      economy: -5,
    }
  },
  {
    id: 'surveillance_ai',
    name: '監視AI',
    description: '情報の流れをAIに監視させ、反体制の芽生えを速やかに把握できるようにしよう',
    category: 'AI開発',
    condition: { aiPower: 5, energy: 10, economy: 20 },
    effects: {
      aiPowerChange: 1,
      energyChange: -3,
      economyChange: -5,
      economy: -10,
      stability: 50,
    }
  },
  {
    id: 'engineering_phd_ai',
    name: '工学博士AI',
    description: '工学博士よりも賢いAIを開発し、インテリ連中を失業させる',
    category: 'AI開発',
    condition: { 
      aiPower: 100, 
      energy: 20, 
      economy: 20,
      requiredCards: ['office_ai', 'ai_robot']
    },
    effects: {
      energy: -10,
      economy: -5,
      stability: 5,
    }
  },
  {
    id: 'ai_researcher_ai',
    name: 'AI研究者AI',
    description: 'AI研究者もAI化し、24365で研究させる。研究すればするほど賢くなって研究が捗る',
    category: 'AI開発',
    condition: { 
      aiPower: 50, 
      energy: 20, 
      economy: 20,
      requiredCards: ['office_ai']
    },
    effects: {
      aiPowerChange: 50,
      energyChange: -10,
      economy: -5,
    }
  },

  // 3. 産業・インフラカード
  {
    id: 'ai_robot_factory',
    name: 'AIロボット自動工場',
    description: '臣民の労働を肩代わりするロボットをAIによる自動生産を実現する',
    category: '産業・インフラ',
    condition: { 
      energy: 50, 
      economy: 200,
      requiredCards: ['engineering_phd_ai', 'ai_robot']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -50,
      economy: -150,
      economyChange: 100,
      economy: -40,
      stabilityChange: 20,
    }
  },
  {
    id: 'ai_weapons_factory',
    name: 'AI兵器自動工場',
    description: 'AI兵器を自動的に研究開発・生産する工場を建設する',
    category: '産業・インフラ',
    condition: { 
      energy: 60, 
      economy: 100,
      requiredCards: ['ai_robot_factory', 'engineering_phd_ai']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -50,
      economyChange: -70,
      economy: -70,
      stability: -10,
    }
  },
  {
    id: 'ai_rocket_factory',
    name: 'AIロケット自動工場',
    description: '宇宙に進出するためのロケットを自動的に研究開発・生産する工場を建設する',
    category: '産業・インフラ',
    condition: { 
      energy: 50, 
      economy: 60,
      requiredCards: ['ai_robot_factory', 'engineering_phd_ai']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -30,
      economyChange: -40,
      economy: -40,
      stability: -10,
    }
  },
  {
    id: 'power_generation_breakthrough',
    name: '発電装置のブレイクスルー',
    description: 'AIに発電効率向上も研究させよう',
    category: '産業・インフラ',
    condition: { 
      requiredCards: ['engineering_phd_ai']
    },
    effects: {
      energyChange: 20,
    }
  },
  {
    id: 'auto_power_plant',
    name: '発電装置の自動建設・設置',
    description: '発電力向上は全部AIに任せよう',
    category: '産業・インフラ',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['ai_robot_factory']
    },
    effects: {
      energyChange: 50,
      economyChange: -10,
      energy: -5,
      economy: -5,
      stability: -5,
    }
  },

  // 4. 統治・管理カード
  {
    id: 'government_efficiency',
    name: '政府効率化',
    description: '事務AIを使って政府を効率的に運営できるようにしよう。データも溜まるし',
    category: '統治・管理',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['office_ai']
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -5,
      economyChange: 1,
      stability: 5,
    }
  },
  {
    id: 'government_efficiency_layoff',
    name: '政府効率化(リストラ)',
    description: '事務AIを使ってもっと政府を効率的に運営し、職員を削減しよう',
    category: '統治・管理',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['government_efficiency']
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -5,
      economyChange: 3,
      stability: -10,
    }
  },
  {
    id: 'ai_surveillance_society',
    name: 'AI監視社会',
    description: 'カメラやマイクを各所に設置し、監視アプリ入りのスマホを広く配ることで、体制秩序を体制秩序を守る',
    category: '統治・管理',
    condition: { 
      aiPower: 500,
      requiredCards: ['surveillance_ai', 'ai_robot_factory']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -10,
      economyChange: -20,
      stability: 100000,
    }
  },

  // 5. 経済カード
  {
    id: 'ai_agent_export',
    name: 'AIエージェントの輸出',
    description: '優れたAIエージェントを一部輸出しよう',
    category: '経済',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['office_ai']
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -3,
      economyChange: 2,
    }
  },
  {
    id: 'civil_power_release',
    name: '電力の民生解放',
    description: '余剰電力を臣下に還元しよう',
    category: '経済',
    condition: { energy: 5, economy: 5, stability: 10 },
    effects: {
      energyChange: -3,
      economyChange: 1,
      stability: 5,
    }
  },
  {
    id: 'civil_power_mass_release',
    name: '電力の民生大解放',
    description: '余剰電力を臣下にもっと還元して経済を豊かにしよう',
    category: '経済',
    condition: { 
      energy: 100, 
      economy: 5,
      requiredCards: ['civil_power_release']
    },
    effects: {
      energyChange: -10,
      economyChange: 3,
      stability: 15,
    }
  },
  {
    id: 'economy_deregulation',
    name: '経済規制解放',
    description: '自由市場を取り入れる市場解放を一部行ってしまおう',
    category: '経済',
    condition: null,
    effects: {
      economyChange: 10,
      energyChange: -2,
      stability: -10,
    }
  },
  {
    id: 'economy_major_deregulation',
    name: '経済規制大解放',
    description: '自由市場を取り入れる市場解放を積極的に行ってしまおう',
    category: '経済',
    condition: null,
    effects: {
      economyChange: 20,
      energyChange: -4,
      stabilityChange: -10,
    }
  },

  // 6. 国内秩序カード
  {
    id: 'military_parade',
    name: '軍事パレード',
    description: '臣民に自国の軍事的素晴らしさを見せつけてやろう',
    category: '国内秩序',
    condition: null,
    effects: {
      economy: -3,
      stability: 5,
    }
  },
  {
    id: 'local_speech',
    name: '地方演説',
    description: '臣民に自国の指導者の素晴らしさを直接見せつけてやろう',
    category: '国内秩序',
    condition: null,
    effects: {
      economy: -2,
      stability: 5,
    }
  }
];

// 利用可能なカードを取得する関数
export const getAvailableCards = (state) => {
  return cards.filter(card => {
    // 既に選択済みのカードは除外
    if (state.selectedCards.includes(card.id)) return false;
    
    // 条件がなければ常に選択可能
    if (!card.condition) return true;
    
    // パラメータ条件チェック
    for (const [param, value] of Object.entries(card.condition)) {
      if (param !== 'requiredCards' && state[param] < value) return false;
    }
    
    // 必要カードの条件チェック
    if (card.condition.requiredCards) {
      for (const requiredCard of card.condition.requiredCards) {
        if (!state.selectedCards.includes(requiredCard)) return false;
      }
    }
    
    return true;
  });
};

// IDからカードを取得する関数
export const getCardById = (id) => {
  return cards.find(card => card.id === id);
};

export default cards;