casper.test.begin('Roman numeral generator form', 3, function suite(test) {
    casper.start("http://localhost:9001/");

    casper.waitForSelector('#decimal-to-roman-form', function() {
        test.assertExists('#decimal-to-roman-form', "generator form is found");
        test.assertExists('#decimal-to-roman-form .generator-form__input', "form field is found");
    });

    casper.waitForSelector('#decimal-to-roman-form .generator-form__input', function () {
        casper.sendKeys('#decimal-to-roman-form .generator-form__input', '10');
    });

    casper.then(function () {
        test.assertSelectorHasText(
            '#decimal-to-roman-form .generator-form__result',
            'X',
            'Typing number into form shows roman numeral value'
        );

        test.done();
    });

});

casper.run();
