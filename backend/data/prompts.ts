import type { TrainingPrompt } from "@/shared/training";

export const PROMPTS: readonly TrainingPrompt[] = [
  {
    id: "general-1-circadian",
    mode: "general",
    difficulty: 1,
    category: "BODY CLOCK",
    title: "サーカディアンリズム",
    text: "体内時計は約24時間。朝の光が、1日のリズムを整える。",
    explanation:
      "サーカディアンリズムは、およそ24時間周期で変化する生理現象です。起床後に光を浴びると、睡眠と覚醒のリズムを整えやすくなります。",
  },
  {
    id: "general-1-pareto",
    mode: "general",
    difficulty: 1,
    category: "MENTAL MODEL",
    title: "80 / 20 の法則",
    text: "成果の80%は、重要な20%の行動から生まれる。",
    explanation:
      "パレートの法則を仕事に応用した考え方です。厳密な比率ではなく、効果の大きい少数の行動を見極める視点として役立ちます。",
  },
  {
    id: "general-1-compound",
    mode: "general",
    difficulty: 1,
    category: "LIFE HACK",
    title: "小さな複利",
    text: "1日1%の改善を、今日から365日積み重ねる。",
    explanation:
      "小さな改善も継続すると大きな差になります。数値は比喩ですが、完璧を待たず、改善を反復する姿勢の価値を表しています。",
  },
  {
    id: "general-2-opportunity",
    mode: "general",
    difficulty: 2,
    category: "ECONOMICS",
    title: "機会費用",
    text: "何かを選ぶことは、別の選択肢を手放すことでもある。\nTime, money, and attention are limited resources.",
    explanation:
      "機会費用とは、ある選択をしたために得られなくなった、次善の選択肢の価値です。お金だけでなく、時間や注意にも当てはまります。",
  },
  {
    id: "general-2-fermi",
    mode: "general",
    difficulty: 2,
    category: "THINKING",
    title: "フェルミ推定",
    text: "正確なデータがなくても、前提を分解すれば概算できる。\nEstimate = population x frequency x probability.",
    explanation:
      "フェルミ推定は、未知の数量を既知の要素へ分解し、桁の妥当性を確かめる思考法です。答えそのものより、前提を明示することが重要です。",
  },
  {
    id: "general-2-decision",
    mode: "general",
    difficulty: 2,
    category: "DECISION",
    title: "可逆な意思決定",
    text: "Reversible decision? -> decide fast, test small, learn early.\nIrreversible decision? -> slow down and verify.",
    explanation:
      "やり直せる決定は小さく試して学び、やり直しにくい決定には時間をかける、という判断の使い分けです。",
  },
  {
    id: "general-3-media",
    mode: "general",
    difficulty: 3,
    category: "MEDIA LITERACY",
    title: "速報との距離",
    text: "速報を見たら、まず3つを確認する。\n\t1. 発生日時と更新日時はいつか？\n\t2. 一次情報へのリンクはあるか？\n\t3. 事実と推測が区別されているか？\nFast news is useful; verified context is better.",
    explanation:
      "時事情報は更新が速く、初報が不完全なこともあります。日時、一次情報、事実と推測の区別を確認すると、誤情報に反応するリスクを下げられます。",
  },
  {
    id: "general-3-learning",
    mode: "general",
    difficulty: 3,
    category: "LEARNING SCIENCE",
    title: "思い出す練習",
    text: "学習直後に読み返すだけでなく、何も見ずに説明してみる。\n\tQuestion: What did I learn?\n\tAnswer: 自分の言葉で、具体例を1つ添える。\nRetrieval strengthens memory more than passive review.",
    explanation:
      "記憶から情報を取り出す練習は、検索練習と呼ばれます。小テストや自分への説明を挟むと、受動的な再読より理解の穴を見つけやすくなります。",
  },
  {
    id: "general-3-focus",
    mode: "general",
    difficulty: 3,
    category: "DEEP WORK",
    title: "注意を設計する",
    text: "集中は意志の強さだけで決まらない。\nBefore starting:\n\t- define 1 clear outcome;\n\t- silence nonessential alerts;\n\t- keep only the next action visible.\n環境を整えると、迷う回数そのものを減らせる。",
    explanation:
      "集中を個人の根性だけに頼らず、環境と手順で支える方法です。開始条件を固定し、不要な選択肢を隠すと、タスクへ戻る負担を小さくできます。",
  },
  {
    id: "engineer-1-http",
    mode: "engineer",
    difficulty: 1,
    category: "WEB",
    title: "HTTP status",
    text: "200 OK / 201 Created / 404 Not Found / 503 Service Unavailable",
    explanation:
      "HTTPステータスコードの代表例です。2xxは成功、4xxはクライアント側、5xxはサーバー側の問題を示します。",
  },
  {
    id: "engineer-1-git",
    mode: "engineer",
    difficulty: 1,
    category: "TOOLING",
    title: "小さなコミット",
    text: "git switch -c feat/typing-stats && git status --short",
    explanation:
      "新しいブランチを作って切り替え、作業ツリーの状態を短い形式で確認するコマンドです。小さく検証可能な単位で変更するとレビューしやすくなります。",
  },
  {
    id: "engineer-1-python",
    mode: "engineer",
    difficulty: 1,
    category: "PYTHON",
    title: "内包表記",
    text: "squares = [n ** 2 for n in range(1, 11) if n % 2 == 0]",
    explanation:
      "1から10までの偶数だけを選び、その二乗を並べるPythonのリスト内包表記です。",
  },
  {
    id: "engineer-2-sql",
    mode: "engineer",
    difficulty: 2,
    category: "DATABASE",
    title: "集約クエリ",
    text: "SELECT user_id, COUNT(*) AS order_count\nFROM orders\nWHERE created_at >= '2026-01-01'\nGROUP BY user_id\nHAVING COUNT(*) >= 3;",
    explanation:
      "指定日以降の注文をユーザー単位で数え、3件以上のユーザーだけを返します。WHEREは集約前、HAVINGは集約後の条件です。",
  },
  {
    id: "engineer-2-react",
    mode: "engineer",
    difficulty: 2,
    category: "FRONTEND",
    title: "Immutable update",
    text: "setTasks((current) =>\n\tcurrent.map((task) =>\n\t\ttask.id === id ? { ...task, done: true } : task,\n\t),\n);",
    explanation:
      "Reactの状態を破壊せずに更新する例です。対象の要素だけ新しいオブジェクトに置き換え、その他は同じ参照を保ちます。",
  },
  {
    id: "engineer-2-network",
    mode: "engineer",
    difficulty: 2,
    category: "NETWORK",
    title: "Request path",
    text: "Browser -> DNS -> TCP/TLS -> HTTP request -> CDN -> origin\nResponse <- cache policy <- application <- database",
    explanation:
      "ブラウザからアプリケーションまでの典型的な通信経路です。遅延を調べるときは、名前解決、接続、キャッシュ、アプリ、DBへ区間を分けます。",
  },
  {
    id: "engineer-3-retry",
    mode: "engineer",
    difficulty: 3,
    category: "TYPESCRIPT",
    title: "指数バックオフ",
    text: "async function retry<T>(task: () => Promise<T>): Promise<T> {\n\tfor (let attempt = 0; attempt < 3; attempt += 1) {\n\t\ttry { return await task(); }\n\t\tcatch (error) {\n\t\t\tif (attempt === 2) throw error;\n\t\t\tawait wait(2 ** attempt * 250);\n\t\t}\n\t}\n\tthrow new Error(\"unreachable\");\n}",
    explanation:
      "失敗時の待ち時間を250ms、500msと増やすリトライです。実運用ではランダムな揺らぎ、再試行可能なエラーの判定、キャンセル処理も加えます。",
  },
  {
    id: "engineer-3-security",
    mode: "engineer",
    difficulty: 3,
    category: "SECURITY",
    title: "入力を信頼しない",
    text: "Security boundary checklist:\n\t1. Parse input into a known type.\n\t2. Validate length, range, and format.\n\t3. Authorize the requested action.\n\t4. Encode output for its destination.\nNever build SQL with \"...\" + userInput.",
    explanation:
      "入力の構文確認、値の検証、権限確認、出力先に応じたエンコードは別々の防御です。SQLは文字列連結ではなくプレースホルダーで値を渡します。",
  },
  {
    id: "engineer-3-ml",
    mode: "engineer",
    difficulty: 3,
    category: "MACHINE LEARNING",
    title: "評価データの分離",
    text: "X_train, X_test, y_train, y_test = train_test_split(\n\tfeatures, labels, test_size=0.2, random_state=42, stratify=labels\n)\nmodel.fit(X_train, y_train)\nscore = model.evaluate(X_test, y_test)",
    explanation:
      "学習用と評価用のデータを分ける基本形です。評価データの情報が前処理や特徴量選択へ漏れると、実運用より良いスコアが出るデータリークにつながります。",
  },
];
