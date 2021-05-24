import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Asset from '../Asset';
import MiniTable from '../MiniTable';

const Items = ({ items }) => {
  if (!items) { return null; }

  return (
    <div className="protocol-summary-stage__items">
      <div className="protocol-summary-stage__items-content">
        <h2 className="section-heading">Items</h2>
        {items.map(({ type, content, size }) => {
          switch (type) {
            case 'asset':
              return (
                <div className="protocol-summary-stage__items-item">
                  <Asset id={content} size={size} />
                </div>
              );
            default:
              return (
                <div className="protocol-summary-stage__items-item--text">
                  <MiniTable
                    rotated
                    rows={[
                      ['Block Size', size],
                      ['Type', 'Text'],
                      // eslint-disable-next-line jsx-a11y/media-has-caption
                      ['Content', <ReactMarkdown source={content} />],
                    ]}
                  />
                </div>
              );
          }
        })}
      </div>
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      content: PropTypes.string,
      size: PropTypes.string,
    }),
  ),
};

Items.defaultProps = {
  items: null,
};

export default Items;
