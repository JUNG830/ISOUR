import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './project/pages/Main';
import Login from './project/Login/Login';
import MyPage from './project/pages/MyPage';
import AdminMemberInfo from './project/pages/Member/AdminMemberInfo';
import MemberDrop from './project/pages/MemberDrop';
import SignUp from './project/SingUp/SignUp';
import Navbar2 from './project/Navbar/Navbar2';
import FileUpload2 from './project/FileUpload/FileUpload2';
import MemberUpdate from './project/pages/MemberUpdate';
import Boarding from './project/pages/Boarding';
import Exam from './project/pages/Exam/Exam';
import MbtiTypes from './project/pages/MBTIType/MbtiTypes';



function App() {
  return (
    <Router>
      <Navbar2 />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/AdminMemberInfo' element={<AdminMemberInfo />} />
        <Route path='/MemberDrop' element={<MemberDrop />} />
        <Route path='/Exam' element={<Exam />} />
        <Route path='/FileUpload' element={<FileUpload2 />} />
        <Route path='/MemberUpdate' element={<MemberUpdate />} />
        <Route path='/Boarding' element={<Boarding />} />
        <Route path='/MbtiTypes' element={<MbtiTypes />} />
      </Routes>
    </Router>
  );
}

export default App;