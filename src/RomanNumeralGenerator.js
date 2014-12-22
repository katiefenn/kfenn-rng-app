var RomanNumeralGenerator = (function () {
    var NUMERALS = {
        'I': 1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        "M": 1000
    };

    var NUMERAL_MULTIPLES = {
        'I': 3,
        'X': 3,
        'C': 3,
        'M': -1
    };

    var INVALID_NUMERAL_CHARACTERS = /[^IVXLCDM]+/gi;


    /**
     * Utility to generate and parse roman numerals
     * @constructor
     */
    function RomanNumeralGenerator () {

    }

    /**
     * Generates numerals from a given number
     * @method generate
     * @param {number} - decimal number to generate numeral of
     */
    RomanNumeralGenerator.prototype.generate = function (decimalValue) {
        if (!isInteger(decimalValue)) {
            return "";
        }

        return [
            getMs(decimalValue),
            getCMs(decimalValue),
            getDs(decimalValue),
            getCDs(decimalValue),
            getCs(decimalValue),
            getXCs(decimalValue),
            getLs(decimalValue),
            getXLs(decimalValue),
            getXs(decimalValue),
            getIXs(decimalValue),
            getVs(decimalValue),
            getIVs(decimalValue),
            getIs(decimalValue)
        ].join("");
    };

    /**
     * Parses a numeral and returns a decimal number
     * @method parse
     * @param {string} - numeral to parse
     */
    RomanNumeralGenerator.prototype.parse = function (romanValue) {
        var decimalValue = 0,
            numeralArray = numeralToArray(romanValue);

        if (!this.isValidNumeral(romanValue)) {
            return -1;
        }

        each(numeralArray, function (index, item) {
            decimalValue += NUMERALS[item];
        });


        return decimalValue;
    };

    /**
     * Validates a numeral
     * @method isValidNumeral
     * @param {string} - numeral to validate
     */
    RomanNumeralGenerator.prototype.isValidNumeral = function (romanValue) {
        var numeralArray;

        if (isString(romanValue)) {
            numeralArray = numeralToArray(romanValue);
        }
        else if (isArray(romanValue)) {
            numeralArray = romanValue;
        }
        else {
            return false;
        }

        if (INVALID_NUMERAL_CHARACTERS.test(romanValue)) {
            return false;
        }

        return isValidNumeralFormat(numeralArray);
    };

    /**
     * Iterates an array
     * @function each
     * @param {array} collection - array to iterate
     * @param {function} onEach - callback to call for each item
     */
    function each(collection, onEach) {
        for(var index = 0, limit = collection.length; index < limit; index++) {
            onEach(index, collection[index], collection);
        }
    }

    /**
     * Parses a numeral and returns an array of constituent numerals
     * @function numeralToArray
     * @param {string} romanValue - numeral to parse
     */
    function numeralToArray(romanValue) {
        var segment = "",
            numeralArray = [];

        // Iterate numeral character by character
        for (var index = 0, limit = romanValue.length; index < limit; index++) {
            segment += romanValue[index];

            // Look ahead to see if current numeral is double-character
            // subtractive type
            if (NUMERALS.hasOwnProperty(segment + romanValue[index + 1])) {
                segment += romanValue[index + 1];
                index++;
                numeralArray.push(segment);
                segment = "";
            }
            else if (NUMERALS.hasOwnProperty(segment)) {
                numeralArray.push(segment);
                segment = "";
            }
        }

        return numeralArray;
    }

    /**
     * Returns I numerals for the supplied number
     * @function getIs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getIs(decimalValue) {
        var unitsValue = units(decimalValue);
        if ([1,2,3].indexOf(unitsValue) != -1) {
            return repeatCharacter("I", unitsValue);
        }
        if ([6,7,8].indexOf(unitsValue) != -1) {
            return repeatCharacter("I", unitsValue - 5);
        }

        return "";
    }

    /**
     * Returns IV numerals for the supplied number
     * @function getIVs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getIVs(decimalValue) {
        if (units(decimalValue) === 4) {
            return "IV";
        }

        return "";
    }

    /**
     * Returns V numerals for the supplied number
     * @function getVs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getVs(decimalValue) {
        if (units(decimalValue) >= 5 && units(decimalValue) < 9) {
            return "V";
        }

        return "";
    }

    /**
     * Returns IX numerals for the supplied number
     * @function getIXs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getIXs(decimalValue) {
        if (units(decimalValue) === 9) {
            return "IX";
        }

        return "";
    }

    /**
     * Returns X numerals for the supplied number
     * @function getXs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getXs(decimalValue) {
        var tensValue = tens(decimalValue);
        if ([1,2,3].indexOf(tensValue) != -1) {
            return repeatCharacter("X", tensValue);
        }
        if([6,7,8].indexOf(tensValue) != -1) {
            return repeatCharacter("X", tensValue - 5);
        }

        return "";
    }

    /**
     * Returns XL numerals for the supplied number
     * @function getXLs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getXLs(decimalValue) {
        if (tens(decimalValue) == 4) {
            return "XL";
        }

        return "";
    }

    /**
     * Returns L numerals for the supplied number
     * @function getLs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getLs(decimalValue) {
        if (tens(decimalValue) >= 5 && tens(decimalValue) < 9) {
            return "L";
        }

        return "";
    }

    /**
     * Returns XC numerals for the supplied number
     * @function getXCs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getXCs(decimalValue) {
        if (tens(decimalValue) == 9) {
            return "XC";
        }

        return "";
    }

    /**
     * Returns C numerals for the supplied number
     * @function getCs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getCs(decimalValue) {
        var hundredsValue = hundreds(decimalValue);
        if ([1,2,3].indexOf(hundredsValue) != -1) {
            return repeatCharacter("C", hundredsValue);
        }
        if ([6,7,8].indexOf(hundredsValue) != -1) {
            return repeatCharacter("C", hundredsValue - 5);
        }

        return "";
    }

    /**
     * Returns CDs numerals for the supplied number
     * @function getCDs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getCDs(decimalValue) {
        if (hundreds(decimalValue) == 4) {
            return "CD";
        }

        return "";
    }

    /**
     * Returns Ds numerals for the supplied number
     * @function getDs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getDs(decimalValue) {
        if (hundreds(decimalValue) >= 5 && hundreds(decimalValue) < 9) {
            return "D";
        }

        return "";
    }

    /**
     * Returns CMs numerals for the supplied number
     * @function getCMs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getCMs(decimalValue) {
        if (hundreds(decimalValue) == 9) {
            return "CM";
        }

        return "";
    }

    /**
     * Returns CMs numerals for the supplied number
     * @function getMs
     * @param {number} decimalValue - number value to return numerals for
     */
    function getMs(decimalValue) {
        var thousands = Math.floor(decimalValue / 1000);
        if (thousands > 0) {
            return repeatCharacter("M", thousands);
        }
    }

    /**
     * Returns hundreds digit of a number
     * @function hundreds
     * @param {number} decimalValue - Number to get the hundreds digit of
     */
    function hundreds(decimalValue) {
        return Math.floor((decimalValue / 100) % 10);
    }

    /**
     * Determines if a numeral of the same order (units, tens, hundreds) exists in an array
     * @function instanceOfOrderExists
     * @param {string} numeral - Numeral to match
     * @param {array} numerals - Numerals to evaluate
     */
    function instanceOfOrderExists(numeral, numerals) {
        var result = false;

        each(numerals, function (index, item) {
            if(ofSameOrder(numeral, item) && item != numeral) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Determines if an object is an array
     * @function isArray
     * @param {mixed} obj - Object to evaluate
     */
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    /**
     * Determines if an object is an integer number
     * @function isInteger
     * @param {mixed} obj - Object to evaluate
     */
    function isInteger(obj){
        return Number(obj) === obj && obj % 1 === 0;
    }

    /**
     * Determines if an object is an array
     * @function isString
     * @param {mixed} obj - Object to evaluate
     */
    function isString(obj) {
        return typeof obj === 'string';
    }

    /**
     * Determines if a numeral is a subtractive-type numeral
     * @function isSubtractive
     * @param {mixed} numeral - Numeral to evaluate
     */
    function isSubtractive(numeral) {
        return numeral.length > 1;
    }

    /**
     * Validates numeral order and frequency
     * @function isValidNumeralFormat
     * @param {numeralArray} - Array of numerals to validate
     */
    function isValidNumeralFormat(numeralArray) {
        var result = true;

        each(numeralArray, function (index, numeral) {
            var items = itemsByValue(numeralArray, numeral),
                numeralLimit = NUMERAL_MULTIPLES[numeral] || 1;

            // Checks whether instances exceeds limit for that numeral eg. IIII
            if (items.length > numeralLimit && numeralLimit != -1) {
                result = false;
            }

            // Checks whether numerals occur in descending order
            if (NUMERALS[numeral] > NUMERALS[numeralArray[index - 1]]) {
                result = false;
            }

            // Checks whether subtractive numerals occur with same-order
            // numerals eg. XCX
            if (isSubtractive(numeral) && instanceOfOrderExists(numeral, numeralArray)) {
                result = false;
            }
        });

        return result;
    }

    /**
     * Returns items of an array equating a given value
     * @function itemsByValue
     * @param {array} collection - collection to evaluate items of
     * @param {mixed} value - value to evaluate items against
     */
    function itemsByValue(collection, value) {
        var items = [];
        each(collection, function (index, item) {
            if (item == value) {
                items.push(value);
            }
        });

        return items;
    }

    /**
     * Determines if two numerals are of same order (units, tens, hundreds)
     * @function ofSameOrder
     * @param {string} numeral1 - First numeral to evaluate
     * @param {string} numeral2 - Second numeral to evaluate
     */
    function ofSameOrder(numeral1, numeral2) {
        // Numeral decimal values of the same length are the same order
        return NUMERALS[numeral1].toString().length == NUMERALS[numeral2].toString().length;
    }

    /**
     * Returns a string of (character), (repetitions) times
     * @function repeatCharacter
     * @param {string} character - Character to repeat
     * @param {number} repetitions - Number of times to repeat character
     */
    function repeatCharacter(character, repetitions) {
        var output = "";
        for (var index = 0; index < repetitions; index++) {
            output += character;
        }

        return output;
    }

    /**
     * Returns the tens digit of a number
     * @function tens
     * @param {number} decimalValue - Number to return tens digit of
     */
    function tens(decimalValue) {
        return Math.floor((decimalValue / 10) % 10);
    }

    /**
     * Returns the units digit of a number
     * @function units
     * @param {number} decimalValue - Number to return units digit of
     */
    function units(decimalValue) {
        return decimalValue % 10;
    }

    return RomanNumeralGenerator;

}());
