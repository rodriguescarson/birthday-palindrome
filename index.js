var dateInputRef = document.querySelector("#bday-input");
var showBtnRef = document.querySelector("#show-btn");
var resultRef = document.querySelector("#result");
// var date = {
//     day: 2,
//     month: 2,
//     year: 2020
// }
function reverseString(str) {
    var listOfChars = str.split(''); //['','']
    var reverseListOfChars = listOfChars.reverse();
    var reverseStr = reverseListOfChars.join('');
    return reverseStr;

    //return str.split('').reverse().join('')
}

function isPalindromeFunc(str) {
    var reverseStr = reverseString(str);

    return str === reverseStr;
}

function convertDateToString(date) {
    var dateStr = {
        day: '',
        month: '',
        year: ''
    };
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
    var dateStr = convertDateToString(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrimeForAllDateFormats(date) {
    var listOfPalindrome = getAllDateFormats(date);
    var isPalindrome = false;

    for (var i = 0; i < listOfPalindrome.length; i++) {
        if (isPalindromeFunc(listOfPalindrome[i])) {
            isPalindrome = true;
            break;
        }
    }
    return isPalindrome;
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return true;
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

    if (month === 2) { //check for feburary
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) { //if day exceeds max day in month
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day,
        month,
        year
    }
}

function getNextPalindrimeDate(date) {
    var ctr1 = 0;
    var nextDate = getNextDate(date);
    while (1) {
        ctr1++;
        var isPalindrome = checkPalindrimeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr1, nextDate];
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
        day,
        month,
        year
    }
}

function getPreviousPalindromeDate(date) {
    var ctr2 = 0;
    var previousDate = getPreviousDate(date);
    while (1) {
        ctr2++;
        var isPalindrome = checkPalindrimeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }

    return [ctr2, previousDate];
}


function clickHandler() {
    var bdayStr = dateInputRef.value;
    if (bdayStr !== '') {
        var listofDate = bdayStr.split('-');
        var date = {
            day: Number(listofDate[2]),
            month: Number(listofDate[1]),
            year: Number(listofDate[0]),
        }
    }

    var isPalindrome = checkPalindrimeForAllDateFormats(date);
    if (isPalindrome) {
        resultRef.innerText = "Yay! your birthday is a pallindrime";
    } else {

        const [ctr1, nextDate] = getNextPalindrimeDate(date);
        const [ctr2, previousDate] = getPreviousPalindromeDate(date);
        if (ctr2 > ctr1) {
            resultRef.innerText = `Nah! your birthday is not a pallindrime.Closet palindrome date is ${nextDate.day}- ${nextDate.month}- ${nextDate.year},you missed by ${ctr1} days`;
        } else {
            resultRef.innerText = `Nah! your birthday is not a pallindrime.Closet palindrome date is ${previousDate.day}- ${previousDate.month}- ${previousDate.year},you missed by ${ctr2} days`;
        }
    }
}

showBtnRef.addEventListener("click", clickHandler);