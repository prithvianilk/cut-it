import create from 'zustand'

export const useStore = create((set:any) => ({
  username: null,
  phoneNumber: null,
  password: null,
  monthlyBudget: 1000,
  calories: 2000,
  setUsername: (username:string) => set((state:any) => ({ username: username })),
  setPhoneNumber: (phno:string) => set((state:any) => ({ phoneNumber: phno })),
  setPassword: (pwd:string) => set((state:any) => ({ password: pwd })),
  setBudget: (budget:string) => set((state:any) => ({ monthlyBudget: budget })),
  setCalories: (cal:string) => set((state:any) => ({ calories: cal })),
}))