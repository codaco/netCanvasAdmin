import React, { Component } from 'react';
import uuid from 'uuid';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FieldArray, arrayPush, change } from 'redux-form';
import RoundButton from '../../../Form/RoundButton';
import Items from './Items';
import Item from './Item';

class ContentGrid extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      editing: null,
    };
  }

  handleEditItem = (itemId) => {
    if (this.state.editing === itemId) {
      // If we're already editing it then act like a toggle
      this.setState({ editing: null });
    }
    this.setState({ editing: itemId });
  };

  handleChooseItemType = (fieldId, type) =>
    this.props.setInputType(fieldId, type);

  handleCreateItem = () => {
    const itemId = this.props.createNewItem();
    this.setState({ editing: itemId });
  };

  render() {
    const { form } = this.props;

    return (
      <div className="content-grid">
        <FieldArray
          name="items"
          component={Items}
          itemComponent={Item}
          onEditItem={this.handleEditItem}
          onChooseItemType={this.handleChooseItemType}
          editing={this.state.editing}
          form={form}
        />

        <RoundButton
          onClick={this.handleCreateItem}
          className="content-grid__add"
        />
      </div>
    );
  }
}

ContentGrid.propTypes = {
  createNewItem: PropTypes.func.isRequired,
  form: PropTypes.shape({
    name: PropTypes.string,
    getValues: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch, { form }) => ({
  createNewItem: () => {
    const itemId = uuid();
    dispatch(arrayPush(form.name, 'items', { id: itemId }));
    return itemId;
  },
  setInputType: (fieldId, type) => dispatch(change(form.name, `${fieldId}.type`, type)),
});

export default connect(null, mapDispatchToProps)(ContentGrid);
