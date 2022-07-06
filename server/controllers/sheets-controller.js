const google = require('googleapis');
const Promise = require('bluebird');
require('dotenv').config();

const jwtClient = new google.google.auth.JWT(
  process.env.SHEETS_CLIENT_EMAIL,
  null,
  process.env.SHEETS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize((err) => {
  if (err) {
    console.log('jwtClient error', err); // return?
  } else {
    console.log('Successfully connected to sheet');
  }
});

const sheets = google.google.sheets('v4');

const cohortSheetIds = {
  rpp35: "1n61p0lHW6J-MxhtlkfC9JJ1SaqNMdwx5Mq0HSM4GVYM",
  rpp36: "1gvEA5ki92eW2idOqmmILvc0URqzwM6V3tyaXePw9EQI"
}

// these are the Sprint names + sheetranges for data retrieval
const rangesBySprint = {
  SprintOne: "A1:B10",
  SprintTwo: "A1:B10"
};

const retrieveCache = (cohort, sprintNames) => {

  // remove after testing
  cohort = 'rpp35';
  sprintNames = ['SprintOne', 'SprintTwo'];

  const formattedRanges = sprintNames.map(name => `${name}!${rangesBySprint[name]}`);

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.batchGet(
      {
        auth: jwtClient,
        spreadsheetId: cohortSheetIds[cohort],
        ranges: formattedRanges
      },
      (err, response) => {
        if (err) {
          console.log(`The API returned an error when getting data for ${cohort}: ` + err);
          reject(error);
        } else {
          results = response.data.valueRanges;
          resolve(results);
        }
      }
    );
  });
};


const updateCache = (cohort, sprintNames) => {

}


module.exports.sheetsController = {
  retrieveCache,
  updateCache
}