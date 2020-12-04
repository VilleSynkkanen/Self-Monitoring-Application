import { register, login, logout } from "../../services/authenticationService.js";

const registrationPage = async({render}) => {
    render('registrationForm.ejs');
};

const registrationConfirmation = async(context) => {
    const success = await register(context);
    if(success)
    {
        context.render('registrationSuccessfulPage.ejs');
    }
    else
    {
        context.response.redirect('/auth/registration');
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