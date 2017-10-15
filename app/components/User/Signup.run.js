function userSignup(submitCallback) {

    var $form = $('#user-signup');
    $form.validate({
        errorPlacement: errorPlacementInput,
        // Form rules
        rules: {
            accountName: {
                required: true,
                email: true
            },
            accountPassword: {
                required: true
            },
            accountPasswordCheck: {
                required: true,
                equalTo: '#account-password'
            }
        },
        submitHandler: form => submitCallback(successSubmit)
    });
}

const successSubmit = () => {
    // After success form.submit();
    var $form = $('#user-signup');
    $('#form-ok').hide().removeClass('hidden').show(500);
    setTimeout(() => {
        $form.hide();
        $('#confirmation').hide().removeClass('hidden').show(500);
    }, 1000);

    console.log('Form submitted!');
}


// Necessary to place dyncamic error messages
// without breaking the expected markup for custom input
function errorPlacementInput(error, element) {
    if (element.parent().is('.mda-form-control')) {
        error.insertAfter(element.parent()); // insert after .mda-form-control
    } else if (element.is(':radio') || element.is(':checkbox')) {
        error.insertAfter(element.parent());
    } else {
        error.insertAfter(element);
    }
}

export default userSignup;
