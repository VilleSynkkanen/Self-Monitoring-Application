import { send } from '../deps.js';

const errorMiddleware = async(context, next) => {
  try {
    await next();
  } catch (e) {
    console.log(e);
  }
}

const authenticationMiddleware = async({request, response, session}, next) => {
  if (request.url.pathname.startsWith('/behavior')) {
    if (session && await session.get('authenticated')) {
      await next();
    } else {
      response.redirect("/auth/login");
    }
  } else {
    await next();
  }
}

const requestTimingMiddleware = async({ request, session }, next) => {
  const today = new Date();
  let auth = "anonymous";
  if (session && await session.get('authenticated')) 
  {
    auth = (await session.get('user')).id
  }

  let hours = today.getHours();
  if(hours <= 9)
    hours = "0" + hours;

  let minutes = today.getMinutes();
  if(minutes <= 9)
    minutes = "0" + minutes;
  
  let seconds = today.getSeconds();
  if(seconds <= 9)
    seconds = "0" + seconds;
  
  const time = hours + ":" + minutes + ":" + seconds;
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${time} ${request.method} ${request.url.pathname} - ${ms} ms ID: ${auth}`);
}

const serveStaticFilesMiddleware = async(context, next) => {
  if (context.request.url.pathname.startsWith('/static')) {
    const path = context.request.url.pathname.substring(7);
  
    await send(context, path, {
      root: `${Deno.cwd()}/static`
    });
  
  } else {
    await next();
  }
}

export { errorMiddleware, requestTimingMiddleware, serveStaticFilesMiddleware, authenticationMiddleware };