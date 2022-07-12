import { Component } from 'react';
import { Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Cache extends Component {
  state = {
    cache: false
  };

  handleToggleCache(boolean) {
    const { cache } = this.state;
    const { toggleCache } = this.props;
    this.setState(
      {
        cache: boolean
      },
      () => {
        toggleCache(cache);
      }
    );
  }

  render() {
    const { cache } = this.state;
    return (
      <Radio
        toggle
        label="enable cache"
        checked={cache}
        onChange={() => this.handleToggleCache(!cache)}
      />
    );
  }
}

Cache.propTypes = {
  toggleCache: PropTypes.func.isRequired
};

export default Cache;
