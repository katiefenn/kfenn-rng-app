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

    function RomanNumeralGenerator () {

    }

    RomanNumeralGenerator.prototype.generate = function (decimalValue) {
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

    function numeralToArray(romanValue) {
        var segment = "",
            numeralArray = [];

        for (var index = 0, limit = romanValue.length; index < limit; index++) {
            segment += romanValue[index];
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

    RomanNumeralGenerator.prototype.isValidNumeral = function (romanValue) {
        var numeralArray,
            invalidString = /[^IVXLCDM]+/gi,
            result = true;

        if (isString(romanValue)) {
            numeralArray = numeralToArray(romanValue);
        }
        else if (isArray(romanValue)) {
            numeralArray = romanValue;
        }
        else {
            return false;
        }

        if (invalidString.test(romanValue)) {
            return false;
        }

        each(numeralArray, function (index, numeral) {
            var items = itemsByValue(numeralArray, numeral),
                numeralLimit = NUMERAL_MULTIPLES[numeral] || 1;

            if (items.length > numeralLimit && numeralLimit != -1) {
                result = false;
            }

            if (NUMERALS[numeral] > NUMERALS[numeralArray[index - 1]]) {
                result = false;
            }
        });

        return result;
    };

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

    function getIVs(decimalValue) {
        if (units(decimalValue) === 4) {
            return "IV";
        }

        return "";
    }

    function getVs(decimalValue) {
        if (units(decimalValue) >= 5 && units(decimalValue) < 9) {
            return "V";
        }

        return "";
    }

    function getIXs(decimalValue) {
        if (units(decimalValue) === 9) {
            return "IX";
        }

        return "";
    }

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

    function getXLs(decimalValue) {
        if (tens(decimalValue) == 4) {
            return "XL";
        }

        return "";
    }

    function getLs(decimalValue) {
        if (tens(decimalValue) >= 5 && tens(decimalValue) < 9) {
            return "L";
        }

        return "";
    }

    function getXCs(decimalValue) {
        if (tens(decimalValue) == 9) {
            return "XC";
        }

        return "";
    }

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

    function getCDs(decimalValue) {
        if (hundreds(decimalValue) == 4) {
            return "CD";
        }

        return "";
    }

    function getDs(decimalValue) {
        if (hundreds(decimalValue) >= 5 && hundreds(decimalValue) < 9) {
            return "D";
        }

        return "";
    }

    function getCMs(decimalValue) {
        if (hundreds(decimalValue) == 9) {
            return "CM";
        }

        return "";
    }

    function getMs(decimalValue) {
        var thousands = Math.floor(decimalValue / 1000);
        if (thousands > 0) {
            return repeatCharacter("M", thousands);
        }
    }

    function repeatCharacter(character, repetitions) {
        var output = "";
        for (var index = 0; index < repetitions; index++) {
            output += character;
        }

        return output;
    }

    function units(decimalValue) {
        return decimalValue % 10;
    }

    function tens(decimalValue) {
        return Math.floor((decimalValue / 10) % 10);
    }

    function hundreds(decimalValue) {
        return Math.floor((decimalValue / 100) % 10);
    }

    function each(collection, onEach) {
        for(var index = 0, limit = collection.length; index < limit; index++) {
            onEach(index, collection[index], collection);
        }
    }

    function itemsByValue(collection, value) {
        var items = [];
        each(collection, function (index, item) {
            if (item == value) {
                items.push(value);
            }
        });

        return items;
    }

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    function isString(obj) {
        return typeof obj === 'string';
    }

    return RomanNumeralGenerator;

}());
