export type Language = 'en' | 'fa';

export interface Translations {
  // Common
  partyGames: string;
  developedBy: string;
  next: string;
  back: string;
  play: string;
  playGame: string;
  finish: string;
  yes: string;
  no: string;
  start: string;
  restart: string;
  
  // Header
  languageToggle: string;
  
  // Home Page
  welcomeTitle: string;
  welcomeSubtitle: string;
  noGamesAvailable: string;
  
  // Settings Page
  gameInformation: string;
  players: string;
  gameSettings: string;
  numberOfRounds: string;
  numberOfAgents: string;
  addPlayer: string;
  player: string;
  undrestood: string;
  
  // AGENT-X Game
  agentX: string;
  round: string;
  of: string;
  reveal: string;
  nextPlayer: string;
  finishRound: string;
  didAgentsWin: string;
  gameFinished: string;
  finalScores: string;
  points: string;
  youAreAgentX: string;
  lieAboutAnswer: string;
  question: string;
  answerTruthfully: string;
  playAgain: string;
  roundComplete: string;
  
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    partyGames: 'Party Games',
    developedBy: 'Developed by RamtinA',
    next: 'Next',
    back: 'Back',
    play: 'Play',
    playGame: 'Play Game',
    finish: 'Finish',
    yes: 'Yes',
    no: 'No',
    start: 'Start',
    restart: 'Restart',
    
    // Header
    languageToggle: 'فا',
    
    // Home Page
    welcomeTitle: 'Welcome to Party Games',
    welcomeSubtitle: 'Choose a game to start playing with your friends!',
    noGamesAvailable: 'No games available at the moment.',
    
    // Settings Page
    gameInformation: 'Game Information',
    players: 'Add Players',
    gameSettings: 'Game Settings',
    numberOfRounds: 'Number of Rounds',
    numberOfAgents: 'Number of Agents',
    addPlayer: '+ Add Player',
    player: 'player',
    undrestood: 'Understood',
    
    // AGENT-X Game
    agentX: 'AGENT-X',
    round: 'Round',
    of: 'of',
    reveal: 'Reveal',
    nextPlayer: 'Next Player',
    finishRound: 'Finish Round',
    didAgentsWin: 'Did the agents win?',
    gameFinished: 'Game Finished!',
    finalScores: 'Final Scores',
    points: 'points',
    youAreAgentX: 'YOU ARE AGENT-X!',
    lieAboutAnswer: 'Lie about your answer to blend in!',
    question: 'Question:',
    answerTruthfully: 'Answer truthfully!',
    playAgain: 'Play Again',
    roundComplete: 'Round Complete',
    
    // Game Description
  },
  
  fa: {
    // Common
    partyGames: 'Party Games',
    developedBy: 'Developed by RamtinA',
    next: 'بعدی',
    back: 'قبلی',
    play: 'بازی',
    playGame: 'شروع بازی',
    finish: 'پایان',
    yes: 'بله',
    no: 'خیر',
    start: 'شروع',
    restart: 'شروع مجدد',
    
    // Header
    languageToggle: 'EN',
    
    // Home Page
    welcomeTitle: 'خوش آمدید',
    welcomeSubtitle: 'یک بازی انتخاب کنید تا با دوستانتان شروع به بازی کنید',
    noGamesAvailable: 'در حال حاضر هیچ بازی‌ای موجود نیست.',
    
    // Settings Page
    gameInformation: 'اطلاعات بازی',
    players: 'افزودن بازیکنان',
    gameSettings: 'تنظیمات بازی',
    numberOfRounds: 'تعداد دورها',
    numberOfAgents: 'تعداد جاسوسان',
    addPlayer: '+ افزودن بازیکن',
    player: 'بازیکن',
    undrestood: 'فهمیدم',
    // AGENT-X Game
    agentX: 'جاسوس-ایکس',
    round: 'دور',
    of: 'از',
    reveal: 'نمایش',
    nextPlayer: 'بازیکن بعدی',
    finishRound: 'پایان دور',
    didAgentsWin: 'آیا جاسوسان برنده شدند؟',
    gameFinished: 'بازی تمام شد!',
    finalScores: 'امتیازات نهایی',
    points: 'امتیاز',
    youAreAgentX: 'شما جاسوس-ایکس هستید!',
    lieAboutAnswer: 'سعی کنید جوابی بدهید که لو نروید',
    question: 'سوال:',
    answerTruthfully: 'صادقانه پاسخ دهید!',
    playAgain: 'بازی مجدد',
    roundComplete: 'دور تمام شد',
    
    // Game Description
    //agentXDescription: 'بازی هیجان‌انگیزی که در آن بازیکنان باید جاسوسان مخفی را شناسایی کنند. در هر دور، بازیکنان به سوالات پاسخ می‌دهند، اما جاسوسان باید دروغ بگویند در حالی که دیگران راست می‌گویند. آیا می‌توانید جاسوسان را قبل از اینکه دیر شود شناسایی کنید؟',
  },
};

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key];
}

export function useTranslations(language: Language) {
  return translations[language];
}
