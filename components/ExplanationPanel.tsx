import React from 'react';
import { Explanation, Stage } from '../types';
import { LoadingSpinner } from './icons';

interface ExplanationPanelProps {
  stage: Stage | null;
  explanation: Explanation | null;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center text-slate-400 flex flex-col items-center justify-center h-full p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.528L16.5 21.75l-.398-1.222a2.997 2.997 0 00-2.122-2.122L12.75 18l1.222-.398a2.997 2.997 0 002.122-2.122L16.5 14.25l.398 1.222a2.997 2.997 0 002.122 2.122L20.25 18l-1.222.398a2.997 2.997 0 00-2.122 2.122z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-200">Explore Solana's Architecture</h2>
        <p className="mt-2">Click on any stage in the diagram to get a detailed, AI-powered explanation of its role and mechanics.</p>
    </div>
);

const ExplanationContent: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    const isList = title === 'Mechanism' && content.includes('-');
    const contentItems = isList ? content.split('- ').filter(item => item.trim() !== '') : [content];

    return (
        <div className="mb-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-3 border-b-2 border-slate-800 pb-2">{title}</h3>
            {isList ? (
                <ul className="list-disc list-inside space-y-2 text-slate-300 pl-2">
                    {contentItems.map((item, index) => (
                        <li key={index}>{item.trim()}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-300 whitespace-pre-wrap">{content.trim()}</p>
            )}
        </div>
    );
};

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({ stage, explanation, isLoading, error }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-2xl min-h-[300px] flex flex-col shadow-2xl">
            <div className="p-6 overflow-y-auto">
                {isLoading && <LoadingSpinner />}
                {!isLoading && error && <div className="text-red-400 text-center p-8">{error}</div>}
                {!isLoading && !error && !stage && <WelcomeMessage />}
                {!isLoading && !error && stage && explanation && (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-100 mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
                            {stage.title}
                        </h2>
                        <ExplanationContent title="Role" content={explanation.role} />
                        <ExplanationContent title="Mechanism" content={explanation.mechanism} />
                        <ExplanationContent title="Importance" content={explanation.importance} />
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default ExplanationPanel;