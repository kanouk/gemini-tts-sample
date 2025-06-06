import React, { useState, useCallback, useEffect } from 'react';
// lucide-reactのアイコンをインポートします。環境で利用できない場合、一部はSVGで代替されます。
import { Play, Download, Loader2, Volume2, Users, Settings, MessageSquare, Code, Copy, Check } from 'lucide-react';

// lucide-reactのアイコンが利用できない場合のフォールバックとしてSVGコンポーネントを定義
// もしlucide-reactが完全に利用できない場合、これらのSVGが使用されます。
// 簡単なアイコンのみSVGで定義し、他はlucide-reactに依存します。
const PlayIcon = ({ className }) => Play ? <Play className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const DownloadIcon = ({ className }) => Download ? <Download className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>;
const Loader2Icon = ({ className }) => Loader2 ? <Loader2 className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>;
const Volume2Icon = ({ className }) => Volume2 ? <Volume2 className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const UsersIcon = ({ className }) => Users ? <Users className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const SettingsIcon = ({ className }) => Settings ? <Settings className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const MessageSquareIcon = ({ className }) => MessageSquare ? <MessageSquare className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const CodeIcon = ({ className }) => Code ? <Code className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>;
const CopyIcon = ({ className }) => Copy ? <Copy className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const CheckIcon = ({ className }) => Check ? <Check className={className} /> : <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;


// メインのアプリケーションコンポーネント
const App = () => {
  // --- ステート管理 ---
  // 基本設定
  const [apiKey, setApiKey] = useState(''); // Gemini APIキー
  const [speaker1Name, setSpeaker1Name] = useState('アリス'); // 話者1の名前
  const [speaker2Name, setSpeaker2Name] = useState('ボブ');   // 話者2の名前
  const [speaker1Voice, setSpeaker1Voice] = useState('Kore'); // 話者1の音声タイプ (UI用、APIリクエストには直接使用しない可能性)
  const [speaker2Voice, setSpeaker2Voice] = useState('Puck'); // 話者2の音声タイプ (UI用、APIリクエストには直接使用しない可能性)
  const [speaker1Styles, setSpeaker1Styles] = useState([]);   // 話者1の話し方スタイル
  const [speaker2Styles, setSpeaker2Styles] = useState([]);   // 話者2の話し方スタイル

  // 会話入力関連
  const [conversation, setConversation] = useState(''); // フリーフォーム入力時の会話テキスト
  const [conversationMode, setConversationMode] = useState('freeform'); // 'freeform' または 'structured'
  const [structuredConversation, setStructuredConversation] = useState([]); // 構造化入力時の会話データ

  // 生成関連
  const [isGenerating, setIsGenerating] = useState(false); // 音声生成中フラグ
  const [audioUrl, setAudioUrl] = useState('');           // 生成された音声のURL
  const [error, setError] = useState('');                 // エラーメッセージ
  const [rawStructure, setRawStructure] = useState('');   // APIリクエスト用のRaw Structure
  const [showRawStructure, setShowRawStructure] = useState(false); // Raw Structure表示フラグ
  const [copied, setCopied] = useState(false);            // Raw Structureコピー済みフラグ

  // ドラッグ&ドロップ関連 (構造化入力用)
  const [draggedItem, setDraggedItem] = useState(null);   // ドラッグ中のアイテムのインデックス
  const [dragOverIndex, setDragOverIndex] = useState(null); // ドラッグオーバー中のアイテムのインデックス

  // --- 定数データ ---
  // 音声タイプリスト (男女識別と説明付き)
  const voices = [
    { value: 'Zephyr', label: '👩 Zephyr - 明るい・快活な声' }, { value: 'Puck', label: '👨 Puck - 元気・陽気な声' },
    { value: 'Charon', label: '👨 Charon - 情報的・説明的な声' }, { value: 'Kore', label: '👩 Kore - しっかりした・力強い声' },
    { value: 'Fenrir', label: '👨 Fenrir - 興奮気味・エネルギッシュな声' }, { value: 'Leda', label: '👩 Leda - 若々しい・フレッシュな声' },
    { value: 'Orus', label: '👨 Orus - 断固とした・確信に満ちた声' }, { value: 'Aoede', label: '👩 Aoede - 爽やか・風通しの良い声' },
    { value: 'Callirhoe', label: '👩 Callirhoe - のんびりした・穏やかな声' }, { value: 'Autonoe', label: '👩 Autonoe - 明るい・光沢のある声' },
    { value: 'Enceladus', label: '👨 Enceladus - 息遣いが聞こえる・セクシーな声' }, { value: 'Iapetus', label: '👨 Iapetus - クリア・透明感のある声' },
    { value: 'Umbriel', label: '👩 Umbriel - リラックスした・気さくな声' }, { value: 'Algieba', label: '👩 Algieba - なめらか・スムーズな声' },
    { value: 'Despina', label: '👩 Despina - 滑らか・洗練された声' }, { value: 'Erinome', label: '👩 Erinome - はっきりした・明瞭な声' },
    { value: 'Algenib', label: '👨 Algenib - ざらついた・ハスキーな声' }, { value: 'Rasalgethi', label: '👨 Rasalgethi - 教育的・知識豊富な声' },
    { value: 'Laomedeia', label: '👩 Laomedeia - 楽観的・前向きな声' }, { value: 'Achernar', label: '👩 Achernar - ソフト・優しい声' },
    { value: 'Alnilam', label: '👨 Alnilam - 固い・頼りがいのある声' }, { value: 'Schedar', label: '👩 Schedar - 均等・バランスの取れた声' },
    { value: 'Gacrux', label: '👨 Gacrux - 成熟した・大人っぽい声' }, { value: 'Pulcherrima', label: '👩 Pulcherrima - 積極的・アグレッシブな声' },
    { value: 'Achird', label: '👨 Achird - フレンドリー・親しみやすい声' }, { value: 'Zubenelgenubi', label: '👨 Zubenelgenubi - カジュアル・気軽な声' },
    { value: 'Vindemiatrix', label: '👩 Vindemiatrix - 優しい・穏やかな声' }, { value: 'Sadachbia', label: '👩 Sadachbia - 活発・生き生きとした声' },
    { value: 'Sadaltager', label: '👨 Sadaltager - 博識・知的な声' }, { value: 'Sulafar', label: '👨 Sulafar - 温かい・親しみやすい声' }
  ];

  // 話し方スタイルリスト (日本語名、英語名、絵文字付き)
  const speakingStyles = [
    { jp: '興奮した', en: 'excited', emoji: '🤩' }, { jp: '落ち着いた', en: 'calm', emoji: '😌' },
    { jp: '幸せな', en: 'happy', emoji: '😊' }, { jp: '悲しい', en: 'sad', emoji: '😢' },
    { jp: '怒った', en: 'angry', emoji: '😡' }, { jp: 'ささやく', en: 'whisper', emoji: '🤫' },
    { jp: '大声で', en: 'loud', emoji: '📢' }, { jp: '元気な', en: 'energetic', emoji: '💪' },
    { jp: '疲れた', en: 'tired', emoji: '😴' }, { jp: '退屈な', en: 'bored', emoji: '😑' },
    { jp: '真剣な', en: 'serious', emoji: '🧐' }, { jp: '面白い', en: 'funny', emoji: '🤣' },
    { jp: '優しい', en: 'gentle', emoji: '🥺' }, { jp: '厳しい', en: 'stern', emoji: '😤' },
    { jp: '神秘的な', en: 'mysterious', emoji: '🎭' }, { jp: '恐ろしい', en: 'spooky', emoji: '👻' },
    { jp: '自信のある', en: 'confident', emoji: '😎' }, { jp: '恥ずかしい', en: 'shy', emoji: '😳' },
    { jp: '思慮深い', en: 'thoughtful', emoji: '🤔' }, { jp: '情熱的な', en: 'passionate', emoji: '🔥' },
    { jp: 'ロマンチック', en: 'romantic', emoji: '💕' }, { jp: '皮肉っぽい', en: 'sarcastic', emoji: '🙄' },
    { jp: '驚いた', en: 'surprised', emoji: '😲' }, { jp: '混乱した', en: 'confused', emoji: '😵' },
    { jp: '感動した', en: 'emotional', emoji: '🥹' }
  ];

  // --- コールバック関数 ---
  // 話者名変更時に構造化会話内の話者名も更新
  const updateSpeakerName = useCallback((oldName, newName) => {
    if (oldName !== newName && structuredConversation.length > 0) {
      setStructuredConversation(prev =>
        prev.map(item =>
          item.speaker === oldName
            ? { ...item, speaker: newName }
            : item
        )
      );
    }
  }, [structuredConversation.length]); // 依存配列は length で十分

  // 話者1の名前変更ハンドラ
  const handleSpeaker1NameChange = useCallback((newName) => {
    const oldName = speaker1Name;
    setSpeaker1Name(newName);
    updateSpeakerName(oldName, newName);
  }, [speaker1Name, updateSpeakerName]);

  // 話者2の名前変更ハンドラ
  const handleSpeaker2NameChange = useCallback((newName) => {
    const oldName = speaker2Name;
    setSpeaker2Name(newName);
    updateSpeakerName(oldName, newName);
  }, [speaker2Name, updateSpeakerName]);

  // 話し方スタイル追加
  const addStyle = useCallback((speaker, style) => {
    const setStyles = speaker === 1 ? setSpeaker1Styles : setSpeaker2Styles;
    setStyles(prev => {
      const exists = prev.some(s => s.en === style.en);
      return exists ? prev : [...prev, style];
    });
  }, []);

  // 話し方スタイル削除
  const removeStyle = useCallback((speaker, styleToRemove) => {
    const setStyles = speaker === 1 ? setSpeaker1Styles : setSpeaker2Styles;
    setStyles(prev => prev.filter(s => s.en !== styleToRemove.en));
  }, []);

  // 構造化会話にセリフ追加
  const addDialogue = useCallback((speaker, text) => {
    if (text && text.trim()) {
      setStructuredConversation(prev => [...prev, {
        speaker,
        text: text.trim(),
        id: Date.now() + Math.random() // クライアントサイドでの簡易ユニークID
      }]);
    }
  }, []);

  // 構造化会話からセリフ削除
  const removeDialogue = useCallback((id) => {
    setStructuredConversation(prev => prev.filter(item => item.id !== id));
  }, []);

  // 構造化会話のセリフ順序変更
  const moveDialogue = useCallback((index, direction) => {
    setStructuredConversation(prev => {
      const newArray = [...prev];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex >= 0 && newIndex < newArray.length) {
        [newArray[index], newArray[newIndex]] = [newArray[newIndex], newArray[index]];
      }
      return newArray;
    });
  }, []);

  // ドラッグ開始
  const handleDragStart = useCallback((e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // ドラッグオーバー
  const handleDragOver = useCallback((e, index) => {
    e.preventDefault(); // ドロップを許可するために必要
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  }, []);
  
  // ドラッグリーブ (要素の子要素への移動でも発生するため、関連ターゲットを確認)
  const handleDragLeave = useCallback((e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
        setDragOverIndex(null);
    }
  }, []);

  // ドロップ処理
  const handleDrop = useCallback((e, dropIndex) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== dropIndex) {
      setStructuredConversation(prev => {
        const newArray = [...prev];
        const [draggedElement] = newArray.splice(draggedItem, 1);
        newArray.splice(dropIndex, 0, draggedElement);
        return newArray;
      });
    }
    setDraggedItem(null);
    setDragOverIndex(null);
  }, [draggedItem]);

  // ドラッグ終了
  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverIndex(null);
  }, []);

  // APIに送る会話テキストを取得
  const getConversationText = useCallback(() => {
    if (conversationMode === 'freeform') {
      return conversation.trim();
    } else {
      return structuredConversation
        .map(item => `${item.speaker}: ${item.text}`) // 構造化データからテキストを生成
        .join('\n');
    }
  }, [conversationMode, conversation, structuredConversation]);

  // Raw Structure (APIリクエスト形式) を生成
  const generateRawStructure = useCallback(() => {
    const conversationText = getConversationText();
    if (!conversationText) {
      setError('会話内容を入力してください。');
      return;
    }
    // スタイル指示を含むプロンプトを構築
    // 「Make [話者名] sound [スタイル] with voice [音声名]」のように音声名もプロンプトに含めることを検討
    let prompt = `TTS the following conversation. Make ${speaker1Name} use voice ${speaker1Voice}. Make ${speaker2Name} use voice ${speaker2Voice}.\n`;

    const speaker1StyleText = speaker1Styles.map(s => s.en).join(' and ');
    const speaker2StyleText = speaker2Styles.map(s => s.en).join(' and ');

    if (speaker1StyleText || speaker2StyleText) {
      const styleInstructions = [];
      if (speaker1StyleText) styleInstructions.push(`Make ${speaker1Name} also sound ${speaker1StyleText}`);
      if (speaker2StyleText) styleInstructions.push(`Make ${speaker2Name} also sound ${speaker2StyleText}`);
      prompt += `Additional style instructions: ${styleInstructions.join(', ')}\n\n`;
    } else {
      prompt += "\n"; // スタイル指示がない場合は改行を追加
    }

    prompt += conversationText;
    setRawStructure(prompt);
    setShowRawStructure(true);
    setError('');
  }, [getConversationText, speaker1Name, speaker2Name, speaker1Styles, speaker2Styles, speaker1Voice, speaker2Voice]);

  // Raw Structureをクリップボードにコピー (iframe互換性のため execCommand を使用)
  const copyRawStructure = useCallback(async () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = rawStructure;
      textArea.style.position = "fixed"; // 画面外に配置
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy'); // navigator.clipboard.writeTextの代替
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('クリップボードへのコピーに失敗:', err);
      setError('クリップボードへのコピーに失敗しました。手動でコピーしてください。');
    }
  }, [rawStructure]);

  // 音声生成処理
  const generateAudio = async () => {
    if (!apiKey.trim()) {
      setError('APIキーを入力してください。');
      return;
    }
    const conversationText = getConversationText(); // 元の会話テキストを取得
    if (!conversationText) {
      setError('会話内容を入力してください。');
      return;
    }

    setIsGenerating(true);
    setError('');
    if (audioUrl) { // 前回のaudio URLを無効化
        URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl('');

    try {
      // プロンプトに音声名とスタイル指示を明示的に含める
      // 例: "TTS the following conversation. Make Alice use voice Kore and sound excited. Make Bob use voice Puck and sound calm."
      let textPrompt = `TTS the following conversation.`;
      
      const s1BasePrompt = `Make ${speaker1Name} use voice ${speaker1Voice}`;
      const s1StylePrompt = speaker1Styles.length > 0 ? `and sound ${speaker1Styles.map(s => s.en).join(' and ')}` : '';
      textPrompt += ` ${s1BasePrompt} ${s1StylePrompt}.`;

      const s2BasePrompt = `Make ${speaker2Name} use voice ${speaker2Voice}`;
      const s2StylePrompt = speaker2Styles.length > 0 ? `and sound ${speaker2Styles.map(s => s.en).join(' and ')}` : '';
      textPrompt += ` ${s2BasePrompt} ${s2StylePrompt}.`;
      
      textPrompt += `\n\n${conversationText}`; // 実際の会話内容を追加

      // APIリクエストボディの構築 (大幅に簡略化)
      const requestBody = {
        contents: [{ parts: [{ text: textPrompt }] }], // 修正されたプロンプトを使用
        generationConfig: { 
          responseModalities: ['AUDIO'],
        }
      };
      
      console.log('Request body:', JSON.stringify(requestBody, null, 2)); // デバッグ用ログ

      // API呼び出し
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status); // デバッグ用ログ

      if (!response.ok) { // エラーハンドリング
        const errorText = await response.text();
        console.error('Error response:', errorText);
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // レスポンスから音声データを取得
      if (data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
        const audioData = data.candidates[0].content.parts[0].inlineData.data;
        // Base64データをBlobに変換
        const binaryString = atob(audioData);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        console.error('予期しないレスポンス構造:', data);
        let detailedError = '音声データが正常に生成されませんでした。';
        if (data.candidates?.[0]?.finishReason && data.candidates[0].finishReason !== 'STOP') {
            detailedError += ` 終了理由: ${data.candidates[0].finishReason}.`;
        }
        if (data.promptFeedback?.blockReason) {
            detailedError += ` プロンプトフィードバック: ${data.promptFeedback.blockReason}.`;
             if(data.promptFeedback.blockReason === "SAFETY" && data.promptFeedback.safetyRatings) {
                detailedError += " 安全性評価: " + data.promptFeedback.safetyRatings.map(r => `${r.category}: ${r.probability}`).join(', ');
            }
        }
        throw new Error(detailedError);
      }
    } catch (err) {
      console.error('音声生成中のエラー:', err);
      setError(`エラー: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // 音声ファイルダウンロード
  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'conversation.wav'; // ダウンロードファイル名
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  
  // サンプル会話 (話者名変更に追従)
  const [currentExampleConversation, setCurrentExampleConversation] = useState('');
  useEffect(() => {
    setCurrentExampleConversation(
      `${speaker1Name}: こんにちは！今日は本当に素晴らしい天気ですね。\n` +
      `${speaker2Name}: 本当ですね！こんな日は外に出かけたくなります。何か予定はありますか？\n` +
      `${speaker1Name}: それが、特に何も決めていなくて。もしよかったら、どこか一緒に出かけませんか？\n` +
      `${speaker2Name}: いいですね！どこか行きたい場所はありますか？最近、駅の近くに新しい公園ができたって聞きましたよ。\n` +
      `${speaker1Name}: ああ、その公園、私も気になっていました！広くて、散歩道も整備されているらしいですね。\n` +
      `${speaker2Name}: はい、それにピクニックができる芝生エリアもあるみたいです。お弁当でも持って行きますか？\n` +
      `${speaker1Name}: 素晴らしいアイデアです！私、サンドイッチを作るのが得意なんですよ。\n` +
      `${speaker2Name}: それは楽しみです！私は飲み物とデザートを担当しますね。フルーツポンチなんてどうでしょう？\n` +
      `${speaker1Name}: 最高です！じゃあ、明日の11時頃に駅で待ち合わせでどうでしょうか？\n` +
      `${speaker2Name}: 了解です。明日は晴れるといいですね。\n` +
      `${speaker1Name}: 天気予報では晴れ時々曇りでしたから、きっと大丈夫ですよ。\n` +
      `${speaker2Name}: よかったです。そういえば、公園の近くに美味しいと評判のパン屋さんもあるみたいですよ。帰りに寄ってみませんか？\n` +
      `${speaker1Name}: それもいいですね！焼きたてのパン、大好きです。明日の楽しみが増えました。\n` +
      `${speaker2Name}: ええ、本当に。準備も楽しみながらやりましょう。\n` +
      `${speaker1Name}: はい！では、また明日。気をつけて。\n` +
      `${speaker2Name}: あなたも。また明日！`
    );
  }, [speaker1Name, speaker2Name]);


  // --- 子コンポーネント ---
  // 構造化会話入力コンポーネント
  const StructuredConversationInput = () => {
    const [currentSpeaker, setCurrentSpeaker] = useState(speaker1Name); // 現在選択中の話者
    const [currentText, setCurrentText] = useState(''); // 現在入力中のテキスト

    const handleAdd = useCallback(() => { // セリフ追加処理
      if (currentText.trim()) {
        addDialogue(currentSpeaker, currentText);
        setCurrentText(''); // 入力欄クリア
      }
    }, [currentSpeaker, currentText, addDialogue]);

    const handleKeyPress = useCallback((e) => { // Enterキーで追加
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleAdd();
      }
    }, [handleAdd]);
    
    // 話者名が変更された場合、セリフ追加フォームの選択中話者も更新する
    useEffect(() => {
        const oldSpeaker1Name = structuredConversation.find(item => item.speaker !== speaker2Name && item.speaker !== speaker1Name)?.speaker || speaker1Name;
        if (currentSpeaker === oldSpeaker1Name && currentSpeaker !== speaker1Name) {
            setCurrentSpeaker(speaker1Name);
        }
    }, [speaker1Name, structuredConversation, speaker2Name, currentSpeaker]);

    useEffect(() => {
        const oldSpeaker2Name = structuredConversation.find(item => item.speaker !== speaker1Name && item.speaker !== speaker2Name)?.speaker || speaker2Name;
        if (currentSpeaker === oldSpeaker2Name && currentSpeaker !== speaker2Name) {
            setCurrentSpeaker(speaker2Name);
        }
    }, [speaker2Name, structuredConversation, speaker1Name, currentSpeaker]);


    return (
      <div className="space-y-4">
        {/* 会話追加フォーム */}
        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 shadow">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <select
              value={currentSpeaker}
              onChange={(e) => setCurrentSpeaker(e.target.value)}
              className="px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white w-full sm:w-auto shadow-sm"
              aria-label="話者選択"
            >
              <option value={speaker1Name}>👤 {speaker1Name}</option>
              <option value={speaker2Name}>👤 {speaker2Name}</option>
            </select>
            <input
              type="text"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="台詞を入力してください..."
              className="flex-1 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
              aria-label="台詞入力"
            />
            <button
              type="button"
              onClick={handleAdd}
              disabled={!currentText.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg disabled:shadow-sm"
            >
              追加
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Enterキーで追加、Shift+Enterで改行。ドラッグ＆ドロップで並び替え可能。</p>
        </div>

        {/* 会話リスト */}
        <div className="space-y-2 max-h-96 overflow-y-auto p-1 rounded-md bg-gray-50 dark:bg-slate-700/30 shadow-inner">
          {structuredConversation.length === 0 ? (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500">
              <MessageSquareIcon className="h-12 w-12 mx-auto mb-3 opacity-60" />
              <p>上のフォームから会話を追加してください</p>
            </div>
          ) : (
            structuredConversation.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center gap-3 p-3.5 rounded-lg border transition-all duration-200 cursor-move group ${
                  draggedItem === index
                    ? 'opacity-50 scale-95 shadow-lg ring-2 ring-blue-500 dark:ring-blue-400'
                    : dragOverIndex === index
                    ? 'scale-[1.02] shadow-xl ring-2 ring-blue-300 dark:ring-blue-500 bg-opacity-80'
                    : 'shadow-sm hover:shadow-md'
                } ${
                  item.speaker === speaker1Name
                    ? 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700/60 hover:bg-blue-100 dark:hover:bg-blue-800/50'
                    : 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-700/60 hover:bg-green-100 dark:hover:bg-green-800/50'
                }`}
                title={`${item.speaker}の台詞: ${item.text} (ドラッグして並び替え)`}
              >
                {/* ドラッグハンドル */}
                <div className="flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 cursor-grab active:cursor-grabbing" title="ドラッグして並び替え">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </div>
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    item.speaker === speaker1Name
                      ? 'bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100'
                      : 'bg-green-100 dark:bg-green-600 text-green-800 dark:text-green-100'
                  }`}>
                    👤 {item.speaker}
                  </span>
                </div>
                <div className="flex-1 text-sm text-gray-700 dark:text-gray-200 break-words whitespace-pre-wrap min-w-0">{item.text}</div>
                <div className="flex items-center gap-0.5 ml-auto">
                  <button type="button" onClick={() => moveDialogue(index, 'up')} disabled={index === 0} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600" title="上に移動">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/></svg>
                  </button>
                  <button type="button" onClick={() => moveDialogue(index, 'down')} disabled={index === structuredConversation.length - 1} className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30 rounded-md hover:bg-gray-200 dark:hover:bg-slate-600" title="下に移動">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/></svg>
                  </button>
                  <button type="button" onClick={() => removeDialogue(item.id)} className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 disabled:opacity-30 rounded-md hover:bg-red-100 dark:hover:bg-red-900/60" title="削除">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 会話プレビュー */}
        {structuredConversation.length > 0 && (
          <div className="mt-4">
            <details className="bg-gray-50 dark:bg-slate-700/50 rounded-lg shadow">
              <summary className="p-3 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600 rounded-t-lg select-none">
                会話プレビュー ({structuredConversation.length}行)
              </summary>
              <div className="p-3 pt-0 border-t border-gray-200 dark:border-slate-600">
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono bg-white dark:bg-slate-800 p-3 rounded-b-lg border border-gray-200 dark:border-slate-600 max-h-48 overflow-y-auto">
                  {structuredConversation.map(item => `${item.speaker}: ${item.text}`).join('\n')}
                </pre>
              </div>
            </details>
          </div>
        )}
      </div>
    );
  };

  // スタイルセレクターコンポーネント
  const StyleSelector = ({ speaker, styles, color }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2.5">話し方の指示</label>
      {/* 選択されたスタイル */}
      <div className="mb-3.5">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 flex items-center gap-1">
          <span className="font-medium">選択中:</span>
          {styles.length === 0 && <span className="text-gray-400 dark:text-gray-500 italic">なし</span>}
        </div>
        <div className={`flex flex-wrap gap-2 min-h-[3rem] p-2.5 rounded-md border-2 border-dashed border-${color}-300 dark:border-${color}-600/70 bg-${color}-50 dark:bg-${color}-900/20 shadow-inner`}>
          {styles.map((style) => (
            <button
              key={`selected-${speaker}-${style.en}`}
              type="button"
              onClick={() => removeStyle(speaker, style)}
              className={`inline-flex items-center gap-1.5 bg-${color}-500 hover:bg-${color}-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-400`}
              title={`「${style.jp}」スタイルを削除`}
            >
              <span>{style.emoji}</span>
              <span>{style.jp}</span>
              <span className={`text-${color}-200 hover:text-white font-bold text-xs`}>×</span>
            </button>
          ))}
           {styles.length === 0 && <span className="text-xs text-gray-400 dark:text-gray-500 italic self-center px-1">下のリストからスタイルを追加してください</span>}
        </div>
      </div>

      {/* 利用可能なスタイル */}
      <div className="mb-1">
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 font-medium">追加可能:</div>
        <div className="flex flex-wrap gap-2 p-3 bg-gray-100 dark:bg-slate-700/60 rounded-lg border border-gray-200 dark:border-slate-600 max-h-44 overflow-y-auto shadow-inner">
          {speakingStyles
            .filter(style => !styles.some(s => s.en === style.en)) // 未選択のスタイルのみ表示
            .map((style) => (
              <button
                key={`available-${speaker}-${style.en}`}
                type="button"
                onClick={() => addStyle(speaker, style)}
                className={`inline-flex items-center gap-1.5 bg-white dark:bg-slate-600 hover:bg-${color}-50 dark:hover:bg-${color}-900/40 border border-gray-300 dark:border-slate-500 hover:border-${color}-400 dark:hover:border-${color}-500 text-gray-700 dark:text-gray-200 hover:text-${color}-700 dark:hover:text-${color}-200 text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md focus:outline-none focus:ring-1 focus:ring-${color}-300`}
                title={`「${style.jp}」スタイルを追加`}
              >
                <span>{style.emoji}</span>
                <span>{style.jp}</span>
              </button>
            ))}
          {speakingStyles.filter(style => !styles.some(s => s.en === style.en)).length === 0 && (
            <span className="text-gray-400 dark:text-gray-500 text-sm py-2 w-full text-center">すべてのスタイルが選択されています</span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">タグをクリックして追加/削除します。</p>
    </div>
  );

  // --- JSXレンダリング ---
  return (
    // 全体コンテナ (ダークモード対応の背景グラデーション)
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-slate-900 dark:via-indigo-950 dark:to-purple-950 p-2 sm:p-4 md:p-6 font-sans text-gray-900 dark:text-gray-100 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto"> {/* コンテンツ幅制限 */}
        {/* メインカード */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mb-6 ring-1 ring-black/5 dark:ring-white/10">
          {/* ヘッダー */}
          <header className="flex flex-col sm:flex-row items-center gap-4 mb-6 pb-5 border-b border-gray-200 dark:border-gray-700/50">
            <div className="bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl p-3.5 shadow-lg">
              <Volume2Icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">Gemini TTS 会話音声生成</h1>
              <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left mt-0.5">二人の自然な会話音声をインタラクティブに生成します</p>
            </div>
          </header>

          {/* CORSエラーに関する注意喚起 */}
          <div className="mb-7 p-4 bg-yellow-50 dark:bg-yellow-500/10 border-l-4 border-yellow-400 dark:border-yellow-500 rounded-md shadow-sm">
            <div className="flex items-start gap-3">
              <div className="text-yellow-500 dark:text-yellow-400 mt-0.5 text-2xl shrink-0">⚠️</div>
              <div>
                <h4 className="text-base font-semibold text-yellow-800 dark:text-yellow-200 mb-1">重要: CORSについて</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-1.5">
                  このアプリはブラウザから直接Google APIを呼び出します。セキュリティ制限 (CORS) により、API呼び出しが失敗することがあります。
                </p>
                <details className="text-xs text-yellow-700 dark:text-yellow-300 cursor-pointer">
                    <summary className="font-medium hover:underline focus:outline-none">詳細と解決策を見る</summary>
                    <ul className="list-disc list-inside space-y-1 mt-1.5 ml-2 marker:text-yellow-500">
                        <li>開発時: Chrome拡張機能「Allow CORS」等を一時的に使用 (自己責任でお願いします)。</li>
                        <li>または、CORSプロキシサーバー (例: `cors-anywhere`) を介してAPIを呼び出す。</li>
                        <li>本番環境: API呼び出しは必ずバックエンドサーバー経由で実装してください。</li>
                    </ul>
                </details>
              </div>
            </div>
          </div>

          {/* APIキー設定セクション */}
          <section className="mb-8 p-5 bg-gray-50 dark:bg-slate-800/60 rounded-xl shadow-inner ring-1 ring-gray-200 dark:ring-slate-700/50">
            <div className="flex items-center gap-2.5 mb-3">
              <SettingsIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <label htmlFor="apiKeyInput" className="text-base font-semibold text-gray-700 dark:text-gray-300">Gemini API Key</label>
            </div>
            <input
              id="apiKeyInput"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="ここに取得したGemini API キーを貼り付けます"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm"
              aria-required="true"
            />
            <div className="mt-3 space-y-1.5">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                APIキーは <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">Google AI Studio</a> で取得できます。
              </p>
              <p className="text-xs text-red-600 dark:text-red-400">
                <strong>注意:</strong> APIキーを入力する前に、ブラウザの開発者ツール（F12キー）でコンソールを開き、エラーメッセージを確認してください。
              </p>
            </div>
          </section>

          {/* 話者設定セクション */}
          <section className="grid md:grid-cols-2 gap-6 mb-8">
            {/* 話者1 */}
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-5 shadow-lg ring-1 ring-blue-200 dark:ring-blue-800/50">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-blue-200 dark:border-blue-700/60">
                <UsersIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200">話者1の設定</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="speaker1NameInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">名前</label>
                  <input id="speaker1NameInput" type="text" value={speaker1Name} onChange={(e) => handleSpeaker1NameChange(e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"/>
                  {structuredConversation.some(item => item.speaker === speaker1Name) && (<p className="text-xs text-blue-600 dark:text-blue-400 mt-1.5">💡 名前を変更すると、入力済みの会話も自動更新されます。</p>)}
                </div>
                <div>
                  <label htmlFor="speaker1VoiceSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">音声タイプ</label>
                  <select id="speaker1VoiceSelect" value={speaker1Voice} onChange={(e) => setSpeaker1Voice(e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm appearance-none bg-no-repeat bg-right pr-8" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`}}>
                    {voices.map((voice) => (<option key={`s1-${voice.value}`} value={voice.value}>{voice.label}</option>))}
                  </select>
                </div>
                <StyleSelector speaker={1} styles={speaker1Styles} color="blue" />
              </div>
            </div>
            {/* 話者2 */}
            <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-5 shadow-lg ring-1 ring-green-200 dark:ring-green-800/50">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-green-200 dark:border-green-700/60">
                <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">話者2の設定</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label htmlFor="speaker2NameInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">名前</label>
                  <input id="speaker2NameInput" type="text" value={speaker2Name} onChange={(e) => handleSpeaker2NameChange(e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"/>
                  {structuredConversation.some(item => item.speaker === speaker2Name) && (<p className="text-xs text-green-600 dark:text-green-400 mt-1.5">💡 名前を変更すると、入力済みの会話も自動更新されます。</p>)}
                </div>
                <div>
                  <label htmlFor="speaker2VoiceSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">音声タイプ</label>
                  <select id="speaker2VoiceSelect" value={speaker2Voice} onChange={(e) => setSpeaker2Voice(e.target.value)} className="w-full px-3.5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm appearance-none bg-no-repeat bg-right pr-8" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`}}>
                    {voices.map((voice) => (<option key={`s2-${voice.value}`} value={voice.value}>{voice.label}</option>))}
                  </select>
                </div>
                <StyleSelector speaker={2} styles={speaker2Styles} color="green" />
              </div>
            </div>
          </section>

          {/* 会話入力セクション */}
          <section className="mb-8 p-5 bg-gray-50 dark:bg-slate-800/60 rounded-xl shadow-inner ring-1 ring-gray-200 dark:ring-slate-700/50">
            <div className="flex items-center gap-2.5 mb-4">
              <MessageSquareIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">会話内容</h3>
            </div>
            {/* 入力モード選択 */}
            <div className="mb-5">
              <div className="flex gap-1 p-1 bg-gray-200 dark:bg-slate-700 rounded-lg w-full sm:w-fit shadow-sm">
                <button type="button" onClick={() => setConversationMode('freeform')} className={`w-1/2 sm:w-auto px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-200 dark:focus:ring-offset-slate-700 focus:ring-blue-400 ${conversationMode === 'freeform' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-300 shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-slate-600/50'}`}>📝 フリー入力</button>
                <button type="button" onClick={() => setConversationMode('structured')} className={`w-1/2 sm:w-auto px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-200 dark:focus:ring-offset-slate-700 focus:ring-blue-400 ${conversationMode === 'structured' ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-300 shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-slate-600/50'}`}>🏗️ 構造化入力</button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5">{conversationMode === 'freeform' ? 'テキストエリアに自由形式で会話を入力 (例: 「アリス: こんにちは」)' : '話者を選択して台詞を一つずつ追加・編集します。'}</p>
            </div>
            {/* フリーフォーム入力 */}
            {conversationMode === 'freeform' && (
              <div>
                <textarea value={conversation} onChange={(e) => setConversation(e.target.value)} placeholder={currentExampleConversation} rows={8} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white dark:bg-slate-700 text-gray-900 dark:text-white min-h-[160px] shadow-sm" aria-label="フリーフォーム会話入力"/>
                <div className="flex justify-between items-center mt-2.5">
                  <p className="text-xs text-gray-500 dark:text-gray-400">形式: 「{speaker1Name}: セリフ」「{speaker2Name}: セリフ」で入力。</p>
                  <button type="button" onClick={() => setConversation(currentExampleConversation)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline focus:outline-none">サンプル会話を挿入</button>
                </div>
              </div>
            )}
            {/* 構造化入力 */}
            {conversationMode === 'structured' && <StructuredConversationInput />}
          </section>

          {/* エラー表示 */}
          {error && (
            <div className="mb-7 p-4 bg-red-100 dark:bg-red-500/20 border-l-4 border-red-500 dark:border-red-600 rounded-md shadow-md" role="alert">
              <div className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-xl font-bold shrink-0">！</span>
                <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 pt-6 border-t border-gray-200 dark:border-gray-700/50">
            <button onClick={generateRawStructure} className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3.5 px-7 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400">
              <CodeIcon className="h-5 w-5" />Raw Structure生成
            </button>
            <button onClick={generateAudio} disabled={isGenerating || !apiKey.trim()} className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white font-semibold py-3.5 px-7 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:shadow-md disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
              {isGenerating ? (<Loader2Icon className="h-5 w-5 animate-spin" />) : (<Volume2Icon className="h-5 w-5" />)}
              {isGenerating ? '音声生成中...' : '会話音声を生成'}
            </button>
          </div>

          {/* Raw Structure表示 */}
          {showRawStructure && rawStructure && (
            <section className="mb-7 bg-gray-100 dark:bg-slate-800/70 rounded-xl p-5 sm:p-6 shadow-inner ring-1 ring-gray-200 dark:ring-slate-700/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 rounded-full p-3 shadow-md"><CodeIcon className="h-5 w-5 text-white" /></div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Raw Structure (APIリクエスト用)</h3>
                </div>
                <button onClick={copyRawStructure} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white text-sm px-4 py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400">
                  {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  {copied ? 'コピーしました！' : 'クリップボードにコピー'}
                </button>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-300 dark:border-gray-700 p-4 shadow">
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono overflow-x-auto max-h-72">{rawStructure}</pre>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">このテキストをGoogle AI Studioの「Generate speech」タブ内の「Raw structure」に貼り付けてテストできます。</p>
            </section>
          )}

          {/* 音声プレイヤー */}
          {audioUrl && (
            <section className="bg-green-100 dark:bg-green-600/20 rounded-xl p-5 sm:p-6 shadow-xl ring-1 ring-green-200 dark:ring-green-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 rounded-full p-3 shadow-md"><PlayIcon className="h-5 w-5 text-white" /></div>
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">生成された音声</h3>
              </div>
              <audio controls src={audioUrl} className="w-full mb-4 rounded-lg shadow-md focus:outline-none" preload="metadata">お使いのブラウザは音声再生に対応していません。</audio>
              <button onClick={downloadAudio} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400">
                <DownloadIcon className="h-5 w-5" />WAVファイルをダウンロード
              </button>
            </section>
          )}
        </div>

        {/* フッター */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-xs py-6">
          <p>Powered by Gemini 2.5 Flash TTS API. 対応言語: 24言語 | 最大2名の話者対応</p>
          <p className="mt-1">これはデモアプリケーションです。APIキーの使用と関連費用は利用者の責任となります。</p>
        </footer>
      </div>
    </div>
  );
};

export default App; // Appコンポーネントをデフォルトエクスポート
