import produce from 'immer';
import { ADD_NEW_ROW } from '../actions';

const initialState = {
    userDetailsArray: [],
};

export default produce((state , action) => {
    switch(action.type) {
        case ADD_NEW_ROW: 
            state.userDetailsArray.push(action.payload);
            break;
    }
} , initialState);