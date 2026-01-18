'use client'

import { AnimatePresence, motion } from 'framer-motion'

export function FormErrorAnimate({ message }: { message?: string }) {
  if (!message) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ height: 0, opacity: 0, y: -5 }}
        animate={{ height: "auto", opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <p className="text-[0.8rem] font-medium text-destructive mt-1.5 leading-normal">
          {message}
        </p>
      </motion.div>
    </AnimatePresence>
  )
}
