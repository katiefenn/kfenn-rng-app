
var romanNumeralGenerator = new RomanNumeralGenerator();

var GenerateForm = React.createClass({
    getInitialState: function() {
        return {romanValue: ""};
    },
    handleChange: function(event) {
        this.setState({decimalValue: event.target.value});
    },
    render: function() {
        var romanValue = romanNumeralGenerator.generate(this.state.decimalValue);
        return (
            <fieldset>
                <legend>Decimal to Roman</legend>
                <label htmlFor="decimal-value">Decimal value:</label>
                <input name="decimal-value" className="generator-form__input" type="text" onChange={this.handleChange}></input>
                <p>
                    Roman value:
                    <div className="generator-form__result">{romanValue}</div>
                </p>
            </fieldset>
        );
    }
});

React.render(
    <GenerateForm romanNumeralGenerator={new RomanNumeralGenerator} />,
    document.getElementById('decimal-to-roman-form')
);
