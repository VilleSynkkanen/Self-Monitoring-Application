let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  config.database = {
    hostname: "hattie.db.elephantsql.com",
    database: "eifojnbl",
    user: "eifojnbl",
    password: "sbo_HmjHuaB_FtzYK8UXkN0x7LhJk9MF",
    port: 5432
  };
}

export { config }; 