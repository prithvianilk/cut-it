import create from 'zustand'

export const useStore = create((set:any) => ({
  username: null,
  phoneNumber: null,
  password: null,
  setUsername: (username:string) => set((state:any) => ({ username: username })),
  setPhoneNumber: (phno:string) => set((state:any) => ({ phoneNumber: phno })),
  setPassword: (pwd:string) => set((state:any) => ({ password: pwd })),
}))