import * as TYPES from '../actiontypes/profile';
import * as actions from './profile';

test('updateProfile', () => {
    const payload = {};
    expect(actions.updateProfile(payload)).toEqual({
        type: TYPES.UPDATE_PROFILE,
        payload
    });
});

test('editProfile', () => {
    expect(actions.editProfile()).toEqual({
        type: TYPES.EDIT_PROFILE
    });
});

test('changeProfile', () => {
    const payload = {};
    const field = {};
    expect(actions.changeProfile(field, payload)).toEqual({
        type: TYPES.CHANGE_PROFILE,
        field,
        payload
    });
});
