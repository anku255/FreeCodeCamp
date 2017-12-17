const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Url = require('../models/Url');

exports.getShortenUrl = async (req, res) => {
  const givenUrl = req.params['0'].toLowerCase();

  if (!isValidUrl(givenUrl)) {
    return res.json({ error: 'Invalid URL' });
  }
  const hashCode = getHashCode(givenUrl);

  const bool = await urlAlreadyInDB(hashCode);
  if (bool) {
    return res.json(getJsonResponse(givenUrl, req.get('host'), hashCode));
  }

  // Create and save a new Url object with givenUrl and hashCode
  const newUrl = await new Url({
    url: givenUrl,
    code: hashCode
  }).save();

  return res.json(getJsonResponse(givenUrl, req.get('host'), hashCode));
};

exports.getFullUrl = async (req, res) => {
  const hashCode = req.params.hashCode;
  const url = await Url.findOne({ code: hashCode });

  if (url) {
    return res.redirect(url.url);
  }
  res.json({ error: 'This url is not on the database.' });
};

// Helper functions

// checks if given url is already present in database
async function urlAlreadyInDB(hashCode) {
  const url = await Url.findOne({ code: hashCode });
  return url;
}

// returns the required json response.
function getJsonResponse(url, host, hashCode) {
  return {
    original_url: url,
    short_url: host + '/' + hashCode
  };
}

/**
 * @param {string} url
 * @returns {boolean} true if given url is a valid url else false.
 */
function isValidUrl(url) {
  let re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

  return re.test(url);
}

/**
 * The hash code for a string object is computed as
 * s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * using number arithmetic, where s[i] is the i th character
 * of the given string, n is the length of the string,
 * and ^ indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @param {string} str a string
 * @return {number} a hash code value for the given string.
 */
function getHashCode(str) {
  var h = 0,
    l = str.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + str.charCodeAt(i++)) | 0;
  return Math.abs(h);
}
