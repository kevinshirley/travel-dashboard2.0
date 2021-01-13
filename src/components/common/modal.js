import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { selectIsModalOpened, selectModalUiPayload } from 'src/store/selectors/common';
import { selectStaticModals } from 'src/store/selectors/modals';
import { selectModalUi } from 'src/store/selectors/common';
import { MODAL_SIZE } from 'src/store/constants/modals';

function Modal() {
  const isModalOpened = useSelector(selectIsModalOpened);
  const staticModals = useSelector(selectStaticModals);
  const modalUi = useSelector(selectModalUi);
  const modalUiPayload = useSelector(selectModalUiPayload);

  const ModalUi = modalUi && staticModals[modalUi].innerModal;
  const isModalSubmitting = modalUi && staticModals[modalUi].isSubmitting;

  const modalWrapperClasses = cx('modal-wrapper', {
    'small-modal-wrapper': modalUi && staticModals[modalUi].modalSize === MODAL_SIZE.SMALL,
    'medium-modal-wrapper': modalUi && staticModals[modalUi].modalSize === MODAL_SIZE.MEDIUM,
    'large-modal-wrapper': modalUi && staticModals[modalUi].modalSize === MODAL_SIZE.LARGE,
  });

  const innerModalClasses = cx('modal-inner', {
    'modal-inner-with-padding': modalUi && staticModals[modalUi].innerModalPadding === true,
    'modal-inner-without-padding': modalUi && staticModals[modalUi].innerModalPadding === false,
  });
  console.log({ isModalOpened, modalUi, modalUiPayload });
  return (
    <>
      {isModalOpened && (
        <div className='container modal-container'>
          <div className={modalWrapperClasses}>
            <div className={innerModalClasses}>
              {modalUi && <ModalUi isLoading={isModalSubmitting} modalUiPayload={modalUiPayload} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
