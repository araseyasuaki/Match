export const formData1 = [
  '簡潔',
  'シンプル',
  '動きのある',
  '斬新な',
  '洗練された',
  '未来志向の',
  '柔軟な',
  'モダンな',
  'インパクトのある',
  '直感的な',
];

export const formData2 = [
  'メンテナンス性に優れたコードを書く',
  'ユーザー中心のデザインをする',
  'リアルタイムで動作するアプリを開発する',
  'セキュリティを強化する',
  'スケーラブルなシステムを構築する',
  'レスポンシブなUIを作る',
  'アクセシビリティを考慮する',
  '高速で動作するアプリを作る',
  '持続可能なデザインを提案する',
  'データ駆動型の機能を開発する',
];

export const formData3 = [
  'エンジニア',
  'フロント',
  'バックエンド',
  'デザイナー',
  'ディレクター',
  '二年生',
  '一年生',
  '学生',
];

export const shuffleForm = (data) => {
  const shuffled = [...data];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
