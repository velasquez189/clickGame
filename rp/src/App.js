import React, { Component } from "react";
import MemoryCard from './components/MemoryCard';
import Nav from "./components/Nav";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import columns from "./columns";
import amigos from './amigos.json';
import "./App.css";


// class App extends Component {
//   state = {
//     amigos
//   };

  function shuffleFriends(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  class App extends Component {
    state = {
      amigos,
      currentScore: 0,
      topScore: 0,
      rightWrong: "",
      clicked: [],
    };
  
    handleClick = id => {
      if (this.state.clicked.indexOf(id) === -1) {
        this.handleIncrement();
        this.setState({ clicked: this.state.clicked.concat(id) });
      } else {
        this.handleReset();
      }
    };
  
    handleIncrement = () => {
      const newScore = this.state.currentScore + 1;
      this.setState({
        currentScore: newScore,
        rightWrong: ""
      });
      if (newScore >= this.state.topScore) {
        this.setState({ topScore: newScore });
      }
      else if (newScore === 12) {
        this.setState({ rightWrong: "Congratulations!" });
      }
      this.handleShuffle();
    };
  
    handleReset = () => {
      this.setState({
        currentScore: 0,
        topScore: this.state.topScore,
        rightWrong: "Congratulations, you played yourself.",
        clicked: []
      });
      this.handleShuffle();
    };
  
    handleShuffle = () => {
      let shuffledFriends = shuffleFriends(amigos);
      this.setState({ amigos: shuffledFriends });
    };
  
    render() {
      return (
        <Wrapper>
          <Nav
            title="Try your memory game!"
            score={this.state.currentScore}
            topScore={this.state.topScore}
            rightWrong={this.state.rightWrong}
          />
  
          <Title>
            Click on each flag only once to score the highest score possible!
          </Title>
  
          <Container>
            <Row>
              {this.state.amigos.map(amigo => (
                // <Column size="md-3 sm-6">
                  <MemoryCard
                    key={amigo.id}
                    handleClick={this.handleClick}
                    handleIncrement={this.handleIncrement}
                    handleReset={this.handleReset}
                    handleShuffle={this.handleShuffle}
                    id={amigo.id}
                    image={amigo.image}
                    name={amigo.name}
                  />
                // </Column>
              ))}
            </Row>
          </Container>
        </Wrapper>
      );
    }
  }

export default App;
