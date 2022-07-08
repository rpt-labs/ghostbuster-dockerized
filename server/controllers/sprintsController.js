// github sprint checking util
const getSprintDataByCohort = require('../helpers/sprintChecker');
const { sheetsController } = require('./sheets-controller');


// db
const sprints = require('../../db/models/sprints');

// SPRINTS requests TODO: error handling for all functions, delete functionality
exports.getSprints = async (req, res) => {
  const sprintData = await sprints.getAllSprints();
  res.json({ sprints: sprintData });
};

exports.createSprint = async (req, res) => {
  const { sprintName } = req.query;
  const newSprint = await sprints.addSprint(sprintName);
  res.json({ sprint: newSprint });
};

exports.updateSprint = async (req, res) => {
  const { sprintId, sprintName } = req.query;
  const updated = await sprints.updateSprint(sprintId, sprintName);
  res.json({ sprint: updated });
};

exports.deleteSprint = async (req, res) => {
  res.json({ message: 'add functionality to delete sprints' });
};

// MESSAGES requests
exports.getMessagesBySprintId = async (req, res) => {
  const { sprintId } = req.params;
  const messages = await sprints.getMessagesBySprintId(sprintId);
  res.json(messages);
};

exports.createMessage = async (req, res) => {
  const { messageText, sprintId } = req.query;
  const newMessage = await sprints.addMessage(messageText, sprintId);
  res.json({ message: newMessage });
};

exports.updateMessage = async (req, res) => {
  const { messageId, sprintId, messageText } = req.query;
  const updated = await sprints.updateMessage(messageId, messageText, sprintId);
  res.json({ message: updated });
};

exports.deleteMessage = async (req, res) => {
  res.json({ message: 'add functionality to delete new milestone message' });
};

// local endpoint URI http://localhost:1234/ghostbuster/sprints/somename/true
// updateCache test URI http://localhost:1234/ghostbuster/sprints/beesbeesbees/hr-rpp36/false
exports.getSprintGithubData = async (req, res) => {
  let { sprintNames, cohort, cacheFlag } = req.params;
  let result;
  sprintNames = sprintNames.split('+');

  if (JSON.parse(cacheFlag)) {
    sheetsController.retrieveCache(cohort, sprintNames)
    .then(data => {
        result = data;
        res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    const sprintData = await getSprintDataByCohort(cohort, sprintNames);
    sheetsController.updateCache(cohort, sprintData)
    .then(() => {
      console.log(`cache updated for cohort ${cohort}, for sprint(s) ${sprintNames}: `);
      result = sprintData;
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(`error updating cache for cohort ${cohort}, for sprint(s) ${sprintNames}: `, err);
    });
  }

};
