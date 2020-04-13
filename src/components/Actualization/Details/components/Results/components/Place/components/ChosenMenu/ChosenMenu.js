import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell } from '@material-ui/core';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import pluralize from "../../../../../../../../../utils/pluralize";
import { setActivePlaceId, toggleChosenMenuEdit } from "../../../../../../../../../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 135,
        whiteSpace: 'nowrap',
        lineHeight: '1.7rem',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
}));

const ChosenMenu = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [chosenMenuCount, setChosenMenuCount] = useState(0);

    const chosenMenus = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'chosen_menu'], [])
    );

    useEffect(() => {
        let active = true;

        if (active) {
            let chosenMenuCount = 0;
            Object.keys(chosenMenus).forEach(chosenCategoryId => {
                Object.keys(chosenMenus[chosenCategoryId]).forEach(chosenMenuId => {
                    if (chosenMenus[chosenCategoryId][chosenMenuId].name.length || chosenMenus[chosenCategoryId][chosenMenuId].price.length > 0) {
                        chosenMenuCount += 1;
                    }
                });
            });

            setChosenMenuCount(chosenMenuCount);
        }

        return () => {
            active = false;
        }
    }, [chosenMenus]);

    const handleChosenMenuEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(toggleChosenMenuEdit(true));
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                onClick={handleChosenMenuEditOpen}
            >
                <FormatQuoteIcon className={classes.buttonIcon}/>
                {
                    pluralize(chosenMenuCount, ['цитата', 'цитаты', 'цитат'])
                }
            </Button>
        </TableCell>
    );
};

ChosenMenu.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default ChosenMenu;