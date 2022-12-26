import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ThunkType } from "../../../store";
import { setTimeSpeed } from "../../settings/settingsSlice";
import { AssetsType } from "../market/typings";
import { ModeType, PopupType } from "./typings";

// TODO : пробрасывать состояние
// покупка или продажа

const initialState = {
   isOpen: false,
   type: null as null | PopupType,
   asset: null as null | AssetsType,
   mode: null as null | ModeType,
};

export const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      openModal: (
         state,
         action: PayloadAction<{ type: PopupType; mode: ModeType; asset: AssetsType }>
      ) => {
         state.isOpen = true;
         state.type = action.payload.type;
         state.asset = action.payload.asset;
         state.mode = action.payload.mode;
      },
      closeModal: (state) => {
         state.isOpen = false;
         state.asset = null;
         state.type = null;
         state.mode = null;
      },
   },
});

export const { closeModal } = modalSlice.actions;

// Selectors

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectModalType = (state: RootState) => state.modal.type;

export const selectAsset = (state: RootState) => state.modal.asset;

export const selectModal = (state: RootState) => ({
   isOpen: state.modal.isOpen,
   type: state.modal.type,
   mode: state.modal.mode,
   asset: state.modal.asset,
});

export const openModal =
   (type: PopupType, mode: ModeType, asset: AssetsType): ThunkType =>
   (dispatch) => {
      dispatch(modalSlice.actions.openModal({ type, mode, asset }));
      dispatch(setTimeSpeed(0));
   };

export default modalSlice.reducer;
