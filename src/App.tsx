import AgentEdit from './components/AgentEdit';
import ReviewPanel from './components/ReviewPanel';

function App() {
  return (
    <div className='page-shell px-2 py-12 space-y-24 overflow-y-scroll'>
      <p className='mb-8 leading-5 text-center text-xs font-medium text-neutral-700 sm:text-xs'>
        An{' '}
        <a
          href='https://www.linkedin.com/in/internetdrew/'
          target='_blank'
          rel='noreferrer'
          className='underline decoration-neutral-400 underline-offset-3 transition-colors transition-decoration-color duration-150 ease-out hover:decoration-neutral-700'
        >
          InternetDrew
        </a>{' '}
        interactive experience
      </p>
      <div className='mx-auto text-center mt-16 mb-28'>
        <h1 className='text-2xl font-semibold mx-auto sm:max-w-1/2 md:text-3xl'>
          Directed by marketers, <br />
          delivered by agents
        </h1>
        <p className='font-light mt-4 sm:max-w-1/2 mx-auto'>
          Whether you're working on a net-new idea or creating 100 variations of
          one asset, Content Assembly makes it easy to scale your marketing.
        </p>
      </div>

      <div className='flex flex-col items-center gap-4 max-w-7xl lg:flex-row-reverse lg:gap-12'>
        <div className='px-4 lg:px-0'>
          <p className='text-center font-semibold text-lg lg:max-w-3/4 mx-auto lg:text-start lg:mx-0'>
            Edit outputs using AI prompts and manual tools
          </p>
          <p className='text-center text-sm font-light mt-2 mx-auto lg:max-w-3/4 lg:text-start lg:mx-0'>
            Change image backgrounds, edit burned-in text, update copy, and
            more, without making a single request from your design team.
          </p>
        </div>
        <AgentEdit />
      </div>

      <div className='flex flex-col max-w-7xl items-center gap-4 lg:flex-row lg:gap-12'>
        <div className='px-4 md:px-6 lg:px-0'>
          <p className='text-center font-semibold text-lg lg:max-w-3/4 mx-auto lg:text-start lg:mx-0'>
            Kickstart the review process with custom legal and brand agents
          </p>
          <p className='text-center text-sm font-light mt-2 mx-auto lg:max-w-3/4 lg:text-start lg:mx-0'>
            Ensure content compliance with legal and brand agents, trained on
            your business guidelines. When ready, send directly to your team for
            the final call.
          </p>
        </div>
        <ReviewPanel />
      </div>
    </div>
  );
}

export default App;
