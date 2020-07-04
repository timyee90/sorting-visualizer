import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BarChart from './components/BarChart.jsx';
import { exampleData } from './data/exampleData.js';
import { randomize } from './utils/index.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: exampleData,
      isSorted: false,
      currentIndex: 0,
      idx: 0,
      noChange: 0,
      len: exampleData.length - 1,
    };
    this.handleInsertionSort = this.handleInsertionSort.bind(this);
    this.handleBubbleSort = this.handleBubbleSort.bind(this);
    this.handleShuffleClick = this.handleShuffleClick.bind(this);
  }

  handleBubbleSort() {
    let len = this.state.len;

    const run = () => {
      if (!this.state.isSorted) {
        let noChangeCount = this.state.noChange;
        let nums = this.state.data.map((item) => {
          return item.num;
        });
        let data = this.state.data;
        let currentIndex = this.state.currentIndex;

        if (
          len &&
          currentIndex < len &&
          nums[currentIndex] > nums[currentIndex + 1]
        ) {
          let temp = data[currentIndex];
          data[currentIndex] = data[currentIndex + 1];
          data[currentIndex + 1] = temp;
        } else {
          noChangeCount++;
        }
        currentIndex++;

        if (noChangeCount >= len || len === 1) {
          this.setState({
            isSorted: true,
          });
        }

        if (currentIndex >= len) {
          currentIndex = 0;
          noChangeCount = 0;
          if (len > 0) len--;
        }

        this.setState({
          noChange: noChangeCount,
          currentIndex: currentIndex,
          data: data,
        });
      }
    };
    this.auto = setInterval(run, 500);
  }

  handleInsertionSort() {
    const run = () => {
      if (!this.state.isSorted) {
        let data = this.state.data;
        let currentIndex = this.state.currentIndex;
        let idx = this.state.idx;
        let hole = idx + 1;

        if (data[hole] && data[idx] && data[hole].num < data[idx].num) {
          let temp = data[hole];
          data[hole] = data[idx];
          data[idx] = temp;
          hole--;
          idx--;
        } else {
          currentIndex++;
          idx = currentIndex;
        }

        if (this.state.len <= currentIndex) {
          this.setState({
            isSorted: true,
          });
        }

        this.setState({
          currentIndex: currentIndex,
          idx: idx,
          data: data,
        });
      }
    };
    this.auto = setInterval(run, 500);
  }

  shuffle() {
    let shuffled = randomize(this.state.data);
    this.setState({
      data: shuffled,
      isSorted: false,
      currentIndex: 0,
      idx: 0,
    });
  }

  handleShuffleClick() {
    this.shuffle();
  }

  componentDidUpdate() {
    if (this.state.isSorted) {
      clearInterval(this.auto);
    }
  }

  render() {
    return (
      <div>
        <h1 className='title'>Sorting Visualizer</h1>
        <BarChart data={this.state.data} />
        <div className='buttonContainer'>
          <button onClick={this.handleInsertionSort}>Insertion Sort</button>
          <button onClick={this.handleBubbleSort}>Bubble Sort</button>
          <button onClick={this.handleShuffleClick}>Shuffle</button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
