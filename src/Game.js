import React from 'react';
import Scoreboard from './Scoreboard';
import DiceArea from './DiceArea';
import Score from './Score';

class Game extends React.Component {
  constructor(props) { super(props);
    this.state = {
      score: {
        ones: { name: 'Ones', value: 0, used: false },
        twos: { name: 'Twos', value: 0, used: false },
        threes: { name: 'Threes', value: 0, used: false },
        fours: { name: 'Fours', value: 0, used: false },
        fives: { name: 'Fives', value: 0, used: false },
        sixes: { name: 'Sixes', value: 0, used: false },
        threeOfAKind: { name: '3 Of A kind', value: 0, used: false },
        fourOfAKind: { name: '4 Of A Kind', value: 0, used: false },
        fullHouse: { name: 'Full House', value: 0, used: false },
        smStraight: { name: 'Sm Straight', value: 0, used: false },
        lgStraight: { name: 'Lg Straight', value: 0, used: false },
        yahtzee: { name: 'Yahtzee', value: 0, used: false },
        chance: { name: 'Chance', value: 0, used: false }
      },
      roll: 0,
      keep: [],
      dice: [],
      resetDice: false
    }
  }

  newGame = () => {
    let score = {}
    Object.keys(this.state.score).map( key => {
      score[key] = { ...this.state.score[key], used: false, value: 0 }
    });
    this.setState({ score, roll: 0, keep: [], dice: [] });
  }

  gameOver = () => {
    let used = Object.keys(this.state.score).map( key => this.state.score[key].used );
    if (used.includes(false))
      return false
    return true
  }

  countScore = () => {
    let score = 0;
    score = Object.keys(this.state.score).reduce( (total, val) => {
      return total + this.state.score[val].value
    }, 0);
    return score;
  }

  hold = (index) => {
    if (!this.state.keep.includes(index))
      this.setState({ keep: [...this.state.keep, index] });
    else
      this.setState({ keep: this.state.keep.filter( i => i !== index) });
  }

  incRoll = () => {
    if (this.state.roll < 3)
      this.setState({ resetDice: false, roll: ++this.state.roll });
    else
      this.setState({ roll: 0 });
  }

  setDice = (dice) => {
    this.setState({ dice });
  }

  reset = () => {
    this.setState({ dice: [], roll: 0, keep: [], resetDice: true });
  }

  splitArray(dice) {
    let split = dice.sort().reduce( (acc, val) => {
      let inner;
      if (acc.previous !== val) {
        inner = [];
      } else {
        inner = acc.newArray.pop();
      }

      inner.push(val);
      acc.previous = val;
      acc.newArray.push(inner);
      return acc;
    }, {
      previous: null,
      newArray: []
    });

    return split;
  }

  findSeq(dice) {
    let count = 1;
    for( let i = 0; i < dice.length; i++) {
      if (dice[i + 1] - 1 === dice[i])
        ++count
    }
    return count
  }

  markScore = (score, key) => {
    let obj = this.state.score[key];
    let objScore = { [key]: Object.assign(obj, { value: score, used: true }) }
    this.setState({ score: Object.assign(this.state.score, objScore) });
    this.reset();
  }

  sumAllDice = () => {
    return this.state.dice.reduce( (total, val) => {
      return total + val;
    }, 0);
  }

  singles = (num) => {
    let score = 0;
    score = this.state.dice.reduce( (total, val) => {
      if (val === num)
        return total + val;
      else
        return total;
    }, 0);

    return score;
  }

  threeOfAKind = () => {
    let score = 0;
    let hasScore = false;
    let split = this.splitArray(this.state.dice);
    for ( let arr of split.newArray ) {
      if (arr.length >= 3 )
        hasScore = true;
    }

    if (hasScore)
      score = this.sumAllDice();

    return score;
  }

  fourOfAKind = () => {
    let score = 0;
    let hasScore = false;
    let split = this.splitArray(this.state.dice);
    for ( let arr of split.newArray ) {
      if (arr.length >= 4 )
        hasScore = true;
    }

    if (hasScore)
      score = this.sumAllDice();

    return score;
  }

  fullHouse = () => {
    let score = 0;
    let hasTwo = false;
    let hasThree = false;
    let split = this.splitArray(this.state.dice);
    for ( let arr of split.newArray ) {
      if (arr.length === 3 )
        hasThree = true;
      if (arr.length === 2 )
        hasTwo = true;
    }

    if (hasTwo && hasThree)
      score = 25;

    return score;
  }

  smStraight = () => {
    let count = this.findSeq(this.state.dice.sort());
    let score = 0;
    if (count >= 4)
      score = 30;

    return score;
  }

  lgStraight = () => {
    let count = this.findSeq(this.state.dice.sort());
    let score = 0;
    if (count === 5)
      score = 40;

    return score;
  }

  chance = () => {
    let score = 0;
    score = this.sumAllDice();
    return score;
  }

  yahtzee = () => {
    let score = 0;
    let matches = 0;
    let val = this.state.dice[0];
    matches = this.state.dice.filter( i => i === val ).length
    if (matches === 5)
      score = 50;

    return score;
  }

  setScore = (key) => {
    let score = 0;
    switch(key) {
      case 'ones':
        score = this.singles(1);
        break;
      case 'twos':
        score = this.singles(2);
        break;
      case 'threes':
        score = this.singles(3);
        break;
      case 'fours':
        score = this.singles(4);
        break;
      case 'fives':
        score = this.singles(5);
        break;
      case 'sixes':
        score = this.singles(6);
        break;
      case 'threeOfAKind':
        score = this.threeOfAKind();
        break;
      case 'fourOfAKind':
        score = this.fourOfAKind();
        break;
      case 'fullHouse':
        score = this.fullHouse();
        break;
      case 'smStraight':
        score = this.smStraight();
        break;
      case 'lgStraight':
        score = this.lgStraight();
        break;
      case 'yahtzee':
        score = this.yahtzee();
        break;
      case 'chance':
        score = this.chance();
        break;
    }

    this.markScore(score, key);
  }

  render() {
    let isOver = this.gameOver();
    return (
      <div className="row">
        <div className="col m4">
          <Scoreboard
            score={this.state.score}
            dice={this.state.dice}
            setScore={this.setScore}
          />
        </div>
        <div className="col m8">
          <DiceArea
            resetDice={this.state.resetDice}
            isOver={isOver}
            hold={this.hold}
            roll={this.state.roll}
            keep={this.state.keep}
            incRoll={this.incRoll}
            setDice={this.setDice}
          />
          <Score score={this.countScore()} />
          { isOver ?
              <div className="center">
                <button className='btn' onClick={this.newGame}>New Game</button>
              </div>
              : null
          }
        </div>
      </div>
    )
  }
}

export default Game;
