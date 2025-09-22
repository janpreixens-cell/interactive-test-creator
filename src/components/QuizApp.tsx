import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw, Trophy, Brain, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface UserAnswer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

const questions: Question[] = [
  {
    id: 1,
    category: "Introducció a la programació",
    question: "Quants tipus d'operacions bàsiques pot realitzar un ordinador?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "Un ordinador pot realitzar 3 tipus d'operacions: operacions aritmètiques bàsiques, operacions de tipus lògic i emmagatzematge i recuperació d'informació."
  },
  {
    id: 2,
    category: "Introducció a la programació",
    question: "Quines són les 3 operacions bàsiques que pot fer un ordinador?",
    options: [
      "Càlcul, comunicació, emmagatzematge",
      "Operacions aritmètiques, operacions lògiques, emmagatzematge i recuperació d'informació",
      "Entrada, processament, sortida",
      "Compilació, execució, depuració"
    ],
    correctAnswer: 1,
    explanation: "Les 3 operacions bàsiques són: operacions aritmètiques bàsiques, operacions de tipus lògic (comparar dos valors) i emmagatzematge i recuperació d'informació."
  },
  {
    id: 3,
    category: "Programes i algorismes",
    question: "Què és un programa?",
    options: [
      "Un conjunt de dades",
      "Un conjunt d'ordres que executa l'ordinador per aconseguir un objectiu",
      "Un tipus de llenguatge",
      "Una aplicació gràfica"
    ],
    correctAnswer: 1,
    explanation: "Un programa és un conjunt d'ordres que executa l'ordinador per aconseguir un objectiu, proporcionades a través d'un llenguatge de programació."
  },
  {
    id: 4,
    category: "Programes i algorismes",
    question: "Què és un algorisme?",
    options: [
      "Un tipus de programa",
      "Un llenguatge de programació",
      "La descripció exacta i sense ambigüitats de la seqüència de passos per resoldre un problema",
      "Un sistema operatiu"
    ],
    correctAnswer: 2,
    explanation: "Un algorisme és la descripció exacta i sense ambigüitats de la seqüència de passos elementals per resoldre un problema determinat."
  },
  {
    id: 5,
    category: "Programes i algorismes",
    question: "Quin és el programa més important que executa un ordinador?",
    options: [
      "El navegador web",
      "El processador de textos",
      "El sistema operatiu",
      "L'antivirus"
    ],
    correctAnswer: 2,
    explanation: "El sistema operatiu és el programa més important, ja que controla les operacions bàsiques i gestiona els recursos de l'ordinador."
  },
  {
    id: 6,
    category: "Programes i algorismes",
    question: "Quin és el flux bàsic d'un programa-algorisme?",
    options: [
      "Compilació - Execució - Depuració",
      "Entrada de dades - Processament - Sortida de dades",
      "Anàlisi - Disseny - Implementació",
      "Inici - Procés - Final"
    ],
    correctAnswer: 1,
    explanation: "El flux bàsic és: Entrada de dades → Processament → Sortida de dades."
  },
  {
    id: 7,
    category: "Llenguatges de programació",
    question: "Què permet un llenguatge de programació d'alt nivell?",
    options: [
      "Controlar directament el hardware",
      "Escriure instruccions entendibles pel programador",
      "Executar programes més ràpidament",
      "Ocupar menys memòria"
    ],
    correctAnswer: 1,
    explanation: "Els llenguatges d'alt nivell permeten escriure instruccions amb una notació entendible pel programador, encara que no directament per l'ordinador."
  },
  {
    id: 8,
    category: "Tipus de llenguatges",
    question: "Quins són els tres tipus principals de llenguatges de programació segons el nivell?",
    options: [
      "Fàcils, mitjans, difícils",
      "Antics, moderns, futurs",
      "Baix nivell, nivell intermig, alt nivell",
      "Compilats, interpretats, híbrids"
    ],
    correctAnswer: 2,
    explanation: "Els tres tipus són: llenguatges de baix nivell, llenguatges de nivell intermig i llenguatges d'alt nivell."
  },
  {
    id: 9,
    category: "Assembladors i intèrprets",
    question: "Què fa un assemblador?",
    options: [
      "Executa el programa directament",
      "Tradueix codi d'alt nivell a codi màquina",
      "Depura errors en el codi",
      "Optimitza el rendiment"
    ],
    correctAnswer: 1,
    explanation: "Un assemblador tradueix codi escrit en llenguatge assemblador (baix nivell) a codi màquina que pot entendre el processador."
  },
  {
    id: 10,
    category: "Assembladors i intèrprets",
    question: "Quina és la diferència principal entre un compilador i un intèrpret?",
    options: [
      "El compilador és més ràpid",
      "L'intèrpret tradueix i executa línia per línia, el compilador tradueix tot el programa primer",
      "El compilador només funciona amb C++",
      "L'intèrpret només funciona amb Python"
    ],
    correctAnswer: 1,
    explanation: "L'intèrpret tradueix i executa el codi línia per línia, mentre que el compilador tradueix tot el programa abans de l'execució."
  },
  {
    id: 11,
    category: "Fases desenvolupament",
    question: "Quantes fases hi ha en el desenvolupament d'un programa segons el document?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "Hi ha 4 fases: Anàlisi, Disseny, Implementació i Documentació."
  },
  {
    id: 12,
    category: "Fases desenvolupament",
    question: "Quina és la primera fase en el desenvolupament d'un programa?",
    options: [
      "Disseny",
      "Implementació", 
      "Anàlisi",
      "Documentació"
    ],
    correctAnswer: 2,
    explanation: "L'Anàlisi és la primera fase, on s'estudia i es defineix el problema a resoldre."
  },
  {
    id: 13,
    category: "Fases desenvolupament",
    question: "En quina fase s'escriu realment el codi del programa?",
    options: [
      "Anàlisi",
      "Disseny",
      "Implementació",
      "Documentació"
    ],
    correctAnswer: 2,
    explanation: "Durant la fase d'Implementació és quan s'escriu el codi del programa utilitzant un llenguatge de programació."
  },
  {
    id: 14,
    category: "Dades i variables",
    question: "Què són les variables en programació?",
    options: [
      "Valors que mai canvien",
      "Espais de memòria que poden emmagatzemar i modificar dades",
      "Només números",
      "Instruccions del programa"
    ],
    correctAnswer: 1,
    explanation: "Les variables són espais de memòria identificats per un nom que poden emmagatzemar i modificar dades durant l'execució del programa."
  },
  {
    id: 15,
    category: "Diagrames de flux",
    question: "Què són els diagrames de flux?",
    options: [
      "Gràfics de rendiment",
      "Representacions gràfiques d'algorismes amb símbols estandarditzats",
      "Dibuixos decoratius",
      "Esquemes de bases de dades"
    ],
    correctAnswer: 1,
    explanation: "Els diagrames de flux són representacions gràfiques d'algorismes que utilitzen símbols estandarditzats per mostrar la seqüència de passos."
  },
  {
    id: 16,
    category: "Diagrames de flux",
    question: "Quin símbol s'utilitza per representar l'inici i el final en un diagrama de flux?",
    options: [
      "Rectangle",
      "Rombe",
      "Oval o el·lipse",
      "Cercle"
    ],
    correctAnswer: 2,
    explanation: "Els símbols d'inici i final en un diagrama de flux són ovals o el·lipses."
  },
  {
    id: 17,
    category: "Diagrames de flux",
    question: "Quin símbol representa una decisió en un diagrama de flux?",
    options: [
      "Rectangle",
      "Rombe",
      "Oval",
      "Paral·lelogram"
    ],
    correctAnswer: 1,
    explanation: "El símbol de decisió és un rombe, que representa una pregunta amb resposta Sí/No o Cert/Fals."
  },
  {
    id: 18,
    category: "Diagrames de flux",
    question: "Quin símbol s'usa per representar un procés o operació?",
    options: [
      "Rombe",
      "Rectangle",
      "Oval",
      "Hexàgon"
    ],
    correctAnswer: 1,
    explanation: "El rectangle representa un procés o operació que transforma o manipula dades."
  },
  {
    id: 19,
    category: "Diagrames de flux",
    question: "Quin símbol representa l'entrada o sortida de dades?",
    options: [
      "Rectangle",
      "Rombe", 
      "Paral·lelogram",
      "Cercle"
    ],
    correctAnswer: 2,
    explanation: "El paral·lelogram representa les operacions d'entrada i sortida de dades."
  },
  {
    id: 20,
    category: "Disseny d'algorismes",
    question: "Per què és important el disseny d'algorismes abans de programar?",
    options: [
      "No és necessari",
      "Permet planificar la solució abans de codificar, reduint errors",
      "Només per a programes complexos",
      "És només una formalitat"
    ],
    correctAnswer: 1,
    explanation: "El disseny d'algorismes és fonamental perquè permet planificar i estructurar la solució abans de codificar, reduint errors i millorant l'eficiència."
  }
];

export const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    if (!quizCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswer: UserAnswer = {
      questionId: questions[currentQuestion].id,
      selectedAnswer,
      isCorrect
    };

    setUserAnswers([...userAnswers, newAnswer]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        handleFinishQuiz();
      }
    }, 2000);
  };

  const handleFinishQuiz = () => {
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setTimeLeft(1800);
  };

  const getScore = () => {
    return userAnswers.filter(answer => answer.isCorrect).length;
  };

  const getScoreColor = (score: number) => {
    if (score >= 16) return "text-quiz-success";
    if (score >= 12) return "text-quiz-warning";
    return "text-quiz-error";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 18) return "Excel·lent! Domines perfectament la matèria.";
    if (score >= 16) return "Molt bé! Tens un bon domini dels conceptes.";
    if (score >= 12) return "Bé! Però has de reforçar alguns conceptes.";
    if (score >= 8) return "Suficient, però necessites estudiar més.";
    return "Cal que repassis la matèria més a fons.";
  };

  if (quizCompleted) {
    const score = getScore();
    return (
      <div className="min-h-screen bg-quiz-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-quiz-card border-border shadow-quiz animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-16 h-16 text-primary animate-pulse-glow" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Test Completat!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={cn("text-6xl font-bold mb-2", getScoreColor(score))}>
                {score}/20
              </div>
              <div className="text-xl text-muted-foreground mb-4">
                {getScoreMessage(score)}
              </div>
              <div className="text-sm text-muted-foreground">
                Percentatge: {((score / 20) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resumen per categories:</h3>
              {Array.from(new Set(questions.map(q => q.category))).map(category => {
                const categoryQuestions = questions.filter(q => q.category === category);
                const categoryCorrect = userAnswers.filter(a => {
                  const question = questions.find(q => q.id === a.questionId);
                  return question?.category === category && a.isCorrect;
                }).length;
                
                return (
                  <div key={category} className="flex justify-between items-center p-3 bg-quiz-card-hover rounded-lg">
                    <span className="text-sm font-medium">{category}</span>
                    <Badge variant={categoryCorrect === categoryQuestions.length ? "default" : "secondary"}>
                      {categoryCorrect}/{categoryQuestions.length}
                    </Badge>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button onClick={restartQuiz} className="flex-1" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Repetir Test
              </Button>
              <Button 
                onClick={() => window.location.href = '#revisar'} 
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                Revisar Respostes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-quiz-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-quiz-card border-border shadow-quiz">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
          
          <Progress value={progress} className="mb-4" />
          
          <Badge variant="secondary" className="w-fit mb-4">
            {currentQ.category}
          </Badge>
          
          <CardTitle className="text-xl leading-relaxed">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={cn(
                  "w-full p-4 text-left rounded-lg border transition-all duration-200 hover:bg-quiz-card-hover",
                  selectedAnswer === index && !showResult && "bg-primary/20 border-primary",
                  showResult && selectedAnswer === index && selectedAnswer === currentQ.correctAnswer && "bg-quiz-success/20 border-quiz-success",
                  showResult && selectedAnswer === index && selectedAnswer !== currentQ.correctAnswer && "bg-quiz-error/20 border-quiz-error",
                  showResult && index === currentQ.correctAnswer && "bg-quiz-success/20 border-quiz-success"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1 pr-4">{option}</span>
                  {showResult && (
                    <div>
                      {index === currentQ.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-quiz-success" />
                      )}
                      {selectedAnswer === index && selectedAnswer !== currentQ.correctAnswer && (
                        <XCircle className="w-5 h-5 text-quiz-error" />
                      )}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-quiz-card-hover rounded-lg border animate-fade-in">
              <div className={cn(
                "flex items-center gap-2 mb-2",
                selectedAnswer === currentQ.correctAnswer ? "text-quiz-success" : "text-quiz-error"
              )}>
                {selectedAnswer === currentQ.correctAnswer ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <XCircle className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {selectedAnswer === currentQ.correctAnswer ? "Correcte!" : "Incorrecte"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="text-sm text-muted-foreground">
              Encerts: {getScore()}/{userAnswers.length}
            </div>
            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null || showResult}
              className="bg-gradient-primary hover:opacity-90"
            >
              {currentQuestion === questions.length - 1 ? 'Finalitzar' : 'Següent'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};