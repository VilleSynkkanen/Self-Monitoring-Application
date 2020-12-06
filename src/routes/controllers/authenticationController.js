import { register, login, logout } from "../../services/authenticationService.js";

const registrationPage = async({render}) => {
    render('registrationForm.ejs', {passed: true, errors: [], email: ""});
};

const registrationConfirmation = async(context) => {
    const success = await register(context);
    if(success.passed)
    {
        context.render('registrationSuccessfulPage.ejs');
    }
    else
    {
        context.render('registrationForm.ejs', success);
    }
};

const loginPage = async({render}) => {
    render('loginForm.ejs', { invalid: false });
}

const loginConfirmation = async(context) => {
    const success = await login(context)
    if(success)
    {
        context.response.redirect('/');
    }
    else
    {
        context.render('loginForm.ejs', { invalid: true });
    }
}

const logoutPage = async(context) => {
    context.render('logoutPage.ejs', { email: (await context.session.get('user')).email });
}

const logoutRedirect = async(context) => {
    await logout(context);
    context.response.redirect('/');
}

export { registrationPage, registrationConfirmation, loginPage, loginConfirmation, logoutPage, logoutRedirect as logout }