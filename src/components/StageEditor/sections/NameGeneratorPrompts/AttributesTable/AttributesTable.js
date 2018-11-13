import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual, toPairs } from 'lodash';
import { compose } from 'recompose';
import RoundButton from '../../../../Form/RoundButton';
import Variable from './Variable';
import withVaribleActions from './withVariableActions';
import withUnusedVariables from './withUnusedVariables';

class AttributesTable extends Component {
  static propTypes = {
    createVariable: PropTypes.func.isRequired,
    updateVariable: PropTypes.func.isRequired,
    deleteVariable: PropTypes.func.isRequired,
    nodeType: PropTypes.string.isRequired,
    unusedVariables: PropTypes.array.isRequired,
    variablesForNodeType: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      new: false,
      editing: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextState, this.state) || !isEqual(nextProps, this.props);
  }

  get variables() {
    const variables = toPairs(this.props.input.value || {});

    if (!this.state.new) {
      return variables;
    }

    return variables.concat([[]]);
  }

  handleEditVariable = (variable) => {
    if (this.state.editing === variable) { this.setState({ editing: null }); }

    this.setState({ editing: variable, new: false });
  };

  handleAddVariable = () => {
    this.setState({ new: true, editing: undefined });
  };

  handleChooseVariableType = (variable) => {
    this.props.createVariable(variable);
    this.setState({ new: false, editing: variable });
  };

  handleDeleteVariable = (variable) => {
    this.props.deleteVariable(variable);
  };

  handleChange = (variable) => {
    this.props.updateVariable(variable);
  }

  renderVariable({ value, variable, key }) {
    const {
      nodeType,
      variablesForNodeType,
      unusedVariables,
      meta,
      input,
    } = this.props;

    const isEditing = this.state.editing === variable;
    const error = meta && meta.error && meta.error[variable];

    return (
      <div className="attributes-table__variable" key={key}>
        <Variable
          variable={variable}
          value={value}
          name={`${input.name}.${variable}`}
          error={error}
          nodeType={nodeType}
          variablesForNodeType={variablesForNodeType}
          unusedVariables={unusedVariables}
          isEditing={isEditing}
          onChange={this.handleChange}
          onChooseVariable={this.handleChooseVariableType}
          onToggleEdit={() => this.handleEditVariable(variable)}
          onDelete={() => this.handleDeleteVariable(variable)}
        />
      </div>
    );
  }

  render() {
    const rows = this.variables.map(
      ([variable, value], index) =>
        this.renderVariable({ variable, value, key: index }),
    );

    return (
      <div className="attributes-table">
        <div className="attributes-table__variables">
          {rows}
        </div>

        <RoundButton
          onClick={this.handleAddVariable}
          className="attributes-table__add"
        />
      </div>
    );
  }
}

export { AttributesTable };

export default compose(
  withVaribleActions,
  withUnusedVariables,
)(AttributesTable);
