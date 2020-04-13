import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ListItem, ListItemText } from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(0),
        marginBottom: theme.spacing(1),
    },
    menuFile: {
        whiteSpace: 'pre-wrap'
    }
}));

const MenuFile = props => {
    const { id } = props;

    const classes = useStyles();
    const [rubricNames, setRubricNames] = useState('');
    const [isExist, setIsExist] = useState(false);

    const menuFile = useSelector(
        state => state.project.placesEntities
            .getIn(['menuFiles', id], {})
    );
    const rubrics = useSelector(
        state => state.project.rubricsEntities
            .getIn(['rubrics'], {}));

    useEffect(() => {
        let active = true;
        if (!Object.keys(rubrics).length) {
            return undefined;
        }
        if (active) {
            setRubricNames(
                menuFile.rubrics
                    .map(rubricId => rubrics[rubricId].name)
                    .join(', ')
            );
        }
        return () => {
            active = false;
        }
    }, [menuFile.rubrics, rubrics]);

    useEffect(() => {
        let active = true;
        if (!menuFile.name.length || !menuFile.media.name.length) {
            return undefined;
        }
        if (active) {
            setIsExist(true);
        }
        return () => {
            active = false;
        };
    }, [id, menuFile, menuFile.media.name.length, menuFile.name.length]);

    if (!isExist) {
        return null;
    }

    return (
        <ListItem className={classes.root}>
            <ListItemText
                disableTypography
                primary={<span
                    className={classes.menuFile}
                    dangerouslySetInnerHTML={{
                        __html: `${menuFile.name} ${rubricNames.length > 0 ? "(" + rubricNames + ")" : ''}`
                    }}
                />}
            />
        </ListItem>
    );
};

MenuFile.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};

export default MenuFile;