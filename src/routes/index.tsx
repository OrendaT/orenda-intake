import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <main className='padding-inline relative grid min-h-dvh content-center justify-items-center gap-5 py-20'>
      <h1 className='page-heading mb-0'>Welcome to Orenda Forms</h1>

      <p>Go to:</p>

      <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2 *:underline-offset-2 *:transition-all *:duration-300 *:hover:font-medium *:hover:underline'>
        <Link to='/intake'>Intake Form</Link>
        <Link to='/credit-card'>Credit Card Form</Link>
        <Link to='/provider-onboarding'>Provider Onboarding Form</Link>
      </div>

      <footer className='absolute bottom-12'>
        Orenda &copy; {new Date().getFullYear()}
      </footer>
    </main>
  );
}
