import { modal, modalDiv, formModal, modalMain } from './domLinker'
import { createGallery } from './index'
import { fetchWorks } from './api'

export const addNewWorkBtn = () => {
  modalMain.style.display = 'none'
  formModal.style.display = 'flex'
}

export const openModal = () => {
  modal.style.display = 'flex'
  fetchWorks().then(data => createGallery(data, modalDiv, true))
}

export const closeModal = () => {
  modal.style.display = 'none'
}

export const modalBackBtn = () => {
  formModal.style.display = 'none'
  modalMain.style.display = 'flex'
  modalMain.style.flexDirection = 'column'
}
