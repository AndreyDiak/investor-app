/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, ThunkType } from "../../../store";
import { setTimeSpeed } from "../../settings/settingsSlice";
import { ModeType, PopupType } from "./typings";

const initialState = {
   isOpen: false,
   type: null as null | PopupType,
   assetId: null as null | string,
   mode: null as null | ModeType,
};

export const modalSlice = createSlice({
   name: "modal",
   initialState,
   reducers: {
      openModal: (
         state,
         action: PayloadAction<{ type: PopupType; mode: ModeType; assetId: string }>
      ) => {
         state.isOpen = true;
         state.type = action.payload.type;
         state.assetId = action.payload.assetId;
         state.mode = action.payload.mode;
      },
      closeModal: (state) => {
         state.isOpen = false;
         state.assetId = null;
         state.type = null;
         state.mode = null;
      },
   },
});

export const { closeModal } = modalSlice.actions;

// Selectors

export const selectIsModalOpen = (state: RootState) => state.modal.isOpen;

export const selectModalType = (state: RootState) => state.modal.type!;

export const selectModalInfo = (state: RootState) => ({
   mode: state.modal.mode!,
   assetId: state.modal.assetId!,
});

export const openModal =
   (type: PopupType, mode: ModeType, assetId: string): ThunkType =>
   (dispatch) => {
      dispatch(modalSlice.actions.openModal({ type, mode, assetId }));
      dispatch(setTimeSpeed(0));
   };

export default modalSlice.reducer;
