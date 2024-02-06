function possiblyPerfect(solutions, answers){
    hasIncorrect = false;
    hasCorrect = false;
    for (let i = 0; i < solutions.length; i++) {
        if(solutions[i] == '_')
        {
            continue;
        }
        if(solutions[i] != answers[i]){
            hasCorrect = true
            if(hasIncorrect){
                return false;
            }
        }
        else{
            hasIncorrect = true;
            if(hasCorrect){
                return false
            }
        }
      } 
      return true;
}

function meanVsMedian(arr) {
    const sortedArr = arr.slice().sort((a, b) => a - b);
    const medianIndex = Math.floor(arr.length / 2);
    
    const mean = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
    const median = sortedArr[medianIndex];
    
    if (mean > median) {
        return 'mean';
    } else if (median > mean) {
        return 'median';
    } else {
        return 'same';
    }
}

function swapHeadAndTail(arr) {
    const middleIndex = Math.floor(arr.length / 2);
    const head = arr.slice(0, middleIndex);
    const tail = arr.slice(-middleIndex);
    const middle = arr.length % 2 === 0 ? [] : [arr[middleIndex]];
    return [...tail, ...middle, ...head];
}
