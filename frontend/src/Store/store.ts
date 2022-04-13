import create from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(persist((set:any) => ({
  phoneNumber: null,
  password: null,
  setPhoneNumber: (phno:string) => set((state:any) => ({ phoneNumber: phno })),
  setPassword: (pwd:string) => set((state:any) => ({ password: pwd })),
}), {
  name:"auth",
  getStorage:()=>localStorage,
}))