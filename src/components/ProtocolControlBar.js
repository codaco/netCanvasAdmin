import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Icon } from '@codaco/ui';
import { getProtocol } from '@selectors/protocol';
import { actionCreators as protocolsActions } from '@modules/protocols';
import ControlBar from './ControlBar';

const RightArrow = <Icon name="arrow-right" />;

const ProtocolControlBar = ({
  saveProtocol,
  hasUnsavedChanges,
  hasAnyStages,
  show,
}) => (
  <ControlBar
    show={show && hasUnsavedChanges}
    buttons={[
      <Button
        onClick={saveProtocol}
        color="white"
        icon={RightArrow}
        iconPosition="right"
        disabled={!hasAnyStages}
      >
        Save
      </Button>,
    ]}
  />
);

ProtocolControlBar.propTypes = {
  saveProtocol: PropTypes.func.isRequired,
  hasUnsavedChanges: PropTypes.bool.isRequired,
  hasAnyStages: PropTypes.bool.isRequired,
  show: PropTypes.bool,
};

ProtocolControlBar.defaultProps = {
  show: true,
};

const mapStateToProps = state => ({
  hasUnsavedChanges: (
    state.session.lastChanged >
    state.session.lastSaved
  ),
  hasAnyStages: getProtocol(state).stages.length > 0,
});

const mapDispatchToProps = dispatch => ({
  saveProtocol: bindActionCreators(protocolsActions.saveAndExportProtocol, dispatch),
});

export { ProtocolControlBar };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtocolControlBar);
