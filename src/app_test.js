/* TESTS:
*  1. SummaryAPI 1 
*  2. SummaryAPI 2
*  3. Error middleware
*  4. Successful registration 
*  5. Failed registration
*/ 

import { superoak } from "./deps.js";
import { app } from "./app.js";
import { assertEquals, assertNotEquals, assertThrows } from "./deps.js";
import * as middlewares from "./middleware/middlewares.js";
import { executeQuery } from "./database/database.js";

Deno.test({
    name: "GET /api/summary returns a JSON containing summary values", 
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/api/summary").expect('Content-Type', new RegExp('application/json'));
        let obj = JSON.parse(response.text); 
        assertNotEquals(obj.sleep_duration, "");
        assertNotEquals(obj.sleep_quality, "");
        assertNotEquals(obj.studying_duration, "");
        assertNotEquals(obj.eating_regularity, "");
        assertNotEquals(obj.eating_quality, "");
        assertNotEquals(obj.generic_mood, "");
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "GET /api/summary/2020/12/01 returns a JSON containing summary values", 
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/api/summary/2020/12/01").expect('Content-Type', new RegExp('application/json'));
        let obj = JSON.parse(response.text); 
        assertNotEquals(obj.sleep_duration, "");
        assertNotEquals(obj.sleep_quality, "");
        assertNotEquals(obj.studying_duration, "");
        assertNotEquals(obj.eating_regularity, "");
        assertNotEquals(obj.eating_quality, "");
        assertNotEquals(obj.generic_mood, "");
    },
    sanitizeResources: false,
    sanitizeOps: false
});

const noError = () => {
    
};

const error = () => {
    throw Error('TEST ERROR');
};

Deno.test({
    name: "Test error logging middleware", 
    async fn() {
        await assertThrows(await middlewares.errorMiddleware(noError, error));
    },
    sanitizeResources: false,
    sanitizeOps: false
});


Deno.test({
    name: "Test successful registration", 
    async fn() {
        await executeQuery("DELETE FROM users WHERE username = 'my@email.net';");
        let testClient = await superoak(app);
        let response = await testClient
            .post("/auth/registration")
            .send("email=my@email.net&password1=password&password2=password")
            .expect(200);
        const result = await executeQuery("SELECT * FROM users WHERE username = 'my@email.net';");
        assertEquals(result.rowsOfObjects().length, 1);
        assertEquals(result.rowsOfObjects()[0].username, 'my@email.net');
    },
    sanitizeResources: false,
    sanitizeOps: false
});

Deno.test({
    name: "Test failed registration", 
    async fn() {
        await executeQuery("DELETE FROM users WHERE username = 'my@email.net';");
        let testClient = await superoak(app);
        let response = await testClient
            .post("/auth/registration")
            .send("email=my@email.net&password1=password&password2=psswrd")
            .expect(200);
        const result = await executeQuery("SELECT * FROM users WHERE username = 'my@email.net';");
        assertEquals(result.rowsOfObjects().length, 0);
    },
    sanitizeResources: false,
    sanitizeOps: false
});
