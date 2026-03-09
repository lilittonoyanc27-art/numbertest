import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Hash
} from 'lucide-react';

// --- Types ---

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: number;
  questionArm: string;
  image: string;
  options: QuizOption[];
  correctOptionId: string;
}

// --- Data ---

const NUMBERS_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Մեկ» թիվը:",
    image: "https://picsum.photos/seed/number_one_1/600/400",
    options: [
      { id: 'a', text: "Dos" },
      { id: 'b', text: "Uno" },
      { id: 'c', text: "Tres" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 2,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Հինգ» թիվը:",
    image: "https://picsum.photos/seed/number_five_5/600/400",
    options: [
      { id: 'a', text: "Cuatro" },
      { id: 'b', text: "Cinco" },
      { id: 'c', text: "Seis" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 3,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Տաս» թիվը:",
    image: "https://picsum.photos/seed/number_ten_10/600/400",
    options: [
      { id: 'a', text: "Nueve" },
      { id: 'b', text: "Diez" },
      { id: 'c', text: "Once" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 4,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Տասնհինգ» թիվը:",
    image: "https://picsum.photos/seed/number_fifteen_15/600/400",
    options: [
      { id: 'a', text: "Catorce" },
      { id: 'b', text: "Quince" },
      { id: 'c', text: "Dieciséis" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 5,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Քսան» թիվը:",
    image: "https://picsum.photos/seed/number_twenty_20/600/400",
    options: [
      { id: 'a', text: "Veinte" },
      { id: 'b', text: "Treinta" },
      { id: 'c', text: "Dieզ" }
    ],
    correctOptionId: 'a'
  },
  {
    id: 6,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Երեսուն» թիվը:",
    image: "https://picsum.photos/seed/number_thirty_30/600/400",
    options: [
      { id: 'a', text: "Veinte" },
      { id: 'b', text: "Treinta" },
      { id: 'c', text: "Cuarenta" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 7,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Քառասուն» թիվը:",
    image: "https://picsum.photos/seed/number_forty_40/600/400",
    options: [
      { id: 'a', text: "Cincuenta" },
      { id: 'b', text: "Cuarenta" },
      { id: 'c', text: "Sesenta" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 8,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Հիսուն» թիվը:",
    image: "https://picsum.photos/seed/number_fifty_50/600/400",
    options: [
      { id: 'a', text: "Cincuenta" },
      { id: 'b', text: "Sesenta" },
      { id: 'c', text: "Setenta" }
    ],
    correctOptionId: 'a'
  },
  {
    id: 9,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Յոթանասուն» թիվը:",
    image: "https://picsum.photos/seed/number_seventy_70/600/400",
    options: [
      { id: 'a', text: "Sesenta" },
      { id: 'b', text: "Setenta" },
      { id: 'c', text: "Ochenta" }
    ],
    correctOptionId: 'b'
  },
  {
    id: 10,
    questionArm: "Ինչպե՞ս կլինի իսպաներեն «Հարյուր» թիվը:",
    image: "https://picsum.photos/seed/number_hundred_100/600/400",
    options: [
      { id: 'a', text: "Mil" },
      { id: 'b', text: "Cien" },
      { id: 'c', text: "Cincuenta" }
    ],
    correctOptionId: 'b'
  }
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = NUMBERS_QUIZ[currentIdx];
  const progress = ((currentIdx + 1) / NUMBERS_QUIZ.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelectedOptionId(optionId);
    setIsAnswered(true);
    
    if (optionId === currentQuestion.correctOptionId) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < NUMBERS_QUIZ.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#1e40af] bg-gradient-to-b from-[#1e40af] to-[#3b82f6] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex flex-col gap-4 max-w-2xl mx-auto w-full z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Hash className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase">Spanish Numbers Quiz</h1>
          </div>
          <div className="text-sm font-bold bg-white/20 px-4 py-2 rounded-full border border-white/30">
            {currentIdx + 1} / {NUMBERS_QUIZ.length}
          </div>
        </div>
        
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-200 to-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full -z-10" />

        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key={currentIdx}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="w-full"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-[40px] overflow-hidden border border-white/20 shadow-2xl flex flex-col">
                {/* Image at the Top */}
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img 
                    src={currentQuestion.image} 
                    alt="Number Visual" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <p className="text-2xl sm:text-3xl font-black leading-tight text-white drop-shadow-lg">
                      {currentQuestion.questionArm}
                    </p>
                  </div>
                </div>

                {/* Options at the Bottom */}
                <div className="p-8 sm:p-10 space-y-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const isCorrect = option.id === currentQuestion.correctOptionId;
                    
                    let buttonClass = "bg-white/10 border-white/20 text-white hover:bg-white/20";
                    if (isAnswered) {
                      if (isCorrect) buttonClass = "bg-green-500 border-green-400 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]";
                      else if (isSelected) buttonClass = "bg-red-500 border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]";
                      else buttonClass = "bg-white/5 border-white/10 text-white/30";
                    }

                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(option.id)}
                        disabled={isAnswered}
                        className={`w-full p-6 rounded-[24px] border-2 text-left font-bold text-xl transition-all duration-300 flex items-center justify-between group ${buttonClass}`}
                      >
                        <span>{option.text}</span>
                        <div className="flex items-center gap-2">
                          {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6" />}
                          {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6" />}
                        </div>
                      </button>
                    );
                  })}

                  <AnimatePresence>
                    {isAnswered && (
                      <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        onClick={nextQuestion}
                        className="w-full mt-6 py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        {currentIdx === NUMBERS_QUIZ.length - 1 ? 'Արդյունքներ' : 'Հաջորդը'}
                        <ArrowRight className="w-6 h-6" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-xl rounded-[40px] p-12 border border-white/20 shadow-2xl text-center w-full"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 text-[#1e40af] shadow-2xl">
                <Trophy className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black mb-4">Թեստն ավարտվեց:</h2>
              <p className="text-xl text-blue-100 mb-10">
                Դուք հավաքեցիք <span className="text-white font-black text-3xl">{score}</span> միավոր {NUMBERS_QUIZ.length}-ից:
              </p>
              
              <button
                onClick={resetQuiz}
                className="w-full py-5 bg-white text-[#1e40af] rounded-[24px] font-black text-xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-6 h-6" />
                Կրկնել թեստը
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer info */}
      <footer className="p-6 text-center text-white/40 text-sm font-medium">
        Իսպաներենի թվերի թեստ • Master Spanish Numbers
      </footer>
    </div>
  );
}
