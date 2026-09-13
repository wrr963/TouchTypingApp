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
  {
    id: "general-1-unit-price",
    mode: "general",
    difficulty: 1,
    category: "SMART SHOPPING",
    title: "単価で比べる",
    text: "単価 = 価格 ÷ 内容量。480円 ÷ 600g = 0.8円/g。",
    explanation:
      "容量が異なる商品は、価格だけでなく1gや1個あたりの単価にそろえると比較しやすくなります。",
  },
  {
    id: "general-1-matrix",
    mode: "general",
    difficulty: 1,
    category: "PRIORITY",
    title: "優先順位の2軸",
    text: "「重要度 × 緊急度」の2軸で、タスクを4象限に分ける。",
    explanation:
      "重要度と緊急度を分けて考えると、急ぎではないものの将来に効く重要な仕事を見落としにくくなります。",
  },
  {
    id: "general-1-two-minute",
    mode: "general",
    difficulty: 1,
    category: "LIFE HACK",
    title: "2分ルール",
    text: "2分以内で終わるなら、先送りせず今すぐ実行する。",
    explanation:
      "短い作業を管理リストへ追加するコストより、すぐ終わらせるほうが小さい場合に有効な整理術です。",
  },
  {
    id: "general-1-one-percent",
    mode: "general",
    difficulty: 1,
    category: "NUMBERS",
    title: "1%の複利",
    text: "1.01 ^ 365 ≈ 37.8。小さな差も、反復すると大きくなる。",
    explanation:
      "1%の増加を365回掛ける計算です。現実の成長は一定ではありませんが、反復の効果を示す比喩として使われます。",
  },
  {
    id: "general-1-probability",
    mode: "general",
    difficulty: 1,
    category: "PROBABILITY",
    title: "余事象",
    text: "P(少なくとも1回) = 1 - P(1回も起きない)。",
    explanation:
      "直接数えにくい確率は、反対の出来事である余事象を1から引くと簡単に求められることがあります。",
  },
  {
    id: "general-1-ratio",
    mode: "general",
    difficulty: 1,
    category: "DAILY MATH",
    title: "比率を保つ",
    text: "米:水 = 1:1.2。米300gなら、水は360g。",
    explanation:
      "比率の両方へ同じ倍率を掛ければ関係は保たれます。1.2 × 300 = 360という比例計算です。",
  },
  {
    id: "general-2-budget",
    mode: "general",
    difficulty: 2,
    category: "PERSONAL FINANCE",
    title: "50 / 30 / 20",
    text: "手取りを目安で分ける:\n\t生活必需品 = 50%\n\t自由支出 = 30%\n\t貯蓄・返済 = 20%",
    explanation:
      "家計管理の出発点として使われる比率です。収入や居住地域によって適切な割合は異なるため、固定ルールではなく見直しの基準にします。",
  },
  {
    id: "general-2-compound-interest",
    mode: "general",
    difficulty: 2,
    category: "FINANCE",
    title: "複利の式",
    text: "Future Value = Principal × (1 + rate) ^ years\n100,000 × 1.03 ^ 10 ≈ 134,392",
    explanation:
      "元本10万円を年3%で10年間複利運用した単純計算です。税金、手数料、価格変動は含みません。",
  },
  {
    id: "general-2-median",
    mode: "general",
    difficulty: 2,
    category: "STATISTICS",
    title: "平均値と中央値",
    text: "Data = [2, 3, 3, 4, 20]\nmean = 6.4 / median = 3",
    explanation:
      "外れ値20によって平均値は上がりますが、中央に位置する中央値は3です。分布が偏るデータでは両方を見ると特徴を捉えやすくなります。",
  },
  {
    id: "general-2-temperature",
    mode: "general",
    difficulty: 2,
    category: "UNIT CONVERSION",
    title: "華氏から摂氏",
    text: "C = (F - 32) × 5 / 9\n(68°F - 32) × 5 / 9 = 20°C",
    explanation:
      "華氏を摂氏へ変換する式です。32を引いてから5/9を掛けると、68°Fは20°Cになります。",
  },
  {
    id: "general-2-rule-72",
    mode: "general",
    difficulty: 2,
    category: "MENTAL MATH",
    title: "72の法則",
    text: "資産が2倍になる年数 ≈ 72 ÷ 年利(%)\n72 ÷ 6 = 12 years",
    explanation:
      "一定の複利で資産が約2倍になる期間を暗算する近似法です。年利6%なら約12年ですが、実際の利回りは変動します。",
  },
  {
    id: "general-2-expected-value",
    mode: "general",
    difficulty: 2,
    category: "DECISION",
    title: "期待値",
    text: "Expected value = Σ(value × probability)\n(+100 × 0.6) + (-50 × 0.4) = +40",
    explanation:
      "各結果の価値に発生確率を掛けて合計したものが期待値です。多数回の平均を考える目安であり、1回の結果を保証しません。",
  },
  {
    id: "general-3-ab-test",
    mode: "general",
    difficulty: 3,
    category: "EXPERIMENT",
    title: "A/Bテストを読む",
    text: "A/B test summary:\n\tA: 1,240 users -> 62 actions (5.0%)\n\tB: 1,260 users -> 82 actions (6.5%)\nDifference = +1.5 points; check uncertainty before deciding.",
    explanation:
      "割合の差だけで結論を出さず、標本数、割り当て方法、信頼区間などの不確実性も確認する必要があります。",
  },
  {
    id: "general-3-travel-budget",
    mode: "general",
    difficulty: 3,
    category: "PLANNING",
    title: "旅行予算を分解する",
    text: "Trip budget = transport + stay + food + buffer\n\t¥18,400 + (¥8,500 × 2 nights) + (¥3,000 × 3 days)\n\t= ¥44,400; add a 10% buffer -> ¥48,840",
    explanation:
      "費目ごとに分解すると、変更の影響を再計算しやすくなります。予備費10%は想定外の小さな支出に備える例です。",
  },
  {
    id: "general-3-electric-power",
    mode: "general",
    difficulty: 3,
    category: "SCIENCE",
    title: "電力の基本式",
    text: "Power (W) = Voltage (V) × Current (A)\nAt 100V and 1.2A: P = 100 × 1.2 = 120W\nEnergy for 3h = 120W × 3h = 360Wh",
    explanation:
      "直流や単純化した条件では、電力は電圧と電流の積です。さらに使用時間を掛けると消費電力量を求められます。",
  },
  {
    id: "general-3-estimate",
    mode: "general",
    difficulty: 3,
    category: "ESTIMATION",
    title: "桁を確かめる",
    text: "Quick estimate:\n\t48 × 19 ≈ 50 × 20 = 1,000\nExact value = 912\nError = (1,000 - 912) / 912 ≈ 9.6%",
    explanation:
      "概算で答えの桁を先に確認すると、入力ミスや計算機の操作ミスに気づきやすくなります。",
  },
  {
    id: "general-3-meeting",
    mode: "general",
    difficulty: 3,
    category: "COMMUNICATION",
    title: "30分会議の設計",
    text: "30-minute meeting:\n\t00:00-00:05 / goal & context\n\t00:05-00:20 / options A, B, C\n\t00:20-00:27 / decide: owner + deadline\n\t00:27-00:30 / recap & next action",
    explanation:
      "時間枠、目的、決定事項、担当者、期限を先に定義すると、情報共有だけで終わらない会議にしやすくなります。",
  },
  {
    id: "general-3-file-size",
    mode: "general",
    difficulty: 3,
    category: "DIGITAL LITERACY",
    title: "データ量の見積もり",
    text: "Storage estimate:\n\t2.5MB/photo × 800 photos = 2,000MB ≈ 2GB\n\t4GB video + 2GB photos + 25% free space\nRequired capacity ≈ 8GB",
    explanation:
      "概算では1GBを約1,000MBとして扱っています。OS表示や技術仕様では1,024基準との違いがある点に注意が必要です。",
  },
  {
    id: "engineer-1-semver",
    mode: "engineer",
    difficulty: 1,
    category: "VERSIONING",
    title: "Semantic Versioning",
    text: "v2.4.1 -> major = 2 / minor = 4 / patch = 1",
    explanation:
      "Semantic Versioningは、破壊的変更をmajor、後方互換の機能追加をminor、修正をpatchで表す規約です。",
  },
  {
    id: "engineer-1-css",
    mode: "engineer",
    difficulty: 1,
    category: "CSS",
    title: "レスポンシブ幅",
    text: ".card { width: min(100% - 32px, 720px); margin-inline: auto; }",
    explanation:
      "要素を最大720pxに制限しつつ、狭い画面では左右16pxずつの余白を確保して中央へ配置します。",
  },
  {
    id: "engineer-1-regex",
    mode: "engineer",
    difficulty: 1,
    category: "REGEX",
    title: "IDの形式",
    text: "const valid = /^[a-z][a-z0-9-]{2,31}$/.test(slug);",
    explanation:
      "小文字から始まり、小文字・数字・ハイフンで構成される3〜32文字のslugかを確認する正規表現です。",
  },
  {
    id: "engineer-1-shell",
    mode: "engineer",
    difficulty: 1,
    category: "CLI",
    title: "JSONログの抽出",
    text: "jq -r 'select(.status >= 500) | [.time, .path] | @tsv' app.log",
    explanation:
      "JSON Lines形式のログから500番台のレスポンスを選び、時刻とパスをTSV形式で出力するjqの例です。",
  },
  {
    id: "engineer-2-fetch",
    mode: "engineer",
    difficulty: 2,
    category: "FRONTEND",
    title: "Abortable fetch",
    text: "const controller = new AbortController();\nconst response = await fetch(url, { signal: controller.signal });\nif (!response.ok) throw new Error(\"request failed\");",
    explanation:
      "AbortControllerのsignalを渡すと、不要になったHTTPリクエストを中断できます。HTTPエラーはfetch自体をrejectしないため明示的に確認します。",
  },
  {
    id: "engineer-2-docker",
    mode: "engineer",
    difficulty: 2,
    category: "CONTAINER",
    title: "Multi-stage build",
    text: "FROM node:22-alpine AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build",
    explanation:
      "依存関係のファイルを先にコピーすると、ソースだけを変更した際にパッケージインストールのキャッシュを再利用しやすくなります。",
  },
  {
    id: "engineer-2-java",
    mode: "engineer",
    difficulty: 2,
    category: "JAVA",
    title: "Recordと検証",
    text: "record Point(int x, int y) {\n\tPoint {\n\t\tif (x < 0 || y < 0) throw new IllegalArgumentException();\n\t}\n}",
    explanation:
      "Javaのrecordで不変データを表し、コンパクトコンストラクタで座標が負でないことを検証しています。",
  },
  {
    id: "engineer-2-c",
    mode: "engineer",
    difficulty: 2,
    category: "C",
    title: "境界を守る",
    text: "for (size_t i = 0; i < length; ++i) {\n\tbuffer[i] = (char)toupper((unsigned char)buffer[i]);\n}",
    explanation:
      "配列の長さを超えない範囲で走査します。ctype系関数へはunsigned charとして渡すことで未定義動作を避けます。",
  },
  {
    id: "engineer-3-transaction",
    mode: "engineer",
    difficulty: 3,
    category: "DATABASE",
    title: "送金トランザクション",
    text: "BEGIN;\nUPDATE accounts SET balance = balance - 5000\nWHERE id = 17 AND balance >= 5000;\nUPDATE accounts SET balance = balance + 5000 WHERE id = 42;\nCOMMIT;",
    explanation:
      "複数の更新を1つのトランザクションにまとめる例です。実装では最初の更新件数を確認し、残高不足ならROLLBACKします。",
  },
  {
    id: "engineer-3-kubernetes",
    mode: "engineer",
    difficulty: 3,
    category: "INFRASTRUCTURE",
    title: "Readiness probe",
    text: "readinessProbe:\n\thttpGet:\n\t\tpath: /health/ready\n\t\tport: 8080\n\tinitialDelaySeconds: 5\n\tperiodSeconds: 10\n\tfailureThreshold: 3",
    explanation:
      "KubernetesがPodをトラフィックの送信先に含めてよいかを確認する設定です。失敗中のPodはServiceの転送先から外されます。",
  },
  {
    id: "engineer-3-python-stats",
    mode: "engineer",
    difficulty: 3,
    category: "DATA ANALYTICS",
    title: "欠損率の集計",
    text: "missing = (\n\tdf.isna().mean()\n\t.mul(100)\n\t.sort_values(ascending=False)\n\t.rename(\"missing_percent\")\n)\nprint(missing[missing > 0].round(2))",
    explanation:
      "pandasで列ごとの欠損値割合を百分率に変換し、降順で表示します。分析前のデータ品質確認に使えます。",
  },
  {
    id: "engineer-3-terraform",
    mode: "engineer",
    difficulty: 3,
    category: "INFRASTRUCTURE AS CODE",
    title: "安全な変数検証",
    text: "variable \"replica_count\" {\n\ttype = number\n\tdefault = 2\n\tvalidation {\n\t\tcondition = var.replica_count >= 2 && var.replica_count <= 10\n\t\terror_message = \"replica_count must be 2..10\"\n\t}\n}",
    explanation:
      "Terraformの入力値を2〜10へ制限する例です。不正な設定を適用前のplan段階で検出できます。",
  },
];
