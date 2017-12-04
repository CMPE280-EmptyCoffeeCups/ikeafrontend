import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {MenuItem} from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import {withStyles} from 'material-ui/styles';
import {doSearch} from "../../redux/actions/itemsAction";

function renderInput(inputProps) {
    const { classes, autoFocus, value, ref, ...other } = inputProps;

    return (
        <TextField
            autoFocus={autoFocus}
            className={classes.textField}
            value={value}
            inputRef={ref}
            InputProps={{
                classes: {
                    input: classes.input,
                },
                ...other,
            }}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.PRODUCT_NAME, query);
    const parts = parse(suggestion.PRODUCT_NAME, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={index} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
                    ) : (
                        <strong key={index} style={{ fontWeight: 500 }}>
                            {part.text}
                        </strong>
                    );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}



function getSuggestions(suggestions, value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : [{PRODUCT_NAME: value}].concat(suggestions.filter(suggestion => {
            const keep = count < 10 && suggestion.PRODUCT_NAME.toLowerCase().includes(inputValue);
            if (keep) {
                count += 1;
            }

            return keep;
        }));
}

const styles = theme => ({
    container: {
        position: 'relative',
        backgroundColor: '#f9f4e378',
        width: '50%',
        marginLeft: '20%',
        marginRight: '30%',
        padding: 8
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 3,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    textField: {
        width: '100%',
    },
});

class SearchBar extends React.Component {

    state = {
        value: '',
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(this.props.items, value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    handleKeyPress = (event) => {
        if(event.key === 'Enter' ){
            this.props.doSearch(this.state.value)
        }
    };

    render() {

        const { classes } = this.props;

        return (
            <Autosuggest
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderInputComponent={renderInput}
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                renderSuggestionsContainer={renderSuggestionsContainer}
                getSuggestionValue={(suggestion) => (suggestion.PRODUCT_NAME)}
                renderSuggestion={renderSuggestion}
                inputProps={{
                    autoFocus: true,
                    classes,
                    placeholder: 'Search Products ...',
                    value: this.state.value,
                    onChange: this.handleChange,
                    onKeyPress: this.handleKeyPress
                }}
            />
        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const msp = (state) => {

    let items = [];

    for(let itemId in state.items.items){
        if(state.items.items.hasOwnProperty(itemId)){
            items.push(state.items.items[itemId]);
        }
    }

    return {
        items,
        searched: items.searched
    };
};

const mdp = (dispatch) => {
    return {
        doSearch: (searched) => dispatch(doSearch(searched))
    }
};

export default connect(msp, mdp)(withStyles(styles)(SearchBar));