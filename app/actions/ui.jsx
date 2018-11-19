import { LOCATION_CHANGE } from 'react-router-redux'

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
