$(document).ready(function(){
    var request;
    $("#loginform").submit(function(event){
        event.preventDefault();
        if (request) {
            request.abort();
        }
        var $form = $('#loginform');
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        $inputs.prop("disabled", true);
        request = $.ajax({url: "login.php",type: "post",data: serializedData,async: true});
        request.done(function (response, textStatus, jqXHR) {
            if(response === 'logged in'){
                $('.login').slideUp(500);
            }else if(response === 'pwd doesnt match'){
                alert('The password is incorrect >_<');
            }else if(response === 'usrname not found'){
                alert('Matlab kuch bhi daal doge? PC mila nahi ki bakchodi shuru :3');
            }else{
                alert('Something went wrong, please try logging in again :(');
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            alert('Some problem occurred and the task was not completed please try again');
        });
        request.always(function () {
            $inputs.prop("disabled", false);
        });
    });
})