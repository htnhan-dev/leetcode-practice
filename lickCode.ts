// reference Two Sum

function twoSum(nums: number[], target: number): number[] {
  const numToIndex = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;

    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement)!, i];
    }

    numToIndex.set(num, i);
  }

  return [];
}

// reference Best Time to Buy and Sell Stock

function maxProfit(prices: number[]): number {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}

// reference Contains Duplicate
function containsDuplicate(nums: number[]): boolean {
  const set = new Set<number>();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }

    set.add(num);
  }

  return false;
}

// reference Product of Array Except Self
function productExceptSelf(nums: number[]): number[] {
  const length = nums.length;

  const left = new Array<number>(length);
  const right = new Array<number>(length);

  const answer = new Array<number>(length);

  left[0] = 1;
  for (let i = 1; i < length; i++) {
    left[i] = nums[i - 1] * left[i - 1];
  }

  right[length - 1] = 1;
  for (let i = length - 2; i >= 0; i--) {
    right[i] = nums[i + 1] * right[i + 1];
  }

  for (let i = 0; i < length; i++) {
    answer[i] = left[i] * right[i];
  }

  return answer;
}

// reference Palindrome Number
function isPalindrome(x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;

  const string = x.toString();

  const reverseString = string.split("").reverse().join("");
  return string === reverseString;
}

// reference Roman to Integer
function romanToInt(s: string): number {
  const map = new Map<string, number>();

  map.set("I", 1);
  map.set("V", 5);
  map.set("X", 10);
  map.set("L", 50);
  map.set("C", 100);
  map.set("D", 500);
  map.set("M", 1000);

  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const current = map.get(s[i]);
    const next = i < s.length - 1 ? map.get(s[i + 1]) : undefined;

    if (current && next && current < next) {
      result -= current;
    } else {
      result += current!;
    }
  }

  return result;
}

// reference Valid Parentheses
function isValid(s: string): boolean {
  const stack: string[] = [];

  const starts = "({[";

  const ends = ")}]";

  for (const char of s) {
    if (starts.includes(char)) {
      stack.push(char);
    } else if (ends.includes(char)) {
      if (stack.length === 0) return false;

      const first = stack.pop();

      if (starts.indexOf(first!) !== ends.indexOf(char)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// reference Int to Roman
function intToRoman(num: number): string {
  const map = new Map<number, string>();

  map.set(1, "I");
  map.set(4, "IV");
  map.set(5, "V");
  map.set(9, "IX");
  map.set(10, "X");
  map.set(40, "XL");
  map.set(50, "L");
  map.set(90, "XC");
  map.set(100, "C");
  map.set(400, "CD");
  map.set(500, "D");
  map.set(900, "CM");
  map.set(1000, "M");

  let result = "";

  const keys = Array.from(map.keys()).reverse();

  for (const key of keys) {
    while (num >= key) {
      result += map.get(key);
      num -= key;
    }
  }

  return result;
}

// reference add two numbers
// function addTwoNumbers(
//   l1: ListNode | null,
//   l2: ListNode | null
// ): ListNode | null {
//   let result: ListNode | null = new ListNode(0);
//   let current: ListNode | null = result;

//   let carry: number = 0;

//   while (l1 !== null || l2 !== null) {
//     const x: number = l1 !== null ? l1.val : 0;
//     const y: number = l2 !== null ? l2.val : 0;

//     const sum: number = x + y + carry;
//     carry = Math.floor(sum / 10);

//     current.next = new ListNode(sum % 10);
//     current = current.next;

//     if (l1 !== null) l1 = l1.next;
//     if (l2 !== null) l2 = l2.next;
//   }

//   if (carry > 0) {
//     current.next = new ListNode(carry);
//   }

//   return result.next;
// }

// reference same tree
// function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
//     if(p === null && q === null) return true

//     if(p === null || q === null) return false

//     if(p.val !== q.val) return false

//     return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)

// };

// reference unique binary search trees
function numTrees(n: number): number {
  if (n <= 1) {
    return 1;
  }

  const numBSTs: number[] = new Array(n + 1).fill(0);
  numBSTs[0] = 1;
  numBSTs[1] = 1;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      numBSTs[i] += numBSTs[j] * numBSTs[i - j - 1];
    }
  }

  return numBSTs[n];
}

// reference 3 sum
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

// reference remove duplicate from sorted array
function removeDuplicates(nums: number[]): number {
  let i = 0;

  for (let j = 1; j < nums.length; j++) {
    if (nums[i] !== nums[j]) {
      nums[++i] = nums[j];
    }
  }

  return i + 1;
}

// reference remove element
function removeElement(nums: number[], val: number): number {
  let i = 0;

  for (let j = 0; j < nums.length; j++) {
    if (nums[j] !== val) {
      nums[i++] = nums[j];
    }
  }

  return i;
}

// reference maximum subarray
function maxSubArray(nums: number[]): number {
  let max = -Infinity;
  let current = 0;

  for (const num of nums) {
    current = Math.max(current + num, num);
    max = Math.max(max, current);
  }

  return max;
}
