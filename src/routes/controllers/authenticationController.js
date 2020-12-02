import { register, login } from "../../services/authenticationService.js";

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
    render('loginForm.ejs');
}

const loginConfirmation = async(context) => {
    const success = await login(context)
    if(success)
    {
        context.response.redirect('/');
    }
    else
    {
        context.response.redirect('/auth/login');
    }
}

export { registrationPage, registrationConfirmation, loginPage, loginConfirmation }