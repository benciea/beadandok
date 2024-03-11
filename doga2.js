function charsFromString(inputString){
    let result = "";
    for(let i=0; i<inputString.length; i++){
        if(isNaN(inputString[i]) || inputString[i] == " "){
            continue;
        }
        result += inputString[i];
    }
    return result;
}
console.log("\n----- 1. feladat -----");
console.log(charsFromString("1"), 1);
console.log(charsFromString("123"), 123);
console.log(charsFromString("this is number: 7"), 7);



function mineLocation(maze){
    for(let col=0; col<maze.length; col++){
        for(let row=0; row<maze[col].length; row++){
            if(maze[col][row] == "1")
            {
                return [col,row];
            }
        }
    }
}
console.log("\n----- 2. feladat -----");
console.log(mineLocation([ [1, 0], [0, 0] ]), [0, 0]);
console.log(mineLocation([ [1, 0, 0], [0, 0, 0], [0, 0, 0] ]), [0, 0]);
console.log(mineLocation([ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0] ]), [2, 2]);



function pairs(arr) {
    let count = 0;
    for (let i = 0; i < arr.length - 1; i += 2) {
      if (Math.abs(arr[i] - arr[i + 1]) === 1) {
        count++;
      }
    }
    
    return count;
  }

console.log("\n----- 3. feladat -----");
console.log(pairs([1,2,5,8,-4,-3,7,6,5]),3);
console.log(pairs([21, 20, 22, 40, 39, -56, 30, -55, 95, 94]),2);
console.log(pairs([81, 44, 80, 26, 12, 27, -34, 37, -35]),0);
console.log(pairs([-55, -56, -7, -6, 56, 55, 63, 62]),4);
console.log(pairs([73, 72, 8, 9, 73, 72]),3);