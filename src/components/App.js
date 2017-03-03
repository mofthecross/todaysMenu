import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    }
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
  }

  addFish(fish) {
    //update state
    const fishes = {...this.state.fishes};
    const timeStamp = Date.now();
    fishes[`fish-${timeStamp}`] = fish;

    //set state
    this.setState({ fishes});
  }

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  render() {
    return (
      <div className='catch-of-the-day'>
       <div className='menu'>
        <Header tagline='Fresh Seafood Market'/>
        <ul className="list-of-fishes">
         {
              Object
          .keys(this.state.fishes)
          .map(key => <Fish key={key} details={this.state.fishes[key]}/>)
         }
        </ul>
       </div>
       <Inventory addFish={this.addFish} loadSamples={ this.loadSamples}/>
      </div>
    )
  }
}

export default App;
