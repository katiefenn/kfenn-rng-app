
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
            <div>
                <h2 className="form__heading form__heading_main">Roman to Decimal</h2>
                <fieldset>
                    <ul className="form__fieldlist">
                        <li className="form__fieldlist-row">
                            <div className="form__field">
                                <label htmlFor="roman-value" className="form__label">Roman value:</label>
                                <input name="roman-value" className="form__input" type="text" onChange={this.handleChange}></input>
                            </div>
                            <div className="form__field">
                                <h3 className="form__heading form__heading_result">Decimal value:</h3>
                                <div className="form__result">{decimalValue}</div>
                            </div>
                        </li>
                    </ul>
                </fieldset>
            </div>
        );
    }
});

React.render(
    <ParseForm romanNumeralGenerator={new RomanNumeralGenerator} />,
    document.getElementById('roman-to-decimal-form')
);
