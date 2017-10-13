import { compose, createStore, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';
import {autoRehydrate} from 'redux-persist';

const logger = createLogger({});

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(logger),
            autoRehydrate()
        )
    );
}
