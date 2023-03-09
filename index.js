const { request } = require("http");
const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP: ", ip);

  // const fetchCoordsByIP = function(ip, callback) {
  //   request(`http://ipwho.is/${ip}`, (error, response, body) => {

  //     if (error) {
  //       callback(error, null);
  //       return;
  //     }
  const fetchCoordsByIP = function (ip, callback) {
    // console.log(error);
    // console.log(data);
    request(`http://ipwho.is/${ip}`, (error, response, body) => {
      if (error) {
        return callback(error, null);
      }
      const parseBody = JSON.parse(body);

      if (!parseBody.success) {
        const error = "Not found";

        const message = `Success status was ${parseBody.success}. Server message says: ${parseBody.message} when fetching for IP ${parseBody.ip}`;

        return callback(Error(error), null);
      }
      const latitude = parseBody.latitude;
      const longtitude = parseBody.longtitude;

      return callback(null, { latitude, longtitude });
    });
  };
});

// const myCallback = function (error, data) {
//   if (error) {
//     console.log("error", { error });
//   } else {
//     console.log("data:", { data });
//   }
// };

// fetchCoordsByIP("99.232.65.216", myCallback);
