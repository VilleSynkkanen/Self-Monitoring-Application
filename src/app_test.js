/* TESTS:
*  1. SummaryAPI 1 (done)
*  2. SummaryAPI 2 (done)
*  3. Auth middleware
*  4. Error middleware
*  5. Logging middleware 
*/ 

import { superoak } from "https://deno.land/x/superoak@2.3.1/mod.ts";
import { app } from "./app.js";
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.78.0/testing/asserts.ts";

Deno.test({
    name: "GET /api/summary returns a JSON containing summary values", 
    async fn() {
        const testClient = await superoak(app);
        const response = await testClient.get("/api/summary").expect('Content-Type', new RegExp('application/json'));
        //console.log(response.text);
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
        //console.log(response.text);
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








/*
let testClient = await superoak(app);
let response = await testClient
  .post("/auth/login")
  
  .expect(200);

let headers = res.headers["set-cookie"];
let cookie = headers.split(";")[0];

testClient = await superoak(app);
await testClient
  .get(`/secret-site`)
  .set("Cookie", cookie)
  .expect(200);

*/
