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
    id: 'ai_researchers_invitation2',
    name: 'AI研究者の再招致',
    description: '各国のAI研究者を札束でひっぱろう。人件費上がってる・・・',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['ai_researchers_invitation'] },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economyChange: -2,
    }
  },
  {
    id: 'ai_researchers_invitation3',
    name: 'AI研究者の再招致',
    description: '各国のAI研究者を札束でひっぱろう。人件費さらに上がってる・・・',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['ai_researchers_invitation2'] },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economyChange: -3,
    }
  },
  {
    id: 'ai_researchers_invitation4',
    name: 'AI研究者の再招致',
    description: '各国のAI研究者を札束でひっぱろう。人件費がさらにさらに上がってる・・・',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['ai_researchers_invitation3'] },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economyChange: -4,
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
    id: 'semiconductor_import2',
    name: 'AI研究用の半導体の再輸入',
    description: '外国の企業の半導体をまた大量購入しよう。値上がりしてる・・・',
    category: '基盤構築',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['semiconductor_import'] 
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economy: -10,
    }
  },
  {
    id: 'semiconductor_import3',
    name: 'AI研究用の半導体の再輸入',
    description: '外国の企業の半導体をまたまた大量購入しよう。さらに値上がりしてる・・・',
    category: '基盤構築',
    condition: { 
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['semiconductor_import2'] 
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -1,
      economy: -15,
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
    id: 'training_data_purchase2',
    name: '学習データの再購入',
    description: 'またブラックマーケットから学習データを大量購入しよう。値上がりしてる・・・',
    category: '基盤構築',
    condition: { 
      economy: 5,
      stability: 10,
      requiredCards: ['training_data_purchase']
    },
    effects: {
      aiPowerChange: 1,
      economy: -4,
    }
  },
  {
    id: 'training_data_purchase3',
    name: '学習データの再購入',
    description: 'またブラックマーケットから学習データを大量購入しよう。また値上がりしてる・・・',
    category: '基盤構築',
    condition: { 
      economy: 5,
      stability: 10,
      requiredCards: ['training_data_purchase2']
    },
    effects: {
      aiPowerChange: 1,
      economy: -6,
    }
  },
  {
    id: 'power_plant_construction',
    name: '発電所建設',
    description: '発電所をたてよう',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10 },
    effects: {
      energyChange: 15,
      economyChange: -5,
      energy: -5,
      economy: -5,
    }
  },
  {
    id: 'power_plant_construction2',
    name: '発電所再建設',
    description: '発電所をまたたてよう。うーん、建設地が難しい。立ち退かせるか',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['power_plant_construction']},
    effects: {
      energyChange: 15,
      economyChange: -5,
      energy: -5,
      economy: -10,
      stability: -5,
    }
  },
  {
    id: 'power_plant_construction3',
    name: '発電所再建設',
    description: '発電所をまたたてよう。うーん、建設地がさらに難しい。立ち退かせるか',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['power_plant_construction2']},
    effects: {
      energyChange: 15,
      economyChange: -5,
      energy: -5,
      economy: -15,
      stability: -10,
    }
  },
  {
    id: 'power_plant_construction4',
    name: '発電所再建設',
    description: '発電所をまたたてよう。うーん、建設地が厳しい。強力に立ち退かせるか',
    category: '基盤構築',
    condition: { energy: 5, economy: 5, stability: 10, requiredCards: ['power_plant_construction3']},
    effects: {
      energyChange: 15,
      economyChange: -5,
      energy: -5,
      economy: -25,
      stability: -20,
    }
  },
  // 2. AI開発カード
  {
    id: 'office_ai',
    name: '事務職AI開発',
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
    description: 'AIに各種センサーやモータを接続し、物理世界に干渉できるようにさせよう',
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
    description: '工学博士よりも賢いAIを開発し、インテリ連中を失業させよう',
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
    description: 'AI研究者もAI化し、不眠不休で研究させよう。研究すればするほど賢くなって研究が捗る',
    category: 'AI開発',
    condition: { 
      aiPower: 50, 
      energy: 20, 
      economy: 20,
      requiredCards: ['office_ai']
    },
    effects: {
      aiPower: 5,
      aiPowerChange: 20,
      energyChange: -10,
      economy: -5,
    }
  },

  // 3. 産業・インフラカード
  {
    id: 'ai_robot_factory',
    name: 'AIロボット自動工場',
    description: '臣民の労働を肩代わりするロボット自体をAIで自動生産しよう',
    category: '産業・インフラ',
    condition: { 
      energy: 50, 
      economy: 50,
      requiredCards: ['engineering_phd_ai', 'ai_robot']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -50,
      economyChange: 30,
      economy: -40,
      stability: 20,
    }
  },
  {
    id: 'ai_weapons_factory',
    name: 'AI兵器自動工場',
    description: 'AI兵器をAIが研究開発・生産する工場を建設しよう',
    category: '産業・インフラ',
    condition: { 
      energy: 60, 
      economy: 100,
      requiredCards: ['ai_robot_factory', 'engineering_phd_ai']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -25,
      economyChange: -30,
      economy: -30,    }
  },
  {
    id: 'ai_rocket_factory',
    name: 'AIロケット自動工場',
    description: '宇宙に進出するためのロケットをAIが研究開発・生産する工場を建設しよう',
    category: '産業・インフラ',
    condition: { 
      energy: 50, 
      economy: 60,
      requiredCards: ['ai_robot_factory', 'engineering_phd_ai']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -15,
      economyChange: -20,
      economy: -20,
    }
  },
  {
    id: 'power_generation_breakthrough',
    name: 'AI発電研究',
    description: 'AIに発電効率向上も研究させよう',
    category: '産業・インフラ',
    condition: { 
      requiredCards: ['engineering_phd_ai']
    },
    effects: {
      energyChange: 5,
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
      energyChange: 80,
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
    description: '事務AIを使って政府を効率的に運営できるようにしよう。これでデータも溜まる',
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
    id: 'ai_government',
    name: 'AI官僚制',
    description: '官僚は全部AIでいいだろう。そっちのほうが従順だ',
    category: '統治・管理',
    condition: { 
      aiPower: 100,
      energy: 5, 
      economy: 5, 
      stability: 10,
      requiredCards: ['government_efficiency_layoff']
    },
    effects: {
      aiPowerChange: 2,
      energyChange: -10,
      stability: 20,
    }
  },
  {
    id: 'ai_surveillance_society',
    name: 'AI監視社会',
    description: 'カメラやマイクを各所に設置し、監視アプリ入りのスマホを広く配って、AIに国中を監視させよう',
    category: '統治・管理',
    condition: { 
      aiPower: 300,
      requiredCards: ['surveillance_ai', 'ai_robot_factory']
    },
    effects: {
      aiPowerChange: 10,
      energyChange: -10,
      economyChange: -20,
      stability: 100,
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
    id: 'ai_agent_export2',
    name: 'AIエージェントをさらに輸出',
    description: '優れたAIエージェントをもっと輸出しよう',
    category: '経済',
    condition: { 
      energy: 5, 
      requiredCards: ['ai_agent_export']
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -3,
      economyChange: 5,
    }
  },
  {
    id: 'ai_robot_export',
    name: 'AIロボットの輸出',
    description: 'AIロボットを輸出しよう',
    category: '経済',
    condition: { 
      energy: 10, 
      economy: 5, 
      stability: 10,
      requiredCards: ['ai_robot']
    },
    effects: {
      energyChange: -5,
      economyChange: 10,
      stability: 1,
    }
  },
  {
    id: 'ai_agent_manyexport',
    name: 'AIロボットの大量輸出',
    description: '優れたAIロボットを大量に輸出しよう。これは売れる',
    category: '経済',
    condition: { 
      energy: 50, 
      economy: 5, 
      stability: 10,
      requiredCards: ['ai_robot_factory']
    },
    effects: {
      aiPowerChange: 1,
      energyChange: -20,
      economyChange: 50,
      stability: 5,
    }
  },
 {
    id: 'power_import',
    name: '電力の輸入',
    description: '電力を買おう',
    category: '経済',
    condition: { 
      economy: 10,
    },
    effects: {
      energy: 5,
      economy: -5,
    }
  },
 {
    id: 'power_import2',
    name: '電力の輸入',
    description: '電力をまた買おう。う、足元見やがって',
    category: '経済',
    condition: { 
      economy: 10,
      requiredCards: ['power_import'],
    },
    effects: {
      energy: 5,
      economy: -10,
    }
  },
 {
    id: 'power_import_high',
    name: '電力の輸入',
    description: '電力を大量に買おう',
    category: '経済',
    condition: { 
      economy: 30,
    },
    effects: {
      energy: 20,
      economy: -20,
    }
  },
  {
    id: 'civil_power_release',
    name: '電力の民生解放',
    description: '余剰電力を臣下に還元しよう',
    category: '経済',
    condition: { energy: 5, economy: 5, stability: 1 },
    effects: {
      energyChange: -3,
      economyChange: 5,
      stability: 5,
    }
  },
  {
    id: 'civil_power_mass_release',
    name: '電力の民生大解放',
    description: '余剰電力を臣下にもっと還元して経済を豊かにしよう',
    category: '経済',
    condition: { 
      energy: 30, 
      economy: 5,
      requiredCards: ['civil_power_release']
    },
    effects: {
      energyChange: -10,
      economyChange: 10,
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
      economyChange: 15,
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
      economyChange: 30,
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
      economy: -5,
      stability: 10,
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
  },
  {
    id: 'local_speech2',
    name: '地方演説',
    description: '臣民に自国の指導者の素晴らしさを直接見せつけてやろう。うん？少し飽きられたか？',
    category: '国内秩序',
    condition: {requiredCards: ['local_speech']},
    effects: {
      economy: -2,
      stability: 4,
    }
  },
  {
    id: 'local_speech3',
    name: '地方演説',
    description: '臣民に自国の指導者の素晴らしさを直接見せつけてやろう。うん？少し飽きられたか？',
    category: '国内秩序',
    condition: {requiredCards: ['local_speech2']},
    effects: {
      economy: -2,
      stability: 3,
    }
  },
  {
    id: 'local_speech4',
    name: '地方演説',
    description: '臣民に自国の指導者の素晴らしさを直接見せつけてやろう。うん？少し飽きられたか？',
    category: '国内秩序',
    condition: {requiredCards: ['local_speech3']},
    effects: {
      economy: -2,
      stability: 2,
    }
  },
  {
    id: 'civil_money_release',
    name: 'ばらまき政策',
    description: '大盤振る舞いだ!!',
    category: '経済',
    condition: { economy: 20},
    effects: {
      economy: -10,
      stability: 20,
    },
  },
  {
    id: 'civil_money_release2',
    name: 'ばらまき政策おかわり',
    description: '大盤振る舞いだ!!うん？前よりも反応が悪いな？',
    category: '経済',
    condition: { economy: 20, requiredCards: ['civil_money_release']},
    effects: {
      economy: -10,
      stability: 10,
    }
  },
  {
    id: 'civil_money_release3',
    name: 'ばらまき政策おかわり',
    description: '大盤振る舞いだ!!うん？前よりもだいぶ反応が悪いな？',
    category: '経済',
    condition: { economy: 20, requiredCards: ['civil_money_release2']},
    effects: {
      economy: -10,
      stability: 5,
    }
  },
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