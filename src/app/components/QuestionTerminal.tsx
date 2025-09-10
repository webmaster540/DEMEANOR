'use client'

import React, { useState, useEffect, useRef } from 'react';

type QuestionTerminalProps = {
  setOpenTerminal: React.Dispatch<React.SetStateAction<boolean>>;
};

const promptsData = [
    'Your password was recently reset...',
    'Complete security questions to confirm identity',
    'Downloading sensitive data... [####################] 100%',
    'Bypassing firewall...',
    'Firewall breach successful.',
    'Breach complete.',
    'Connecting to remote server...',
    'Server IP: where.is.uzi',
    'Password: **************',
    'Password accepted. Authenticating...',
    'Access granted.'
];

const questionsData = [
    'What is your name?',
    'What is your phone number?',
    'What is your email?',
    'Who is Baby Skrilla?',
];

const QuestionTerminal: React.FC<QuestionTerminalProps> = ({ setOpenTerminal }) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    const [prompts, setPrompts] = useState<string[]>([]);
    const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(questionsData.map(() => ''));
    const [showFinalPrompts, setShowFinalPrompts] = useState(false);
    const [finalPromptsIndex, setFinalPromptsIndex] = useState(0);

    const date = new Date();

    useEffect(() => {
        // If the initial prompts are not all displayed yet.
        if (currentPromptIndex < 6) {
            const timer = setTimeout(() => {
                setPrompts(prevPrompts => [...prevPrompts, promptsData[currentPromptIndex]]);
                setCurrentPromptIndex(currentPromptIndex + 1);
            }, 500); // Adjust delay to change typing speed.
            return () => clearTimeout(timer);
        } else if (!showQuestions && !showFinalPrompts && currentPromptIndex >= 6) {
            // Once initial prompts are done, show questions after a short delay.
            const questionsTimer = setTimeout(() => {
                setShowQuestions(true);
            }, 500);
            return () => clearTimeout(questionsTimer);
        }
    }, [currentPromptIndex, showQuestions, showFinalPrompts]);

    // Effect to handle the final prompts display.
    useEffect(() => {
        // Only run if the questions have been answered.
        if (showFinalPrompts && finalPromptsIndex < promptsData.length - 6) {
            const timer = setTimeout(() => {
                const promptToAdd = promptsData[6 + finalPromptsIndex];
                setPrompts(prevPrompts => [...prevPrompts, promptToAdd]);
                setFinalPromptsIndex(finalPromptsIndex + 1);
            }, 500);
            return () => {
                clearTimeout(timer);
            }
        }
    }, [showFinalPrompts, finalPromptsIndex]);

    // Effect to handle closing the terminal after all prompts are displayed.
    useEffect(() => {
        if (finalPromptsIndex >= promptsData.length - 6 && showFinalPrompts) {
            const closeTimer = setTimeout(() => {
                setOpenTerminal(false);
            }, 1000); 
            return () => clearTimeout(closeTimer);
        }
    }, [finalPromptsIndex, showFinalPrompts, setOpenTerminal]);


    // Effect to auto-scroll to the bottom of the terminal.
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [prompts, answers]);

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Add the current question and its answer to the prompts array
        const answeredPrompt = `${questionsData[currentQuestionIndex]}: ${answers[currentQuestionIndex]}`;
        setPrompts(prevPrompts => [...prevPrompts, answeredPrompt]);

        // Check if there are more questions to display
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // If it's the last question, hide the question form and start the final prompts
            setShowQuestions(false);
            setShowFinalPrompts(true);
        }
    };

    // console.log('', answers[currentQuestionIndex])

    return (
      <div className="w-[95%] max-w-md h-full max-h-[13.75rem] bg-[#1C1C1C] rounded-2xl fixed top-8 left-1/2 -translate-x-1/2 z-50 flex flex-col">
            {/* Terminal header */}
            <div className="relative">
                <div className="flex items-center justify-between bg-[#575757] w-full rounded-t-2xl p-2">
                    <div className="flex items-center space-x-1">
                        <div onClick={() => setOpenTerminal(false)} className="bg-red-400 w-3 h-3 rounded-full flex flex-col items-center justify-center text-xs text-transparent hover:text-black cursor-pointer">
                            <span>x</span>
                        </div>
                        <span className="bg-yellow-400 w-3 h-3 rounded-full"></span>
                        <span className="bg-green-400 w-3 h-3 rounded-full"></span>
                    </div>
                    <div className="text-xs text-white">liluziofficial.com -- -zsh - 80x24</div>
                      <div className="flex items-center space-x-1">
                        <span className="bg-[#575757] w-3 h-3 rounded-full"></span>
                        <span className="bg-[#575757] w-3 h-3 rounded-full"></span>
                        <span className="bg-[#575757] w-3 h-3 rounded-full"></span>
                    </div>
                </div>
            </div>

            {/* Terminal content */}
            <div ref={terminalRef} className="flex flex-col text-[9.75px] md:text-[11px] p-2 md:px-3 font-mono text-white overflow-y-auto flex-grow">
                {/* Initial login text */}
                <span>{`Last login: ${date.toDateString()} ttys000`}</span>
                <span>root@mainframe % npm i whereisuzi</span>

                {/* Render the initial prompts as they "type" in */}
                {prompts.map((line, index) => (
                    <span key={index}>{line}</span>
                ))}

                {/* Show the current question and input field once the initial prompts are done */}
                {showQuestions && currentQuestionIndex < questionsData.length && (
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center mt-2">
                            <label className="flex-shrink-0 mr-1">{`[${currentQuestionIndex + 1}] ${questionsData[currentQuestionIndex]}`}</label>
                            <input
                                type="text"
                                name={`question-${currentQuestionIndex}`}
                                value={answers[currentQuestionIndex]}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newAnswers = [...answers];
                                    newAnswers[currentQuestionIndex] = e.target.value;
                                    setAnswers(newAnswers);
                                }}
                                className="pl-1 flex-grow bg-transparent text-white focus:outline-none"
                            />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default QuestionTerminal;
