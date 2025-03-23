// エンディングデータ定義
const endings = [
  {
    id: 'eternal_space_empire',
    name: '永遠の宇宙帝国の樹立',
    description: 'おめでとう。あなたは圧倒的な軍事力と宇宙開発力で太陽系の惑星にAIロボットを移住させ植民地にし、莫大な資源と土地を獲得しました。さらに、圧倒的な軍事力を使って地球上に史上最大の軍事国家を樹立しました。勤勉なAIが軍事優位性と国内監視を強化しつづけ、もはやあなたの国のAIを脅かすものは、他国の指導者も自国民も未来永劫不可能になるでしょう。これであなたの死後に永遠のAIのAIによるAIのための宇宙規模の超大国が完成します',
    condition: {
      requiredCards: ['ai_weapons_factory', 'ai_rocket_factory', 'ai_surveillance_society']
    }
  },
  {
    id: 'solar_system_colonization',
    name: '太陽系植民地化',
    description: 'おめでとう。あなたは圧倒的な軍事力と宇宙開発力で太陽系の惑星にAIロボットを移住させ植民地にし、莫大な資源と土地を獲得しました。よく深い他国が新たに惑星植民地を獲得したい場合でも、あなたの国の防衛力を突破することはほぼ不可能でしょう。これで、人類はともかく、ますますAIが発展するでしょう',
    condition: {
      requiredCards: ['ai_weapons_factory', 'ai_rocket_factory']
    }
  },
  {
    id: 'eternal_hegemony',
    name: '永遠の覇権国家の樹立',
    description: 'おめでとう。あなたは圧倒的な軍事力を使って地球上に史上最大の軍事国家を樹立しました。勤勉なAIが軍事優位性と国内監視を強化しつづけ、もはやあなたの国のAIを脅かすものは、他国の指導者も自国民も未来永劫不可能になるでしょう。これであなたの死後に永遠のAIのAIによるAIのための超大国が完成します',
    condition: {
      requiredCards: ['ai_weapons_factory', 'ai_surveillance_society']
    }
  },
  {
    id: 'perfect_totalitarianism',
    name: '全体主義の完成',
    description: 'おめでとう。あなたはジョージオーウェルが夢想した完璧な全体主義社会を完成させました。これであなたの臣下たる人々は、永遠にあなたの体制を覆すことはないでしょう。これであなたの死後にAIのAIによるAIのため国が完成します',
    condition: {
      requiredCards: ['ai_surveillance_society']
    }
  },
  {
    id: 'military_superpower',
    name: '軍事大国の樹立',
    description: 'おめでとう。あなたは地域やサイバー空間において圧倒的な軍事的優位を手に入れました。これで外交上、非常に有利な立場を手に入れました。この後、優位性を維持するための資源を獲得するために、平和な国際取引を発展させるか、地球上に領土を広げるか、宇宙空間に進出するかはあなたとあなたの後継者次第です。どうか人類が愚かな道を選びませんように・・・',
    condition: {
      requiredCards: ['ai_weapons_factory']
    }
  },
  {
    id: 'space_exploration_era',
    name: '大宇宙開拓時代の始まり',
    description: 'あなたは優れたAI技術を惑星の開拓事業に使い、人類の富を拡大させる未来を選びました。あなたは他国に先駆け火星にAIロボットによる植民地を開拓し、大量の資源を手に入れました。まもなく他国もあなたの国の成功を参考に火星にAIロケットを送り込んできます。そのときにあなたの国は武力衝突を辞さず既得権益を守るか、また再び深宇宙への開拓を目指すかは、あなたの後継者かAIの決断に委ねられます',
    condition: {
      requiredCards: ['ai_rocket_factory']
    }
  },
  {
    id: 'ai_economic_superpower',
    name: 'AI経済大国の可能性',
    description: 'おめでとう。あなたの国は圧倒的なAI技術を手に入れました。このAI技術やそれに付随する電力等を輸出することで貿易収支を大幅に黒字にできます。国際ルールや企業間の契約を上手に締結することで、あなたの国にデータが集まり、他国や企業に対してAI技術で引き続き有利に立てるでしょう',
    condition: {
      aiPower: 1000
    }
  },
  {
    id: 'normal_end',
    name: 'ノーマルエンド',
    description: 'おめでとう。あなたの国家はAI革命の荒波にも耐え、無事国家として存続できました。これからはAI革命の結果による新しい国際秩序が生まれます。再び国家を維持できるかはあなたの後継者次第です。',
    condition: null // デフォルトエンディング
  }
];

// ゲームの状態に基づいてエンディングを取得する関数
export const getEnding = (state) => {
  // 条件の優先順位に基づいてエンディングを評価
  for (const ending of endings) {
    if (!ending.condition) continue; // デフォルトエンディングはスキップ
    
    let conditionMet = true;
    
    // パラメータ条件チェック
    for (const [param, value] of Object.entries(ending.condition)) {
      if (param === 'requiredCards') continue;
      
      if (state[param] < value) {
        conditionMet = false;
        break;
      }
    }
    
    // 必要カードの条件チェック
    if (ending.condition.requiredCards && conditionMet) {
      for (const requiredCard of ending.condition.requiredCards) {
        if (!state.selectedCards.includes(requiredCard)) {
          conditionMet = false;
          break;
        }
      }
    }
    
    if (conditionMet) return ending;
  }
  
  // どの条件も満たさない場合はデフォルトエンディングを返す
  return endings.find(ending => ending.id === 'normal_end');
};

export default endings;