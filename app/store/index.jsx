import { compose, createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import {autoRehydrate} from 'redux-persist';
import {triggerEventMiddleware} from '../middleware/triggerEvent';
import {validateStoreMiddleware} from '../middleware/validateStore';

const logger = createLogger({});

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(logger, thunk, triggerEventMiddleware, validateStoreMiddleware),
            autoRehydrate()
        )
    );
}
