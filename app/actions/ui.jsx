import { LOCATION_CHANGE } from '../actiontypes'

export const locationChange = ({pathname}) => {
    return {
        type: LOCATION_CHANGE,
        payload: {
            action: 'PUSH',
            pathname,
            query: {},
            hash: '',
            search: '',
        },
    }
}
