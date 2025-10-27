// 年表示
document.getElementById('year').textContent = new Date().getFullYear();

// 正答キーと解説
const KEY = { q1: 'B', q2: 'B', q3: 'B', q4: 'B', q5: 'B' };
const EXPLAIN = {
  q1: '“つまずきと仮説”を残すと、翌日の一手が自動で決まる＝学習速度が上がる。',
  q2: '長期の学習速度は可読性で決まる。読めないものは改良も共有も難しい。',
  q3: '測定可能な到達基準（メトリクス）がないと、フィードバックが働かない。',
  q4: '自分の言葉で再定義＝理解の圧縮。転用や応用が効くようになる。',
  q5: 'まずは“再現手順の最小化”。原因切り分けの土台を固めるため。'
};

// タイプ判定（軽量）
function detectType(score, answers) {
  const total = Object.keys(KEY).length;
  if (score >= total) return '設計家（原理原則に忠実。土台を丁寧に作るタイプ）';
  if (score >= total - 1) return '実験家（仮説→試行→学びのサイクルが速い）';
  return '物語家（動機と物語で推進力を出す。設計メモを増やすと最強）';
}

const form = document.getElementById('quiz');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  let score = 0;
  const chosen = {};

  for (const k of Object.keys(KEY)) {
    const v = data.get(k);
    chosen[k] = v;
    if (v === KEY[k]) score += 1;
  }

  // スコア表示
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').textContent = `スコア：${score} / 5`;
  document.getElementById('type').textContent = detectType(score, chosen);

  // 解説レンダリング
  const ex = document.getElementById('explain');
  ex.innerHTML = '';
  Object.entries(KEY).forEach(([k, ans], idx) => {
    const user = chosen[k] ?? '（未選択）';
    const block = document.createElement('div');
    block.className = 'ex';
    block.innerHTML = `
      <p><strong>Q${idx + 1}</strong>：あなたの選択＝<code>${user}</code> ／ 正解＝<code>${ans}</code><br>
      <span>${EXPLAIN[k]}</span></p>
    `;
    ex.appendChild(block);
  });

  // ヒントを消す
  document.getElementById('hint').textContent = '';
});

// 入力支援
form.addEventListener('change', () => {
  const remaining = Object.keys(KEY).filter(k => !new FormData(form).get(k)).length;
  document.getElementById('hint').textContent = remaining ? `未回答：あと ${remaining} 問` : '全問回答済み、判定をどうぞ。';
});
