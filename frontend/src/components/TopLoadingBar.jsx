// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export const TopLoadingBar = () => (
    <div className="fixed top-0 left-0 right-0 h-1.5 z-100 overflow-hidden pointer-events-none">
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-full h-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500"
            style={{ backgroundSize: '50% 100%' }}
        />
    </div>
);