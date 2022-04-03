import { UserRegistrationForm } from './component/register/UserRegistrationForm'
import { Login } from './component/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Profile } from './component/profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<UserRegistrationForm />} />
          <Route path='/profile/*' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
