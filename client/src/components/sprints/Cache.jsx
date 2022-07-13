import { Component } from 'react';
import { Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Cache extends Component {
  state = {
    cache: false
  };

  handleToggleCache() {
    const { cache } = this.state;
    const { toggleCache } = this.props;
    this.setState(
      {
        cache: !cache
      },
      () => {
        toggleCache(!cache);
      }
    );
  }

  render() {
    const { cache } = this.state;
    return (
      <div id="cache">
        <Radio
          toggle
          label="enable cache"
          checked={cache}
          onChange={() => this.handleToggleCache()}
        />
      </div>
    );
  }
}

Cache.propTypes = {
  toggleCache: PropTypes.func.isRequired
};

export default Cache;
