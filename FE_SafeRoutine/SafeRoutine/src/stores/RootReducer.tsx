// rootReducer.js
import { configureStore } from '@reduxjs/toolkit';
import modalReducer, { modalState } from './ModalSlice';

export interface RootState {
  modal: modalState;
}
const rootReducer = {
  modal: modalReducer,
  
};
const store = configureStore({
  reducer: rootReducer,
});

export default store;
