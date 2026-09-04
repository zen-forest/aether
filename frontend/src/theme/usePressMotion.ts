import { useReducedMotion } from 'motion/react'

import { pressMotion } from './motion'

const noPressMotion = {}

/** Removes tactile transform feedback when the user requests reduced motion. */
export function usePressMotion() {
  return useReducedMotion() ? noPressMotion : pressMotion
}
