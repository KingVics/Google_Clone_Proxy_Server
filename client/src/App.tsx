import {useState} from 'react';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { Routes } from './components/Routes';


function App() {
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  return (
    <div className={darkTheme? 'dark' : ''}>
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
        <Nav  darkTheme={darkTheme} setDarkTheme={setDarkTheme}/>
        <Routes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
