
var romanNumeralGenerator = new RomanNumeralGenerator();

var ParseForm = React.createClass({
    getInitialState: function() {
        return {romanValue: ""};
    },
    handleChange: function(event) {
        this.setState({romanValue: event.target.value});
    },
    render: function() {
        var decimalValue = romanNumeralGenerator.parse(this.state.romanValue);
        return (
            <fieldset>
                <legend>Roman To Decimal</legend>
                <label htmlFor="roman-value">Roman value:</label>
                <input name="roman-value" className="parse-form__input" type="text" onChange={this.handleChange}></input>
                <p>
                    Decimal value:
                    <div className="parse-form__result">{decimalValue}</div>
                </p>
            </fieldset>
        );
    }
});

React.render(
    <ParseForm romanNumeralGenerator={new RomanNumeralGenerator} />,
    document.getElementById('roman-to-decimal-form')
);
