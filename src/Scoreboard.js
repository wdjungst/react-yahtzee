import React from 'react';

class Scoreboard extends React.Component {
  setScore = (key) => {
    if (!this.props.score[key].used)
      this.props.setScore(key);
  }

  render() {
    let scores = Object.keys(this.props.score).map( key => {
      let style = (this.props.dice.length && !this.props.score[key].used) ? { cursor: 'pointer' } : { cursor: 'not-allowed', backgroundColor: 'grey' }
      return (
        <li
          key={key}
          style={style}
          className="collection-item"
          onClick={() => this.setScore(key)}
          onMouseEnter={this.showWhatIf}
          onMouseLeave={this.hideWhatIf}
        >
          <div style={{ textTransform: "capitalize" }}>
            {this.props.score[key].name}
            <span className="secondary-content">
              {this.props.score[key].value}
            </span>
          </div>
        </li>
      )
    });

    return (
      <div>
        <h4 className="center">Score Card</h4>
        <ul className="collection">
          {scores}
        </ul>
      </div>
    )
  }
}

export default Scoreboard;
