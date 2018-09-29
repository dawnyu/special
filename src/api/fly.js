const Fly = require('flyio/dist/npm/wx')

const fly = new Fly()
fly.interceptors.request.use((request) => {
  request.headers['X-Tag'] = 'flyio'
  request.headers['content-type'] = 'application/x-www-form-urlencoded'
  return request;
})

fly.interceptors.response.use(
  response => response.data,
  err => Promise.resolve(err),
)

export default fly
