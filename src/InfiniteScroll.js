import React from 'react';

import styles from './InfiniteScroll.module.css';

export const LoadIndicator = ({loading}) => (
  loading ? (
    <div className={styles['load-indicator']}>
      Loading...
    </div>
  ) : null
);

const isAtBottom = (el, threshold) => {
  const { scrollTop, scrollHeight } = el;
  const containerHeight = el.getBoundingClientRect().height;
  const scrolledSoFar = scrollTop + containerHeight;
  return (scrolledSoFar > (scrollHeight - threshold));
}

const InfiniteScroll = ({
  data,
  loading,
  loadMore,
  threshold,
  children,
}) => (
  <div
    className={styles['scroll-container']}
    onScroll={event => {
      if (!isAtBottom(event.target, threshold)) {
        return;
      }

      if (typeof loadMore !== 'function') {
        console.warning('`loadMore` function not defined.')
      }

      loadMore()
    }}
  >
    {children({data, loading})}
  </div>
);

export default InfiniteScroll;
