import { action } from 'easy-peasy';

export const setUser = action((state:any, payload:any) => {
    state.phno = payload;
});