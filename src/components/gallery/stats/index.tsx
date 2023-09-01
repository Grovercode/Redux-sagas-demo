import styled from '@emotion/styled';
import React from 'react';

const Container = styled.span`
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
    padding: 5px 18px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    font-size: 0.8rem;
`;

const Stats = ({ stats }) => {
  if (!stats) {
    // loading not yet started
    return <span className="stats">Loading...</span>;
  }
  return (
    <Container className="stats">
      {stats.error && '🤯 Error!'}
      {stats.isLoading && '🙄 Loading...'}
      {stats.downloads !== null && `🤘 ${stats.downloads}`}
    </Container>
  );
};

export default Stats;
