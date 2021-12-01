import './App.css';

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SessionProvider from './components/session/SessionProvider'
import Routess from './Routes'

import { withRouter } from 'react-router';


function App() {
  return (
  
    <SessionProvider>
<Routess />
     <ToastContainer/>
    </SessionProvider>

  );
}

export default withRouter(App);
