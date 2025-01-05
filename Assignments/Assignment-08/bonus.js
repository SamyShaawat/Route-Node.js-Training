/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    while (nums.includes(val)) {
        let index = nums.indexOf(val)
        nums.splice(index, 1);
    }
    let k =  nums.length
    return k;
};