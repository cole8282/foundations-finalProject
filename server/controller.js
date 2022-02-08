module.exports = {
  //itterate through an array and find a value function
  iterator: function(array, target) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return true;
      }
    }
    return false;
  }
};
