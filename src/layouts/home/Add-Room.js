import React, { Component } from 'react';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))

// let RBAbi = require('../../../abis/RoomBaseAbi.js');
// let RBAddress = '0x8273e4b8ed6c78e252a9fca5563adfcc75c91b2a';
// let RB = web3.eth.contract(RBAbi).at(RBAddress);

// let ROAbi = require('../../../abis/RoomOwnershipAbi.js');
// let ROAddress = '0x4e71920b7330515faf5ea0c690f1ad06a85fb60c';
// let RO = web3.eth.contract(ROAbi).at(ROAddress);

let RRAbi = require('../../../abis/RoomRentingAbi.js');
let RRAddress = '0x9fbda871d559710256a2502a2517b794b482db40';
let RR = web3.eth.contract(RRAbi).at(RRAddress);

class AddRoomForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      numBeds : '',
    }
    this.handleTextChange=this.handleTextChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleTextChange = (event) => {
    if(this.state[event.target.id] !== undefined){
      this.setState({[event.target.id]: event.target.value});
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit fired!");
    let numBeds = Number(this.state.numBeds);
    RR.addRoom(numBeds, {from: web3.eth.accounts[0], gas: 3000000});
    console.log("RR.addRoom fired!");
    this.setState({
      numBeds : '',
    })
    this.props.getBalance();
    this.props.getTotalSupply();
    this.props.getRoomId();
    this.props.getRoomInfo();
  }

  render() {
    const formStyle = {
      "backgroundColor": "deepskyblue",
      "flexGrow": 1,
    };
    return (
      <div className="AddRoomForm">
        <fieldset>
          <legend>Add Room</legend>
          <form style={formStyle}>
            <label>
              Beds:
              <input id="numBeds" onChange={this.handleTextChange} type="text" value={this.state.numBeds} />
            </label>
            <hr />
            <input id="submit" type="submit" value="Submit" onClick={this.handleSubmit}/>
          </form>
        </fieldset>
      </div>
    );
  }
}

export default AddRoomForm