import { createStore,persist } from "easy-peasy";
import {setUser} from './actions';

const initStore={
    user:{
        phno:''
    }
}

export default createStore(
    persist(
        {
            user:{
                ...initStore.user,
                setUser
            }
        },
        {
            storage:'localStorage'
        }
    )
);