// うちのこMBTI - single page
// 30問 / 結果カード保存 / X共有 / リンク共有 / 相性診断 / タイプ一覧&詳細

const TYPES = [
  "INTJ","INTP","ENTJ","ENTP",
  "INFJ","INFP","ENFJ","ENFP",
  "ISTJ","ISFJ","ESTJ","ESFJ",
  "ISTP","ISFP","ESTP","ESFP",
];

const TYPE_IMAGE_MAP = {
  "INTJ": "画像/imagesINTJ.png",
  "INTP": "画像/imagesINTP.png",
  "ENTJ": "画像/imagesIENTJ.png",
  "ENTP": "画像/imagesENTP.png",
  "INFJ": "画像/imagesINFJ.png",
  "INFP": "画像/imagesINFP.png",
  "ENFJ": "画像/imagesENFJ.png",
  "ENFP": "画像/imagesENFP.png",
  "ISTJ": "画像/imagesISTJ.png",
  "ISFJ": "画像/imagesISFJ.png",
  "ESTJ": "画像/imagesESTJ.png",
  "ESFJ": "画像/imagesESFJ.png",
  "ISTP": "画像/imagesISTP.png",
  "ISFP": "画像/imagesISFP.png",
  "ESTP": "画像/imagesESTP.png",
  "ESFP": "画像/imagesESFP.png"
};


// ペットMBTIのキャッチ＆説明（ペット前提）
const PET_TYPE_DATA = {
  INTJ: {
    name: "ひそかに司令塔タイプ",
    catch: "クールに観察して、最適解だけ採用する。",
    desc: "落ち着いて周りを見てから動く“戦略家”。無駄な争いは避けつつ、好きな場所・好きな人はしっかり決めるタイプです。自分のペースを守りたいので、突然の抱っこや過剰な構いすぎは苦手。信頼ができると静かに寄り添ってくれます。",
    likes: "好き：静かな寝床・高い場所・決まったルーティン。嫌い：急な予定変更・大きい音。得意：観察して学ぶ・最短で覚える。苦手：しつこい構い・無理やりの遊び。",
    goodHumans: ["INFJ","ENFJ","INTP","ISFJ"],
  },
  INTP: {
    name: "研究熱心マイペースタイプ",
    catch: "気になるものは徹底チェック。納得したら動く。",
    desc: "好奇心で世界を検証する“実験家”。新しいおもちゃや音、においを自分なりに分析して楽しみます。テンションは波があり、突然スイッチが入って集中することも。干渉されすぎると距離を取るけど、放っておくと近づいてくるツンデレ傾向。",
    likes: "好き：探検・匂いチェック・一人遊び。嫌い：急な抱っこ・強制的な指示。得意：仕組み発見・学習。苦手：予定ぎっしり・過干渉。",
    goodHumans: ["ENFJ","INFJ","ENTP","ISFJ"],
  },
  ENTJ: {
    name: "主役のリーダータイプ",
    catch: "場を仕切るのが得意。自分流で進めたい。",
    desc: "堂々として存在感のある“指揮官”。遊びも散歩も「こうしたい」がはっきりしていて、主導権を取りがち。ルールが分かるとすぐ覚える反面、曖昧だと納得しません。褒められると伸びるので、目標（ごほうび）設計が上手い飼い主と相性◎。",
    likes: "好き：勝てる遊び・褒められること。嫌い：曖昧な指示・待たされる。得意：トレーニング・先導。苦手：退屈・一貫性のないルール。",
    goodHumans: ["INFP","INFJ","ISTP","ESFJ"],
  },
  ENTP: {
    name: "ひらめきやんちゃタイプ",
    catch: "発想が自由。遊びの天才で飽きやすい。",
    desc: "刺激とアイデアで動く“ひらめき王”。新しい遊びを自分で作ったり、ちょっとイタズラで笑いを取りにいきます（本人は悪気なし）。単調な毎日だと退屈しやすいので、短時間で種類を変える遊びが効果的。自由は欲しいけど、好きな人には甘えます。",
    likes: "好き：新しいおもちゃ・追いかけっこ。嫌い：同じ遊びの繰り返し。得意：発明・瞬発力。苦手：長い待て・単調ルーティン。",
    goodHumans: ["INFJ","ENFJ","ISTP","ESFP"],
  },

  INFJ: {
    name: "静かに寄り添う癒しタイプ",
    catch: "空気を読んで、そっと近くにいる。",
    desc: "飼い主の気分を感じ取りやすい“共感家”。騒がしい場所より、安心できる環境でゆったり過ごすのが好きです。信頼関係ができると、言葉がなくても「今こうしてほしい」を分かっているかのように行動することも。急かさず、安心の合図を増やすとさらに仲良しに。",
    likes: "好き：安心できる場所・穏やかな声。嫌い：強い叱責・落ち着かない環境。得意：気配を読む。苦手：急な変化・大人数の刺激。",
    goodHumans: ["ENFP","ENFJ","INTJ","ISFP"],
  },
  INFP: {
    name: "やさしい夢みがちタイプ",
    catch: "気分で動くけど、愛情は深い。",
    desc: "自分の“好き”に正直な“ロマン派”。気分が乗ると超甘えん坊、乗らないとそっと距離を取る…という波があります。無理にコントロールされるより、選べる余地があるほうが安心。叱るより「できたね！」で伸びるタイプで、ゆっくり信頼を育てると一生推しになります。",
    likes: "好き：お気に入り毛布・なでなで。嫌い：急な大声・強制。得意：甘え・空気感。苦手：ハードなルール・せかされること。",
    goodHumans: ["ENFJ","ENTJ","ISFJ","ESFP"],
  },
  ENFJ: {
    name: "みんなのムードメーカータイプ",
    catch: "人が好き。みんなをまとめて仲良くしたい。",
    desc: "コミュ力おばけの“主人公”。人や他の動物にフレンドリーで、場の雰囲気を明るくします。かいぬしの反応に敏感なので、褒められると全力で頑張る反面、無視されるとしょんぼりしがち。スキンシップと声かけで、さらにキラキラが増えます。",
    likes: "好き：一緒にいる・褒められる。嫌い：放置・冷たい対応。得意：社交・協調。苦手：孤独・不安定な関係。",
    goodHumans: ["INFP","INTP","ISFP","ISTJ"],
  },
  ENFP: {
    name: "わくわく冒険タイプ",
    catch: "楽しそう！に全振り。好奇心で世界を広げる。",
    desc: "好奇心と感情がまっすぐな“冒険家”。新しい道、新しいおもちゃ、新しい人…とにかくワクワクが大好物。テンションが上がると大はしゃぎしやすいので、短い休憩をはさみながら遊ぶと上手に落ち着けます。自由にさせるほど愛情深く懐くタイプ。",
    likes: "好き：新しい刺激・探検。嫌い：単調な毎日。得意：遊びの発明・甘え。苦手：長い我慢・細かい管理。",
    goodHumans: ["INFJ","INTJ","ESFJ","ISTP"],
  },

  ISTJ: {
    name: "きっちり番犬（番猫）タイプ",
    catch: "ルーティンが命。決まりがあると安心する。",
    desc: "安定と秩序が大好きな“きっちり派”。いつもの時間、いつもの場所、いつもの流れがあると落ち着きます。急な変更には警戒しやすいけれど、慣れれば最強の安心感をくれる相棒に。トレーニングはコツコツ型で、積み上げるほど信頼が深まります。",
    likes: "好き：いつもの散歩・決まった寝床。嫌い：突然の変更。得意：継続・覚える。苦手：イレギュラー・せかされる。",
    goodHumans: ["ENFJ","ESFJ","ISTP","INFJ"],
  },
  ISFJ: {
    name: "お世話上手の守りタイプ",
    catch: "家と家族を大事にする、優しい番人。",
    desc: "安心基地を守る“ほっこり派”。かいぬしの行動をよく覚えていて、生活に寄り添うのが得意です。大きな刺激より、穏やかな毎日が好き。褒められると控えめに喜び、そっと近くにいてくれるタイプ。環境の変化があるときは、匂いのある毛布などで安心を作ると◎。",
    likes: "好き：家族のそば・穏やかな日常。嫌い：荒い扱い・騒音。得意：気配り・見守り。苦手：環境変化・乱雑。",
    goodHumans: ["INTJ","INTP","INFP","ESFJ"],
  },
  ESTJ: {
    name: "ルール重視のボス気質タイプ",
    catch: "筋が通ってると強い。秩序を守るリーダー。",
    desc: "実務と秩序の“仕切り役”。自分のテリトリーやルールをはっきりさせたいタイプです。指示が明確だと素直に動き、成果（ごほうび）にも反応◎。ただし理不尽な扱いには頑固になりがち。短くはっきり・成功体験を積ませると、最高に頼れる相棒になります。",
    likes: "好き：明確なルール・達成感。嫌い：曖昧・だらだら。得意：指示理解・守る。苦手：優柔不断・矛盾した対応。",
    goodHumans: ["ISFP","INFP","ISTP","ESFJ"],
  },
  ESFJ: {
    name: "甘えんぼ社交タイプ",
    catch: "かいぬし命。みんな仲良くがいちばん。",
    desc: "愛され上手な“陽だまり”。人に可愛がられるのが大好きで、反応を見ながら“正解ムーブ”を選びます。構ってもらえるほど元気になる一方、寂しいと不安になりやすいので、声かけや見える場所での安心が重要。家族イベントの中心になりがちです。",
    likes: "好き：一緒にいる・褒められる。嫌い：放置・冷たい空気。得意：コミュ・甘え。苦手：孤独・緊張感の強い環境。",
    goodHumans: ["ISTJ","ENFP","ENTJ","ISFJ"],
  },

  ISTP: {
    name: "クールな職人タイプ",
    catch: "必要なときだけ全力。普段は淡々マイペース。",
    desc: "冷静で器用な“実践家”。状況を見てサッと動ける反面、ベタベタは少し苦手。遊びも「今それやる？」という自分のタイミングがあります。怖がりというより“慎重”。尊重してくれる飼い主には、静かに深く懐きます。短い遊びを高頻度で入れると満足度UP。",
    likes: "好き：一人時間・観察。嫌い：しつこいスキンシップ。得意：器用・瞬間判断。苦手：長時間の拘束・感情の圧。",
    goodHumans: ["ENFP","ENTP","ESTJ","INFJ"],
  },
  ISFP: {
    name: "繊細アーティストタイプ",
    catch: "やさしい世界が好き。気分と空気で動く。",
    desc: "感受性豊かな“ふわふわ派”。優しい声、穏やかな触れ方、安心できる匂い…そういう“心地よさ”で元気が変わります。急な大声や強い刺激は苦手。好きなことには素直に夢中になるので、安心の中で遊びを選ばせると魅力が全開になります。",
    likes: "好き：やさしい触れ方・静かな遊び。嫌い：強刺激・乱暴。得意：空気感・甘え。苦手：叱責・忙しすぎる環境。",
    goodHumans: ["ENFJ","ESTJ","INFJ","INTJ"],
  },
  ESTP: {
    name: "突撃アクションタイプ",
    catch: "まず動く。テンションと勝負で世界を攻略。",
    desc: "行動力MAXの“現場主義”。追いかけっこや引っ張りっこなど、身体を使う遊びが大好物。反応が早く、刺激にも強めです。退屈するといたずらに走りやすいので、短い運動＋頭を使う遊びを混ぜると最高。ルールは“ゲーム化”すると覚えます。",
    likes: "好き：運動・勝負・新しい刺激。嫌い：退屈・長い待て。得意：瞬発力・現場対応。苦手：単調・細かい管理。",
    goodHumans: ["ISFJ","ENTJ","ESFP","ISTJ"],
  },
  ESFP: {
    name: "アイドルわんにゃんタイプ",
    catch: "注目されたい！楽しいことは全部好き。",
    desc: "明るく感情表現が豊かな“エンタメ”。人の反応が大好物で、笑ってもらえるとさらにテンションUP。お出かけやイベントも向いています。寂しいと急にしょんぼりしがちなので、声かけと遊びで安心をキープ。写真映えも最強です。",
    likes: "好き：一緒に遊ぶ・注目。嫌い：孤独・静かすぎ。得意：愛嬌・社交。苦手：長時間のお留守番・退屈。",
    goodHumans: ["INFP","ENTP","ESTP","INFJ"],
  },
};

// 30問（ペット観察で答えやすいA/B）
const QUESTIONS = [
  // E/I (8)
  {dim:"EI", a:"知らない人や動物にも近づきがち", b:"慣れるまで距離を取る", aL:"E", bL:"I"},
  {dim:"EI", a:"遊びの誘いにすぐ乗る", b:"様子を見てから乗る", aL:"E", bL:"I"},
  {dim:"EI", a:"一緒にいると元気が出る", b:"ひとり時間で回復する", aL:"E", bL:"I"},
  {dim:"EI", a:"嬉しいと感情が表に出る", b:"嬉しいけど控えめに表す", aL:"E", bL:"I"},
  {dim:"EI", a:"新しい場所でも動き回る", b:"安全確認してから動く", aL:"E", bL:"I"},
  {dim:"EI", a:"かまって！のアピールが多い", b:"必要な時だけ寄ってくる", aL:"E", bL:"I"},
  {dim:"EI", a:"人の中心にいたがる", b:"端っこや隠れ場所が落ち着く", aL:"E", bL:"I"},
  {dim:"EI", a:"お留守番より一緒が好き", b:"一人でも平気な方", aL:"E", bL:"I"},

  // S/N (8)
  {dim:"SN", a:"おやつ・音・匂いなど“目の前”に強い", b:"環境の変化や新しさにワクワクする", aL:"S", bL:"N"},
  {dim:"SN", a:"いつもの道が安心", b:"新しい道に行きたがる", aL:"S", bL:"N"},
  {dim:"SN", a:"遊びはシンプルが一番", b:"工夫がある遊びが好き", aL:"S", bL:"N"},
  {dim:"SN", a:"慣れたルーティンが落ち着く", b:"たまに刺激がないと飽きる", aL:"S", bL:"N"},
  {dim:"SN", a:"観察するときは細部（音/匂い/動き）を見てる", b:"全体の雰囲気や“流れ”で動く", aL:"S", bL:"N"},
  {dim:"SN", a:"ごはんは“いつもの味”が好き", b:"新しいフードも試したがる", aL:"S", bL:"N"},
  {dim:"SN", a:"おもちゃは実物っぽい動きが好き", b:"予想外の動きやギミックが好き", aL:"S", bL:"N"},
  {dim:"SN", a:"変化があると慎重になる", b:"変化があるとテンションが上がる", aL:"S", bL:"N"},

  // T/F (7)
  {dim:"TF", a:"叱られても切り替えが早い", b:"気持ちが引きずりやすい", aL:"T", bL:"F"},
  {dim:"TF", a:"淡々と指示に従うのが得意", b:"気分や相手の雰囲気で動く", aL:"T", bL:"F"},
  {dim:"TF", a:"ごほうびがあると最短で覚える", b:"褒められると伸びる", aL:"T", bL:"F"},
  {dim:"TF", a:"抱っこより“距離感”が大事", b:"スキンシップが大事", aL:"T", bL:"F"},
  {dim:"TF", a:"自分の目的が優先になりやすい", b:"相手の気持ちに合わせやすい", aL:"T", bL:"F"},
  {dim:"TF", a:"静かに見守られる方が安心", b:"声かけされる方が安心", aL:"T", bL:"F"},
  {dim:"TF", a:"ルールが筋が通ってると強い", b:"優しさ・安心感があると強い", aL:"T", bL:"F"},

  // J/P (7)
  {dim:"JP", a:"決まった時間・順番が好き", b:"その日の気分で動く", aL:"J", bL:"P"},
  {dim:"JP", a:"散歩コースは固定が落ち着く", b:"寄り道・気まぐれが楽しい", aL:"J", bL:"P"},
  {dim:"JP", a:"片付いてる場所が好き", b:"好きなところに好きに散らかす", aL:"J", bL:"P"},
  {dim:"JP", a:"新しいおもちゃは慎重に確認", b:"とりあえず飛びつく", aL:"J", bL:"P"},
  {dim:"JP", a:"待て・おすわりが得意になりやすい", b:"その場のノリで動きがち", aL:"J", bL:"P"},
  {dim:"JP", a:"予定が見えると安心する（出発前が得意）", b:"急に決まってもなんとかなる", aL:"J", bL:"P"},
  {dim:"JP", a:"やることが終わるまで集中", b:"途中で別のことに興味が移る", aL:"J", bL:"P"},
];

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function show(hash){
  const target = hash || "#home";
  // hide all
  $all(".view").forEach(v=>v.hidden = true);

  if(target.startsWith("#type/")){
    $("#view-type-detail").hidden = false;
    renderTypeDetail(target.split("/")[1]);
    window.scrollTo({top:0, behavior:"smooth"});
    return;
  }

  const map = {
    "#home":"#view-home",
    "#quiz":"#view-quiz",
    "#result":"#view-result",
    "#compat":"#view-compat",
    "#types":"#view-types",
  };
  const id = map[target] || "#view-home";
  $(id).hidden = false;

  if(target==="#quiz") renderQuiz();
  if(target==="#types") renderTypesGrid();
  if(target==="#result") window.scrollTo({top:0, behavior:"smooth"});

  window.scrollTo({top:0, behavior:"smooth"});
}

window.addEventListener("hashchange", ()=>show(location.hash));
window.addEventListener("load", ()=>show(location.hash || "#home"));

/* ---------- NAV ---------- */
document.addEventListener("click",(e)=>{
  const nav = e.target?.dataset?.nav;
  if(nav){ location.hash = nav; }
});
$("#goHome").addEventListener("click", ()=>location.hash="#home");

/* ---------- SHARE LINK ---------- */
function getShareUrl(){
  // og:url は静的でOKだが、ここは実URLをコピー
  return location.href.split("#")[0] + (location.hash || "#home");
}
async function shareLink(){
  const url = getShareUrl();
  try{
    if(navigator.share){
      await navigator.share({title:"うちのこMBTI", text:"うちのこMBTIで診断してみて🐾", url});
      toast("共有しました！");
      return;
    }
  }catch(err){ /* user cancelled */ }
  try{
    await navigator.clipboard.writeText(url);
    toast("リンクをコピーしました！");
  }catch(err){
    prompt("このURLをコピーしてね", url);
  }
}

$("#shareTop").addEventListener("click", shareLink);
$("#copyLinkHome").addEventListener("click", shareLink);
$("#copyLinkFooter").addEventListener("click", shareLink);

/* ---------- QUIZ RENDER ---------- */
let quizRendered = false;

function renderQuiz(){
  if(quizRendered) return;

  const form = $("#quizForm");
  form.innerHTML = "";

  QUESTIONS.forEach((q, i)=>{
    const el = document.createElement("div");
    el.className = "q";
    el.innerHTML = `
      <div class="q__meta">
        <div class="q__num">Q${String(i+1).padStart(2,"0")}</div>
        <div class="q__dim">${q.dim}</div>
      </div>
      <div class="q__text">${escapeHtml(q.a)} <span style="opacity:.6"> / </span> ${escapeHtml(q.b)}</div>
      <div class="opts">
        <label class="opt">
          <input type="radio" name="q${i}" value="A" />
          <span>${escapeHtml(q.a)}</span>
        </label>
        <label class="opt">
          <input type="radio" name="q${i}" value="B" />
          <span>${escapeHtml(q.b)}</span>
        </label>
      </div>
    `;
    form.appendChild(el);
  });

  form.addEventListener("change", updateProgress);
  $("#btnResult").addEventListener("click", onSubmitQuiz);
  $("#btnReset").addEventListener("click", resetQuiz);
  $("#scrollToBottom").addEventListener("click", ()=>window.scrollTo({top:document.body.scrollHeight, behavior:"smooth"}));

  quizRendered = true;
  updateProgress();
}

function resetQuiz(e){
  e?.preventDefault?.();
  const form = $("#quizForm");
  $all("#quizForm input[type=radio]").forEach(r=>r.checked=false);
  updateProgress();
  toast("リセットしました");
}

function updateProgress(){
  const answered = QUESTIONS.reduce((acc,_,i)=>{
    const picked = $(`#quizForm input[name="q${i}"]:checked`);
    return acc + (picked?1:0);
  },0);
  $("#progressText").textContent = `${answered} / ${QUESTIONS.length}`;
  $("#progressBar").style.width = `${Math.round((answered/QUESTIONS.length)*100)}%`;
}

function onSubmitQuiz(e){
  e.preventDefault();
  const missing = [];
  for(let i=0;i<QUESTIONS.length;i++){
    if(!$(`#quizForm input[name="q${i}"]:checked`)) missing.push(i+1);
  }
  if(missing.length){
    toast(`未回答が ${missing.length} 問あります（例: Q${missing[0]}）`);
    // scroll to first missing
    const first = $(`#quizForm .q:nth-child(${missing[0]})`);
    first?.scrollIntoView({behavior:"smooth", block:"center"});
    first?.animate([{transform:"scale(1)"},{transform:"scale(1.01)"},{transform:"scale(1)"}],{duration:260});
    return;
  }

  const type = calcTypeFromAnswers();
  localStorage.setItem("uchinoko_mbti_lastType", type);
  renderResult(type);
  location.hash = "#result";
}

/* ---------- TYPE CALC ---------- */
function calcTypeFromAnswers(){
  const score = {E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0};
  QUESTIONS.forEach((q,i)=>{
    const v = $(`#quizForm input[name="q${i}"]:checked`).value;
    const letter = (v==="A") ? q.aL : q.bL;
    score[letter] += 1;
  });
  const EI = score.E >= score.I ? "E":"I";
  const SN = score.S >= score.N ? "S":"N";
  const TF = score.T >= score.F ? "T":"F";
  const JP = score.J >= score.P ? "J":"P";
  return `${EI}${SN}${TF}${JP}`;
}


function getDefaultTypeImageUrl(type){
  const rel = TYPE_IMAGE_MAP[type];
  if(!rel) return null;
  return `images/${rel}`;
}

function setResultIllustration(type){
  const imgEl = document.getElementById("resultImg");
  const fallback = document.getElementById("illusFallback");
  const customKey = `uchinoko_mbti_customImage_${type}`;
  const custom = localStorage.getItem(customKey);
  const src = custom || getDefaultTypeImageUrl(type);

  if(src){
    imgEl.src = src;
    imgEl.onload = ()=>{ fallback.hidden = true; imgEl.style.display = "block"; };
    imgEl.onerror = ()=>{ imgEl.style.display="none"; fallback.hidden = false; };
  }else{
    imgEl.style.display="none";
    fallback.hidden = false;
  }

  // show reset only if custom exists
  const resetBtn = document.getElementById("btnResetPhoto");
  if(resetBtn) resetBtn.style.display = custom ? "" : "none";
}

async function pickCustomPhoto(type){
  const input = document.getElementById("customPhotoInput");
  if(!input) return;

  input.value = "";
  input.onchange = async () => {
    const file = input.files && input.files[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){
      toast("画像ファイルを選んでね");
      return;
    }

    // Convert to dataURL (keeps it self-contained for saving card & offline)
    const dataUrl = await fileToDataURL(file);

    // Store per-type so user can keep different pics for different results
    localStorage.setItem(`uchinoko_mbti_customImage_${type}`, dataUrl);
    setResultIllustration(type);
    toast("写真を変更しました");
  };

  input.click();
}

function resetCustomPhoto(type){
  localStorage.removeItem(`uchinoko_mbti_customImage_${type}`);
  setResultIllustration(type);
  toast("デフォルトに戻しました");
}

function fileToDataURL(file){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ---------- RESULT ---------- */
function renderResult(type){
  const d = PET_TYPE_DATA[type] || PET_TYPE_DATA["INFP"];
  $("#resultType").textContent = type;
  $("#resultCatch").textContent = d.name;
  $("#resultDesc").textContent = clampText(d.desc, 200, 320);
  $("#resultLikes").textContent = clampText(d.likes, 120, 180);

  const chips = $("#resultGoodHumans");
  chips.innerHTML = "";
  d.goodHumans.forEach(t=>{
    const b = document.createElement("button");
    b.className = "pill";
    b.textContent = t;
    b.addEventListener("click", ()=>location.hash = `#type/${t}`);
    chips.appendChild(b);
  });


  // illustration (default MBTI image or custom photo)
  setResultIllustration(type);

  // button bindings (once)
  if(!renderResult.bound){
    $("#btnShareLink").addEventListener("click", shareLink);
    $("#btnShareX").addEventListener("click", ()=>shareToX(type));
    $("#btnSaveCard").addEventListener("click", saveCardToAlbum);
    $("#btnAgain").addEventListener("click", ()=>{ resetQuiz(); });
    
    document.getElementById("btnChangePhoto").addEventListener("click", ()=>{ const t=document.getElementById("resultType").textContent.trim(); pickCustomPhoto(t); });
    document.getElementById("btnResetPhoto").addEventListener("click", ()=>{ const t=document.getElementById("resultType").textContent.trim(); resetCustomPhoto(t); });
    renderResult.bound = true;
  }
}

function shareToX(type){
  const url = getShareUrl().split("#")[0] + "#home";
  const text = `うちのこMBTI診断の結果：${type} 🐾 #うちのこMBTI`;
  const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(intent, "_blank");
}

/* ---------- SAVE CARD ---------- */
async function saveCardToAlbum(){
  const card = $("#resultCard");
  toast("カードを画像化中…");
  const canvas = await html2canvas(card, {backgroundColor: null, scale: 2, useCORS: true});
  const blob = await new Promise(res=>canvas.toBlob(res, "image/png", 1.0));
  if(!blob){
    toast("画像の作成に失敗しました");
    return;
  }

  // iOS/Android: share sheet で「画像を保存」が出ることが多い
  const file = new File([blob], "uchinoko-mbti.png", {type:"image/png"});
  try{
    if(navigator.canShare && navigator.canShare({files:[file]}) && navigator.share){
      await navigator.share({files:[file], title:"うちのこMBTI", text:"結果カード"});
      toast("共有シートを開きました（画像を保存を選んでね）");
      return;
    }
  }catch(err){
    // user cancelled or not supported
  }

  // fallback: download
  const a = document.createElement("a");
  const objUrl = URL.createObjectURL(blob);
  a.href = objUrl;
  a.download = "uchinoko-mbti.png";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(objUrl), 8000);
  toast("画像をダウンロードしました");
}

/* ---------- COMPAT ---------- */
function fillSelects(){
  const petSel = $("#petTypeSelect");
  const humanSel = $("#humanTypeSelect");
  petSel.innerHTML = "";
  humanSel.innerHTML = "";
  TYPES.forEach(t=>{
    const o1 = document.createElement("option");
    o1.value = t; o1.textContent = t;
    petSel.appendChild(o1);

    const o2 = document.createElement("option");
    o2.value = t; o2.textContent = t;
    humanSel.appendChild(o2);
  });

  const last = localStorage.getItem("uchinoko_mbti_lastType");
  if(last && TYPES.includes(last)) petSel.value = last;
}

fillSelects();

$("#btnCompat").addEventListener("click", ()=>{
  const pet = $("#petTypeSelect").value;
  const human = $("#humanTypeSelect").value;
  const {percent, text} = calcCompat(pet, human);
  $("#compatPercent").textContent = `${percent}%`;
  $("#compatTypes").textContent = `${pet}（うちのこ） × ${human}（かいぬし）`;
  $("#compatText").textContent = text;
  $("#compatResult").hidden = false;
  localStorage.setItem("uchinoko_mbti_lastType", pet);
  window.scrollTo({top:document.body.scrollHeight, behavior:"smooth"});
});

function calcCompat(pet, human){
  // ざっくり：4軸の一致=ベース、グループ相性で補正
  const dims = ["EI","SN","TF","JP"];
  let match = 0;
  for(let i=0;i<4;i++){
    if(pet[i] === human[i]) match++;
  }

  const base = 55 + match*10; // 55〜95
  const groupBonus = groupSynergy(pet, human); // -8〜+8
  let percent = clampInt(base + groupBonus, 40, 99);

  // メッセージ（150〜200字程度）
  const msg = buildCompatText(pet, human, percent, match, groupBonus);
  return {percent, text: msg};
}

function groupOf(t){
  const letters = t;
  const nt = letters[1]==="N" && letters[2]==="T";
  const nf = letters[1]==="N" && letters[2]==="F";
  const sj = letters[1]==="S" && letters[3]==="J";
  const sp = letters[1]==="S" && letters[3]==="P";
  if(nt) return "NT";
  if(nf) return "NF";
  if(sj) return "SJ";
  if(sp) return "SP";
  return "??";
}

function groupSynergy(pet, human){
  // ペット×人間前提：安定(SJ)は安心を作る、NFは共感、NTは設計、SPは遊び
  const pg = groupOf(pet);
  const hg = groupOf(human);

  const matrix = {
    NT: {NT:2, NF:3, SJ:4, SP:1},
    NF: {NT:3, NF:2, SJ:4, SP:2},
    SJ: {NT:3, NF:4, SJ:2, SP:2},
    SP: {NT:2, NF:3, SJ:3, SP:2},
  };
  let bonus = (matrix[pg]?.[hg] ?? 2) - 2; // -?〜+?
  // 同じE/Iは近いテンション、違うと補完（+1）
  if(pet[0] !== human[0]) bonus += 1;
  // J/Pが違うと補完（+1）
  if(pet[3] !== human[3]) bonus += 1;
  // TFが同じだと分かりやすい（+1）
  if(pet[2] === human[2]) bonus += 1;
  // SNが違いすぎるとズレやすい（-1）
  if(pet[1] !== human[1]) bonus -= 1;

  return clampInt(bonus, -8, 8);
}

function buildCompatText(pet, human, percent, match, bonus){
  const petD = PET_TYPE_DATA[pet];
  const humanStyle = human[2]==="F" ? "共感と安心" : "ルールと設計";
  const tempo = human[3]==="J" ? "整えながら" : "ゆるく試しながら";
  const social = human[0]==="E" ? "声かけ多め" : "見守り多め";

  let line1 = `相性度は${percent}%。かいぬしが「${humanStyle}」で関わると、うちのこの良さが伸びやすい組み合わせです。`;
  let line2 = `コツは「${social}」＋「${tempo}」でルーティンを作ること。`;
  let line3 = `特に「${petD?.name || "このタイプ"}」は、無理に変えず“得意”を増やすほど信頼が深まります。`;

  // 150〜200字に寄せる
  const all = (line1 + "\n" + line2 + "\n" + line3);
  return clampText(all, 150, 210);
}

/* ---------- TYPES LIST / DETAIL ---------- */
let typesRendered = false;

function renderTypesGrid(){
  if(typesRendered) return;
  const grid = $("#typesGrid");
  grid.innerHTML = "";

  TYPES.forEach(t=>{
    const d = PET_TYPE_DATA[t];
    const card = document.createElement("div");
    card.className = "typeCard";
    card.innerHTML = `
      <div class="typeCard__top">
        <div class="typeTag">${t}</div>
        <div class="chip">詳細</div>
      </div>
      <div class="typeCatch">${escapeHtml(d.catch)}</div>
      <div class="typeIllus"><img class="typeThumb" alt="イラスト" src="${getDefaultTypeImageUrl(t) || ""}" onerror="this.style.display=\'none\'"></div>
    `;
    card.addEventListener("click", ()=>location.hash = `#type/${t}`);
    grid.appendChild(card);
  });

  typesRendered = true;
}

function renderTypeDetail(type){
  const d = PET_TYPE_DATA[type];
  if(!d){ location.hash="#types"; return; }

  $("#detailTitle").textContent = `${type}：${d.name}`;
  $("#detailCatch").textContent = d.catch;
  $("#detailDesc").textContent = clampText(d.desc, 200, 320);
  $("#detailLikes").textContent = clampText(d.likes, 120, 180);

  const ill = $("#detailIllus");
    const url = getDefaultTypeImageUrl(type);
  ill.innerHTML = url ? `<img class="detailThumb" alt="イラスト" src="${url}" onerror="this.style.display=\'none\'">` : `
    <div style="text-align:center; opacity:.85; font-weight:900">
      イラスト枠（後で指定）<br/><span style="opacity:.7; font-weight:800">${type}</span>
    </div>
  `;

  const chips = $("#detailGoodHumans");
  chips.innerHTML = "";
  d.goodHumans.forEach(t=>{
    const b = document.createElement("button");
    b.className = "pill";
    b.textContent = t;
    b.addEventListener("click", ()=>location.hash = `#type/${t}`);
    chips.appendChild(b);
  });
}

/* ---------- UTIL ---------- */
function clampInt(n, min, max){ return Math.max(min, Math.min(max, n)); }

function clampText(s, minChars, maxChars){
  const clean = (s || "").replace(/\s+/g, " ").trim();
  if(clean.length <= maxChars) return clean;
  return clean.slice(0, maxChars-1) + "…";
}
function escapeHtml(str){
  return (str ?? "").replace(/[&<>"']/g, (m)=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[m]));
}

/* ---------- TOAST ---------- */
let toastTimer = null;
function toast(msg){
  let el = document.getElementById("toast");
  if(!el){
    el = document.createElement("div");
    el.id = "toast";
    el.style.cssText = `
      position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
      background: rgba(0,0,0,.78); color: white; padding: 10px 12px;
      border: 1px solid rgba(255,255,255,.12); border-radius: 999px;
      font-weight: 800; letter-spacing:.2px; z-index: 9999;
      max-width: 92vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      backdrop-filter: blur(10px);
    `;
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.style.opacity = "1";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ el.style.opacity="0"; }, 2000);
}
