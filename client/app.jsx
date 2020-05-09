import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarChart from './components/BarChart.jsx';
import { exampleData } from './data/exampleData.js';
import randomize from './utils/index.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: exampleData,
      isSorted: false,
      currentIndex: 0,
      noChange: 0,
    };
    this.handleSortClick = this.handleSortClick.bind(this);
    this.handleShuffleClick = this.handleShuffleClick.bind(this);
  }

  sort() {
    // bubblesort
    if (!this.state.isSorted) {
      let noChangeCount = this.state.noChange;
      let len = this.state.data.length - 1;
      let nums = this.state.data.map((item) => {
        return item.num;
      });
      let data = this.state.data;
      let currentIndex = this.state.currentIndex;

      if (currentIndex < len && nums[currentIndex] > nums[currentIndex + 1]) {
        let temp = data[currentIndex];
        data[currentIndex] = data[currentIndex + 1];
        data[currentIndex + 1] = temp;
      } else {
        noChangeCount++;
      }
      currentIndex++;

      if (noChangeCount >= len) {
        this.setState({
          isSorted: true,
        });
      }

      if (currentIndex >= len) {
        currentIndex = 0;
        noChangeCount = 0;
      }

      this.setState({
        noChange: noChangeCount,
        currentIndex: currentIndex,
        data: data,
      });
    }
  }

  shuffle() {
    let shuffled = randomize(this.state.data);
    this.setState({
      data: shuffled,
      isSorted: false,
    });
  }

  handleSortClick() {
    this.sort();
  }

  handleShuffleClick() {
    this.shuffle();
  }

  render() {
    return (
      <div>
        <h1 className="title">Sorting Visualizer</h1>
        <BarChart data={this.state.data} />
        <div>
          <button onClick={this.handleSortClick}>Sort</button>
          <button onClick={this.handleShuffleClick}>Shuffle</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
