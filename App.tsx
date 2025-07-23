import React, { useState, useCallback } from 'react';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import ExplanationPanel from './components/ExplanationPanel';
import { generateExplanation } from './services/geminiService';
import { SolanaStage, Stage, Explanation } from './types';
import { STAGES } from './constants';

const App: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<SolanaStage | null>(null);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const parseExplanation = (text: string): Explanation | null => {
    const roleMatch = text.match(/### Role\s*([\s\S]*?)\s*### Mechanism/);
    const mechanismMatch = text.match(/### Mechanism\s*([\s\S]*?)\s*### Importance/);
    const importanceMatch = text.match(/### Importance\s*([\s\S]*)/);
    
    if (roleMatch && mechanismMatch && importanceMatch) {
      return {
        role: roleMatch[1].trim(),
        mechanism: mechanismMatch[1].trim(),
        importance: importanceMatch[1].trim(),
      };
    }
    
    if (text.startsWith("An error occurred")) {
      setError(text);
    } else {
      console.error("Failed to parse explanation structure.");
      setError("The AI response was not in the expected format. Displaying raw text.");
      return { role: text, mechanism: 'Could not parse.', importance: 'Could not parse.' };
    }

    return null;
  };

  const handleStageClick = useCallback(async (stage: Stage) => {
    if (isLoading && selectedStage === stage.id) return;

    setSelectedStage(stage.id);
    setExplanation(null);
    setError(null);
    setIsLoading(true);

    try {
      const rawExplanation = await generateExplanation(stage);
      const parsed = parseExplanation(rawExplanation);
      setExplanation(parsed);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, selectedStage]);

  const currentStage = STAGES.find(s => s.id === selectedStage) || null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col">
      <header className="p-6 text-center border-b border-slate-800/50">
        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
          Interactive Solana Architecture
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
          A visual journey through Solana's core components. Click a stage in the diagram to learn how it contributes to the high-speed, low-cost network.
        </p>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center min-h-[900px]">
        <ArchitectureDiagram
          selectedStage={selectedStage}
          onStageClick={handleStageClick}
          isLoading={isLoading}
        />
        <ExplanationPanel
          stage={currentStage}
          explanation={explanation}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <footer className="text-center p-4 mt-8 text-xs text-slate-500 border-t border-slate-800/50">
        Powered by React, Framer Motion, and the Gemini API. Diagram inspired by Helius.
      </footer>
    </div>
  );
};

export default App;