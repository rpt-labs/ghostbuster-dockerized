const google = require('googleapis');
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

const spreadsheetId = '1gvEA5ki92eW2idOqmmILvc0URqzwM6V3tyaXePw9EQI';
const sheetRange = 'Sheet1!A1:B10';
const sheets = google.google.sheets('v4');

const retrieveCache = () => {

  return sheets.spreadsheets.values.get(
    {
      auth: jwtClient,
      range: sheetRange,
      spreadsheetId: spreadsheetId
    },
    (err, response) => {
      if (err) {
        console.log('The API returned an error: ' + err);
      } else {
        console.log('Data from Ghostbuster Google Sheet:', response.data.values);
      }
    });
};

module.exports.sheetsController = {
  retrieveCache
}