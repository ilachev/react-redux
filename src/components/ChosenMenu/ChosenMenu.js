import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {}
}));

const ChosenMenu = () => {

    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div>123</div>
    );
};

export default ChosenMenu;