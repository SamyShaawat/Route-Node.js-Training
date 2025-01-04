/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findKthPositive = function(arr, k) {
    let missing = 0;
    let current = 1;  
    let i = 0;  

    while (missing < k) {
        
        if (i < arr.length && arr[i] == current) {
            i++;
        } else {
            missing++;
            if (missing == k) {
                return current;
            }
        }
        current++;
    }
};
