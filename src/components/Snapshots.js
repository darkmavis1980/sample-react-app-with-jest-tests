import React, {Component} from 'react';
import SnapshotItem from './SnapshotItem';

class Snapshots extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        'steve',
        'frank',
        'alex'
      ]
    }
  }

  render() {
    return (
      <div>
        <h3>Snaps</h3>
        {this.state.list.map((item, index) => {
          return (<SnapshotItem key={index} name={item} />)
        })}
      </div>
    );
  }
}

export default Snapshots;