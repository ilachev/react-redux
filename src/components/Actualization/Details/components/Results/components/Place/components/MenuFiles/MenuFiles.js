import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, List, TableCell } from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { useDispatch, useSelector } from "react-redux";
import { setActivePlaceId, toggleMenuFileEdit } from "../../../../../../../../../actions";
import { MenuFile } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 170,
        whiteSpace: 'nowrap',
        lineHeight: '1.7rem',
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
    gridItem: {
        padding: theme.spacing(0),
    },
    list: {
        padding: theme.spacing(0)
    },
    listItem: {
        padding: theme.spacing(0)
    },
}));

const MenuFiles = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const menuFiles = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'menu_files'], [])
    );

    const handleMenuFileEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(toggleMenuFileEdit(true));
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
            style={{ maxWidth: 200 }}
        >
            {
                menuFiles.length > 0 &&
                <Grid container>
                    <Grid item xs={12} md={12} className={classes.gridItem}>
                        <div>
                            <List dense className={classes.list}>
                                {
                                    menuFiles.map(menuFileId => {
                                        return (
                                            <MenuFile
                                                key={menuFileId}
                                                id={menuFileId}
                                            />
                                        );
                                    })
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>
            }
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                onClick={handleMenuFileEditOpen}
            >
                <MenuBookIcon className={classes.buttonIcon}/>
                Редактировать
            </Button>
        </TableCell>
    );
};

MenuFiles.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default MenuFiles;