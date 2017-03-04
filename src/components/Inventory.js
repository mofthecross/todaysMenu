import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: null,
      owner: null
    }
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user})
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    const updatedFish = {...fish, [e.target.name]: e.target.value}
    this.props.updateFish(key, updatedFish);
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p> sign in to manage your store's inventory</p>
        <button
          className="github"
          onClick={()=> this.authenticate('github')}>Log In With Github</button>
        <button
          className="facebook"
          onClick={()=> this.authenticate('facebook')}>Log In With Facebook</button>
      </nav>
    )
  }

  authenticate(provider) {
    console.log('authenticating', provider)
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  authHandler(err, authData) {
    if (err) {
      console.error(err);
      return;
    }
    //grab store info
    const storeRef = base.database().ref(this.props.storeId);

    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid,
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderInventory(key) {
    const fish = this.props.fishes[key]
    return (
      <div className="fish-edit" key={key}>

        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={(e)=> this.handleChange(e, key)}/>

        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish price"
          onChange={(e)=> this.handleChange(e, key)}/>

        <select
          type="text" name="status"
          value={fish.status}
          onChange={(e)=> this.handleChange(e, key)}>

          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={(e)=> this.handleChange(e, key)}>
        </textarea>

        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={(e)=> this.handleChange(e, key)}/>

        <button onClick={()=> this.props.removeFish(key)}> remove </button>
      </div>
    )
  }

  render() {
    const logout = <button>log out </button>
    //check if they are not loggedin
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          sorry you are not the owner
          {logout}
        </div>
      )
    }
      return (
        <div >
          <h2>
            Inventory
            {logout}
          </h2>
          { Object.keys(this.props.fishes).map(this.renderInventory) }
          <AddFishForm addFish={this.props.addFish}/>
          <button onClick={this.props.loadSamples}>load fish</button>
        </div>
      )
    }

}

export default Inventory;
