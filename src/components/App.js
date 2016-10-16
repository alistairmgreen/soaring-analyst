import React, { PropTypes } from 'react';
import MenuBar from './MenuBar';

const App = (props) => {
  return (
    <div>
      <MenuBar />
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
