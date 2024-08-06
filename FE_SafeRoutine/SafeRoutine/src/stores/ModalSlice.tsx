import { createSlice } from '@reduxjs/toolkit';

export interface modalState {
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  isOptionOpen :boolean;
  isInfoOpen :boolean;
  isInfoBlackOpen :boolean;
  isDeleteOpen :boolean;
  isAlarmOpen :boolean;
  isUserInfoOpen: boolean;
  isDropOpen: boolean,

}

const initialState: modalState = {
  isLoginOpen: false,
  isSignupOpen: false,
  isOptionOpen: false,
  isInfoOpen: false,
  isInfoBlackOpen: false,
  isDropOpen: false,
  isDeleteOpen: false,
  isAlarmOpen: false,
  isUserInfoOpen: false,
  
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginOpen = true;
    },
    closeLoginModal: (state) => {
      state.isLoginOpen = false;
    },
    openSignupModal: (state) => {
      state.isSignupOpen = true;
    },
    closeSignupModal: (state) => {
      state.isSignupOpen = false;
    },
    openOptionModal: (state) => {
      state.isOptionOpen = true;
    },
    closeOptionModal: (state) => {
      state.isOptionOpen = false;
    },
    openInfoModal: (state) => {
      state.isInfoOpen = true;
    },
    closeInfoModal: (state) => {
      state.isInfoOpen = false;
    },
    openInfoBlackModal: (state) => {
      state.isInfoBlackOpen = true;
    },
    closeInfoBlackModal: (state) => {
      state.isInfoBlackOpen = false;
    },
    openDropModal: (state) => {
      state.isDropOpen = true;
    },
    closeDropModal: (state) => {
      state.isDropOpen = false;
    },
    openDeleteModal: (state) => {
      state.isDeleteOpen = true;
    },
    closeDeleteModal: (state) => {
      state.isDeleteOpen = false;
    },
    openAlarmModal: (state) => {
      state.isAlarmOpen = true;
    },
    closeAlarmModal: (state) => {
      state.isAlarmOpen = false;
    },
    openUserInfoModal: (state) => {
      state.isUserInfoOpen = true;
    },
    closeUserInfoModal: (state) => {
      state.isUserInfoOpen = false;
    },

  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openSignupModal,
  closeSignupModal,
  openOptionModal,
  closeOptionModal,
  openInfoModal,
  closeInfoModal,
  openInfoBlackModal,
  closeInfoBlackModal,
  openDropModal,
  closeDropModal,
  openDeleteModal,
  closeDeleteModal,
  openAlarmModal,
  closeAlarmModal,
  openUserInfoModal,
  closeUserInfoModal
} = modalSlice.actions;

export default modalSlice.reducer;
