import create from 'zustand'

export const useStore = create((set:any) => ({
  phoneNumber: null,
  password: null,
  setPhoneNumber: (phno:number) => set((state:any) => ({ phoneNumber: phno })),
  setPassword: (pwd:string) => set((state:any) => ({ password: pwd })),
}))