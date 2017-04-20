import * as Router from 'koa-router';

export function hostApi(router: Router) {

    router.get('/api/findHosts/', async ctx => {
        console.log(ctx.query.keywords);
        ctx.body = ctx.query;
    });
    
}