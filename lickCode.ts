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
