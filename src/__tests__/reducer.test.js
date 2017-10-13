import {Map} from 'immutable';

import {USER_LOADED} from '../constants';
import {initialState, reducer} from '../reducer';

test('initial state isLoading is false', () => {
   expect(initialState.get('isLoading')).toBe(false);
});

test('initial state user is null', () => {
   expect(initialState.get('user')).toBe(null);
});

describe('called with USER_LOADED action', () => {
    const action = {
        type: USER_LOADED,
        user: {
            access_token: 'access_token',
            profile: {
                id: 1
            }
        }
    };
    test('returns state with user.access_token', () => {
        const state = reducer(initialState, action);
        expect(state.getIn(['user', 'access_token'])).toEqual(action.user.access_token);
    });
    test('returns state with user.profile', () => {
        const state = reducer(initialState, action);
        expect(state.getIn(['user', 'profile'])).toEqual(Map(action.user.profile));
    });
});