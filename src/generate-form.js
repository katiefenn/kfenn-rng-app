
var romanNumeralGenerator = new RomanNumeralGenerator();

var GenerateForm = React.createClass({
    getInitialState: function() {
        return {romanValue: ""};
    },
    handleChange: function(event) {
        this.setState({decimalValue: event.target.value});
    },
    render: function() {
        var romanValue = romanNumeralGenerator.generate(parseInt(this.state.decimalValue));
        return (
            <div>
                <h2 className="form__heading form__heading_main">Decimal to Roman</h2>
                <fieldset>
                    <ul className="form__fieldlist">
                        <li className="form__fieldlist-row">
                            <div className="form__field">
                                <label htmlFor="decimal-value" className="form__label">Decimal value:</label>
                                <input name="decimal-value" className="form__input" type="text" maxLength="4" onChange={this.handleChange}></input>
                            </div>
                            <div className="form__field">
                                <h3 for="roman-value" className="form__heading form__heading_result">Roman value: </h3>
                                <div className="form__result">{romanValue}</div>
                            </div>
                        </li>
                    </ul>
                </fieldset>
            </div>
        );
    }
});

React.render(
    <GenerateForm />,
    document.getElementById('decimal-to-roman-form')
);
