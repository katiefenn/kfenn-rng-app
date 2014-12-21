casper.test.begin('Roman numeral parse form', 3, function suite(test) {
    casper.start("http://localhost:9001/");

    casper.waitForSelector('#roman-to-decimal-form', function() {
        test.assertExists('#roman-to-decimal-form', "parse form is found");
        test.assertExists('#roman-to-decimal-form .form__input', "form field is found");
    });

    casper.waitForSelector('#roman-to-decimal-form .form__input', function () {
        casper.sendKeys('#roman-to-decimal-form .form__input', 'X');
    });

    casper.then(function () {
        test.assertSelectorHasText(
            '#roman-to-decimal-form .form__result',
            '10',
            'Typing roman numeral into form shows decimal number value'
        );

        test.done();
    });
});

casper.run();
