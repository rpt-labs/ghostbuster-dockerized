// this model will accept the github fetch data and
// process it into the appropriate format for use in
// the Google Sheet API batchUpdate(resource, spreadsheetId);

const formatSheetUpdate = (cohort, resource) => {

  const results = [];

  const keys = Object.keys(resource);

  for (let i = 0; i < keys.length; i += 1) {
    const sprintName = keys[i];
    const columns = Array.from(Array(7), () => []);

    for (let j = 0; j < resource[keys[i]].length; j += 1) {
      columns[0].push(resource[keys[i]][j].name);
      columns[1].push(resource[keys[i]][j].BMR);
      columns[2].push(resource[keys[i]][j].AdvancedContent);
      columns[3].push(JSON.stringify(resource[keys[i]][j].percentComplete));
      columns[4].push(JSON.stringify(resource[keys[i]][j].commitMessages));
      columns[5].push(resource[keys[i]][j].github);
      columns[6].push(resource[keys[i]][j].cohort);
    }

    const columnLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    for (let k = 0; k < columns.length; k += 1) {
      const updatePacket = {
        range: `${sprintName}!${columnLetters[k]}2:${columnLetters[k]}40`,
        values: columns[k].map(value => {
          if (value === null || value === undefined || value === " ") {
            value = '* not listed *';
          }
          return [value];
        })
      };
      results.push(updatePacket);
    }
  }
  return results;
};

const formatSheetExtract = data => {

  // this model will accept the cache data and
  // process it into a format which matches the Github API fetch

  const total = {};

  for (let i = 0; i < data.length; i += 1) {

    const sprintName = data[i].range.split('!')[0];
    total[sprintName] = [];
    let studentObj = {};

    for (let j = 1; j < data[i].values.length; j += 1) {
      const current = data[i].values[j];
      studentObj.name = current[0] === '* not listed *' ? ' ' : current[0];
      studentObj.BMR = current[1] === 'FALSE' ? false : true;
      studentObj.AdvancedContent = current[2] === 'FALSE' ? false : true;
      studentObj.percentComplete = Number(current[3]);
      studentObj.commitMessages = JSON.parse(current[4]);
      studentObj.github = current[5];
      studentObj.cohort = current[6];
      total[sprintName].push(studentObj);
      studentObj = {};
    }
  }
  return total;
};

module.exports = {
  formatSheetUpdate,
  formatSheetExtract
};
