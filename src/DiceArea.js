import React from 'react';
import One from './images/1.png';
import Two from './images/2.png';
import Three from './images/3.png';
import Four from './images/4.png';
import Five from './images/5.png';
import Six from './images/6.png';
import Felt from './images/redfelt.jpg';

class DiceArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dice: [] }
    this.One = One;
    this.Two = Two;
    this.Three = Three;
    this.Four = Four;
    this.Five = Five;
    this.Six = Six;
  }

  roll = () => {
    if (this.props.roll < 3) {
      let dice = [];
      for( let i = 0; i < 5; i++ ) {
        if (this.props.keep.includes(i))
          dice.push(this.state.dice[i]);
        else
          dice.push(Math.floor(Math.random() * 6 + 1));
      }
      this.props.incRoll();
      let values = [];
      this.setState({ dice }, () => {
        let values = [...document.getElementsByClassName('dice')].map( die => {
          return parseInt(die.dataset.val)
        });
        this.props.setDice(values);
      });
    }
  }

  mapNumToImg(num) {
    switch(num) {
      case 1:
        return this.One;
      case 2:
        return this.Two;
      case 3:
        return this.Three;
      case 4:
        return this.Four;
      case 5:
        return this.Five;
      case 6:
        return this.Six;
    }
  }
  render() {
    let diceMap = this.props.resetDice ? [] : this.state.dice;
    let dice = diceMap.map( (die, i) => {
      let selected = this.props.keep.includes(i) ? { boxShadow: '5px 5px 5px green' } : {}
      let style = Object.assign({ width: '100%', cursor: 'pointer' }, selected);
      return(
        <div style={{ marginTop: '20%' }} key={i} className="dice col m2" data-val={die}>
          <img
            style={style}
            src={this.mapNumToImg(die)}
            onClick={() => this.props.hold(i)}
          />
        </div>
      )
    });

    return (
      <div
        style={
          {
            height: '80vh',
            backgroundImage: `url('${Felt} ')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repat'
          }
        }
        className="row">
        <div className="center">
          { this.props.isOver ? null :
            <button
              onClick={this.roll}
              className="btn black col m12"
              style={ this.props.roll < 3 ? {} : { color: 'grey', cursor: 'not-allowed' }}
            >
              Roll
            </button>
          }
        </div>
        <div className="col offset-m1"></div>
        {dice}
        <hr />
        <div className="col s12 center">
          { this.props.roll === 3 ? <h4>Score this turn</h4> : null }
        </div>
      </div>
    )
  }
}

export default DiceArea;
