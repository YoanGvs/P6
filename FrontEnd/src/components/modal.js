import { modal } from './domLinker'

export const openModal = () => {
  modal.style.display = 'flex'
}

export const closeModal = () => {
  modal.style.display = 'none'
}
