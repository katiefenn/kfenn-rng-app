
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
                <input name="decimal-value" type="text" onChange={this.handleChange}></input>
                <p>
                    Roman value:
                    {romanValue}
                </p>
            </fieldset>
        );
    }
});

React.render(
    <GenerateForm romanNumeralGenerator={new RomanNumeralGenerator} />,
    document.getElementById('decimal-to-roman-form')
);
