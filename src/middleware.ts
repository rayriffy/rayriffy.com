import type {MiddlewareHandler} from "astro";

export const onRequest: MiddlewareHandler = (context, next)  => {
  if (context.url.pathname === '/blog') {
    return context.rewrite('/blog/page/1')
  }

  return next()
}