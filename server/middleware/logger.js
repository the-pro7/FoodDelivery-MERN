import { log } from "../utils.js"

// Logger middleware
const logStuff = (req, res, next) => {
  log(req.method, req.url)
  next()
}

export default logStuff