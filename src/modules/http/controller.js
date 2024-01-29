/**
 * ### defaultHandler
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 * \
 * This handler will execute when endpoint or http method not match.
 */
function defaultHandler(req, res) {
  res.statusCode = 405;
  res.end(
    JSON.stringify({
      message: "Method not found.",
    })
  );
}

function getHomeRoute(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "our '/' get endpoint.",
    })
  );
}

function getAPIRoute(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "our get api endpoint.",
    })
  );
}

function postAPIRoute(req, res) {
  let body = "";
  req.on("error", (err) => {
    res.statusCode = 400;
    res.end(err);
  });
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", function () {
    if (!body) {
      res.statusCode = 400;
      res.end(JSON.stringify({ message: "Invalid data." }));
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(body);
  });
}

module.exports = {
  defaultHandler,
  getHomeRoute,
  getAPIRoute,
  postAPIRoute,
};
