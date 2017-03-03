import React from 'react';
import Header from './Header';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='catch-of-the-day'>
        <Header tagline='MENU OF THE DAY'/>
      </div>
    )
  }
}

export default App;
