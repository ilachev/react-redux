import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    TableCell
} from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {},
    historyCell: {
        display: 'flex',
        flexFlow: 'column',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    messagePart: {
        '& > b': {
            fontWeight: 600,
        },
    }
}));

const History = props => {
    const { placeId, ...rest } = props;

    const histories = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'history'], []));

    const classes = useStyles();

    return (
        <TableCell
            {...rest}
        >
            <div className={classes.historyCell}>
                {
                    histories.map((history, index) => {
                        return (
                            <div key={index}>
                                {
                                    `${history.date}, ${history.nickname} (${history.email})`
                                }
                                {
                                    history.message.map((part, index) => {
                                        return (
                                            <div className={classes.messagePart} key={index} dangerouslySetInnerHTML={{ __html: part }}/>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </TableCell>
    );
};

History.propTypes = {
    placeId: PropTypes.number.isRequired
};

export default History;