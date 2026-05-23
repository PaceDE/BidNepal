'use client';
import { useGetMe } from '@/features/auth/api/auth.hooks';
import { ReactNode, useEffect, useRef, useState } from 'react';
import LoadingIntro from '../components/organisms/AppIntro/App.component';
import { AnimatePresence, motion } from 'motion/react';

const MIN_TIME = 3000;

const AuthGuard = ({ children }: { children: ReactNode }) => {
    const { isLoading } = useGetMe();
    const [showLoading, setShowLoading] = useState(false);

    const startTime = useRef(Date.now());

    useEffect(() => {
        if (isLoading) {
            startTime.current = Date.now();
            setShowLoading(true);
        } else {
            const elapsed = Date.now() - startTime.current;
            const remaining = Math.max(MIN_TIME - elapsed, 0);

            setTimeout(() => {
                setShowLoading(false);
            }, remaining);
        }
    }, [isLoading]);

    return (
        <AnimatePresence>
            {isLoading || showLoading ? (
                <motion.div key="introloading" exit={{opacity:0}} className="flex min-h-screen flex-col items-center justify-center bg-white">
                    <LoadingIntro />
                </motion.div>
            ) : (
                <motion.div key="wait" initial={{opacity:0}} animate={{opacity:1}}>
                    {children};
                </motion.div>
            )}
        </AnimatePresence>
    )
};

export default AuthGuard;