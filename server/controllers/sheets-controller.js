const google = require('googleapis');
const Promise = require('bluebird');
require('dotenv').config();

const jwtClient = new google.google.auth.JWT(
  process.env.SHEETS_CLIENT_EMAIL,
  null,
  process.env.SHEETS_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  ['https://www.googleapis.com/auth/spreadsheets']
);

jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log('this is the error!!!!!!!!!!!!!!!!!!!!!!', err); // return?
  } else {
    console.log('Successfully connected to sheet!');
  }
});

//const spreadsheetId = '1gvEA5ki92eW2idOqmmILvc0URqzwM6V3tyaXePw9EQI';
const sheetRange = 'Sprint1!A1:B10';
const sheets = google.google.sheets('v4');

const retrieveCache = () => {

  let promises = [];
  let cohorts = Object.keys(cohortSheetIds);
  for (let cohort of cohorts) {
    promises.push(new Promise((resolve, reject) => {
      sheets.spreadsheets.values.get(
        {
          auth: jwtClient,
          range: sheetRange,
          spreadsheetId: cohortSheetIds[cohort]
        },
        (err, response) => {
          if (err) {
            console.log('The API returned an error when getting data for ${key}: ' + err);
            reject(err);
          } else {
           resolve(response.data.values);
          }
        });
    }))
  }

  return Promise.all(promises);
  // return sheets.spreadsheets.values.get(
  //   {
  //     auth: jwtClient,
  //     range: sheetRange,
  //     spreadsheetId
  //   },
  //   (err, response) => {
  //     if (err) {
  //       console.log('The API returned an error: ' + err);
  //     } else {
  //       console.log('Data from Ghostbuster Google Sheet:', response.data.values);
  //     }
  //   });
};

const updateCache = () => {



}


const cohortSheetIds = {
  rpp35: '1n61p0lHW6J-MxhtlkfC9JJ1SaqNMdwx5Mq0HSM4GVYM',
  rpp36: '1gvEA5ki92eW2idOqmmILvc0URqzwM6V3tyaXePw9EQI'
}

module.exports.sheetsController = {
  retrieveCache,
  updateCache
}