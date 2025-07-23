import React from 'react';
import { motion } from 'framer-motion';

export const ArrowRightIcon: React.FC<{ className?: string, isMotion?: boolean }> = ({ className, isMotion }) => {
    const Component = isMotion ? motion.svg : 'svg';
    return (
        <Component xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </Component>
    );
};

export const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-8">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
);

// --- Redesigned Icon Set ---

export const WalletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="1" y="1" width="62" height="46" rx="5" className="stroke-slate-400" strokeWidth="2"/>
        <rect x="8" y="8" width="24" height="14" rx="2" className="fill-slate-800"/>
    </svg>
);

export const DAppIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="1" y="1" width="62" height="46" rx="5" className="stroke-slate-400" strokeWidth="2"/>
        <rect x="8" y="10" width="48" height="16" rx="2" className="fill-slate-800"/>
    </svg>
);

export const RpcIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="19" r="1" fill="currentColor"/>
        <path d="M8 6h8M8 10h8M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

export const ValidatorIcon: React.FC<{ className?: string }> = ({ className }) => (
     <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 7.5C4 5.83333 7.5 3 12 3C16.5 3 20 5.83333 20 7.5C20 9.16667 16.5 12 12 12C7.5 12 4 9.16667 4 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12v4.5c0 1.6667 3.5 4.5 8 4.5s8-2.8333 8-4.5V12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 7.5v9c0 1.6667 3.5 4.5 8 4.5s8-2.8333 8-4.5v-9" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const DatabaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="12" cy="6" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 6V18C3 19.6569 7.02944 21 12 21C16.9706 21 21 19.6569 21 18V6" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M3 12C3 13.6569 7.02944 15 12 15C16.9706 15 21 13.6569 21 12" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const ShredIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2 6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="skewX(-30)"/>
        <path d="M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="skewX(-30)"/>
        <path d="M10 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform="skewX(-30)"/>
    </svg>
);

export const SolanaLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);
