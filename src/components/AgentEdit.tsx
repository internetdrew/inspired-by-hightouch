import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { Typewriter } from 'motion-plus/react';
import { useEffect, useRef, useState } from 'react';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const HEADLINE_APPLY_DELAY = 620;
const HEADLINE_SHIMMER_GRADIENT =
  'linear-gradient(90deg, #171717 0%, #171717 28%, #b2470b 48%, #f59e0b 52%, #171717 72%, #171717 100%)';

const AgentEdit = () => {
  const shouldReduceMotion = useReducedMotion();
  const editPanelRef = useRef<HTMLElement | null>(null);
  const applyTimerRef = useRef<number | null>(null);
  const isEditPanelInView = useInView(editPanelRef, {
    amount: 0.8,
    once: true,
  });

  const [isPromptReady, setIsPromptReady] = useState(false);
  const [headline, setHeadline] = useState<
    '25% Off Everything' | '25% Off Sitewide'
  >('25% Off Everything');
  const [isApplyingPrompt, setIsApplyingPrompt] = useState(false);
  const [headlineUpdated, setHeadlineUpdated] = useState(false);
  const [isAgentPanelSettled, setIsAgentPanelSettled] = useState(false);
  const isPromptActionReady =
    isPromptReady && !isApplyingPrompt && !headlineUpdated;
  const shouldStartPrompt = shouldReduceMotion || isAgentPanelSettled;

  const emailEntranceTransition = {
    type: 'spring' as const,
    duration: 0.92,
    bounce: 0.05,
  };

  const agentEntranceTransition = {
    type: 'spring' as const,
    duration: 0.8,
    bounce: 0.04,
    delay: shouldReduceMotion ? 0 : 0.14,
  };

  const headlineSwapTransition = {
    duration: 0.22,
    ease: EASE_OUT,
  };

  const badgeState = headlineUpdated
    ? 'applied'
    : isPromptReady
      ? 'ready'
      : 'typing';
  const isHeadlineShimmering =
    isApplyingPrompt && !headlineUpdated && !shouldReduceMotion;

  useEffect(() => {
    return () => {
      if (applyTimerRef.current !== null) {
        window.clearTimeout(applyTimerRef.current);
      }
    };
  }, []);

  const handleApplyPrompt = () => {
    if (isApplyingPrompt || headline === '25% Off Sitewide') {
      return;
    }

    setIsApplyingPrompt(true);

    if (shouldReduceMotion) {
      setHeadline('25% Off Sitewide');
      setHeadlineUpdated(true);
      return;
    }

    applyTimerRef.current = window.setTimeout(() => {
      setHeadline('25% Off Sitewide');
      setHeadlineUpdated(true);
      applyTimerRef.current = null;
    }, HEADLINE_APPLY_DELAY);
  };

  return (
    <article
      ref={editPanelRef}
      className='hero-panel relative flex flex-col items-end justify-end rounded-2xl pr-6'
    >
      <motion.div
        id='email'
        initial={
          shouldReduceMotion
            ? false
            : { y: 88, opacity: 0, scale: 0.985, rotate: -0.4 }
        }
        animate={
          shouldReduceMotion || isEditPanelInView
            ? { y: 0, opacity: 1, scale: 1, rotate: 0 }
            : undefined
        }
        transition={emailEntranceTransition}
        className='relative w-5/6 space-y-2 rounded-md bg-white p-4 shadow-[0_18px_45px_rgba(80,98,132,0.14)] lg:w-4/6'
      >
        <div className='flex items-center justify-between border-b border-neutral-200/70 pb-3'>
          <div className='flex items-start gap-8 text-xs md:text-sm'>
            <span className='text-neutral-600'>Subject</span>
            <span className='font-semibold'>25% off everything you love</span>
          </div>
          {/* <span className='hidden rounded-full bg-neutral-100 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-500 sm:inline-flex'>
            Campaign draft
          </span> */}
        </div>
        <div className='flex items-start gap-4 pt-1 text-xs text-neutral-600 md:text-sm'>
          <span>Preheader</span>
          <span>Now&apos;s the time to refresh your rotation</span>
        </div>

        <div className='mt-8 flex flex-col text-center text-base sm:text-lg md:text-xl'>
          <p className='font-serif'>Acme Goods</p>
          <ul className='mx-auto mt-2 flex flex-wrap items-center text-[9px] text-neutral-500 sm:text-[11px] md:text-[12px]'>
            <li className='border-r border-neutral-300 px-2 leading-none'>
              Clothing
            </li>
            <li className='border-r border-neutral-300 px-2 leading-none'>
              Shoes
            </li>
            <li className='border-r border-neutral-300 px-2 leading-none'>
              Accessories
            </li>
            <li className='px-3 leading-none'>Home</li>
          </ul>
        </div>

        <div>
          <div
            className={`mt-8 rounded-xl border px-4 py-4 transition-colors duration-200 ${
              headlineUpdated
                ? 'border-emerald-200 bg-emerald-50/80'
                : isPromptActionReady
                  ? 'border-orange-200 bg-orange-50/85'
                  : 'border-[#edd8c8] bg-[#fcefe3]'
            }`}
          >
            <div className='mb-3 flex items-center justify-between'>
              <span
                className={`rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] ${
                  headlineUpdated
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-white/85 text-neutral-500'
                }`}
              >
                <span className='sm:hidden'>
                  {headlineUpdated ? 'Updated' : 'Headline'}
                </span>
                <span className='hidden sm:inline'>
                  {headlineUpdated ? 'Updated headline' : 'Editable headline'}
                </span>
              </span>
              {/* <span className='hidden text-[10px] font-medium uppercase tracking-[0.08em] text-neutral-400 sm:inline'>
                Hero module
              </span> */}
            </div>

            <div className='relative flex min-h-[1.8em] items-center justify-center overflow-hidden text-center'>
              <AnimatePresence
                mode='wait'
                initial={false}
                onExitComplete={() => setIsApplyingPrompt(false)}
              >
                <motion.p
                  key={headline}
                  className='font-serif text-lg font-medium sm:text-xl md:text-2xl'
                  initial={shouldReduceMotion ? false : { y: -12, opacity: 0 }}
                  animate={
                    isHeadlineShimmering
                      ? {
                          y: 0,
                          opacity: 1,
                          backgroundPosition: ['160% 0', '-60% 0'],
                        }
                      : { y: 0, opacity: 1, backgroundPosition: '160% 0' }
                  }
                  exit={{ y: 12, opacity: 0 }}
                  transition={
                    isHeadlineShimmering
                      ? {
                          backgroundPosition: {
                            duration: HEADLINE_APPLY_DELAY / 1000,
                            ease: 'easeInOut',
                          },
                          y: headlineSwapTransition,
                          opacity: headlineSwapTransition,
                        }
                      : headlineSwapTransition
                  }
                  style={
                    isHeadlineShimmering
                      ? {
                          backgroundImage: HEADLINE_SHIMMER_GRADIENT,
                          backgroundSize: '220% 100%',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent',
                        }
                      : undefined
                  }
                >
                  {headline}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className='mt-2 text-center text-xs font-medium tracking-[0.04em] text-neutral-600 sm:text-sm'>
              Limited Time
            </p>
            <button className='mx-auto mt-4 block rounded-sm bg-[#b2470b] px-3 py-1.5 text-xs font-medium text-white shadow-[0_6px_16px_rgba(178,71,11,0.22)]'>
              Shop the sale
            </button>
          </div>
        </div>
      </motion.div>

      {/* The AI Interface */}
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { y: 44, opacity: 0, scale: 0.97, rotate: -0.3 }
        }
        animate={
          shouldReduceMotion || isEditPanelInView
            ? { y: 0, opacity: 1, scale: 1, rotate: 0 }
            : undefined
        }
        transition={agentEntranceTransition}
        onAnimationComplete={() => setIsAgentPanelSettled(true)}
        className='absolute bottom-44 left-4 w-[calc(100%-2.5rem)] max-w-72 rounded-xl border border-slate-200/85 bg-white/95 shadow-[0_18px_50px_rgba(72,89,120,0.2)] backdrop-blur-[6px] md:bottom-12'
      >
        <div className='flex items-center justify-between border-b border-slate-200/80 px-4 py-3'>
          <div>
            <p className='hidden text-[10px] font-medium uppercase tracking-widest text-sky-600 sm:block'>
              Agent action
            </p>
            <p className='mt-1 text-xs font-semibold text-slate-900'>
              Edit with agent
            </p>
          </div>
          <motion.span
            layout
            animate={
              badgeState === 'applied'
                ? {
                    backgroundColor: 'rgba(220, 252, 231, 1)',
                    color: 'rgba(4, 120, 87, 1)',
                  }
                : badgeState === 'ready'
                  ? {
                      backgroundColor: 'rgba(224, 242, 254, 1)',
                      color: 'rgba(3, 105, 161, 1)',
                    }
                  : {
                      backgroundColor: 'rgba(245, 245, 245, 1)',
                      color: 'rgba(115, 115, 115, 1)',
                    }
            }
            transition={{
              layout: { duration: 0.18 },
              duration: 0.18,
              ease: EASE_OUT,
            }}
            className='inline-flex overflow-hidden rounded-full px-2 py-1 text-[10px] font-medium'
          >
            <AnimatePresence mode='popLayout' initial={false}>
              <motion.span
                key={badgeState}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.16, ease: EASE_OUT }}
                className='relative whitespace-nowrap'
              >
                {badgeState === 'applied'
                  ? 'Applied'
                  : badgeState === 'ready'
                    ? 'Ready'
                    : 'Typing'}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </div>
        <div className='m-3 rounded-lg border border-slate-200/90 bg-slate-50/85 p-3 text-xs text-slate-600'>
          <p className='mb-2 hidden text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400 sm:block'>
            Prompt
          </p>
          <div className='min-h-10'>
            {shouldStartPrompt ? (
              <Typewriter
                speed='fast'
                cursorStyle={cursor}
                onComplete={() => setIsPromptReady(true)}
              >
                Change the headline to "25% Off Sitewide"
              </Typewriter>
            ) : null}
          </div>
        </div>
        <div className='flex items-center justify-end gap-3 px-3 pb-3 sm:justify-between'>
          <p className='hidden text-[11px] leading-relaxed text-slate-500 sm:block'>
            Update the hero headline without rewriting the rest of the email.
          </p>
          <button
            type='button'
            onClick={handleApplyPrompt}
            disabled={!isPromptActionReady}
            aria-label='Apply prompt to email headline'
            className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium shadow-[0_0_0_1px_rgba(15,23,42,0.08)] transition-all duration-200 ease-out active:scale-[0.97] ${
              isPromptActionReady
                ? 'cursor-pointer bg-slate-900 text-white'
                : isPromptReady || shouldReduceMotion
                  ? 'pointer-events-none bg-neutral-100 text-neutral-400'
                  : 'pointer-events-none translate-y-1 bg-neutral-100 text-neutral-400 opacity-0'
            }`}
          >
            Apply
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
              className='size-3.5'
            >
              <path d='M5 12h14' />
              <path d='m12 5 7 7-7 7' />
            </svg>
          </button>
        </div>
      </motion.div>
    </article>
  );
};

const cursor: React.CSSProperties = {
  background: '#ff0088',
  width: 1.5,
};

export default AgentEdit;
