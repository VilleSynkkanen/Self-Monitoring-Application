import { bcrypt, validate, required, isEmail, minLength } from "../deps.js"; 
import { executeQuery } from "../database/database.js";

const registrationValidationRules = {
    email: [required, isEmail],
    password: [required, minLength(4)],
};

const register = async({request}) => {
    const body = request.body();
    const params = await body.value;
    
    const data = {
        email: params.get('email'),
        password: params.get('password1'),
        password2: params.get('password2')
    };
    if(data.password !== data.password2)
    {
        return {passed: false, errors: { password: { match: "passwords do not match" } }, email: data.email};
    }

    const [passes, errors] = await validate(data, registrationValidationRules);
    
    if (!passes) 
    {
        return {passed: false, errors: errors, email: data.email};
    } 
    else {
        // check if there already exists such an email in the database
        // -- if yes, respond with a message telling that the user
        // already exists
        const result = await executeQuery("SELECT * FROM users WHERE username = $1;", data.email);
        if(result && result.rowCount > 0)
        {
            return {passed: false, errors: { email: { isInUse: "email is already in use" } }, email: ""};
        }
        // otherwise, store the details in the database
        const hash = await bcrypt.hash(data.password1);
        // when storing a password, store the hash
        await executeQuery("INSERT INTO users (username, password) VALUES ($1, $2);", data.email, hash);

        return {passed: true, errors: [], email: ""};
    }
};

const login = async({request, session}) => {
    const body = request.body();
    const params = await body.value;

    const email = params.get('email');
    const password = params.get('password');

    const res = await executeQuery("SELECT * FROM users WHERE username = $1;", email);
    if (res.rowCount === 0) {
        return false;
    }

    const user = res.rowsOfObjects()[0];
    const hash = user.password;
    const correct = await bcrypt.compare(password, hash);
    if (!correct) {
        return false;
    }
    await session.set('authenticated', true);
    await session.set('user', {
        id: user.id,
        email: email
    });

    return true;
}

const logout = async({session}) => {
    await session.set('authenticated', false);
    await session.set('user', {});
}

export { register, login, logout }