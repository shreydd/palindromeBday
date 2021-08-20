function reverseStr(str) {
  var listOfChars = str.split('');
  var reverseListOfChars = listOfChars.reverse();
  var reversedStr = reverseListOfChars.join('');
  return reversedStr;
  // can be done in a single line
  // return str.split('').reverse().join('');
}

function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToStr(date) {
  var dateStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateStr.day = '0' + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = '0' + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  var dateStr = convertDateToStr(date);

  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllFormats(date) {
  var listOfPalindromes = getAllDateFormats(date);
  var flag = false;

  for (var i = 0; i < listOfPalindromes.length; i++) {
    // console.log(isPalindrome(listOfPalindromes[i]))
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) { //for feb
    // check for leap year
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++; //increment the month
      }
    }
  } else {  //check for other months
    // check if the day exceeds the month's day limits
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++; 
    }
  }
  // if it's dec then increment year and make month jan
  if(month >12){
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year
  };
}

function getNextPalindromeDate(date) {
  var cnt = 0;
  var nextDate = getNextDate(date);

  while(1){
    cnt++;
    var isPalindrome = checkPalindromeForAllFormats(nextDate);
    if(isPalindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [cnt, nextDate];
}

// get previous palindrome day 
// use getNextPalindromeDate and getNextDate ( modify, obviously )

var date = {
  day: 8,
  month: 8,
  year: 2021
}

// console.log(getNextPalindromeDate(date));

var dateInputRef = document.querySelector('#bdate');
var showBtn = document.querySelector('#submitBtn');
var outputResult = document.querySelector('#output');

function clickHandler(e){
  var bdayStr = dateInputRef.value;

  if(bdayStr !== ''){
    var givenDate = bdayStr.split("-");
    var date = {
      day: Number(givenDate[2]),
      month: Number(givenDate[1]),
      year: Number(givenDate[0])
    };

    var isPalindrome = checkPalindromeForAllFormats(date);
    if(isPalindrome){
      outputResult.innerText = 'Your birthday is a Palindrome!!!'
    }else{
      var [cnt, nextDate] = getNextPalindromeDate(date);
      outputResult.innerText = `The next palindrome date is ${nextDate.day} - ${nextDate.month} - ${nextDate.year}, you missed it by ${cnt} days! `;
    }
  }

}

showBtn.addEventListener('click', clickHandler);