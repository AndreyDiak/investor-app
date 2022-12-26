import React from "react";
import { CloseButton } from "../../../components/common/CloseButton/CloseButton";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
   closeModal,
   selectConstTimeSpeed,
   selectIsModalOpen,
   selectModalType,
   setTimeSpeed,
} from "../../../redux/slices";
import { modals } from "./modals";

import classes from "./Modal.module.css";

export const ModalTemplate = () => {
   const dispatch = useAppDispatch();

   const isOpen = useAppSelector(selectIsModalOpen);
   const modalType = useAppSelector(selectModalType);

   const constTimeSpeed = useAppSelector(selectConstTimeSpeed);

   const onCloseClick = () => {
      dispatch(setTimeSpeed(constTimeSpeed));
      dispatch(closeModal());
   };

   return (
      <>
         {isOpen && (
            <div className={classes.modal}>
               <div className={classes.content}>
                  <div className={classes.close}>
                     <CloseButton handler={onCloseClick} size={20} />
                  </div>
                  {modals[modalType]}
               </div>
            </div>
         )}
      </>
   );
};
