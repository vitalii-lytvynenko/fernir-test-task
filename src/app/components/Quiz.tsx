'use client';

import { useState } from 'react';
import classNames from 'classnames';
import StatusIcon from './StatusIcon';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

type Answer = {
  text: string;
  isCorrect: boolean;
};

type Question = {
  question: string;
  answers: Answer[];
};

type QuizProps = {
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerCheck = (answerIndex: number) => {
    if (selectedAnswers[currentQuestionIndex] !== undefined) return;

    const isCorrect = currentQuestion.answers[answerIndex].isCorrect;
    setSelectedAnswers(prev => {
      const updatedAnswers = [...prev];
      updatedAnswers[currentQuestionIndex] = answerIndex;
      return updatedAnswers;
    });

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setScore(0);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="border-main bg-main mx-auto w-full max-w-lg border-8">
      <div className="rounded-lg bg-gray-50 p-6">
        {currentQuestionIndex < questions.length ? (
          <>
            <h2 className="text-main mb-2 text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <hr className='pb-4'></hr>
            <p className="mb-6 text-lg font-semibold text-gray-700">
              {currentQuestion.question}
            </p>
            <div className="mb-6 grid gap-4">
              {currentQuestion.answers.map((a, ai) => (
                <button
                  key={ai}
                  className={classNames(
                    'w-full rounded-md border px-4 py-2 text-left transition-colors duration-300',
                    {
                      'bg-success text-white':
                        selectedAnswers[currentQuestionIndex] === ai &&
                        a.isCorrect,
                      'bg-wrong text-white':
                        selectedAnswers[currentQuestionIndex] === ai &&
                        !a.isCorrect,
                      'bg-gray-300':
                        selectedAnswers[currentQuestionIndex] !== ai,
                      'hover:bg-gray-200':
                        selectedAnswers[currentQuestionIndex] === undefined,
                    },
                  )}
                  onClick={() => handleAnswerCheck(ai)}
                  disabled={selectedAnswers[currentQuestionIndex] !== undefined}
                >
                  {a.text}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {questions.map((_, i) => {
                  const isAnswered = selectedAnswers[i] !== undefined;
                  const wasCorrect =
                    isAnswered && selectedAnswers[i] !== undefined
                      ? questions[i].answers[selectedAnswers[i]].isCorrect
                      : false;

                      const isCurrent = i === currentQuestionIndex;

                  return (
                    <div
                      key={i}
                      className={classNames(
                        'flex h-8 w-8 items-center justify-center rounded-full border-2',
                        {
                          'border-success bg-success': isAnswered && wasCorrect,
                          'border-wrong bg-wrong': isAnswered && !wasCorrect,
                          'border-gray-300 bg-transparent': !isAnswered,
                          'ring-main ring-2 border-none': isCurrent && !isAnswered,
                        },
                      )}
                    >
                      {isAnswered && <StatusIcon isCorrect={wasCorrect} />}
                    </div>
                  );
                })}
              </div>
              <button
                className="bg-main hover:bg-main_hover rounded-md px-6 py-2 text-white transition disabled:cursor-not-allowed disabled:bg-gray-300"
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
              >
                {currentQuestionIndex < questions.length - 1
                  ? 'Next'
                  : 'Finish'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <DotLottieReact
                autoplay
                src="https://lottie.host/eb206c33-ff05-4a6c-a60b-f718f4351452/sbYCn74p3H.lottie"
                className="h-56 w-56"
              />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Your score: {score}/{questions.length}
            </h3>
            <button
              className="bg-main hover:bg-main_hover rounded-md px-6 py-2 text-white transition"
              onClick={resetQuiz}
            >
              Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
