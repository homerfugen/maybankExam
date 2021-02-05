import { put, takeLatest } from 'redux-saga/effects';

export interface StateType {
    coordinates: {
        lat: number;
        lng: number;
    }
}

interface MainModelType {
    namespace: string;
    state: StateType;
    effects: {
        mainSaga: () => any;
        handleLocationChange: ({ type, payload }) => any;
    };
    reducers: {
        setLocation: (state: any, action: any) => any;
    }
}

const MainModel: MainModelType = {
    namespace: 'MainModel',
    state: {
        coordinates: {
            lat: 0,
            lng: 0
        }
    },
    effects: {
        *mainSaga() {
            yield takeLatest(MainModel.namespace, MainModel.effects.handleLocationChange)
        },
        *handleLocationChange({ payload }) {
            yield put({
                type: 'setLocation',
                payload: {
                    lat: payload.lat,
                    lng: payload.lng
                }
            });
        }
    },
    reducers: {
        setLocation(state: any, action: any) {
            return { ...MainModel.state, coordinates: action.payload };
        }
    }
}

export default MainModel;