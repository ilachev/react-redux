import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { changeMenuFileRubrics } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            width: '100%'
        }
    },
}));

const Rubrics = props => {
    const { menuFileId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const rubricIds = useSelector(state => state.project.placesEntities
        .getIn(['menuFiles', menuFileId, 'rubrics'], []));
    const rubricOptions = useSelector(state => state.project.rubricsEntities
        .getIn(['rubrics'], {}));
    const rubrics = useSelector(state => state.project.rubricsEntities
        .getIn(['rubrics'], {}));

    const rubricValues = rubricIds.map(rubricId => rubrics[rubricId]);

    const handleMenuFileRubricsChange = useCallback((event, value) => {
        event.persist && event.persist();
        const rubricIds = value.map(el => el.id);
        dispatch(changeMenuFileRubrics(menuFileId, rubricIds))
    }, [dispatch, menuFileId]);

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                size="small"
                classes={{
                    popper: classes.autocomplete
                }}
                onChange={(event, value) =>
                    handleMenuFileRubricsChange(
                        event,
                        value
                    )
                }
                options={Object.values(rubricOptions).sort((a, b) => -b.type.localeCompare(a.type))}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name}
                filterSelectedOptions
                groupBy={option => option.type}
                value={rubricValues}
                renderInput={params => (
                    <TextField
                        {...params}
                        fullWidth
                        label="Название"
                        variant="outlined"
                        autoComplete="none"
                    />
                )}
            />
        </div>
    );
};

Rubrics.propTypes = {
    menuFileId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Rubrics;