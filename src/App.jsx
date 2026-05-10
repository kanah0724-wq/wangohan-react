import React, { useEffect, useMemo, useRef, useState } from 'react'

const defaultFoods = [
  {name:'豚肉',cat:'タンパク質',uri:'safe',lulu:'safe',detail:'2匹ともOK。ホットクックの主役食材。ヒレ・もも肉など脂身の少ない部位を。必ず加熱。'},
  {name:'鶏肉',cat:'タンパク質',uri:'l3',lulu:'l2',detail:'ウリ：LEVEL3 絶対NG。ルル：LEVEL2 要注意。2匹とも与えない方が安全。'},
  {name:'鶏レバー',cat:'タンパク質',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'牛肉',cat:'タンパク質',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'豚レバー',cat:'タンパク質',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'豚心臓',cat:'タンパク質',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'卵白（鶏）',cat:'タンパク質',uri:'safe',lulu:'safe',detail:'2匹ともOK。必ず加熱。ウリのトッピング用。'},
  {name:'卵黄（鶏）',cat:'タンパク質',uri:'l1',lulu:'safe',detail:'ウリ：LEVEL1 少量で様子見。ルル：OK。'},
  {name:'豆腐',cat:'タンパク質',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。少量から。'},
  {name:'鹿肉',cat:'タンパク質',uri:'safe',lulu:'safe',detail:'2匹ともOK。ローテーション食材として優秀。'},
  {name:'七面鳥',cat:'タンパク質',uri:'safe',lulu:'safe',detail:'2匹ともOK。低アレルゲンタンパク源。'},
  {name:'ラムトライプ',cat:'タンパク質',uri:'l3',lulu:'l3',detail:'2匹ともLEVEL3 絶対NG。'},
  {name:'エンドウ豆タンパク',cat:'タンパク質',uri:'l3',lulu:'l3',detail:'2匹ともLEVEL3 絶対NG。'},
  {name:'ハム・ベーコン',cat:'タンパク質',uri:'safe',lulu:'l3',detail:'ウリ：OK（塩分注意）。ルル：LEVEL3 絶対NG。'},
  {name:'かぼちゃ',cat:'野菜',uri:'l1',lulu:'safe',detail:'ウリ：LEVEL1 少なめに。ルル：OK。ホットクックで一緒に煮込んでOK。'},
  {name:'じゃがいも',cat:'野菜',uri:'l2',lulu:'safe',detail:'ウリ：LEVEL2 要注意。食材自体はOKだが含まれるタンパク質成分がLv2。与えるなら少量で様子見。ルル：OK。芽は必ず取り除くこと。'},
  {name:'さつまいも',cat:'野菜',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。'},
  {name:'ブロッコリー',cat:'野菜',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 少量で様子見。クタクタに茹でてみじん切りに。'},
  {name:'にんじん',cat:'野菜',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。少量から。'},
  {name:'大根',cat:'野菜',uri:'l3',lulu:'safe',detail:'ウリ：LEVEL3 絶対NG。ルル：OK。ルル専用で別茹で。'},
  {name:'白菜',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。ウリ専用で別茹で。'},
  {name:'キャベツ',cat:'野菜',uri:'l2',lulu:'l2',detail:'2匹ともLEVEL2 要注意。紫キャベツはOK。'},
  {name:'紫キャベツ',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。売っている時はホットクックに入れてOK。'},
  {name:'もやし',cat:'野菜',uri:'l3',lulu:'l3',detail:'2匹ともLEVEL3 絶対NG。'},
  {name:'しめじ',cat:'野菜',uri:'l3',lulu:'safe',detail:'ウリ：LEVEL3 絶対NG。ルル：OK。共通の鍋に入れないこと。'},
  {name:'えのき',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。共通の鍋に入れないこと。'},
  {name:'椎茸',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。'},
  {name:'ピーマン',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'セロリ',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'ほうれん草',cat:'野菜',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。別茹でしてアク抜きを。'},
  {name:'きゅうり',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。生でも与えられる。'},
  {name:'茄子',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。必ず加熱して。'},
  {name:'大豆・納豆',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。少量から。'},
  {name:'わかめ',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。少量に。'},
  {name:'レタス（各種）',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。リーフ・サニー・玉レタス・ロメイン各種含む。'},
  {name:'おから',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。食物繊維豊富。'},
  {name:'オクラ',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。'},
  {name:'かぶ',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。'},
  {name:'グリーンピース',cat:'野菜',uri:'safe',lulu:'safe',detail:'2匹ともOK。'},
  {name:'レンコン',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'ひじき',cat:'野菜',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'アスパラガス',cat:'野菜',uri:'l3',lulu:'l1',detail:'ウリ：LEVEL3 絶対NG。ルル：LEVEL1 要観察。'},
  {name:'とうもろこし',cat:'野菜',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。芯・皮は与えない。'},
  {name:'エンドウ（スノー）',cat:'野菜',uri:'l3',lulu:'l3',detail:'2匹ともLEVEL3 絶対NG。'},
  {name:'白米',cat:'穀物',uri:'safe',lulu:'l3',detail:'ウリ：OK（毎食30g）。ルル：LEVEL3 絶対NG。'},
  {name:'玄米',cat:'穀物',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'オートミール',cat:'穀物',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。'},
  {name:'小麦',cat:'穀物',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'小麦グルテン',cat:'穀物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'フラックスシード',cat:'穀物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'そば',cat:'穀物',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'さけ（鮭）',cat:'魚介類',uri:'safe',lulu:'safe',detail:'2匹ともOK。必ず加熱。オメガ3豊富。'},
  {name:'マグロ（ツナ）',cat:'魚介類',uri:'l1',lulu:'safe',detail:'ウリ：LEVEL1 要観察。ルル：OK。'},
  {name:'かつお',cat:'魚介類',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'サバ',cat:'魚介類',uri:'safe',lulu:'safe',detail:'2匹ともOK。必ず加熱。'},
  {name:'イワシ',cat:'魚介類',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。'},
  {name:'アジ',cat:'魚介類',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'あさり',cat:'魚介類',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'カキ',cat:'魚介類',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'サンマ',cat:'魚介類',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'ヨーグルト（カスピ海）',cat:'乳製品',uri:'l1',lulu:'safe',detail:'ウリ：LEVEL1 少量のみ。ルル：OK たっぷりOK。'},
  {name:'ヨーグルト（ビフィズス）',cat:'乳製品',uri:'l3',lulu:'safe',detail:'ウリ：LEVEL3 絶対NG。ルル：OK。'},
  {name:'ヨーグルト（ブルガリア）',cat:'乳製品',uri:'safe',lulu:'l1',detail:'ウリ：OK（安全）。ルル：LEVEL1 要観察。'},
  {name:'ヤギ乳',cat:'乳製品',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'バター',cat:'乳製品',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'牛乳',cat:'乳製品',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。'},
  {name:'りんご（ふじ以外）',cat:'果物',uri:'safe',lulu:'safe',detail:'ウリ・ルルともOK。種・芯は必ず除く。'},
  {name:'りんご（ふじ）',cat:'果物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG（ふじ種のみNG）。'},
  {name:'バナナ',cat:'果物',uri:'safe',lulu:'l1',detail:'ウリ：OK。ルル：LEVEL1 要観察。糖質多いので少量に。'},
  {name:'いちご',cat:'果物',uri:'safe',lulu:'safe',detail:'2匹ともOK。'},
  {name:'すいか',cat:'果物',uri:'safe',lulu:'safe',detail:'2匹ともOK。種・皮除く。'},
  {name:'みかん',cat:'果物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'桃',cat:'果物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'クランベリー',cat:'果物',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'ごま',cat:'ナッツ・種',uri:'l2',lulu:'l3',detail:'ウリ：LEVEL2 要注意。ルル：LEVEL3 絶対NG。'},
  {name:'ピーナッツ',cat:'ナッツ・種',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'アーモンド',cat:'ナッツ・種',uri:'safe',lulu:'l2',detail:'ウリ：OK。ルル：LEVEL2 要注意。'},
  {name:'栗',cat:'ナッツ・種',uri:'safe',lulu:'l3',detail:'ウリ：OK。ルル：LEVEL3 絶対NG。'},
  {name:'トマト',cat:'果物',uri:'l1',lulu:'safe',detail:'ウリ：LEVEL1 要観察。ルル：OK。'},
];

const initialMealConfig = {
  uriFoodAmt:  '40g',
  uriRiceAmt:  'なし',
  luluFoodAmt: '25g',
  luluRice:    '絶対NG',
  uriItems:  [{name:'オートミール',note:'15g'},{name:'白菜',note:'別茹で'},{name:'ゆで卵',note:'白身のみ'},{name:'ブロッコリー',note:'トッピング'},{name:'かぼちゃ',note:'少なめに'},{name:'カスピ海ヨーグルト',note:'少量のみ'},{name:'ブルガリア',note:'カスピ海なら少なめ'}],
  luluItems: [{name:'オートミール',note:'15g'},{name:'ブロッコリー',note:'OK'},{name:'大根',note:'別茹で'},{name:'卵',note:'白身・黄身OK'},{name:'カスピ海ヨーグルト',note:'たっぷりOK'},{name:'かぼちゃ',note:'OK'}],
  uriHotcookNote: '50g',
  luluHotcookNote: '100g',
  hotcookOk: ['豚肉（ヒレ・もも）','かぼちゃ','紫キャベツ（あれば）'],
  hotcookNg: ['白菜','もやし','キャベツ','しめじ','大根','鶏肉','えのき','ピーマン','セロリ'],
  uriSep:    ['白菜（別茹で）','ゆで卵 白身のみ','ブロッコリー（トッピング）'],
  luluSep:   ['大根（別茹で）','ゆで卵（白身・黄身OK）','ブロッコリー（少量・様子見）']
}

const LV = {
  safe: { label: 'OK', className: 'lv-ok', rank: 0 },
  l1: { label: 'Lv1', className: 'lv-1', rank: 1 },
  l2: { label: 'Lv2', className: 'lv-2', rank: 2 },
  l3: { label: 'Lv3', className: 'lv-3', rank: 3 },
}
const CATS = ['タンパク質', '野菜', '穀物', '魚介類', '乳製品', '果物', 'ナッツ・種', 'その他']
const QUICK_DEFAULT_ORDER = ['タンパク質', '野菜', '果物', '穀物', '乳製品', '魚介類', 'ナッツ・種', 'その他']
const CATEGORY_LABELS = { タンパク質: 'お肉・タンパク質' }
const MEMO_LABELS = { m1: 'ウリのメモ', m2: 'ルルのメモ', m3: '服薬・健康メモ' }

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
function csvCell(value = '') {
  return '"' + String(value).replaceAll('"', '""') + '"'
}
function parseCSVLine(line) {
  const cells = []
  let cur = ''
  let inQ = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++ }
      else inQ = !inQ
    } else if (ch === ',' && !inQ) {
      cells.push(cur); cur = ''
    } else cur += ch
  }
  cells.push(cur)
  return cells
}
function normalizeFood(f) {
  return {
    name: f.name || '',
    cat: f.cat || 'その他',
    uri: f.uri || 'safe',
    lulu: f.lulu || 'safe',
    detail: f.detail || '',
    favorite: Boolean(f.favorite),
  }
}

function formatDateTime(value) {
  if (!value) return '未保存'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '未保存'
  const m = d.getMonth() + 1
  const day = d.getDate()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${m}/${day} ${hh}:${mm}`
}
function isBackupDue(value) {
  if (!value) return true
  const t = new Date(value).getTime()
  if (Number.isNaN(t)) return true
  return Date.now() - t > 7 * 24 * 60 * 60 * 1000
}


function categoryLabel(cat) {
  return CATEGORY_LABELS[cat] || cat
}
function buildCategoryOrder(foods, savedOrder = QUICK_DEFAULT_ORDER) {
  const cats = [...new Set(foods.map(f => f.cat || 'その他'))]
  const base = Array.isArray(savedOrder) && savedOrder.length ? savedOrder : QUICK_DEFAULT_ORDER
  return [...base, ...QUICK_DEFAULT_ORDER, ...cats]
    .filter((cat, index, arr) => cats.includes(cat) && arr.indexOf(cat) === index)
}


function matchesFoodCondition(f, mode) {
  if (mode === 'all') return true
  if (mode === 'favorite') return Boolean(f.favorite)
  if (mode === 'bothSafe') return f.uri === 'safe' && f.lulu === 'safe'
  if (mode === 'uriSafe') return f.uri === 'safe'
  if (mode === 'luluSafe') return f.lulu === 'safe'
  if (mode === 'anyNg') return f.uri === 'l3' || f.lulu === 'l3'
  if (mode === 'lv2plus') return (LV[f.uri]?.rank || 0) >= 2 || (LV[f.lulu]?.rank || 0) >= 2
  if (mode === 'uriNg') return f.uri === 'l3'
  if (mode === 'luluNg') return f.lulu === 'l3'
  return true
}
function sortFavoriteFirst(a, b) {
  if (Boolean(a.favorite) !== Boolean(b.favorite)) return a.favorite ? -1 : 1
  return a.name.localeCompare(b.name, 'ja')
}
function FavoriteButton({ active, onClick }) {
  return <button className={`star-btn ${active ? 'active' : ''}`} onClick={onClick} title={active ? 'よく使うから外す' : 'よく使うに追加'} aria-label={active ? 'よく使うから外す' : 'よく使うに追加'}>{active ? '♥' : '♡'}</button>
}

function Badge({ value }) {
  const item = LV[value] || LV.safe
  return <span className={`lv ${item.className}`}>{item.label}</span>
}

function TabButton({ id, active, onClick, children }) {
  return <button className={`nav-btn ${active === id ? 'active' : ''}`} onClick={() => onClick(id)}>{children}</button>
}

export default function App() {
  const [tab, setTab] = useState('meal')
  const [foods, setFoodsState] = useState(() => loadJson('customFoods', defaultFoods).map(normalizeFood))
  const [mealConfig, setMealConfigState] = useState(() => loadJson('mealConfig2', initialMealConfig))
  const [memos, setMemosState] = useState(() => ({
    m1: localStorage.getItem('m1') || '',
    m2: localStorage.getItem('m2') || '',
    m3: localStorage.getItem('m3') || '',
  }))
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [dog, setDog] = useState('both')
  const [condition, setCondition] = useState('all')
  const [quickCondition, setQuickCondition] = useState('all')
  const [editIndex, setEditIndex] = useState(null)
  const [draft, setDraft] = useState({ name: '', cat: '野菜', uri: 'safe', lulu: 'safe', detail: '' })
  const [manageQuery, setManageQuery] = useState('')
  const [quickCatOrder, setQuickCatOrderState] = useState(() => loadJson('quickCategoryOrder', QUICK_DEFAULT_ORDER))
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashDone'))
  const [saveNotice, setSaveNotice] = useState('')
  const [foodNotice, setFoodNotice] = useState('')
  const [lastSavedAt, setLastSavedAt] = useState(() => localStorage.getItem('lastSavedAt') || '')
  const [lastBackupAt, setLastBackupAt] = useState(() => localStorage.getItem('lastBackupAt') || '')
  const saveNoticeTimer = useRef(null)

  useEffect(() => {
    if (!showSplash) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('splashDone', '1')
      setShowSplash(false)
    }, 2400)
    return () => clearTimeout(timer)
  }, [showSplash])

  function notifySaved(message = '保存しました') {
    const now = new Date().toISOString()
    localStorage.setItem('lastSavedAt', now)
    setLastSavedAt(now)
    setSaveNotice(message)
    if (saveNoticeTimer.current) clearTimeout(saveNoticeTimer.current)
    saveNoticeTimer.current = setTimeout(() => setSaveNotice(''), 1800)
  }
  function setFoods(next) {
    setFoodsState(next)
    saveJson('customFoods', next)
    notifySaved('食材データを保存しました')
  }
  function setMealConfig(next) {
    setMealConfigState(next)
    saveJson('mealConfig2', next)
    notifySaved('ごはん設定を保存しました')
  }
  function setMemo(key, value) {
    const next = { ...memos, [key]: value }
    setMemosState(next)
    localStorage.setItem(key, value)
    notifySaved('メモを保存しました')
  }

  function setQuickCatOrder(next) {
    setQuickCatOrderState(next)
    saveJson('quickCategoryOrder', next)
    notifySaved('早見表の並び順を保存しました')
  }
  function moveQuickCategory(cat, direction) {
    const order = [...quickCategoryOrder]
    const index = order.indexOf(cat)
    const nextIndex = index + direction
    if (index < 0 || nextIndex < 0 || nextIndex >= order.length) return
    ;[order[index], order[nextIndex]] = [order[nextIndex], order[index]]
    setQuickCatOrder(order)
  }
  function resetQuickCategoryOrder() {
    setQuickCatOrder(QUICK_DEFAULT_ORDER)
  }
  function toggleFavorite(name) {
    const next = foods.map((f) => f.name === name ? { ...f, favorite: !f.favorite } : f)
    setFoods(next)
    const item = next.find(f => f.name === name)
    setFoodNotice(`「${name}」を${item?.favorite ? 'よく使うに追加' : 'よく使うから外し'}ました`)
  }

  const filteredFoods = useMemo(() => {
    return foods.filter((f) => {
      const q = query.trim().toLowerCase()
      if (q && !`${f.name} ${f.cat} ${f.detail}`.toLowerCase().includes(q)) return false
      if (!matchesFoodCondition(f, condition)) return false
      if (filter === 'all') return true
      if (dog === 'uri') return f.uri === filter
      if (dog === 'lulu') return f.lulu === filter
      return f.uri === filter || f.lulu === filter
    }).sort(sortFavoriteFirst)
  }, [foods, query, filter, dog, condition])

  const quickCategoryOrder = useMemo(() => buildCategoryOrder(foods, quickCatOrder), [foods, quickCatOrder])

  const quickGroups = useMemo(() => quickCategoryOrder
    .map(cat => ({
      cat,
      items: foods.filter(f => f.cat === cat && matchesFoodCondition(f, quickCondition)).sort(sortFavoriteFirst)
    }))
    .filter(group => group.items.length), [foods, quickCategoryOrder, quickCondition])

  const groupedManageFoods = useMemo(() => {
    const q = manageQuery.trim().toLowerCase()
    const filtered = foods
      .map((f, i) => [f, i])
      .filter(([f]) => !q || `${f.name} ${f.cat} ${f.detail || ''}`.toLowerCase().includes(q))
    const cats = [...CATS, ...new Set(filtered.map(([f]) => f.cat).filter(cat => !CATS.includes(cat)))]
    return cats
      .map(cat => ({ cat, items: filtered.filter(([f]) => f.cat === cat).sort(([a], [b]) => sortFavoriteFirst(a, b)) }))
      .filter(group => group.items.length)
  }, [foods, manageQuery])

  function startAdd() {
    setFoodNotice('')
    setEditIndex(null)
    setDraft({ name: '', cat: '野菜', uri: 'safe', lulu: 'safe', detail: '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function startEdit(index) {
    setFoodNotice('')
    setEditIndex(index)
    setDraft({ ...foods[index] })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  function saveFood() {
    if (!draft.name.trim()) { alert('食材名を入れてください'); return }
    const item = normalizeFood(draft)
    const next = [...foods]
    const isNew = editIndex === null
    if (isNew) next.push(item)
    else next[editIndex] = item
    setFoods(next)
    setFoodNotice(`「${item.name}」を「${item.cat}」に${isNew ? '登録' : '保存'}しました`)
    setEditIndex(null)
    setDraft({ name: '', cat: '野菜', uri: 'safe', lulu: 'safe', detail: '' })
  }
  function deleteFood(index) {
    if (!confirm('この食材を削除しますか？')) return
    setFoods(foods.filter((_, i) => i !== index))
    setEditIndex(null)
  }
  function updateMealArray(key, value) {
    const arr = value.split('\n').map(v => v.trim()).filter(Boolean)
    setMealConfig({ ...mealConfig, [key]: arr })
  }
  function updateMealItems(key, value) {
    const arr = value.split('\n').map(v => v.trim()).filter(Boolean).map(line => {
      const [name, ...rest] = line.split('：')
      return { name: name.trim(), note: rest.join('：').trim() }
    })
    setMealConfig({ ...mealConfig, [key]: arr })
  }
  function exportCSV() {
    const rows = []
    rows.push('# わんごはん帳バックアップ')
    rows.push('# 旧HTML版と互換性があるCSVです')
    for (const key of ['m1', 'm2', 'm3']) rows.push(['MEMO', MEMO_LABELS[key], memos[key] || ''].map(csvCell).join(','))
    foods.forEach(f => rows.push(['FOOD', f.name, f.cat, f.uri, f.lulu, f.detail || '', f.favorite ? '1' : ''].map(csvCell).join(',')))
    const blob = new Blob(['﻿' + rows.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wangohan_backup.csv'
    a.click()
    URL.revokeObjectURL(url)
    const now = new Date().toISOString()
    localStorage.setItem('lastBackupAt', now)
    setLastBackupAt(now)
    notifySaved('バックアップを書き出しました')
  }
  function importCSV(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!confirm('現在の食材データとメモを上書きします。先にCSVを書き出しておくと安全です。続けますか？')) { e.target.value = ''; return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        let text = String(ev.target.result || '')
        if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1)
        const lines = text.split('\n')
        const newFoods = []
        const nextMemos = { ...memos }
        const memoMap = { 'ウリのメモ': 'm1', 'ルルのメモ': 'm2', '服薬・健康メモ': 'm3' }
        for (const raw of lines) {
          const line = raw.replace(/\r/g, '')
          if (!line || line[0] === '#') continue
          const cells = parseCSVLine(line)
          if (cells[0] === 'MEMO' && cells.length >= 3) {
            const key = memoMap[cells[1]]
            if (key) nextMemos[key] = cells[2]
          } else if (cells[0] === 'FOOD' && cells.length >= 5) {
            newFoods.push(normalizeFood({ name: cells[1], cat: cells[2], uri: cells[3], lulu: cells[4], detail: cells[5] || '', favorite: cells[6] === '1' || cells[6] === 'true' }))
          }
        }
        setMemosState(nextMemos)
        Object.entries(nextMemos).forEach(([k, v]) => localStorage.setItem(k, v))
        if (newFoods.length) setFoods(newFoods)
        notifySaved('CSVを読み込みました')
        alert(`読み込み完了！食材${newFoods.length}件・メモを復元しました。`)
      } catch (err) {
        alert('読み込みエラー: ' + err.message)
      }
      e.target.value = ''
    }
    reader.readAsText(file, 'UTF-8')
  }

  return <div className="app">
    {saveNotice && <div className="save-toast">{saveNotice}</div>}
    {showSplash && <div className="splash" onClick={() => setShowSplash(false)}>
      <div className="splash-card">
        <img src="/apple-touch-icon.png" alt="" />
        <div className="splash-title">わんごはん帳</div>
        <div className="splash-sub">ウリ & ルルの毎日ごはん</div>
        <div className="splash-dots"><i></i><i></i><i></i></div>
      </div>
    </div>}
    <header className="hero">
      <img src="/apple-touch-icon.png" alt="" />
      <div>
        <p>ウリ & ルル</p>
        <h1>わんごはん帳</h1>
        <span>ウリ & ルルの毎日ごはん</span>
      </div>
    </header>

    <div className="status-strip">
      <span>最終保存：<b>{formatDateTime(lastSavedAt)}</b></span>
      <span>前回バックアップ：<b>{lastBackupAt ? formatDateTime(lastBackupAt) : '未作成'}</b></span>
      <button className="sub mini-btn" onClick={exportCSV}>CSVバックアップ</button>
    </div>
    {isBackupDue(lastBackupAt) && <div className="backup-alert">
      <b>バックアップがおすすめです</b>
      <span>{lastBackupAt ? '前回のCSVバックアップから7日以上経っています。' : 'まだCSVバックアップが作られていません。'}</span>
      <button onClick={exportCSV}>今すぐ書き出し</button>
    </div>}

    <nav className="nav">
      <TabButton id="meal" active={tab} onClick={setTab}>ごはん</TabButton>
      <TabButton id="quick" active={tab} onClick={setTab}>早見表</TabButton>
      <TabButton id="foods" active={tab} onClick={setTab}>食材詳細</TabButton>
      <TabButton id="memo" active={tab} onClick={setTab}>メモ</TabButton>
      <TabButton id="manage" active={tab} onClick={setTab}>管理</TabButton>
    </nav>

    <main>
      {tab === 'meal' && <section className="panel">
        <div className="section-head">
          <h2>それぞれの器</h2>
          <button className="sub small" onClick={() => document.getElementById('meal-edit')?.scrollIntoView({behavior:'smooth', block:'start'})}>ごはんの設定を変更</button>
        </div>
        <div className="meal-grid">
          <DogMeal title="ウリ" type="uri" foodAmt={mealConfig.uriFoodAmt} rice={mealConfig.uriRiceAmt} hot={mealConfig.uriHotcookNote} items={mealConfig.uriItems} />
          <DogMeal title="ルル" type="lulu" foodAmt={mealConfig.luluFoodAmt} rice={mealConfig.luluRice} hot={mealConfig.luluHotcookNote} items={mealConfig.luluItems} />
        </div>
        <div className="card cook-card">
          <h3>ホットクック共通おかず</h3>
          <TagList items={mealConfig.hotcookOk} />
          <h3>共通NG</h3>
          <TagList items={mealConfig.hotcookNg} tone="ng" />
        </div>
        <div className="split-grid">
          <div className="card solo-card uri">
            <h3>ウリだけ別調理</h3>
            <TagList items={mealConfig.uriSep} tone="warn" />
          </div>
          <div className="card solo-card lulu">
            <h3>ルルだけ別調理</h3>
            <TagList items={mealConfig.luluSep} />
          </div>
        </div>
        <div className="tip-dark">
          <h3>手作りごはんのポイント</h3>
          <ul>
            <li>野菜は必ず加熱・細かく切る</li>
            <li>塩・醤油・香辛料は絶対NG</li>
            <li>新食材は少量から3日様子見</li>
            <li>ウリは白米OK、ルルは白米NG</li>
            <li>メモと食材データは端末内に保存されます</li>
          </ul>
        </div>
        <details className="edit-box" id="meal-edit">
          <summary>ごはん設定を編集</summary>
          <p className="save-help">入力すると自動で保存されます。保存されると画面下に『保存しました』が出ます。</p>
          <div className="form-grid">
            <label>ウリ フード<input value={mealConfig.uriFoodAmt || ''} onChange={e=>setMealConfig({...mealConfig, uriFoodAmt:e.target.value})} /></label>
            <label>ウリ 白米<input value={mealConfig.uriRiceAmt || ''} onChange={e=>setMealConfig({...mealConfig, uriRiceAmt:e.target.value})} /></label>
            <label>ルル フード<input value={mealConfig.luluFoodAmt || ''} onChange={e=>setMealConfig({...mealConfig, luluFoodAmt:e.target.value})} /></label>
            <label>ルル 白米<input value={mealConfig.luluRice || ''} onChange={e=>setMealConfig({...mealConfig, luluRice:e.target.value})} /></label>
          </div>
          <label>ウリの追加項目（名前：メモ で1行ずつ）<textarea value={(mealConfig.uriItems||[]).map(i=>`${i.name}：${i.note||''}`).join('\n')} onChange={e=>updateMealItems('uriItems', e.target.value)} /></label>
          <label>ルルの追加項目（名前：メモ で1行ずつ）<textarea value={(mealConfig.luluItems||[]).map(i=>`${i.name}：${i.note||''}`).join('\n')} onChange={e=>updateMealItems('luluItems', e.target.value)} /></label>
          <label>ホットクックOK（1行ずつ）<textarea value={(mealConfig.hotcookOk||[]).join('\n')} onChange={e=>updateMealArray('hotcookOk', e.target.value)} /></label>
          <label>ホットクックNG（1行ずつ）<textarea value={(mealConfig.hotcookNg||[]).join('\n')} onChange={e=>updateMealArray('hotcookNg', e.target.value)} /></label>
          <label>ウリだけ別調理（1行ずつ）<textarea value={(mealConfig.uriSep||[]).join('\n')} onChange={e=>updateMealArray('uriSep', e.target.value)} /></label>
          <label>ルルだけ別調理（1行ずつ）<textarea value={(mealConfig.luluSep||[]).join('\n')} onChange={e=>updateMealArray('luluSep', e.target.value)} /></label>
        </details>
      </section>}

      {tab === 'quick' && <section className="panel">
        <h2>食材レベル早見表</h2>
        <p className="note">♡を押した「よく使う食材」は各分類の上に表示されます。</p>
        <div className="controls compact">
          <select value={quickCondition} onChange={e=>setQuickCondition(e.target.value)}>
            <option value="all">すべて表示</option>
            <option value="favorite">よく使うだけ</option>
            <option value="bothSafe">2匹ともOK</option>
            <option value="uriSafe">ウリOK</option>
            <option value="luluSafe">ルルOK</option>
            <option value="anyNg">どちらかLv3/NG</option>
            <option value="lv2plus">Lv2以上あり</option>
          </select>
        </div>
        <details className="sort-box">
          <summary>早見表の並び順を編集</summary>
          <p className="save-help">お肉・野菜・果物を先頭にしています。よく使う分類は「上へ」で移動できます。</p>
          <div className="sort-list">
            {quickCategoryOrder.map((cat, index) => <div className="sort-row" key={cat}>
              <b>{index + 1}. {categoryLabel(cat)}</b>
              <div>
                <button className="sub mini-btn" disabled={index === 0} onClick={()=>moveQuickCategory(cat, -1)}>上へ</button>
                <button className="sub mini-btn" disabled={index === quickCategoryOrder.length - 1} onClick={()=>moveQuickCategory(cat, 1)}>下へ</button>
              </div>
            </div>)}
          </div>
          <button className="sub" onClick={resetQuickCategoryOrder}>おすすめ順に戻す</button>
        </details>
        <FoodTable groups={quickGroups} onToggleFavorite={toggleFavorite} />
      </section>}

      {tab === 'foods' && <section className="panel">
        <h2>食材詳細</h2>
        <div className="controls">
          <input className="search" placeholder="食材名・カテゴリ・詳細で検索" value={query} onChange={e=>setQuery(e.target.value)} />
          <select value={condition} onChange={e=>setCondition(e.target.value)}>
            <option value="all">便利フィルターなし</option>
            <option value="favorite">よく使うだけ</option>
            <option value="bothSafe">2匹ともOK</option>
            <option value="uriSafe">ウリOK</option>
            <option value="luluSafe">ルルOK</option>
            <option value="anyNg">どちらかLv3/NG</option>
            <option value="lv2plus">Lv2以上あり</option>
          </select>
          <select value={dog} onChange={e=>setDog(e.target.value)}><option value="both">どちらか</option><option value="uri">ウリ</option><option value="lulu">ルル</option></select>
          <select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">全レベル</option><option value="safe">OK</option><option value="l1">Lv1</option><option value="l2">Lv2</option><option value="l3">Lv3</option></select>
        </div>
        <FoodCards foods={filteredFoods} onToggleFavorite={toggleFavorite} />
      </section>}

      {tab === 'memo' && <section className="panel">
        <h2>メモ</h2>
        <div className="memo-grid">
          {Object.entries(MEMO_LABELS).map(([key, label]) => <label key={key} className="memo-card"><span>{label}</span><textarea value={memos[key]} onChange={e=>setMemo(key, e.target.value)} /></label>)}
        </div>
        <div className="backup-row">
          <button onClick={exportCSV}>CSVを書き出し</button>
          <label className="file-btn">CSVを読み込み<input type="file" accept=".csv" onChange={importCSV} /></label>
        </div>
      </section>}

      {tab === 'manage' && <section className="panel">
        <h2>食材管理</h2>
        <div className="editor card">
          <h3>{editIndex === null ? '食材を追加' : '食材を編集'}</h3>
          <div className="form-grid">
            <label>食材名<input value={draft.name} onChange={e=>setDraft({...draft, name:e.target.value})} /></label>
            <label>カテゴリ<select value={draft.cat} onChange={e=>setDraft({...draft, cat:e.target.value})}>{CATS.map(c => <option key={c}>{c}</option>)}</select></label>
            <label>ウリ<select value={draft.uri} onChange={e=>setDraft({...draft, uri:e.target.value})}>{Object.entries(LV).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}</select></label>
            <label>ルル<select value={draft.lulu} onChange={e=>setDraft({...draft, lulu:e.target.value})}>{Object.entries(LV).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}</select></label>
          </div>
          <label>詳細<textarea value={draft.detail} onChange={e=>setDraft({...draft, detail:e.target.value})} /></label>
          <div className="button-row"><button onClick={saveFood}>保存</button><button className="sub" onClick={startAdd}>入力をリセット</button>{editIndex !== null && <button className="danger" onClick={()=>deleteFood(editIndex)}>この食材を削除</button>}</div>
        </div>
        {foodNotice && <div className="food-notice">{foodNotice}</div>}
        <input className="search" placeholder="管理リスト検索（食材名・分類・詳細）" value={manageQuery} onChange={e=>setManageQuery(e.target.value)} />
        <div className="manage-groups">
          {groupedManageFoods.length === 0 && <p className="empty">該当する食材が見つかりません</p>}
          {groupedManageFoods.map(group => <section className="manage-group" key={group.cat}>
            <h3>{group.cat}<span>{group.items.length}件</span></h3>
            <div className="manage-list">
              {group.items.map(([f, i]) => <div className="manage-row" key={`${f.name}-${i}`}>
                <div className="manage-name"><FavoriteButton active={f.favorite} onClick={()=>toggleFavorite(f.name)} /><b>{f.name}</b></div>
                <div className="manage-badges"><span>ウリ <Badge value={f.uri} /></span><span>ルル <Badge value={f.lulu} /></span></div>
                <button onClick={()=>startEdit(i)}>編集</button>
                <button className="danger mini" onClick={()=>deleteFood(i)}>削除</button>
              </div>)}
            </div>
          </section>)}
        </div>
      </section>}
    </main>
  </div>
}

function DogAvatar({ type }) {
  const src = type === 'uri' ? '/lulu-face.png' : '/uri-face.png'
  const alt = type === 'uri' ? 'ウリ' : 'ルル'
  return <div className={`dog-avatar ${type || ''}`} aria-hidden="true">
    <img src={src} alt={alt} />
  </div>
}
function DogMeal({ title, type, foodAmt, rice, hot, items = [] }) {
  return <div className={`meal-card ${type || ''}`}>
    <div className="dog-title">
      <DogAvatar type={type} />
      <div>
        <h3>{title}</h3>
        <small>{type === 'uri' ? 'ダックス' : 'コーギー'}</small>
      </div>
    </div>
    <div className="meal-line"><span>フード</span><b>{foodAmt}</b></div>
    <div className="meal-line"><span>白米</span><b>{rice}</b></div>
    <div className="meal-line"><span>共通おかず</span><b>{hot}</b></div>
    {items.map((item, i) => <div className="meal-line" key={i}><span>{item.name}</span><b>{item.note}</b></div>)}
  </div>
}
function TagList({ items = [], tone = '' }) {
  return <div className="tags">{items.map((item, i) => <span key={i} className={`tag ${tone}`}>{item}</span>)}</div>
}
function FoodTable({ groups, onToggleFavorite }) {
  return <div>{groups.map(group => <div className="table-block" key={group.cat}><h3>{categoryLabel(group.cat)}</h3><table><thead><tr><th>食材</th><th>ウリ</th><th>ルル</th></tr></thead><tbody>{group.items.map(f => <tr key={f.name}><td><div className="food-name-line"><FavoriteButton active={f.favorite} onClick={()=>onToggleFavorite?.(f.name)} />{f.name}</div></td><td><Badge value={f.uri} /></td><td><Badge value={f.lulu} /></td></tr>)}</tbody></table></div>)}</div>
}
function FoodCards({ foods, onToggleFavorite }) {
  if (!foods.length) return <p className="empty">該当する食材が見つかりません</p>
  return <div className="food-grid">{foods.map(f => <article className="food-card" key={f.name}><div className="food-card-head"><div><h3>{f.name}</h3><span>{f.cat}</span></div><FavoriteButton active={f.favorite} onClick={()=>onToggleFavorite?.(f.name)} /></div><div className="badges"><span>ウリ <Badge value={f.uri} /></span><span>ルル <Badge value={f.lulu} /></span></div><p>{f.detail}</p></article>)}</div>
}
