const formatSheetUpdate = (cohort, resource) => {

  // this model will accept the github fetch data and
  // process it into the appropriate format for use in
  // Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);
  // in the sheets-controller cache update method

  // take github data and add to data array in following format
  // {
  //   range: "Sheet1!A1",   // Update single cell
  //   values: [
  //     ["A1"]
  //   ]
  // },

  const data = [];

  const result = {
    valueInputOption: 'USER_ENTERED',
    data
  };

  return result;

};


module.exports = {
  formatSheetUpdate
};