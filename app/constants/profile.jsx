import moment from 'moment';
import * as TYPES from '../actiontypes/profile';

export const GENDER = {
    MALE: 'gender/MALE',
    FEMALE: 'gender/FEMALE'
}

const profileUser = {
    id: 1,
    photo: 'img/user/01.jpg',
    name: 'Sergey Smirnov',
    position: 'Software Developer',
    area: 'Front-End Development',
    company: 'Company Inc.',
    address: 'Planet Earth, South Continent, 123',
    email: 's@slctd.com',
    phone: '555-1234567890',
    gender: GENDER.MALE,
    birthday: moment('1982-12-09').format(),
    registered: moment('2017-10-01').format(),
    about: `React professional with mastering skills of Front-End Development.`
}

export const initialState = {
    profileUser,
    editingProfile: null,
};

export const mapStateToActionType = {
    updateProfile: TYPES.UPDATE_PROFILE,
    editProfile: TYPES.EDIT_PROFILE,
};