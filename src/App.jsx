import { useTranslation } from 'react-i18next';
import { createBrowserRouter, Link, Navigate, RouterProvider } from 'react-router';

import '@styles/App.scss';

const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

function Home() {
  const { t } = useTranslation();

  return (
    <>
      <main>
        <h2>{t('title')}</h2>
      </main>
      <nav>
        <Link to='/about'>About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>That feels like an existential question, dont you think?</p>
      </main>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </>
  );
}
