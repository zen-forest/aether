/**
 * Aether motion primitives.
 *
 * Use spring motion only for direct manipulation. Use short, cancellable CSS
 * transitions for state changes and Base UI popup mount/unmount lifecycles.
 * Durations are seconds for Motion; the shared class recipes below use the
 * equivalent Tailwind millisecond utilities.
 */
export const motionDurations = {
  feedback: 0.1,
  overlay: 0.15,
  spatial: 0.2,
} as const

export const motionEasings = {
  enter: [0, 0, 0.2, 1],
  standard: [0.2, 0, 0, 1],
  exit: [0.4, 0, 1, 1],
} as const

/** A quick, highly damped spring: tactile without calling attention to itself. */
export const pressSpring = {
  type: 'spring',
  stiffness: 500,
  damping: 28,
  mass: 0.5,
} as const

/** Shared Motion props for buttons and compact binary controls. */
export const pressMotion = {
  whileTap: { scale: 0.97 },
  transition: pressSpring,
} as const

/** Base UI popup lifecycle: fade and scale from its computed transform origin. */
export const popupMotionClasses =
  'transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-none data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0'

/**
 * Select's item-aligned (`data-side=\"none\"`) mode behaves like a native
 * picker and must not scale around a floating origin. Other placements use
 * the standard anchored-popup recipe.
 */
export const selectPopupMotionClasses = `${popupMotionClasses} data-[side=none]:translate-y-px data-[side=none]:data-[ending-style]:scale-100 data-[side=none]:data-[ending-style]:opacity-100 data-[side=none]:data-[ending-style]:transition-none data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none`

/** Dialogs travel slightly farther than anchored popups because they change context. */
export const dialogMotionClasses =
  'transition-[opacity,scale] duration-150 ease-out motion-reduce:transition-none data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0'

export const backdropMotionClasses =
  'transition-opacity duration-150 ease-out motion-reduce:transition-none data-[starting-style]:opacity-0 data-[ending-style]:opacity-0'

/** Small visual state changes: color, thumb translation, checks, and disclosure icons. */
export const stateMotionClasses =
  'duration-150 ease-out motion-reduce:transition-none'

/** Position changes that need enough time to remain legible, such as a tab indicator. */
export const spatialMotionClasses =
  'duration-200 ease-out motion-reduce:transition-none'
