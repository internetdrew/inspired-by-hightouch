import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import AgentEdit from './components/AgentEdit';

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
  type: 'spring' as const,
  stiffness: 360,
  damping: 30,
};

type ReviewState =
  | 'processing-initial'
  | 'issue'
  | 'processing-fix'
  | 'approved';

type ReviewBadgeState = 'processing' | 'approved';

type FollowUpReviewRow = {
  id: 'brand-pre-review' | 'sam-brand' | 'maria-legal';
  label: string;
  icon: React.ReactNode;
  badgeState: ReviewBadgeState;
};

const REVIEW_ROW_APPEARANCE = {
  legalAgents: {
    iconShell:
      'bg-orange-200/30 ring-orange-300/40 text-neutral-700',
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

function App() {
  const shouldReduceMotion = useReducedMotion();
  const reviewPanelRef = useRef<HTMLElement | null>(null);
  const reviewTimerRefs = useRef<number[]>([]);
  const [reviewState, setReviewState] =
    useState<ReviewState>('processing-initial');
  const [followUpStage, setFollowUpStage] = useState(0);

  const isReviewPanelInView = useInView(reviewPanelRef, {
    amount: 0.5,
    once: true,
  });
  const activeReviewState =
    shouldReduceMotion &&
    isReviewPanelInView &&
    reviewState === 'processing-initial'
      ? 'issue'
      : reviewState;
  const reviewBadgeState =
    activeReviewState === 'approved' ? 'approved' : 'processing';
  const isReviewProcessing =
    isReviewPanelInView &&
    (activeReviewState === 'processing-initial' ||
      activeReviewState === 'processing-fix');
  const showMissingEndDate =
    isReviewPanelInView && activeReviewState === 'issue';
  const followUpRows: FollowUpReviewRow[] = [
    {
      id: 'brand-pre-review',
      label: 'Brand pre-review agents',
      icon: '🤖',
      badgeState: followUpStage >= 2 ? 'approved' : 'processing',
    },
    {
      id: 'sam-brand',
      label: 'Sam (Brand)',
      icon: 'SR',
      badgeState: followUpStage >= 5 ? 'approved' : 'processing',
    },
    {
      id: 'maria-legal',
      label: 'Maria (Legal)',
      icon: 'MG',
      badgeState: followUpStage >= 6 ? 'approved' : 'processing',
    },
  ];
  const visibleFollowUpRows = followUpRows.filter((row) => {
    if (row.id === 'brand-pre-review') {
      return followUpStage >= 1;
    }

    if (row.id === 'sam-brand') {
      return followUpStage >= 3;
    }

    return followUpStage >= 4;
  });

  const clearReviewTimers = () => {
    reviewTimerRefs.current.forEach((timerId) => window.clearTimeout(timerId));
    reviewTimerRefs.current = [];
  };

  useEffect(() => {
    return () => {
      clearReviewTimers();
    };
  }, []);

  useEffect(() => {
    if (activeReviewState !== 'approved' || followUpStage > 0) {
      return;
    }

    const timing = shouldReduceMotion
      ? [120, 360, 460, 540, 760, 860]
      : [200, 620, 760, 860, 1120, 1240];

    reviewTimerRefs.current = timing.map((delay, index) =>
      window.setTimeout(() => {
        setFollowUpStage(index + 1);
      }, delay),
    );

    return () => {
      clearReviewTimers();
    };
  }, [activeReviewState, shouldReduceMotion]);

  const handleFixIssue = () => {
    clearReviewTimers();
    setFollowUpStage(0);

    setReviewState('processing-fix');

    if (shouldReduceMotion) {
      const timerId = window.setTimeout(() => {
        setReviewState('approved');
        reviewTimerRefs.current = reviewTimerRefs.current.filter(
          (existingTimerId) => existingTimerId !== timerId,
        );
      }, 900);

      reviewTimerRefs.current = [timerId];
    }
  };

  return (
    <div className='page-shell px-2 py-12 space-y-24'>
      <div className='mx-auto text-center mt-20 mb-28'>
        <h1 className='text-2xl font-semibold mx-auto sm:max-w-1/2 md:text-3xl'>
          Directed by marketers, <br />
          delivered by agents
        </h1>
        <p className='font-light mt-4 sm:max-w-1/2 mx-auto'>
          Whether you're working on a net-new idea or creating 100 variations of
          one asset, Content Assembly makes it easy to scale your marketing.
        </p>
      </div>
      <div className='flex flex-col items-center gap-4 max-w-7xl sm:flex-row-reverse sm:gap-12'>
        <div>
          <p className='text-center font-semibold text-lg max-w-3/4 mx-auto sm:text-start sm:mx-0'>
            Edit outputs using AI prompts and manual tools
          </p>
          <p className='text-center text-sm font-light mt-2 mx-auto max-w-3/4 sm:text-start sm:mx-0'>
            Change image backgrounds, edit burned-in text, update copy, and
            more, without making a single request from your design team.
          </p>
        </div>
        <AgentEdit />
      </div>

      <div className='flex flex-col max-w-7xl items-center gap-4 sm:flex-row sm:gap-12'>
        <div>
          <p className='text-center font-semibold text-lg max-w-3/4 mx-auto sm:text-start sm:mx-0'>
            Kickstart the review process with custom legal and brand agents
          </p>
          <p className='text-center text-sm font-light mt-2 mx-auto max-w-3/4 sm:text-start sm:mx-0'>
            Ensure content compliance with legal and brand agents, trained on
            your business guidelines. When ready, send directly to your team for
            the final call.
          </p>
        </div>

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
              <div className='space-y-3'>
                <ReviewStatusRow
                  icon='🤖'
                  iconShellClassName={REVIEW_ROW_APPEARANCE.legalAgents.iconShell}
                  label='Legal pre-review agents'
                  badgeState={reviewBadgeState}
                  isProcessing={isReviewProcessing}
                  onProcessingComplete={() => {
                    if (!shouldReduceMotion && isReviewPanelInView) {
                      if (activeReviewState === 'processing-initial') {
                        setReviewState('issue');
                      }

                      if (activeReviewState === 'processing-fix') {
                        setReviewState('approved');
                      }
                    }
                  }}
                />
                <AnimatePresence initial={false}>
                  {visibleFollowUpRows.map((row) => (
                    <motion.div
                      key={row.id}
                      layout
                      initial={
                        shouldReduceMotion
                          ? false
                          : { opacity: 0, y: 8, scale: 0.985 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.985 }}
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
                        badgeState={row.badgeState}
                        isProcessing={row.badgeState === 'processing'}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <AnimatePresence initial={false}>
                {showMissingEndDate ? (
                  <motion.div
                    key='missing-end-date'
                    layout
                    initial={
                      shouldReduceMotion
                        ? false
                        : { height: 0, opacity: 0, marginTop: 0 }
                    }
                    animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{
                      height: reviewLayoutSpring,
                      opacity: { duration: 0.2, ease: 'easeOut' },
                      marginTop: reviewLayoutSpring,
                      layout: reviewLayoutSpring,
                    }}
                    className='overflow-hidden'
                  >
                    <motion.div
                      layout
                      initial={
                        shouldReduceMotion
                          ? false
                          : { y: 10, scale: 0.985, filter: 'blur(4px)' }
                      }
                      animate={{ y: 0, scale: 1, filter: 'blur(0px)' }}
                      transition={{
                        ...reviewPanelSpring,
                        duration: 0.28,
                      }}
                      className='rounded-md p-3 text-xs border border-red-500/20 bg-red-400/10 mx-2'
                    >
                      <div className='flex items-center justify-between'>
                        <p className='font-medium text-red-600'>
                          Missing end date
                        </p>
                        <span className='ring ring-red-500/20 text-[10px] text-red-600 rounded-full px-1.5 py-0.5'>
                          Legal AI
                        </span>
                      </div>

                      <p className='my-4 text-red-600'>
                        The offer doesn't state when it ends, which can create
                        confusion and compliance risk.
                      </p>

                      <div className='flex items-center gap-2'>
                        <button
                          type='button'
                          onClick={handleFixIssue}
                          className='cursor-pointer bg-white ring ring-neutral-200/50 px-2 py-1 rounded-sm'
                        >
                          Fix
                        </button>
                        <button disabled>Ignore</button>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}

export default App;

function ReviewStatusRow({
  icon,
  iconShellClassName,
  label,
  badgeState,
  isProcessing,
  onProcessingComplete,
}: {
  icon: React.ReactNode;
  iconShellClassName: string;
  label: string;
  badgeState: ReviewBadgeState;
  isProcessing: boolean;
  onProcessingComplete?: () => void;
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
      <ReviewBadge
        badgeState={badgeState}
        isProcessing={isProcessing}
        onProcessingComplete={onProcessingComplete}
      />
    </div>
  );
}

function ReviewBadge({
  badgeState,
  isProcessing,
  onProcessingComplete,
}: {
  badgeState: ReviewBadgeState;
  isProcessing: boolean;
  onProcessingComplete?: () => void;
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
                filter: 'blur(4px)',
              }}
              animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                y: 10,
                opacity: 0,
                scale: 0.75,
                filter: 'blur(4px)',
              }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
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
                          repeat: 1,
                        }
                      : { duration: 0.2, ease: 'easeOut' }
                  }
                  onAnimationComplete={() => {
                    if (isProcessing) {
                      onProcessingComplete?.();
                    }
                  }}
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
                filter: 'blur(4px)',
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
              }}
              exit={{
                y: 10,
                opacity: 0,
                filter: 'blur(4px)',
              }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
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
