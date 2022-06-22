import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import utc from 'dayjs/plugin/utc';

axios.defaults.baseURL = 'http://localhost:3001/';
//axios.defaults.baseURL = 'https://testnginx.bieda.it/';

dayjs.locale('pl');
dayjs.extend(utc);

const root = createRoot(document.getElementById('root') as any);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
