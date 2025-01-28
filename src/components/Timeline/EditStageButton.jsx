import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash-es';
import timelineImages from '@/images/timeline';
import filterIcon from '@/images/timeline/filter-icon.svg';
import skipLogicIcon from '@/images/timeline/skip-logic-icon.svg';

const getTimelineImage = (type) => get(timelineImages, type, timelineImages.Default);

const EditStageButton = React.forwardRef(({
  hasFilter,
  hasSkipLogic,
  label,
  onEditStage,
  type,
}, ref) => (
  <div
    className="timeline-stage__edit-stage"
    onClick={onEditStage}
  >
    <div
      className="timeline-stage__screen"
      role="button"
      tabIndex="0"
      ref={ref}
    >
      <div className="timeline-stage__screen-preview">
        {
          getTimelineImage(type)
          && (
          <img
            src={getTimelineImage(type)}
            alt={`${type} interface`}
            title={`${type} interface`}
          />
          )
        }
        {
          !getTimelineImage(type)
          && `${type} Interface`
        }
      </div>
    </div>
    <div className="timeline-stage__meta">
      <h2 className="timeline-stage__title">{label || '\u00A0'}</h2>
      <div className="timeline-stage__icons">
        { hasFilter
          && (
          <div className="timeline-stage__icon">
            <img src={filterIcon} alt="Filter" title="Filter" />
          </div>
          )}
        { hasSkipLogic
          && (
          <div className="timeline-stage__icon">
            <img src={skipLogicIcon} alt="Skip logic" title="Skip logic" />
          </div>
          )}
      </div>
    </div>
  </div>
));

EditStageButton.propTypes = {
  hasFilter: PropTypes.bool,
  hasSkipLogic: PropTypes.bool,
  label: PropTypes.string,
  onEditStage: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

EditStageButton.defaultProps = {
  hasFilter: false,
  hasSkipLogic: false,
  label: null,
};

export default EditStageButton;
