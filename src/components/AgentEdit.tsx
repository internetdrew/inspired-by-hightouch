import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { Typewriter } from 'motion-plus/react';
import { useRef, useState } from 'react';

const AgentEdit = () => {
  const shouldReduceMotion = useReducedMotion();
  const editPanelRef = useRef<HTMLElement | null>(null);
  const isEditPanelInView = useInView(editPanelRef, {
    amount: 0.5,
    once: true,
  });

  const [isPromptReady, setIsPromptReady] = useState(false);
  const [headline, setHeadline] = useState<
    '25% Off Everything' | '25% Off Sitewide'
  >('25% Off Everything');
  const [isApplyingPrompt, setIsApplyingPrompt] = useState(false);
  const [headlineUpdated, setHeadlineUpdated] = useState(false);

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
  const handleApplyPrompt = () => {
    if (isApplyingPrompt || headline === '25% Off Sitewide') {
      return;
    }

    setIsApplyingPrompt(true);
    setHeadline('25% Off Sitewide');
    setHeadlineUpdated(true);
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
        className='bg-white p-4 rounded-md w-4/6 space-y-2'
      >
        <div className='text-xs flex items-start gap-8 md:text-sm'>
          <span className='text-neutral-600'>Subject</span>
          <span className='font-semibold'>25% off everything you love</span>
        </div>
        <div className='text-xs flex items-start gap-4 text-neutral-600 md:text-sm'>
          <span>Preheader</span>
          <span>Now's the time to refresh your rotation</span>
        </div>

        <div className='text-center flex flex-col mt-8 text-base sm:text-lg md:text-xl'>
          <p className='font-serif'>Acme Goods</p>
          <ul className='flex items-center mx-auto text-[7px] mt-1 flex-wrap wrap-break-word sm:text-[12px] md:text-[14px]'>
            <li className='border-r border-neutral-400 px-2 leading-none'>
              Clothing
            </li>
            <li className='border-r border-neutral-400 px-2 leading-none'>
              Shoes
            </li>
            <li className='border-r border-neutral-400 px-2 leading-none'>
              Accessories
            </li>
            <li className='px-3 leading-none'>Home</li>
          </ul>
        </div>

        <div>
          <div className='w-full bg-[#fcefe3] mt-8 grid place-items-center py-4'>
            <div className='relative flex min-h-[1.6em] items-center justify-center overflow-hidden'>
              <AnimatePresence
                mode='wait'
                initial={false}
                onExitComplete={() => setIsApplyingPrompt(false)}
              >
                <motion.p
                  key={headline}
                  className='font-serif font-medium sm:text-lg md:text-xl'
                  initial={{ y: -14, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: 14, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {headline}
                </motion.p>
              </AnimatePresence>
            </div>
            <p className='text-xs font-medium sm:text-sm'>Limtied Time</p>
            <button className='mt-4 bg-[#b2470b] font-medium px-2 py-1 text-xs text-white'>
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
        className='bg-white absolute bottom-44 left-4 rounded-lg shadow w-64 md:bottom-12'
      >
        <p className='font-semibold text-xs p-3 border-b border-neutral-300/20'>
          Edit with agent
        </p>
        <div className='border border-neutral-300 text-xs text-neutral-500 p-2 m-3 rounded-md flex items-center gap-4 h-12'>
          <div className='flex-1 self-start'>
            <Typewriter
              speed='fast'
              cursorStyle={cursor}
              onComplete={() => setIsPromptReady(true)}
            >
              Change the headline to "25% Off Sitewide"
            </Typewriter>
          </div>
          <button
            type='button'
            onClick={handleApplyPrompt}
            disabled={!isPromptReady || isApplyingPrompt || headlineUpdated}
            aria-label='Apply prompt to email headline'
            className={`mr-2 inline-flex items-center justify-center rounded-md p-1.5 transition-all duration-200 ease-out shadow-[0_0_0_1px_rgba(0,0,0,0.08)] ${
              isPromptReady
                ? 'translate-y-0 opacity-100 text-neutral-700  hover:scale-105 hover:text-black'
                : 'pointer-events-none opacity-0 text-neutral-400'
            } ${headline === '25% Off Sitewide' ? 'bg-neutral-100' : 'bg-white animate-pulse'}`}
          >
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
              className='size-4 fill-current'
            >
              <path d='M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z' />
              <path d='M6 12h16' />
            </svg>
          </button>
        </div>
        <p
          className={`px-3 pb-3 text-[11px] font-medium text-neutral-500 transition-all duration-200 ease-out ${
            isPromptReady
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-1 opacity-0'
          }`}
        >
          Click the arrow to apply the prompt.
        </p>
      </motion.div>
    </article>
  );
};

const cursor: React.CSSProperties = {
  background: '#ff0088',
  width: 1.5,
};

export default AgentEdit;
