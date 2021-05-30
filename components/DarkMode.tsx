import { useEffect, useState, createContext, useContext } from 'react';
import { isSSR } from '../lib/utils';

interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <div id='🎚' onClick={toggleDarkMode} role='button' tabIndex={0}>
      {isDarkMode ? <div className='gg-moon' /> : <div className='gg-sun' />}
    </div>
  );
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (isSSR) {
      return false;
    } else {
      return window.localStorage.getItem('mode') === 'dark';
    }
  });

  useEffect(() => {
    const mode = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('class', mode);

    window.localStorage.setItem('mode', mode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => useContext(DarkModeContext);

export default DarkModeProvider;
