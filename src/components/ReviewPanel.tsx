import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   waiting for review panel to enter view
 *  320ms   legal pre-review begins processing
 * 1020ms   missing end date issue appears
 *    —    user clicks Fix
 *  700ms   legal pre-review reprocesses
 * 1020ms   legal pre-review is approved
 * 1340ms   brand pre-review appears approved
 * 1940ms   Sam (Brand) appears approved
 * 2100ms   Maria (Legal) appears approved
 * ───────────────────────────────────────────────────────── */

const reviewPanelSpring = {
  type: 'spring' as const,
  duration: 0.8,
  bounce: 0.04,
};

const reviewLayoutSpring = {
  type: 'spring' as const,
  stiffness: 340,
  damping: 32,
};

const REVIEW_ROW_ENTER_TRANSITION = {
  duration: 0.24,
  ease: [0.23, 1, 0.32, 1] as const,
};

const ISSUE_CARD_TRANSITION = {
  duration: 0.24,
  ease: [0.23, 1, 0.32, 1] as const,
};

const BADGE_SWAP_TRANSITION = {
  duration: 0.18,
  ease: [0.23, 1, 0.32, 1] as const,
};

const TIMING = {
  legalInitialReview: 980,
  legalFixReview: 700,
  brandApproval: 320,
  samApproval: 600,
  mariaApproval: 160,
  reducedMotionPause: 120,
} as const;

const STAGE = {
  idle: 0,
  legalProcessingInitial: 1,
  issueVisible: 2,
  legalProcessingFix: 3,
  legalApproved: 4,
  brandApproved: 5,
  samApproved: 6,
  mariaApproved: 7,
} as const;

type ReviewStage = (typeof STAGE)[keyof typeof STAGE];
type ReviewBadgeState = 'processing' | 'approved';

type FollowUpReviewRow = {
  id: 'brand-pre-review' | 'sam-brand' | 'maria-legal';
  label: string;
  icon: React.ReactNode;
};

const REVIEW_ROW_APPEARANCE = {
  legalAgents: {
    iconShell: 'bg-orange-200/30 ring-orange-300/40 text-neutral-700',
  },
  brandAgents: {
    iconShell: 'bg-sky-200/35 ring-sky-300/45 text-sky-700',
  },
  sam: {
    iconShell: 'bg-amber-200/40 ring-amber-300/50 text-amber-800',
  },
  maria: {
    iconShell: 'bg-emerald-200/40 ring-emerald-300/50 text-emerald-800',
  },
} as const;

const ReviewPanel = () => {
  const shouldReduceMotion = useReducedMotion();
  const reviewPanelRef = useRef<HTMLElement | null>(null);
  const reviewTimerRef = useRef<number | null>(null);
  const [stage, setStage] = useState<ReviewStage>(STAGE.idle);

  const isReviewPanelInView = useInView(reviewPanelRef, {
    amount: 0.5,
    once: true,
  });
  const reviewBadgeState: ReviewBadgeState =
    stage >= STAGE.legalApproved ? 'approved' : 'processing';
  const isReviewProcessing =
    stage === STAGE.legalProcessingInitial ||
    stage === STAGE.legalProcessingFix;
  const showMissingEndDate = stage === STAGE.issueVisible;
  const followUpRows: FollowUpReviewRow[] = [
    {
      id: 'brand-pre-review',
      label: 'Brand pre-review agents',
      icon: '🤖',
    },
    {
      id: 'sam-brand',
      label: 'Sam (Brand)',
      icon: 'SR',
    },
    {
      id: 'maria-legal',
      label: 'Maria (Legal)',
      icon: 'MG',
    },
  ];
  const visibleFollowUpRows = followUpRows.filter(row => {
    if (row.id === 'brand-pre-review') {
      return stage >= STAGE.brandApproved;
    }

    if (row.id === 'sam-brand') {
      return stage >= STAGE.samApproved;
    }

    return stage >= STAGE.mariaApproved;
  });

  useEffect(() => {
    return () => {
      if (reviewTimerRef.current !== null) {
        window.clearTimeout(reviewTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reviewTimerRef.current !== null) {
      window.clearTimeout(reviewTimerRef.current);
      reviewTimerRef.current = null;
    }

    const transitions: Partial<
      Record<ReviewStage, { delay: number; nextStage: ReviewStage }>
    > = shouldReduceMotion
      ? {
          [STAGE.idle]: isReviewPanelInView
            ? {
                delay: 0,
                nextStage: STAGE.issueVisible,
              }
            : undefined,
          [STAGE.legalProcessingFix]: {
            delay: TIMING.reducedMotionPause,
            nextStage: STAGE.legalApproved,
          },
          [STAGE.legalApproved]: {
            delay: TIMING.reducedMotionPause,
            nextStage: STAGE.brandApproved,
          },
          [STAGE.brandApproved]: {
            delay: TIMING.reducedMotionPause,
            nextStage: STAGE.samApproved,
          },
          [STAGE.samApproved]: {
            delay: TIMING.reducedMotionPause,
            nextStage: STAGE.mariaApproved,
          },
        }
      : {
          [STAGE.idle]: isReviewPanelInView
            ? {
                delay: 0,
                nextStage: STAGE.legalProcessingInitial,
              }
            : undefined,
          [STAGE.legalProcessingInitial]: {
            delay: TIMING.legalInitialReview,
            nextStage: STAGE.issueVisible,
          },
          [STAGE.legalProcessingFix]: {
            delay: TIMING.legalFixReview,
            nextStage: STAGE.legalApproved,
          },
          [STAGE.legalApproved]: {
            delay: TIMING.brandApproval,
            nextStage: STAGE.brandApproved,
          },
          [STAGE.brandApproved]: {
            delay: TIMING.samApproval,
            nextStage: STAGE.samApproved,
          },
          [STAGE.samApproved]: {
            delay: TIMING.mariaApproval,
            nextStage: STAGE.mariaApproved,
          },
        };

    const transition = transitions[stage];
    if (!transition) {
      return;
    }

    reviewTimerRef.current = window.setTimeout(() => {
      setStage(transition.nextStage);
      reviewTimerRef.current = null;
    }, transition.delay);

    return () => {
      if (reviewTimerRef.current !== null) {
        window.clearTimeout(reviewTimerRef.current);
        reviewTimerRef.current = null;
      }
    };
  }, [isReviewPanelInView, shouldReduceMotion, stage]);

  const handleFixIssue = () => {
    if (reviewTimerRef.current !== null) {
      window.clearTimeout(reviewTimerRef.current);
      reviewTimerRef.current = null;
    }

    setStage(
      shouldReduceMotion ? STAGE.legalApproved : STAGE.legalProcessingFix,
    );
  };

  return (
    <article
      ref={reviewPanelRef}
      className='hero-panel relative rounded-2xl grid place-items-center px-4'
    >
      <motion.div
        layout
        initial={
          shouldReduceMotion
            ? false
            : { y: 44, opacity: 0, scale: 0.97, rotate: -0.3 }
        }
        animate={
          shouldReduceMotion || isReviewPanelInView
            ? { y: 0, opacity: 1, scale: 1, rotate: 0 }
            : undefined
        }
        transition={{
          ...reviewPanelSpring,
          delay: shouldReduceMotion ? 0 : 0.14,
          layout: reviewLayoutSpring,
        }}
        className='bg-white w-full mx-auto rounded-lg shadow sm:w-3/4'
      >
        <p className='font-semibold text-xs p-3 border-b border-neutral-300/20'>
          Review
        </p>
        <motion.div layout className='p-6'>
          <div>
            <ReviewStatusRow
              icon='🤖'
              iconShellClassName={REVIEW_ROW_APPEARANCE.legalAgents.iconShell}
              label='Legal pre-review agents'
              badgeState={reviewBadgeState}
              isProcessing={isReviewProcessing}
            />
          </div>
          <div className='relative mt-4 min-h-30'>
            <AnimatePresence initial={false} mode='popLayout'>
              {showMissingEndDate ? (
                <motion.div
                  key='missing-end-date'
                  layout
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 12,
                          scale: 0.97,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                    scale: 0.98,
                  }}
                  transition={{
                    opacity: ISSUE_CARD_TRANSITION,
                    y: ISSUE_CARD_TRANSITION,
                    scale: ISSUE_CARD_TRANSITION,
                  }}
                  className='relative overflow-hidden rounded-md border border-red-500/20 bg-red-400/10 p-3 pl-4 text-xs shadow-[0_10px_30px_rgba(239,68,68,0.08)]'
                >
                  <span
                    aria-hidden='true'
                    className='absolute inset-y-3 left-0 w-1 rounded-full bg-red-500'
                  />
                  <div className='flex items-center justify-between'>
                    <p className='font-medium text-red-600'>Missing end date</p>
                    <span className='rounded-full bg-white/80 px-1.5 py-0.5 text-[10px] text-red-600 ring ring-red-500/15'>
                      Legal AI
                    </span>
                  </div>

                  {/* <p className='mt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-red-500/80'>
                    Review paused until resolved
                  </p> */}

                  <p className='my-3 text-red-700'>
                    The offer doesn't state when it ends, which can create
                    confusion and compliance risk.
                  </p>

                  <div className='flex items-center gap-2'>
                    <motion.button
                      type='button'
                      onClick={handleFixIssue}
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, y: 6, scale: 0.98 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        ...ISSUE_CARD_TRANSITION,
                        delay: shouldReduceMotion ? 0 : 0.08,
                      }}
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 }
                      }
                      className='cursor-pointer rounded-sm bg-red-600 px-2.5 py-1.5 font-medium text-white shadow-sm transition-transform duration-150 ease-out hover:scale-[1.02] focus:outline-none active:scale-[0.97]'
                    >
                      Fix issue
                    </motion.button>
                    <button
                      type='button'
                      disabled
                      className='text-neutral-500 opacity-60'
                    >
                      Ignore
                    </button>
                  </div>
                </motion.div>
              ) : visibleFollowUpRows.length > 0 ? (
                <motion.div
                  key='follow-up-reviews'
                  layout
                  className='space-y-3'
                >
                  <AnimatePresence initial={false}>
                    {visibleFollowUpRows.map(row => (
                      <motion.div
                        key={row.id}
                        layout
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 8,
                                scale: 0.985,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                          scale: 0.985,
                        }}
                        transition={REVIEW_ROW_ENTER_TRANSITION}
                      >
                        <ReviewStatusRow
                          icon={row.icon}
                          iconShellClassName={
                            row.id === 'brand-pre-review'
                              ? REVIEW_ROW_APPEARANCE.brandAgents.iconShell
                              : row.id === 'sam-brand'
                                ? REVIEW_ROW_APPEARANCE.sam.iconShell
                                : REVIEW_ROW_APPEARANCE.maria.iconShell
                          }
                          label={row.label}
                          badgeState='approved'
                          isProcessing={false}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </article>
  );
};

function ReviewStatusRow({
  icon,
  iconShellClassName,
  label,
  badgeState,
  isProcessing,
}: {
  icon: React.ReactNode;
  iconShellClassName: string;
  label: string;
  badgeState: ReviewBadgeState;
  isProcessing: boolean;
}) {
  return (
    <div className='flex items-center gap-2 text-xs'>
      <span
        className={`inline-flex size-6 items-center justify-center rounded-full ring ${iconShellClassName}`}
      >
        {typeof icon === 'string' && icon.length <= 2 ? (
          <span className='text-[10px] font-semibold tracking-[0.02em]'>
            {icon}
          </span>
        ) : (
          icon
        )}
      </span>
      <span className='font-medium'>{label}</span>
      <ReviewBadge badgeState={badgeState} isProcessing={isProcessing} />
    </div>
  );
}

function ReviewBadge({
  badgeState,
  isProcessing,
}: {
  badgeState: ReviewBadgeState;
  isProcessing: boolean;
}) {
  return (
    <motion.span
      layout
      className={`inline-flex items-center overflow-hidden rounded-full px-1.5 py-0.5 ring ${
        badgeState === 'approved'
          ? 'bg-green-50 text-green-700 ring-green-200'
          : 'bg-neutral-100 text-neutral-600 ring-neutral-200'
      }`}
      transition={{ layout: reviewLayoutSpring }}
    >
      <motion.span
        layout
        transition={{ layout: reviewLayoutSpring }}
        className='inline-flex items-center gap-1'
      >
        <motion.span
          animate={{ width: 12 }}
          transition={reviewLayoutSpring}
          className='relative inline-flex h-3 items-center justify-center overflow-hidden'
        >
          <AnimatePresence initial={false} mode='popLayout'>
            <motion.span
              key={badgeState}
              initial={{
                y: -10,
                opacity: 0,
                scale: 0.75,
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              exit={{
                y: 10,
                opacity: 0,
                scale: 0.75,
              }}
              transition={BADGE_SWAP_TRANSITION}
              className='absolute inset-0 flex items-center justify-center'
            >
              {badgeState === 'approved' ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='size-3'
                >
                  <circle cx='12' cy='12' r='10' />
                  <path d='m9 12 2 2 4-4' />
                </svg>
              ) : (
                <motion.span
                  aria-hidden='true'
                  className='size-3 rounded-full border border-neutral-300 border-t-neutral-500'
                  animate={isProcessing ? { rotate: 360 } : { rotate: 0 }}
                  transition={
                    isProcessing
                      ? {
                          duration: 0.7,
                          ease: 'linear',
                          repeat: Infinity,
                        }
                      : { duration: 0.2, ease: 'easeOut' }
                  }
                />
              )}
            </motion.span>
          </AnimatePresence>
        </motion.span>
        <motion.span
          layout
          className='relative inline-flex overflow-hidden text-[11px] font-medium'
          transition={{ layout: reviewLayoutSpring }}
        >
          <AnimatePresence initial={false} mode='popLayout'>
            <motion.span
              key={badgeState}
              initial={{
                y: -10,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 10,
                opacity: 0,
              }}
              transition={BADGE_SWAP_TRANSITION}
              className='relative whitespace-nowrap'
            >
              {badgeState === 'approved' ? 'Approved' : 'Processing'}
            </motion.span>
          </AnimatePresence>
        </motion.span>
      </motion.span>
    </motion.span>
  );
}

export default ReviewPanel;
