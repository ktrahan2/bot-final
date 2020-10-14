import React, { Component } from "react";
import BotCollection from './BotCollection'
import YourBotArmy from "./YourBotArmy";

class BotsPage extends Component {
  
  state = {
    bots: [],
    myArmy: [],
  }

  componentDidMount() {
    this.fetchBots()
  }

  fetchBots = () => {
    fetch('http://localhost:6001/bots')
      .then(response => response.json())
      .then(bots => this.setState({bots}))
  }

  addToBotArmy = (clickedBot) => {

    const thatOneBot = this.state.myArmy.find(bot => {
     return bot.id === clickedBot.id
    })
    if (!thatOneBot) {
      this.setState({
        myArmy: [...this.state.myArmy, clickedBot]
      })
    }
  }

  removeFromBotArmy = (clickedBot) => {

    const updatedArmy = this.state.myArmy.filter(bot => {
      return bot.id !== clickedBot.id
    })

    this.setState({
      myArmy: [...updatedArmy]
    })
  }

  deleteBot = (clickedBot) => {

    const bots = this.state.bots.filter(bot => bot.id !== clickedBot.id)
    
    const myArmy = this.state.myArmy.filter(bot => {
      bot.id !== clickedBot.id
    })

    this.setState({
      bots,
      myArmy: myArmy
    })

    fetch(`http://localhost:6001/bots/${clickedBot.id}` , {
      method: "DELETE"
    })
  }

  render() {
    return ( 
      <div>
        <YourBotArmy
          myArmy={this.state.myArmy}
          removeFromBotArmy={this.removeFromBotArmy}
          deleteBot={this.deleteBot}
        />
        <BotCollection 
          bots={this.state.bots} 
          addToBotArmy={this.addToBotArmy}
          deleteBot={this.deleteBot}
        />
      </div>
    )  
  }
}

export default BotsPage;
