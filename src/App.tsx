import { motion, useInView, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import AgentEdit from './components/AgentEdit';

function App() {
  const shouldReduceMotion = useReducedMotion();
  const reviewPanelRef = useRef<HTMLElement | null>(null);

  const isReviewPanelInView = useInView(reviewPanelRef, {
    amount: 0.5,
    once: true,
  });

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
              type: 'spring',
              duration: 0.8,
              bounce: 0.04,
              delay: shouldReduceMotion ? 0 : 0.14,
            }}
            className='bg-white w-full mx-auto rounded-lg shadow sm:w-3/4'
          >
            <p className='font-semibold text-xs p-3 border-b border-neutral-300/20'>
              Review
            </p>
            <div className='p-6'>
              <div className='flex items-center gap-2 text-xs'>
                <span className='inline-flex size-6 items-center justify-center bg-orange-200/30 rounded-full ring ring-orange-300/40'>
                  🤖
                </span>
                <span className='font-medium'>Legal pre-review agents</span>
                <span className='inline-flex items-center gap-0.5 bg-neutral-100 ring ring-neutral-200 px-1.5 py-0.5 rounded-full'>
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
                    className='size-3 text-neutral-400'
                  >
                    <path d='M10.1 2.18a9.93 9.93 0 0 1 3.8 0' />
                    <path d='M17.6 3.71a9.95 9.95 0 0 1 2.69 2.7' />
                    <path d='M21.82 10.1a9.93 9.93 0 0 1 0 3.8' />
                    <path d='M20.29 17.6a9.95 9.95 0 0 1-2.7 2.69' />
                    <path d='M13.9 21.82a9.94 9.94 0 0 1-3.8 0' />
                    <path d='M6.4 20.29a9.95 9.95 0 0 1-2.69-2.7' />
                    <path d='M2.18 13.9a9.93 9.93 0 0 1 0-3.8' />
                    <path d='M3.71 6.4a9.95 9.95 0 0 1 2.7-2.69' />
                    <circle cx='12' cy='12' r='1' />
                  </svg>
                  Processing
                </span>
              </div>
              <div className='mt-4 rounded-md p-3 text-xs border border-red-500/20 bg-red-400/10 mx-2'>
                <div className='flex items-center justify-between'>
                  <p className='font-medium text-red-600'>Missing end date</p>
                  <span className='ring ring-red-500/20 text-[10px] text-red-600 rounded-full px-1.5 py-0.5'>
                    Legal AI
                  </span>
                </div>

                <p className='mt-4 text-red-600'>
                  The offer doesn't state when it ends, which can create
                  confusion and compliance risk.
                </p>

                <div className='flex items-center gap-1 mt-2'>
                  <button className='cursor-pointer bg-white ring ring-neutral-200/50 px-2 py-1 rounded-sm'>
                    Fix
                  </button>
                  <button disabled>Ignore</button>
                </div>
              </div>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}

export default App;
