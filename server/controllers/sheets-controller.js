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
    console.log('Successfully connected!');
  }
});

const spreadsheetId = 'ghostbuster';
const sheetRange = 'Homepage_Data!A1:B10';
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
        console.log('Data from Ghostbuster Google Sheet:');
        for (let row of response.values) {
          console.log('Title [%s]\t\tRating [%s]', row[0], row[1]);
        }
      }
    });
}

module.exports.sheetsController = {
  retrieveCache
};