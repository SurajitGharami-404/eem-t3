import { create } from 'zustand'

interface IHide {
  hide:boolean,
  toggleHide: () => void
}

const useHideStore = create<IHide>()((set) => ({
    hide:false,
    toggleHide:()=>set((state)=>({hide: !state.hide}))
}))


export {
  useHideStore
}