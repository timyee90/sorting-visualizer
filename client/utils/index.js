module.exports.randomize = (data) => {
  // swap two random elements
  for (let i = 0; i < data.length; i++) {
    let randIndexOne = Math.floor(Math.random() * data.length);
    let randIndexTwo = Math.floor(Math.random() * data.length);
    let temp = data[randIndexOne];
    data[randIndexOne] = data[randIndexTwo];
    data[randIndexTwo] = temp;
  }
  return data;
};
