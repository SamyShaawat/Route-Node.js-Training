/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const countMap = {};

    for (let i = 0; i < nums.length; i++) {
        let num = nums[i];
        
        if (countMap[num] == undefined) {
            countMap[num] = 1;
        } else {
            countMap[num]++;
        }

       
        if (countMap[num] > Math.floor(nums.length / 2)) {
            return num;
        }
    }
};