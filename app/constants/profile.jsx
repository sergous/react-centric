import moment from 'moment';
import * as TYPES from '../actiontypes';

export const GENDER = {
    MALE: 'gender/MALE',
    FEMALE: 'gender/FEMALE'
}

const profileUser = {
    id: 1,
    photo: 'img/user/01.jpg',
    name: 'Willie Webb',
    position: 'Software Developer',
    area: 'Front-End Development',
    company: 'Company Inc.',
    address: 'Planet Earth, South Continent, 123',
    email: 'willie_web@company.inc',
    phone: '555-1234567890',
    gender: GENDER.MALE,
    birthday: moment('1980-01-01').format(),
    registered: moment('2018-10-28').format(),
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