import { Typewriter } from 'motion-plus/react';

function App() {
  return (
    <div className='page-shell px-2'>
      <article className='hero-panel relative flex flex-col items-end justify-end rounded-2xl md:max-w-3/4 lg:max-w-1/2 pr-6'>
        <div id='email' className='bg-white p-4 rounded-md w-4/6 space-y-2'>
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
              <p className='font-serif font-medium sm:text-lg md:text-xl'>
                25% Off Everything
              </p>
              <p className='text-xs font-medium sm:text-sm'>Limtied Time</p>
              <button className='mt-4 bg-[#b2470b] font-medium px-2 py-1 text-xs text-white'>
                Shop the sale
              </button>
            </div>
          </div>
        </div>

        {/* The AI Interface */}
        <div className='bg-white absolute bottom-44 left-4 rounded-lg shadow w-64 md:bottom-12'>
          <p className='font-semibold text-xs p-3 border-b border-neutral-300'>
            Edit with agent
          </p>
          <div className='border border-neutral-300 text-xs text-neutral-500 p-2 m-3 rounded-md flex items-center gap-4 h-12'>
            <div className='flex-1 self-start'>
              <Typewriter cursorStyle={cursor}>
                Change the headline to "25% Off Sitewide"
              </Typewriter>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='size-4 fill-neutral-500 text-neutral-500 mr-2'
            >
              <path d='M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z' />
              <path d='M6 12h16' />
            </svg>
          </div>
        </div>
      </article>
    </div>
  );
}

const cursor: React.CSSProperties = {
  background: '#ff0088',
  width: 1.5,
};

export default App;
