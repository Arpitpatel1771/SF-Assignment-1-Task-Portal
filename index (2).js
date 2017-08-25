$(document).ready(function(){
    function contentpos(){
        var cntnt = $('.content')
        cntnt.css('top',$(window).height()/2 - cntnt.height()/2)
        cntnt.css('left',$(window).width()/2 - cntnt.width()/2)
    }
    function loginformpos(){
        $('.loginform').css('left',$('.loginform').parent().width()/2 - $('.loginform').width()/2 - 10)
    }
    function signupformpos(){
        $('.signupform').css('left',$('.signupform').parent().width()/2 - $('.signupform').width()/2 - 10)
    }
    function hasclass(element,clss){
        var str1 = element.attr('class')
        var str2 = clss
        if(str1.indexOf(str2) != -1){
            return 1
        }else{
            return 0
        }
    }
    function formpos(){
        if(hasclass($('.loginform'),'widthclass')){
            signupformpos()
        }else if(hasclass($('.signupform'),'widthclass')){
            loginformpos()
        }
    }
    function bringpos(){
        $('.bring').each(function () {
            $(this).css('left',$(window).width()/2 - $(this).width()/2)
        })
    }
    function intcheck(str){
        var re = /[0-9]+/;
        if(re.test(str)){
            return 1;
        }else{
            return 0;
        }
    }
    function charcheck(str){
        var re = /[a-zA-z]+/;
        if(re.test(str)){
            return 1;
        }else{
            return 0;
        }
    }
    function notcharcheck(str){
        var re = /[^a-zA-z]+/;
        if(re.test(str)){
            return 1;
        }else{
            return 0;
        }
    }
    function loginerror(str){
        $('.errlogin').html(str)
        contentpos()
    }
    function signuperror(str){
        $('.errsignup').html(str)
        contentpos()
    }
    $('.bringlogin').css('top',-$('.bringlogin').height()-22)
    formpos()
    contentpos()
    bringpos()
    $(window).resize(function(){
        contentpos()
        formpos()
        bringpos()
        //alert($(window).width())
    })
    $('.bringsignup').click(function(event){
        if(hasclass($('.loginform'),'widthclass')){
            event.preventDefault()
        }else {
            $('.loginform').addClass('widthclass heightclass')
            $('.signupform').removeClass('widthclass heightclass')
            formpos()
            contentpos()
            $(this).css('top',-$(this).height()-22)
            setTimeout(function(){
                $('.bringlogin').css('top',-2)
            },300)
        }
    })
    $('.bringlogin').click(function(event){
        if(hasclass($('.signupform'),'widthclass')){
            event.preventDefault()
        }else {
            $('.signupform').addClass('widthclass heightclass')
            $('.loginform').removeClass('widthclass heightclass')
            formpos()
            contentpos()
            $(this).css('top',-$(this).height()-22)
            setTimeout(function(){
                $('.bringsignup').css('top',-2)
            },300)
        }
    })
    var request;
    $(".login").click(function(event){
        event.preventDefault();
        if (request) {
            request.abort();
        }
        var pass = $("input[name='password']").val();
        var usrname = $("input[name='username']").val();
        if($.trim(usrname) == ''){
            $("input[name='username']").trigger('focus')
            loginerror('You forgot to give your username.')
            return false;
        }
        if($.trim(pass) == ''){
            $("input[name='password']").trigger('focus')
            loginerror('You forgot to enter the password.')
            return false;
        }
        if(intcheck(pass)===1 && charcheck(pass)===1){
            if( pass.length > 7 ){
            }else{
                loginerror('Password should be at least 8 characters long.')
                $("input[name='password']").trigger('focus')
                return false;
            }
        }else{
            loginerror('The password must contain at least<br> 1 alphabet AND 1 number')
            $("input[name='password']").trigger('focus')
            return false;
        }
        if(usrname.length > 7){
        }else{
            loginerror('Username should be atleast 8 characters long.')
            $("input[name='username']").trigger('focus')
            return false
        }
        var $form = $('#loginform')
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        $inputs.prop("disabled", true);
        request = $.ajax({
            url: "user.php",
            type: "post",
            data: serializedData,
            async: true
        });
        request.done(function (response, textStatus, jqXHR) {
            if(response === 'done'){
                $('.redirect')[0].click();
            }else {
                loginerror(response)
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            loginerror('Some problem occurred and the task was not completed<br>please try again');
        });
        request.always(function () {
            $inputs.prop("disabled", false);
        });
    });
    $(".signup").click(function(event){
        event.preventDefault();
        if (request) {
            request.abort();
        }
        var first = $("input[name='first']")
        var last = $("input[name='last']")
        var usrname = $("input[name='username2']")
        var pwd = $("input[name='password2']")
        var pwd2 = $("input[name='password2cnf']")
        if($.trim(first.val())==''){
            first.focus()
            signuperror('You forgot to enter the first name')
            return false;
        }
        if(notcharcheck(first.val())==1){
            signuperror('First name never has numbers or symbols')
        }
        if($.trim(last.val())==''){
            last.focus()
            signuperror('You forgot to enter the surname')
            return false;
        }
        if(notcharcheck(last.val())==1){
            signuperror('Surname never has numbers or symbols')
        }
        if($.trim(usrname.val())==''){
            usrname.focus()
            signuperror('You forgot to enter the username')
            return false;
        }
        if(usrname.val().length > 7){
        }else{
            signuperror('Username should be atleast 8 characters long.')
            $("input[name='username2']").trigger('focus')
            return false
        }
        if($.trim(pwd.val())==''){
            pwd.focus()
            signuperror('You forgot to enter the password')
            return false;
        }
        if(charcheck(pwd.val())==0 || intcheck(pwd.val())==0){
            pwd.focus()
            signuperror('Password must have 1 letter <br> and 1 number')
            return false
        }
        if(pwd.val().length < 8){
            pwd.focus()
            signuperror('Password should have 8 or more characters')
            return false;
        }
        if($.trim(pwd2.val())==''){
            pwd2.focus()
            signuperror('You forgot to enter the <br>conforming password')
            return false;
        }
        if(pwd.val() !== pwd2.val()){
            pwd2.focus()
            signuperror('Passwords don\'t match')
            return false
        }
        var $form = $('#signupform')
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();
        $inputs.prop("disabled", true);
        request = $.ajax({
            url: "user.php",
            type: "post",
            data: serializedData
        });
        request.done(function (response, textStatus, jqXHR) {
            if(response === 'done'){
                $('.redirect')[0].click();
            }else {
                signuperror(response)
            }
        });
        request.fail(function (jqXHR, textStatus, errorThrown) {
            signuperror('Some problem occurred and the task was not completed<br>please try again');
        });
        request.always(function () {
            $inputs.prop("disabled", false);
        });
    });
});
(function(){
    function id(v){ return document.getElementById(v); }
    function loadbar() {
        var ovrl = id("overlay"),
            prog = id("progress"),
            stat = id("progstat"),
            img = document.images,
            c = 0,
            tot = img.length;
        if(tot == 0) return doneLoading();
        function imgLoaded(){
            c += 1;
            var perc = parseInt(100/tot*c)+"%";
            var width = parseInt(100/tot*c) + "%";
            prog.style.width = width ;
            stat.innerHTML = "Loading "+ perc;
            if(c===tot) return doneLoading();
            //if(c===tot) setTimeout(function(){return doneLoading()},1000);
        }
        function doneLoading(){
            ovrl.style.opacity = 0;
            $('#progress').removeClass('rounded')
            setTimeout(function(){
                ovrl.style.display = "none";
                $('body').css('overflow','auto')
            }, 1200);
        }
        for(var i=0; i<tot; i++) {
            var tImg     = new Image();
            tImg.onload  = imgLoaded;
            tImg.onerror = imgLoaded;
            tImg.src     = img[i].src;
        }
    }
    document.addEventListener('DOMContentLoaded', loadbar, false);
}());