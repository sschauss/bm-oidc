import {fromJS, Map} from 'immutable';

export const initialState = Map({
    isLoading: false,
    user: null
});

export function reducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOADED':
            const user = action.user;
            return state.set('user', Map({
                access_token: user.access_token,
                profile: Map(user.profile)
            }));
        default:
            return state;
    }
}