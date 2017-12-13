exports.getHeaders = (req, res) => {
  const lang = req.headers['accept-language'].split(',')[0];
  const software = req.headers['user-agent'].split(')')[0].split('(')[1];
  const ip =
    req.headers['x-forwarded-for'].split(',')[0] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  const jsonResponse = {
    ipaddress: ip,
    language: lang,
    software: software
  };
  res.json(jsonResponse);
};
