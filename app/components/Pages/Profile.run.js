import {GENDER} from '../../constants/profile';
import * as TYPES from '../../actiontypes/profile';

function initProfile(actions) {

    if (!$.fn.editable) return;

    var editables = $('.is-editable, #gender');

    $('#edit-enable').click(e => editProfile(e));

    $('#edit-disable').click(e => updateProfile(e));

    $('.is-editable').each(function() {
        var opts = $(this).data();
        $(this).editable({
            showbuttons: 'bottom',
            disabled: true,
            mode: opts.mode || 'inline',
            type: opts.type || 'text'
        });
    });

    $('#gender').editable({
        // prepend: "not selected",
        disabled: true,
        mode: 'inline',
        url: '',
        source: [{
            value: GENDER.MALE,
            text: 'Male'
        }, {
            value: GENDER.FEMALE,
            text: 'Female'
        }]
    });

    editables.on('save', function(e, params) {
        const field = $(e.target).data('name');
        actions.changeProfile(field, params.newValue);
    });

    $('body').on(TYPES.UPDATE_PROFILE, function(e, profileUser) {
        $('#gender').editable('setValue', profileUser.gender);
        $('.is-editable').each(function() {
            var opts = $(this).data();
            if (!opts.name || !profileUser[opts.name]) return;

            const value = opts.type === 'date'
                ? new Date(profileUser[opts.name])
                : profileUser[opts.name];
            $(this).editable('setValue', value);
        });
    });

    $('body').on(TYPES.EDIT_PROFILE, function(e) {
        editProfile(e);
    });

    function editProfile(e) {
        e.preventDefault();
        editables.editable('toggleDisabled');
        $('#edit-disable').removeClass('hidden');
        $('#edit-enable').addClass('hidden');
        actions.editProfile();
    }

    function updateProfile(e) {
        e.preventDefault();
        editables.editable('toggleDisabled');
        $('#edit-enable').removeClass('hidden');
        $('#edit-disable').addClass('hidden');
        actions.updateProfile();
    }
}

export default initProfile;
