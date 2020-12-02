//import bcrypt from "../deps.js";  //Does not work yet
import { executeQuery } from "../database/database.js";

import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const register = async({request, session}) => {
    const body = request.body();
    const params = await body.value;
    
    const email = params.get('email');
    const password1 = params.get('password1');
    const password2 = params.get('password2');

    if (password1 !== password2) 
    {
        return false;
    } 
    else {
        // check if there already exists such an email in the database
        // -- if yes, respond with a message telling that the user
        // already exists
        const result = await executeQuery("SELECT * FROM users WHERE username = $1;", email);
        if(result && result.rowCount > 0)
        {
            return false;
        }
        // otherwise, store the details in the database
        const hash = await bcrypt.hash(password1);
        // when storing a password, store the hash
        await executeQuery("INSERT INTO users (username, password) VALUES ($1, $2);", email, hash);

        return true;
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
        email: user.email
    });

    return true;
}

const logout = async({session}) => {
    await session.set('authenticated', false);
    await session.set('user', {});
}

export { register, login, logout }