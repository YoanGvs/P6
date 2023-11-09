import { modal, modalWrapper, modalDiv } from './domLinker'
import { createGallery } from './index'
import { fetchWorks } from './api'

export const cleanModal = () => {
  modalWrapper.innerHTML = ''
}

export const openModal = () => {
  modal.style.display = 'flex'
  fetchWorks().then(data => createGallery(data, modalDiv, true))
  // const works = await fetchWorks()
  // createGallery(works, modalDiv, true)
}

export const closeModal = () => {
  modal.style.display = 'none'
}
