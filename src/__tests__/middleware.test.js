import middleware from '../middleware';
import {ACCESS_TOKEN_EXPIRED, USER_LOADED} from "../constants";

const userManagerMock = {
    getUser: jest.fn(),
    events: {
        addAccessTokenExpiring: jest.fn(),
        addAccessTokenExpired: jest.fn(),
        addUserLoaded: jest.fn(),
        addUserUnloaded: jest.fn(),
        addSilentRenewError: jest.fn(),
        addUserSignedOut: jest.fn(),
        addUserSessionChanged: jest.fn()
    }
};

const storeMock = {
    dispatch: jest.fn()
};

beforeEach(() => {
    userManagerMock.getUser.mockReset();
    storeMock.dispatch.mockReset();
});

describe('called store function', () => {
    describe('userManager.getUser succeeds', () => {
        describe('user exists', () => {
            describe('user is expired', () => {
                test('dispatches ACCESS_TOKEN_EXPIRED action', async () => {
                    const user = {
                        expired: true
                    };
                    userManagerMock.getUser.mockReturnValue({
                        then: fn => fn(user)
                    });
                    middleware(userManagerMock)(storeMock);
                    expect(storeMock.dispatch).toHaveBeenCalledWith({
                        type: ACCESS_TOKEN_EXPIRED,
                        user
                    });
                });
            });
            describe('user is not expired', () => {
                test('dispatches USER_LOADED action', () => {
                    const user = {
                        expired: false
                    };
                    userManagerMock.getUser.mockReturnValue({
                        then: fn => fn(user)
                    });
                    middleware(userManagerMock)(storeMock);
                    expect(storeMock.dispatch).toHaveBeenCalledWith({
                        type: USER_LOADED,
                        user
                    });
                });
            });
        });
        describe('user does not exist', () => {
            test('dispatches ACCESS_TOKEN_EXPIRED action', () => {
                userManagerMock.getUser.mockReturnValue({
                    then: fn => fn(null)
                });
                middleware(userManagerMock)(storeMock);
                expect(storeMock.dispatch).toHaveBeenCalledWith({
                    type: ACCESS_TOKEN_EXPIRED,
                    user: null
                });
            });
        });
    });
});