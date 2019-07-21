/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, Modal, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// TODO:remove eslint-disable and refactor to stateless function
class CreateTeamModal extends Component {
  createTeam = () => {
    console.log('hi');
  };

  render() {
    const { open, size, selectedStudents, close } = this.props;

    return (
      <div>
        <Modal size={size} open={open} onClose={close}>
          <Modal.Header>Create Team</Modal.Header>
          <Modal.Content>
            <List>
              {selectedStudents.map(student => (
                <List.Item key={student.github}>
                  {`${student.firstName} ${student.lastName}`}
                </List.Item>
              ))}
            </List>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>
              No
            </Button>
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Create Team?"
              onClick={this.createTeam}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateTeamModal;

CreateTeamModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  selectedStudents: PropTypes.instanceOf(Array).isRequired
};
