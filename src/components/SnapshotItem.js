import React from 'react';

const SnapshotItem = (props) => {
  if (props.name !== null && props.name) {
    return (
      <div>{props.name}</div>
    );
  }
  return null;
}

export default SnapshotItem;