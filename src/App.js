import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from './page/main';
import ButtonAppBar from './component/header'

function App() {
  return (
    <BrowserRouter>
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
