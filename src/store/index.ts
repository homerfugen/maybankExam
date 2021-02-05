import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import MainModel from '../pages/main/model';

const stateReducers = {
    mainPageReducer: MainModel.reducers.setLocation
};
const appReducer = combineReducers(stateReducers);
const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
};

const saga = createSagaMiddleware();
const middleWares = [saga];
const store = createStore(rootReducer, applyMiddleware(...middleWares));
saga.run(MainModel.effects.mainSaga);
export default store;