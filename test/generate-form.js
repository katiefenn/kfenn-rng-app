casper.test.begin('Roman numeral generator form', 4, function suite(test) {
    var fieldSelector = "#decimal-to-roman-form .form__input",
        formSelector = "#decimal-to-roman-form",
        resultSelector = "#decimal-to-roman-form .form__result";

    casper.start("http://localhost:9001/");

    casper.waitForSelector(formSelector, function() {
        test.assertExists(formSelector, "generator form is found");
        test.assertExists(fieldSelector, "form field is found");
    });

    casper.waitForSelector(fieldSelector, function () {
        casper.sendKeys(fieldSelector, '10');
    });

    casper.then(function () {
        test.assertSelectorHasText(
            resultSelector,
            'X',
            'Typing number into form shows roman numeral value'
        );
    });

    casper.then(function () {
        test.assertExists(fieldSelector + "[maxlength='4']", "Field length is capped at four characters");

        test.done();
    });
});

casper.run();
