const { request } = require("http");
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// });

fetchCoordsByIP("162.245.144.188", (error, coordinates) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned coordinates:", coordinates);
});

// const exampleCoords = { latitude: "49.27670", longitude: "-123.13000" };

// fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned flyover times:", passTimes);
// });

 const { nextISSTimesForMyLocation } = require("./iss");
// {
//   message: "success",
//   request: {
//   datetime: 1630085914,
//   latitude: -80,
//   longitude: -23,
//   altitude: 1,
//   number: 5
// },
// response: [
//   {
//     risetime: 1630160442,
//     duration: 289
//   },
//   {
//     risetime: 1630196842,
//     duration: 635
//   },
//   {
//     risetime: 1630233242,
//     duration: 615
//   },
//   {
//     risetime: 1630269642,
//     duration: 467
//   },
//   {
//     risetime: 1630306042,
//     duration: 146
//   }
//   ]
// }

// nextISSTimesForMyLocation((error, passTimes) => {
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
