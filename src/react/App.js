import React from 'react';
import Header from './components/app/header';
import MainContent from './components/app/main-layout';
import Footer from './components/app/footer';

import './index.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <MainContent />
        <Footer />
      </React.Fragment>
    )
  }
}

export default App;