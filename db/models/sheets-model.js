const formatSheetUpdate = (cohort, resource) => {

  let results = [];

  // this model will accept the github fetch data and
  // process it into the appropriate format for use in
  // Sheets.Spreadsheets.Values.batchUpdate(resource, spreadsheetId);

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
      percentComplete.push(JSON.stringify(resource[key][i].percentComplete));
      commitMessages.push(JSON.stringify(resource[key][i].commitMessages));
      github.push(resource[key][i].github);
      cohort.push(resource[key][i].cohort);
    }

    let data = [];
    let columnLetters = ["A", "B", "C", "D", "E", "F", "G"];


    for (let i = 0; i < values.length; i++) {
      let updatePacket = {
        range: `${sprintName}!${columnLetters[i]}2:${columnLetters[i]}40`,
        values: values[i].map(value => {
          if (value === null || value === undefined || value === " ") {
            value = 'not listed';
          }
          return [value];
        })
      }
      data.push(updatePacket);
    }

    const result = {
      data
    };
    results.push(result);

  }

  return results;

};

const formatSheetExtract = (data) => {

  // incoming format:
  // [
  //   {

  //     range: 'beesbeesbees:!A1:G40',
  //     majorDimension: "ROWS",
  //     values: [
  //       ["name", "BMR"...], [ next row ],
  //     ]

  //   }
  // ]

    let total = {};

    for (let i = 0; i < data.length; i++) {

      let sprintName = data[i].range.split('!')[0];
      total[sprintName] = [];
      let studentObj = {}
      for (let j = 1; j < data[i].values.length; j++) {
        studentObj.name = data[i].values[j][0];
        studentObj.BMR = data[i].values[j][1];
        studentObj.AdvancedContent = data[i].values[j][2];
        studentObj.percentComplete = Number(data[i].values[j][3]);
        studentObj.commitMessages = JSON.parse(data[i].values[j][4]);
        studentObj.github = data[i].values[j][5];
        studentObj.cohort = data[i].values[j][6];
        total[sprintName].push(studentObj);
        studentObj = {};
      }
    }

    return total;

  // desired format:

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
}


module.exports = {
  formatSheetUpdate,
  formatSheetExtract
};