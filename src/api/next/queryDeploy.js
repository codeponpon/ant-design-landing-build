

const { HttpClient2 } = require('urllib');

async function queryDeploy(ctx, next) {
  const { id } = ctx.params;
  const { now } = ctx.config;
  const client = new HttpClient2();
  const res = await client.request(`${now.url}/deployments/${id}`, {
    method: 'GET',
    dataType: 'json',
    contentType: 'json',
    headers: {
      Authorization: `Bearer ${now.token}`,
    },
  })
  // STATUS are "READY" or  "BUILDING"
  // Example:
  // "status": "READY",
  // "status": "BUILDING",
  console.log('------res-', res);
  ctx.status = 200;
  ctx.body = res.data;
  console.log("BODY", ctx.body);
}

module.exports = queryDeploy;
