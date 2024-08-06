// index.js
import React from 'react';
import {createRoot} from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './stores/RootReducer';
import '../src/styles/global.css'; // 전역 스타일 시트 임포트
import App from './App';
import Modal from 'react-modal';

const container =document.getElementById('root')
const root = createRoot(container!)
const appElement = document.getElementById('root') || document.createElement('div');
Modal.setAppElement(appElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
