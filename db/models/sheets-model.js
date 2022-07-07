const formatSheetUpdate = (cohort, resource) => {

  let results = [];

  // this model will accept the github fetch data and
  // process it into the appropriate format for use in
  // Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);
  // in the sheets-controller cache update method

  // incoming resource format:

  // {
  //   beesbeesbees: [
  //     {
  //       name: 'Carmen Montero',
  //       BMR: false,
  //       AdvancedContent: false,
  //       percentComplete: 0,
  //       commitMessages: [Array],
  //       github: 'carmmmm',
  //       cohort: 'hr-rpp36'
  //     },
  //     {

  for (key in resource) {

    let sprintName;
    let names = [];
    let BMR = [];
    let AdvancedContent = [];
    let percentComplete = [];
    let commitMessages = [];
    let github = [];
    let cohort = [];

    let values = [];
    values.push(names, BMR, AdvancedContent, percentComplete, commitMessages, github, cohort);


    for (let i = 0; i < resource[key].length; i++) {
      sprintName = key;
      names.push(resource[key][i].name);
      BMR.push(resource[key][i][BMR]);
      AdvancedContent.push(resource[key][i].AdvancedContent);
      percentComplete.push(resource[key][i].percentComplete);
      commitMessages.push(JSON.stringify(resource[key][i].commitMessages));
      github.push(resource[key][i].github);
      cohort.push(resource[key][i].cohort);
    }

    let data = [];
    let columnLetters = ["A", "B", "C", "D", "E", "F", "G"];

    for (let i = 0; i < values.length; i++) {
      let updatePacket = {
        range: `${sprintName}!${columnLetters[i]}2:${columnLetters[i]}40`,
        values: values[i].map(value => [value])
      }
      data.push(updatePacket);
    }

    const result = {
      data
    };

    results.push(result);

  }


 // take github data and add to data array in following format
  // {
  //   range: "Sheet1!A1",   // Update single cell
  //   values: [
  //     ["A1"]
  //   ]
  // },


  return results;

};


module.exports = {
  formatSheetUpdate
};