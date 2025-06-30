import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './Home.jsx';
import Story from './Story.jsx'; 
import Level1 from './levels/Level1.jsx';
import Level2 from './levels/Level2.jsx'; 
import Level3 from './levels/Level3.jsx';
import Level4 from './levels/Level4.jsx'; 
import Level5 from './levels/Level5.jsx';
import Level6 from './levels/Level6.jsx'; 
import { TimerProvider } from './components/TimerContext.jsx';
import Timer from './components/TimeDisplay.jsx';

const App = () => {
  return (
    <TimerProvider>
      <Timer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Story" element={<Story />} />
        <Route path="/Level1" element={<Level1 />} />
        <Route path="/Level2" element={<Level2 />} /> 
        <Route path="/Level3" element={<Level3 />} />
        <Route path="/Level4" element={<Level4 />} />
        <Route path="/Level5" element={<Level5 />} />
        <Route path="/Level6" element={<Level6 />} />
      </Routes>
    </TimerProvider>
  );
};

export default App;
