import { Provider } from 'react-redux';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, store } from '@redux/store';
import { useTranslation } from 'react-i18next';

import '@styles/App.scss';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </Provider>
  );
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
