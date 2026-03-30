

"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveStoryGame = () => {
    const [scene, setScene] = useState(0);
    const [isActionDone, setIsActionDone] = useState(false);
    const [finalChoice, setFinalChoice] = useState("");

    const scenes = [
        {
            id: "airport",
            title: "Phase 1: The Takeoff",
            task: "Tap the boarding pass to enter her world",
            bg: "bg-sky-900",
            visual: "👩‍✈️",
            actionIcon: "🎫",
            storyText: "She was an Indigo Airhostess. You were just a passenger, but the journey was about to begin."
        },
        {
            id: "pubg",
            title: "Phase 2: Squad Up",
            task: "Tap the Flare Gun to call the squad",
            bg: "bg-emerald-950",
            visual: "🪖",
            actionIcon: "🔫",
            storyText: "Late nights in Pochinki. Laughs, friends, and loot. Winning wasn't the goal, talking was."
        },
        {
            id: "lockdown",
            title: "Phase 3: The Connection",
            task: "Tap the phone to pick up the 12-hour call",
            bg: "bg-indigo-950",
            visual: "🌙",
            actionIcon: "📱",
            storyText: "Corona locked the doors, but opened the hearts. Infinite calls, zero distance."
        },
        {
            id: "betrayal",
            title: "Final Phase: The Choice",
            task: "HIT ONE FROM BELOW",
            bg: "bg-red-950",
            visual: "🔪",
            isFinal: true
        }
    ];

    const handleAction = () => {
        setIsActionDone(true);
        // Displaying the story for 4 seconds now (Slightly slower)
        setTimeout(() => {
            if (scene < scenes.length - 1) {
                setScene(scene + 1);
                setIsActionDone(false);
            }
        }, 4000);
    };

    const handleFinalChoice = () => {
        // No matter what, it's always Tushar
        setFinalChoice('Tushar');
    };

    return (
        <div className={`relative h-screen w-full transition-all duration-1000 ${scenes[scene].bg} overflow-hidden select-none text-white font-sans`}>

            {/* BACKGROUND STORY VISUALS */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={scene}
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-[300px] blur-sm pointer-events-none"
                >
                    {scenes[scene].visual}
                </motion.div>
            </AnimatePresence>

            {/* GAME HUD */}
            <div className="absolute top-10 w-full px-10 flex justify-between items-start z-50">
                <div className="space-y-1">
                    <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase font-mono">Memory_Registry</p>
                    <h1 className="text-2xl font-black italic uppercase tracking-tighter">{scenes[scene].title}</h1>
                </div>
                <div className="flex gap-2">
                    {scenes.map((_, i) => (
                        <div key={i} className={`h-1 w-6 rounded-full transition-all duration-500 ${i <= scene ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/20'}`} />
                    ))}
                </div>
            </div>

            {/* MAIN INTERACTION AREA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <AnimatePresence mode="wait">
                    {!isActionDone && !scenes[scene].isFinal && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="space-y-10"
                        >
                            <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={handleAction}
                                className="w-44 h-44 rounded-full bg-white/5 border-2 border-white/30 backdrop-blur-md flex items-center justify-center text-7xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative overflow-hidden group"
                            >
                                <motion.div className="absolute inset-0 bg-white/10 translate-y-full group-active:translate-y-0 transition-transform duration-500" />
                                <span className="relative z-10">{scenes[scene].actionIcon}</span>
                            </motion.button>
                            <div className="space-y-2">
                                <p className="text-xs font-mono tracking-[0.3em] uppercase opacity-60 animate-pulse">{scenes[scene].task}</p>
                            </div>
                        </motion.div>
                    )}

                    {isActionDone && !scenes[scene].isFinal && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-xs space-y-6"
                        >
                            <p className="text-2xl font-serif italic leading-relaxed text-blue-50">
                                {scenes[scene].storyText}
                            </p>
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-4xl"
                            >✨</motion.div>
                        </motion.div>
                    )}

                    {scenes[scene].isFinal && !finalChoice && (
                        <div className="w-full max-w-lg">
                            <motion.div
                                animate={{ y: [0, -15, 0], rotate: [-2, 2, -2] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="text-9xl mb-24 drop-shadow-[0_0_40px_rgba(255,0,0,0.5)]"
                            >
                                🔪
                            </motion.div>
                            <div className="flex justify-around items-center w-full px-4">
                                {/* Man 1 */}
                                <motion.div whileTap={{ scale: 0.8, rotate: -10 }} onClick={handleFinalChoice} className="flex flex-col items-center gap-4 cursor-pointer group">
                                    <div className="text-8xl transition-transform group-hover:scale-110">🧔</div>
                                </motion.div>

                                <div className="h-24 w-[1px] bg-white/10" />

                                {/* Man 2 (Identical Visual) */}
                                <motion.div whileTap={{ scale: 0.8, rotate: 10 }} onClick={handleFinalChoice} className="flex flex-col items-center gap-4 cursor-pointer group">
                                    <div className="text-8xl transition-transform group-hover:scale-110">🧔</div>
                                </motion.div>
                            </div>
                            <p className="mt-16 text-[10px] text-red-600 font-mono tracking-[0.6em] uppercase italic bg-red-600/10 py-2 rounded-full">
                                {scenes[scene].task}
                            </p>
                        </div>
                    )}

                    {finalChoice && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-10 px-4">
                            <div className="space-y-2">
                                <h2 className="text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    GAME OVER
                                </h2>
                                <p className="text-[10px] text-red-500 font-mono tracking-widest uppercase opacity-60">System_Failure: Trust_Corrupted</p>
                            </div>

                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                            <p className="text-3xl font-serif italic text-red-500">
                                Journey was good, but you hit <span className="underline decoration-double uppercase font-black">Tushar</span>.
                            </p>

                            

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="mt-12 px-10 py-4 border border-white/10 bg-white/5 text-[10px] tracking-[0.4em] uppercase rounded-full backdrop-blur-sm"
                            >
                                RELOG_MEMORIES
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* SCREEN OVERLAYS (CRT & Cinematic) */}
            <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute inset-0 pointer-events-none z-[101] shadow-[inset_0_0_150px_black] opacity-80" />
            <motion.div
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 0.1, repeat: Infinity }}
                className="absolute inset-0 pointer-events-none z-[102] bg-white/5 mix-blend-overlay"
            />
        </div>
    );
};

export default InteractiveStoryGame;