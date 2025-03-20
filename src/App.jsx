import './App.css'

import BoardList from "./page/BoardList.jsx";


import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <>
        <div>Header 컴포넌트</div>
        
        <Routes>{/* 경로 설정 */}
            <Route path={"/"} element={<BoardList />} />
        </Routes>
    </>
  )
}

export default App
