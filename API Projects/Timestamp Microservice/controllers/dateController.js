exports.getTimeStamp = (req, res) => {
  let date = req.params.date;
  let resData;
  // Check if its unix time
  if (Number(date)) {
    resData = getJSON(Number(date));
  } else {
    // check if it can be parsed by Date.parse
    if (Date.parse(date)) resData = getJSON(Date.parse(date));
  }
  res.json(resData);
};

/**
 * @param  unixTime - unix time in milliseconds
 * @returns required JSON
 */
function getJSON(unixTime) {
  let date = new Date(unixTime);
  let month = date.toLocaleString('en-US', { month: 'long' });
  return {
    unix: unixTime,
    natural: `${month} ${date.getDate()}, ${date.getFullYear()}`
  };
}
