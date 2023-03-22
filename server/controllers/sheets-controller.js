const google = require('googleapis');
const Promise = require('bluebird');
const { formatSheetUpdate, formatSheetExtract } = require('../../db/models/sheets-model');
require('dotenv').config();

const jwtClient = new google.google.auth.JWT(
  process.env.SHEETS_CLIENT_EMAIL,
  null,
  process.env.SHEETS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize((err) => {
  if (err) {
    console.log('jwtClient error', err);
  } else {
    console.log('Successfully connected to sheet');
  }
});

const sheets = google.google.sheets('v4');

const cohortSheetIds = {
  'hr-rpp35': '1n61p0lHW6J-MxhtlkfC9JJ1SaqNMdwx5Mq0HSM4GVYM',
  'hr-rpp36': '1gvEA5ki92eW2idOqmmILvc0URqzwM6V3tyaXePw9EQI'
}

const retrieveCache = (cohort, sprintNames) => {
  const formattedRanges = sprintNames.map(name => `${name}!A1:G40`);

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
          reject(err);
        } else {
          let results = response.data.valueRanges;
          results = formatSheetExtract(results);
          resolve(results);
        }
      }
    );
  });
};

const updateCache = (cohort, githubData) => {
  const formattedData = formatSheetUpdate(cohort, githubData);
  const spreadsheetId = cohortSheetIds[cohort];

  return sheets.spreadsheets.values.batchUpdate({
    auth: jwtClient,
    spreadsheetId,
    resource: {
      valueInputOption: 'USER_ENTERED',
      data: formattedData
    }
  });
};

module.exports.sheetsController = {
  retrieveCache,
  updateCache
};
