import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));

const Header = props => {
    const { className, name, ...rest } = props;

    const classes = useStyles();

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Grid
                alignItems="flex-end"
                container
                justify="space-between"
                spacing={3}
            >
                <Grid item>
                    <Typography
                        component="h1"
                        variant="h3"
                    >
                        { name }
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

Header.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string.isRequired
};

Header.defaultProps = {
    name: ''
};

export default Header;