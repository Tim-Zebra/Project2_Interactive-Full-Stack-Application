module.exports = {
  // Date and Time helpers
  format_date: date => {
    // Format date as MM/DD/YYYY
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  },

  // formats time. Place holder, may not need.
  format_time: time => {
    return 
  },

  random_cost: () => {
    let wholeNum = Math.floor(Math.random() * 50);
    let deciNum = Math.floor(Math.random() * 100);
    return `${wholeNum}.${deciNum}`
  }
};

