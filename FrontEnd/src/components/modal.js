import { modal, modalWrapper } from './domLinker'
export const cleanModal = () => {
  modalWrapper.innerHTML = ''
}

export const openModal = () => {
  modal.style.display = 'flex'
}

export const closeModal = () => {
  modal.style.display = 'none'
}
