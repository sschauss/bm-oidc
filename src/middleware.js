import {
    ACCESS_TOKEN_EXPIRING,
    ACCESS_TOKEN_EXPIRED,
    USER_LOADED,
    USER_UNLOADED,
    SILENT_RENEW_ERROR,
    USER_SIGNED_OUT,
    USER_SESSION_CHANGED
} from './constants';

function handle(next, action) {
    next(action);
}

function dispatchAction(store, type, user) {
    store.dispatch({
        type,
        user
    });
}

function createUserManagerEventHandler(store, type) {
    return user => dispatchAction(store, type, user);
}

function subscribe(userManager, store) {
    const events = userManager.events;
    events.addAccessTokenExpiring(createUserManagerEventHandler(store, ACCESS_TOKEN_EXPIRING));
    events.addAccessTokenExpired(createUserManagerEventHandler(store, ACCESS_TOKEN_EXPIRED));
    events.addUserLoaded(createUserManagerEventHandler(store, USER_LOADED));
    events.addUserUnloaded(createUserManagerEventHandler(store, USER_UNLOADED));
    events.addSilentRenewError(createUserManagerEventHandler(store, SILENT_RENEW_ERROR));
    events.addUserSignedOut(createUserManagerEventHandler(store, USER_SIGNED_OUT));
    events.addUserSessionChanged(createUserManagerEventHandler(store, USER_SESSION_CHANGED));
}

function createGetUserHandler(store) {
    return (user) => {
        if (!user || user.expired) {
            dispatchAction(store, ACCESS_TOKEN_EXPIRED, user);
        } else {
            dispatchAction(store, USER_LOADED, user);
        }
    }
}

export default function createBmOIDCMiddleware(userManager) {
    return store => {
        userManager
            .getUser()
            .then(createGetUserHandler(store));
        subscribe(userManager, store);
        return next => action => handle(next, action)
    }
}
