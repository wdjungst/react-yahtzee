import React from 'react';
import CountUp from 'react-countup';

class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prevScore: 0 }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.score === nextState.prevScore)
      return false;
    return true;
  }

  getStartEnd = () => {
    let result = {}
    result.start = this.state.prevScore;
    result.end = this.props.score;
    this.setState({ prevScore: this.props.score });
    return result;
  }

  render() {
    let trials = this.getStartEnd();

    return (
      <div>
        <div className="center">
          <CountUp
            style={{ fontSize: '4em' }}
            start={trials.start}
            end={trials.end}
            duration={2.75}
            useEasing={true}
            prefix="SCORE: "
          />
        </div>
      </div>
    )
  }
}

export default Score;
