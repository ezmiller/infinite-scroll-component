import React, { Component } from 'react';

import styles from './InfiniteScroll.module.css';

export const LoadIndicator = ({loading}) => (
  loading ? (
    <div className={styles['load-indicator']}>
      Loading...
    </div>
  ) : null
);

class InfiniteScroll extends Component {
  handleScroll = event => {
    const { threshold } = this.props;
    const el = event.target;
    const { scrollTop, scrollHeight } = el;
    const containerHeight = el.getBoundingClientRect().height;
    const scrolledSoFar = scrollTop + containerHeight;

    const atBottom = scrolledSoFar > (scrollHeight - threshold);

    if (atBottom && typeof this.props.loader === 'function') {
      this.props.loader();
    }
  }

  render() {
    const { data, loading } = this.props;

    return (
      <div
        className={styles['scroll-container']}
        onScroll={this.handleScroll}
      >
        {this.props.children({data, loading})}
      </div>
    );
  }
}

export default InfiniteScroll;
