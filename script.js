'use strict';

const eacher = function(arr, callback) {
  let count = 0;
  const timer = setInterval(function() {
    callback(arr[count++]);
    if (count >= arr.length) {
      clearInterval(timer);
    }
  }, 0);
},
arr = [1, 2, 3, 4, 5, 6, 7, 8];

eacher(arr, function(item){
  console.log(item);
});