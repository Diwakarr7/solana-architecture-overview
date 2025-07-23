import React, { useEffect, useState } from 'react';
import { motion, Variants, useAnimation, AnimatePresence } from 'framer-motion';
import { STAGES } from '../constants';
import { SolanaStage, Stage } from '../types';
import { WalletIcon, DAppIcon, RpcIcon, ValidatorIcon, ClockIcon, DatabaseIcon, ShredIcon, ArrowRightIcon, SolanaLogoIcon } from './icons';

interface ArchitectureDiagramProps {
  selectedStage: SolanaStage | null;
  onStageClick: (stage: Stage) => void;
  isLoading: boolean;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

// Sub-components redesigned to match the provided image with detailed animations
const UsersBlock: React.FC = () => {
    const controls = useAnimation();
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                await controls.start('send');
                await new Promise(r => setTimeout(r, 2000));
                await controls.start('sign');
                await new Promise(r => setTimeout(r, 2000));
                await controls.start('reset');
                await new Promise(r => setTimeout(r, 1000));
            }
        };
        sequence();
    }, [controls]);

    const sendArrowVariant: Variants = {
        reset: { opacity: 0, pathLength: 0 },
        send: { opacity: [0, 1, 1, 0], pathLength: [0, 1, 1, 1], transition: { duration: 1.5, ease: 'easeInOut', times: [0, 0.6, 0.9, 1] } },
        sign: { opacity: 0, pathLength: 0 },
    };
    
    const signArrowVariant: Variants = {
        reset: { opacity: 0, pathLength: 0 },
        send: { opacity: 0, pathLength: 0 },
        sign: { opacity: [0, 1, 1, 0], pathLength: [0, 1, 1, 1], transition: { duration: 1.5, ease: 'easeInOut', times: [0, 0.6, 0.9, 1] } },
    };


    return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 text-xs text-slate-300">
        <div className="relative w-full h-full flex justify-around items-center">
            {/* Wallet */}
            <motion.div variants={itemVariants} className="relative w-[45%] h-[80%]">
                <WalletIcon className="w-full h-full text-slate-500" />
                <div className="absolute inset-0 flex flex-col p-3">
                    <div className="h-[40%] flex items-center pl-2 font-mono text-lg text-slate-100">$420</div>
                    <div className="flex-grow flex flex-col justify-end space-y-2.5 text-sm text-slate-300">
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div><span>Connect</span></div>
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div><span>Send</span></div>
                       <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-600"></div><span>Sign</span></div>
                    </div>
                </div>
            </motion.div>

            {/* dApp */}
            <motion.div variants={itemVariants} className="relative w-[45%] h-[80%]">
                <DAppIcon className="w-full h-full text-slate-500" />
                <div className="absolute inset-0 flex flex-col items-center p-3">
                     <div className="h-[55%] w-full flex items-center justify-center text-slate-400 font-bold text-3xl">lt</div>
                     <div className="flex-grow w-full flex items-center justify-center">
                        <div className="bg-slate-700 px-6 py-2 rounded-md">
                            <span className="font-semibold text-slate-200">Build</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Animated Arrows */}
            <svg className="absolute w-full h-full top-0 left-0 overflow-visible pointer-events-none">
                 {/* Arrow from Send */}
                 <motion.path d="M 38% 65% C 45% 60%, 55% 45%, 65% 35%" className="stroke-purple-400" strokeWidth="2" fill="none" variants={sendArrowVariant} initial="reset" animate={controls} />
                 {/* Arrow from Sign */}
                 <motion.path d="M 38% 81% C 45% 76%, 55% 55%, 65% 45%" className="stroke-purple-400" strokeWidth="2" fill="none" variants={signArrowVariant} initial="reset" animate={controls} />
            </svg>
        </div>
    </div>
    );
};


const GulfStreamBlock: React.FC = () => {
    const [leaderIndex, setLeaderIndex] = useState(2);
    const stakes = ['1.5%', '2%', '3%', '1%', '0.5%'];

    useEffect(() => {
        const interval = setInterval(() => {
            setLeaderIndex(Math.floor(Math.random() * stakes.length));
        }, 4000);
        return () => clearInterval(interval);
    }, [stakes.length]);

    return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full h-full flex p-2 text-xs relative">
        <motion.div className="flex flex-col justify-around items-center w-[35%] h-full">
            <span className="font-bold text-slate-300 absolute top-2">RPCs</span>
            {[...Array(5)].map((_, i) =>
                <motion.div key={i} variants={itemVariants} className="relative p-1">
                    <RpcIcon className="w-8 h-8 text-slate-400"/>
                    <motion.div className="absolute top-0 left-0 w-full h-full rounded-full border border-cyan-400"
                        animate={{ scale: [1, 1.8], opacity: [0, 0.7, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 }}
                    />
                </motion.div>
            )}
            <div className="text-slate-500 mt-1">Non paired RPCs</div>
        </motion.div>

        {/* Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            {stakes.map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full"
                    style={{ top: `${18 + i*15}%` }}
                    initial={{ left: '30%', opacity: 0 }}
                    animate={{
                        left: ['30%', '55%'],
                        opacity: [0, 1, 1, 0],
                        backgroundColor: i === leaderIndex ? '#a855f7' : '#22d3ee'
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: 'linear',
                        times: [0, 0.1, 0.8, 1]
                    }}
                />
            ))}
        </div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 flex flex-col justify-around items-center h-full">
            <span className="font-bold text-slate-300 absolute top-2">Validators</span>
            {stakes.map((stake, i) => (
                <motion.div 
                    key={i} 
                    variants={itemVariants} 
                    className="flex items-center w-full p-0.5 rounded-md transition-all duration-300"
                >
                    <div className="w-16 text-slate-400 text-left pl-1">{stake} stake</div>
                    <div className="flex-1 h-5 bg-slate-800 rounded-sm overflow-hidden border border-slate-700 flex items-center">
                       <motion.div
                         className="h-full bg-cyan-600"
                         initial={{ width: '0%' }}
                         animate={{ width: `${parseFloat(stake) * 20}%` }}
                         transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                       />
                    </div>
                    <motion.div 
                        className="ml-2"
                        animate={{ scale: i === leaderIndex ? 1.1 : 1, color: i === leaderIndex ? '#a855f7' : '#22d3ee' }}
                        transition={{ duration: 0.5 }}
                    >
                        <ValidatorIcon className="w-8 h-8"/>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
    );
};

const BlockBuildingBlock: React.FC = () => {
    const [animationState, setAnimationState] = useState('idle');
    const [filledEntries, setFilledEntries] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            // This state machine controls the animation sequence
            if (animationState === 'idle') {
                await new Promise(r => setTimeout(r, 1500));
                setAnimationState('fetching');
            } else if (animationState === 'fetching') {
                await controls.start('fetch');
                await new Promise(r => setTimeout(r, 500));
                setAnimationState('banking');
            } else if (animationState === 'banking') {
                if (filledEntries < 4) {
                    await controls.start('dotMove');
                    setFilledEntries(prev => prev + 1);
                    // loop in banking state
                } else {
                    await new Promise(r => setTimeout(r, 300));
                    await controls.start('dotHide');
                    setAnimationState('processing');
                }
            } else if (animationState === 'processing') {
                await controls.start('poh');
                await new Promise(r => setTimeout(r, 1000));
                setAnimationState('shredding');
            } else if (animationState === 'shredding') {
                await controls.start('shred');
                await new Promise(r => setTimeout(r, 1500));
                setAnimationState('writing');
            } else if (animationState === 'writing') {
                await controls.start('writeDB');
                await new Promise(r => setTimeout(r, 1000));
                setAnimationState('resetting');
            } else if (animationState === 'resetting') {
                setFilledEntries(0);
                await controls.start('reset');
                await new Promise(r => setTimeout(r, 500));
                setAnimationState('idle');
            }
        };
        sequence();
    }, [animationState, filledEntries, controls]);

    const lineVariant: Variants = {
        reset: { scaleY: 0 },
        fetch: { scaleY: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    };
    const dotVariant: Variants = {
        reset: { y: '5%', opacity: 0 },
        fetch: { opacity: 1 },
        dotMove: (i: number) => ({
            y: `${23 + i * 18}%`,
            transition: { duration: 0.3, ease: 'linear' },
        }),
        dotHide: {
            opacity: 0,
        },
    };
    const entryVariant = (index: number): Variants => ({
        reset: { backgroundColor: '#1f2937' },
        banking: { backgroundColor: filledEntries > index ? '#4338ca' : '#1f2937', transition: { duration: 0.2 } },
        shred: { opacity: 0, transition: { duration: 0.2 } },
    });
    const shredIconVariant = (index: number): Variants => ({
        reset: { opacity: 0, scale: 0.5 },
        shred: {
            opacity: [0, 1, 1, 0], x: '250%', y: `${-100 + index * 50}%`, scale: 1,
            transition: { duration: 1, delay: index * 0.15, ease: 'easeOut' }
        },
    });
    const pohVariant: Variants = {
        reset: { color: '#a855f7' },
        poh: { color: ['#a855f7', '#10b981', '#a855f7'], scale: [1, 1.2, 1], transition: { duration: 1 } },
    }
    const dbArrowVariant: Variants = {
        reset: { opacity: 0.2 },
        writeDB: { opacity: [0.2, 1, 0.2], scaleY: [1, 1.5, 1], transition: { duration: 0.8, ease: 'easeInOut' } }
    }

    return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full h-full flex flex-col p-2 text-xs text-slate-300">
         <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 border border-slate-700 rounded-md p-1">
             <motion.div animate={controls} variants={pohVariant} initial="reset">
                <ClockIcon className="w-5 h-5"/>
             </motion.div>
             <span className="font-bold">Proof of History (PoH) Service</span>
         </motion.div>
         <div className="flex-1 my-1 flex items-center justify-between border border-slate-700 rounded-md p-1 relative">
            <div className="h-full w-[25%] flex flex-col items-center justify-center font-semibold text-slate-400 relative">
                <span className="z-10 bg-slate-800/80 px-1 rounded">Fetch</span>
                <div className="h-10"></div>
                <span className="z-10 bg-slate-800/80 px-1 rounded">Sig Verify</span>
                <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-purple-400 origin-top" variants={lineVariant} initial="reset" animate={controls}/>
                <motion.div className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 z-20" variants={dotVariant} initial="reset" animate={controls} custom={filledEntries}/>
            </div>

            <div className="border border-dashed border-slate-600 rounded p-1 flex-1 mx-2 h-[90%] flex flex-col items-center relative overflow-hidden">
                 <span className="font-bold mb-1 block">Banking</span>
                 <div className="space-y-1.5 w-full p-1 flex-1">
                     {[...Array(4)].map((_, i) => (
                        <motion.div key={i} className="h-4 border border-slate-700 rounded-sm w-full flex items-center justify-center text-[10px] text-slate-200"
                          variants={entryVariant(i)} initial="reset" animate={controls}>
                           <AnimatePresence>{animationState !== 'shredding' && <span>Entry</span>}</AnimatePresence>
                        </motion.div>
                     ))}
                 </div>
                 {[...Array(4)].map((_, i) => (
                    <motion.div key={i} className="absolute text-cyan-400" style={{ top: `${23 + i * 18}%`, left: '40%'}}
                        variants={shredIconVariant(i)} initial="reset" animate={controls}>
                        <ShredIcon className="w-6 h-6"/>
                    </motion.div>
                 ))}
            </div>

            <div className="w-[15%] flex flex-col justify-center items-center h-full text-center">
                <span className="font-semibold text-slate-400 -rotate-90">Broadcast</span>
            </div>
         </div>
         <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 border border-slate-700 rounded-md p-1 relative">
             <DatabaseIcon className="w-5 h-5 text-purple-400"/>
             <span className="font-bold">Bank &gt;&gt; Accounts DB</span>
             <motion.div className="absolute left-1/2 -translate-x-1/2 -top-4 w-5 h-5 text-purple-400" variants={dbArrowVariant} initial="reset" animate={controls}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
             </motion.div>
         </motion.div>
    </motion.div>
    );
};

const ConsensusBlock: React.FC = () => {
    const [animationState, setAnimationState] = useState('idle');

    useEffect(() => {
        const sequence = async () => {
            if (animationState === 'idle') {
                await new Promise(r => setTimeout(r, 2000));
                setAnimationState('building');
            } else if (animationState === 'building') {
                await new Promise(r => setTimeout(r, 2500));
                setAnimationState('resolving');
            } else if (animationState === 'resolving') {
                await new Promise(r => setTimeout(r, 4000));
                setAnimationState('resetting');
            } else if (animationState === 'resetting') {
                await new Promise(r => setTimeout(r, 1000));
                setAnimationState('idle');
            }
        };
        sequence();
    }, [animationState]);

    const blockVariant = (isPruned: boolean): Variants => ({
        idle: { opacity: 0, scale: 0.8 },
        building: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
        resolving: {
            opacity: isPruned ? 0.4 : 1,
            scale: isPruned ? 0.95 : 1,
            transition: { duration: 0.5, delay: 0.2 }
        },
        resetting: { opacity: 0, transition: { duration: 0.3 } }
    });

    const rootedVariant: Variants = {
        idle: { boxShadow: '0 0 0px #a855f7' },
        building: { boxShadow: '0 0 0px #a855f7' },
        resolving: {
            boxShadow: ['0 0 0px #a855f7', '0 0 10px #a855f7', '0 0 0px #a855f7'],
            transition: { duration: 1.5, repeat: Infinity, delay: 0.5 }
        },
        resetting: { boxShadow: '0 0 0px #a855f7' }
    };

    const textVariant: Variants = {
        idle: { opacity: 0 },
        building: { opacity: 0 },
        resolving: { opacity: 1, transition: { duration: 0.5, delay: 0.8 } },
        resetting: { opacity: 0, transition: { duration: 0.2 } }
    };

    const lineVariant = (delay: number): Variants => ({
        idle: { pathLength: 0 },
        building: { pathLength: 1, transition: { duration: 0.5, ease: 'easeInOut', delay } },
        resolving: { transition: { duration: 0.5 } },
        resetting: { pathLength: 0, transition: { duration: 0.3 } }
    });

    const blocks = [
        { id: 0, col: 1, row: 2, isPruned: false, text: 'Block 0', isRooted: false },
        { id: 1, col: 2, row: 3, isPruned: true, text: 'Block 1' },
        { id: 2, col: 3, row: 4, isPruned: true, text: 'Block 2' },
        { id: 3, col: 4, row: 2, isPruned: false, text: 'Block 3' },
        { id: 4, col: 5, row: 3, isPruned: true, text: 'Block 4' },
        { id: 5, col: 6, row: 2, isPruned: false, text: 'Block 5', isRooted: true },
    ];

    return (
        <motion.div className="w-full h-full flex flex-col p-2 text-xs">
            <div className="relative grid grid-cols-6 grid-rows-5 flex-grow gap-x-1">
                {[...Array(6)].map((_, i) => <div key={i} className="text-slate-400 text-center font-mono row-start-1">slot {i}</div>)}
                {[...Array(6)].map((_, i) => <div key={`line-${i}`} style={{ gridColumnStart: i + 1 }} className="row-start-2 row-span-full border-l border-dashed border-slate-700 h-full mx-auto"></div>)}

                {blocks.map(block => (
                    <motion.div
                        key={block.id}
                        variants={block.isRooted ? rootedVariant : blockVariant(block.isPruned)}
                        animate={animationState}
                        className={`flex items-center justify-center h-8 border-2 rounded-sm ${block.isPruned ? 'border-slate-500 border-dashed' : 'border-purple-400'}`}
                        style={{ gridColumnStart: block.col, gridRowStart: block.row }}
                    >
                        {block.text}
                    </motion.div>
                ))}

                <motion.p variants={textVariant} animate={animationState} className="text-slate-500 text-center col-start-2 row-start-4">pruned</motion.p>
                <motion.p variants={textVariant} animate={animationState} className="text-slate-500 text-center col-start-3 row-start-5">pruned</motion.p>
                <motion.p variants={textVariant} animate={animationState} className="text-slate-500 text-center col-start-5 row-start-4">pruned</motion.p>
                <motion.p variants={textVariant} animate={animationState} className="text-slate-500 text-center col-start-6 row-start-3 text-purple-400 font-bold">rooted</motion.p>

                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" overflow="visible">
                    <motion.path d="M 8.3% 29% L 25% 49%" stroke="#8b5cf6" strokeWidth="1.5" variants={lineVariant(0.5)} animate={animationState} />
                    <motion.path d="M 25% 49% L 41.6% 69%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(0.7)} animate={animationState} />
                    <motion.path d="M 8.3% 29% L 58.3% 29%" stroke="#8b5cf6" strokeWidth="1.5" variants={lineVariant(0.9)} animate={animationState} />
                    <motion.path d="M 58.3% 29% L 75% 49%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.1)} animate={animationState} />
                    <motion.path d="M 58.3% 29% L 91.6% 29%" stroke="#8b5cf6" strokeWidth="1.5" variants={lineVariant(1.3)} animate={animationState} />
                </svg>
            </div>
        </motion.div>
    );
};


const BlockVerificationBlock: React.FC = () => {
    const controls = useAnimation();
     useEffect(() => {
        const sequence = async () => {
            while(true) {
                await controls.start('flow');
                await new Promise(r => setTimeout(r, 4000));
                await controls.start('reset');
                await new Promise(r => setTimeout(r, 500));
            }
        }
        sequence();
    }, [controls]);
    
    const arrowVariant = (delay: number): Variants => ({
        reset: { opacity: 0, scale: 0 },
        flow: { opacity: 1, scale: 1, transition: { duration: 0.4, delay } }
    });

    return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full h-full flex flex-col p-2 text-xs text-slate-300">
        <motion.div variants={itemVariants} className="flex justify-around">
            <div className="border border-slate-700 rounded px-2 py-1 font-semibold">Gossip Service</div>
            <div className="border border-slate-700 rounded px-2 py-1 font-semibold">Downstream Validators</div>
        </motion.div>
        <motion.div variants={itemVariants} className="flex-1 my-1 flex flex-col justify-around border border-slate-700 rounded-md p-2 relative">
             <motion.div 
                className="absolute top-[-10px] left-1/2 -translate-x-1/2 text-cyan-400"
                initial={{opacity:0, y: -10}} 
                animate={{opacity:[0, 1, 1, 0], y: 20}} 
                transition={{repeat: Infinity, duration: 4, ease: 'linear'}}
             >
                <ShredIcon className="w-5 h-5" />
            </motion.div>

            <div className="flex items-center justify-around w-full">
                <div className="border border-dashed border-slate-600 rounded-md p-2 font-semibold">Replay</div>
                 <motion.div variants={arrowVariant(1)} initial="reset" animate={controls}><ArrowRightIcon className="w-5 h-5 text-purple-400 -rotate-180"/></motion.div>
                <div className="border border-dashed border-slate-600 rounded-md p-2 font-semibold">Retransmit</div>
            </div>
            
             <motion.div variants={arrowVariant(1.5)} initial="reset" animate={controls} className="self-start ml-[22%] my-1"><ArrowRightIcon className="w-5 h-5 text-purple-400 -rotate-90"/></motion.div>

            <div className="flex items-center justify-around w-full">
                 <div className="border border-dashed border-slate-600 rounded-md p-2 font-semibold">Shred Verify</div>
                 <motion.div variants={arrowVariant(2)} initial="reset" animate={controls}><ArrowRightIcon className="w-5 h-5 text-purple-400"/></motion.div>
                <div className="border border-dashed border-slate-600 rounded-md p-2 font-semibold">Shred Fetch</div>
            </div>
        </motion.div>
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 border border-slate-700 rounded-md p-1">
             <DatabaseIcon className="w-5 h-5 text-purple-400"/>
             <span className="font-bold">Bank &gt;&gt; AccountsDB</span>
         </motion.div>
    </motion.div>
    );
};

const TurbineBlock: React.FC = () => {
    const controls = useAnimation();
    const nodePositions = {
        root: { x: '50%', y: '25%' },
        layer1: [{ x: '30%', y: '50%' }, { x: '50%', y: '50%' }, { x: '70%', y: '50%' }],
        layer2: [{ x: '15%', y: '75%' }, { x: '25%', y: '75%' }, { x: '35%', y: '75%' }, { x: '45%', y: '75%' }, { x: '55%', y: '75%' }, { x: '65%', y: '75%' }, { x: '75%', y: '75%' }, { x: '85%', y: '75%' }],
        layer3: [{ x: '10%', y: '95%' }, { x: '20%', y: '95%' }],
    };

    useEffect(() => {
        const sequence = async () => {
            while(true) {
                await controls.start('visible');
                await new Promise(r => setTimeout(r, 4000));
                await controls.start('hidden');
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        sequence();
    }, [controls]);
    
    const lineVariant = (delay: number): Variants => ({ hidden: { pathLength: 0 }, visible: { pathLength: 1, transition: { duration: 0.4, delay } } });
    const nodeVariant = (delay: number): Variants => ({ hidden: { scale: 0 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 120, delay } } });

    return (
    <motion.div initial="hidden" animate={controls} className="w-full h-full flex flex-col p-2 text-xs items-center justify-center relative">
        <motion.div className="absolute text-cyan-400" variants={{ hidden: {top: '-20%', left: '50%', opacity: 0}, visible: { top: '12%', left: '50%', opacity: 1, transition: {duration: 0.5, delay: 0.5}}}}>
            <ShredIcon className="w-8 h-8"/>
        </motion.div>

        <svg className="absolute w-full h-full top-0 left-0" overflow="visible">
            {nodePositions.layer1.map((pos, i) => <motion.line key={i} x1={nodePositions.root.x} y1={nodePositions.root.y} x2={pos.x} y2={pos.y} stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1 + i * 0.1)} />)}
            <motion.line x1="30%" y1="50%" x2="15%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.3)} />
            <motion.line x1="30%" y1="50%" x2="25%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.3)} />
            <motion.line x1="50%" y1="50%" x2="45%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.4)} />
            <motion.line x1="50%" y1="50%" x2="55%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.4)} />
            <motion.line x1="70%" y1="50%" x2="75%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.5)} />
            <motion.line x1="70%" y1="50%" x2="85%" y2="75%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.5)} />
            <motion.line x1="15%" y1="75%" x2="10%" y2="95%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.7)} />
            <motion.line x1="15%" y1="75%" x2="20%" y2="95%" stroke="#64748b" strokeWidth="1.5" variants={lineVariant(1.7)} />
        </svg>

        {/* Nodes */}
        <motion.div variants={nodeVariant(0.8)} className="absolute flex flex-col items-center" style={{ top: '15%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="bg-slate-700 border border-slate-600 px-1 py-[1px] rounded mb-1 font-bold">L Leader</div>
            <div className="w-8 h-8 bg-purple-500 border-2 border-purple-300 rounded-full flex items-center justify-center font-bold text-slate-200">0</div>
             <p className="text-slate-400 mt-1">Root Node</p>
        </motion.div>
        
        {nodePositions.layer1.map((pos, i) => <motion.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: pos.y, left: pos.x}} variants={nodeVariant(1 + i * 0.1)}><div className="w-6 h-6 bg-slate-600 border border-slate-500 rounded-full flex items-center justify-center font-bold text-slate-200">{i + 1}</div></motion.div>)}
        {nodePositions.layer2.map((pos, i) => <motion.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: pos.y, left: pos.x}} variants={nodeVariant(1.3 + i * 0.05)}><div className="w-5 h-5 bg-slate-600 border border-slate-500 rounded-full flex items-center justify-center font-bold text-slate-200">{i + 4}</div></motion.div>)}
        {nodePositions.layer3.map((pos, i) => <motion.div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ top: pos.y, left: pos.x}} variants={nodeVariant(1.7 + i * 0.1)}><div className="w-4 h-4 bg-slate-700 text-[10px] border border-slate-500 rounded-full flex items-center justify-center font-bold text-slate-200">{i + 13}</div></motion.div>)}

        <div className="absolute bottom-1 right-2 border border-slate-700 p-1 rounded-md flex items-center gap-2">
            <SolanaLogoIcon className="w-5 h-5 text-slate-400" />
            <div className="text-[10px] leading-tight text-slate-300">
                <p className="font-bold">Solana</p><p>How it works</p>
            </div>
        </div>
    </motion.div>
    );
};

const BLOCK_COMPONENTS: Record<SolanaStage, React.FC> = {
    [SolanaStage.USERS]: UsersBlock,
    [SolanaStage.GULF_STREAM]: GulfStreamBlock,
    [SolanaStage.BLOCK_BUILDING]: BlockBuildingBlock,
    [SolanaStage.CONSENSUS]: ConsensusBlock,
    [SolanaStage.BLOCK_VERIFICATION]: BlockVerificationBlock,
    [SolanaStage.TURBINE]: TurbineBlock,
};

const DiagramStage: React.FC<{ stage: Stage; isSelected: boolean; onClick: () => void; isLoading: boolean; children: React.ReactNode; }> = 
    ({ stage, isSelected, onClick, isLoading, children }) => {
    const baseStyle = "w-full h-full text-left p-2 border-2 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform flex flex-col overflow-hidden";
    const inactiveStyle = "bg-slate-900 border-slate-800 hover:border-purple-500/50 hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer";
    const activeStyle = "bg-slate-800/50 border-purple-500 ring-2 ring-offset-2 ring-offset-slate-950 ring-purple-500 shadow-xl shadow-purple-500/20 -translate-y-1";
    const loadingStyle = "cursor-wait opacity-50";

    return (
        <motion.div
            layout
            className={`${baseStyle} ${isSelected ? activeStyle : inactiveStyle} ${isLoading && isSelected ? loadingStyle : ''}`}
            onClick={!isLoading ? onClick : undefined}
            style={{ gridArea: stage.gridArea }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h3 className="font-bold text-md text-slate-100 text-center mb-1 shrink-0">{stage.title}</h3>
            <div className="flex-grow relative bg-black/20 rounded-lg border border-slate-800/50">
                {children}
            </div>
        </motion.div>
    );
};

const DataFlow = () => {
    const variants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i: number) => ({
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { delay: 0.5 + i * 0.7, type: "spring", duration: 1.5, bounce: 0 }, opacity: { delay: 0.5 + i * 0.7, duration: 0.01 }}
        })
    };
    return (
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none z-0">
            <defs>
                 <marker id="arrow-purple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#a855f7" />
                </marker>
            </defs>

            {/* Redrawn Data Flow Paths */}
            <motion.path d="M 33.3% 25% H 34.3%" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={1}/>
            <motion.path d="M 66.6% 25% H 67.6%" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={2}/>
            <motion.path d="M 83.3% 50% V 58%" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={3}/>
            <motion.path d="M 65.6% 75% H 67.6%" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={4} transform="rotate(180 66.6% 75%)"/>
            <motion.path d="M 32.3% 75% H 34.3%" stroke="#a855f7" strokeWidth="2.5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={5} transform="rotate(180 33.3% 75%)"/>
            <motion.path d="M 16.6% 50% V 42%" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="5 5" markerEnd="url(#arrow-purple)" variants={variants} initial="hidden" animate="visible" custom={6}/>
        </svg>
    )
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ selectedStage, onStageClick, isLoading }) => {
  return (
    <div className="w-full p-4 md:p-8 flex-grow">
      <div className="relative h-[75vh] min-h-[800px] w-full max-w-7xl mx-auto">
        <DataFlow />
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full h-full grid gap-x-2 gap-y-8 relative z-10"
            style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gridTemplateAreas: `
                    "users gulfstream building"
                    "consensus verification turbine"
                `,
            }}
        >
            {STAGES.map((stage) => {
                const BlockComponent = BLOCK_COMPONENTS[stage.id];
                return (
                    <DiagramStage
                        key={stage.id}
                        stage={stage}
                        isSelected={selectedStage === stage.id}
                        onClick={() => onStageClick(stage)}
                        isLoading={isLoading}
                    >
                        <BlockComponent />
                    </DiagramStage>
                );
            })}
        </motion.div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;