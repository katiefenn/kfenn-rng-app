casper.test.begin('Roman numeral parse form', 5, function suite(test) {
    var formSelector = "#roman-to-decimal-form",
        fieldSelector = "#roman-to-decimal-form .form__input",
        resultSelector = "#roman-to-decimal-form .form__result";

    casper.start("http://localhost:9001/");

    casper.waitForSelector(formSelector, function() {
        test.assertExists(formSelector, "parse form is found");
        test.assertExists(fieldSelector, "form field is found");
    });

    casper.then(function () {
        casper.sendKeys(fieldSelector, 'X');
    });

    casper.then(function () {
        test.assertSelectorHasText(
            resultSelector,
            '10',
            'Typing roman numeral into form shows decimal number value'
        );
    });

    casper.then(function () {
        test.assertExists(fieldSelector + "[maxlength='4']", "Field length is capped at four characters");

        test.done();
    });
});

casper.run();
