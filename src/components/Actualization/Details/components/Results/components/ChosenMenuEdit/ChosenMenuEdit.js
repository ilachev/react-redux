import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardActions, CardContent, colors, Modal } from '@material-ui/core';
import { deleteChosenMenuAll, toggleChosenMenuEdit } from "../../../../../../../actions";
import PerfectScrollbar from "react-perfect-scrollbar";
import { ChosenCategory } from "./components";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 900,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    scrollbar: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        },
    },
    actions: {
        justifyContent: 'space-between',
        position: 'sticky',
        bottom: 0,
        backgroundColor: theme.palette.white,
        zIndex: 1400
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    },
    deleteButton: {
        color: theme.palette.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
}));

const useChosenMenuDeletingStatus = placeId => {
    const [isAnyChosenMenuExist, setIsAnyChosenMenuExist] = useState(false);
    const chosenMenus = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'chosen_menu'], {}));

    let isExistedChosenMenus = false;
    Object.keys(chosenMenus).forEach(categoryId => {
        Object.keys(chosenMenus[categoryId]).forEach(index => {
            if (chosenMenus[categoryId][index].name.length || chosenMenus[categoryId][index].price.length) {
                isExistedChosenMenus = true;
            }
        })
    });

    useEffect(() => {
        setIsAnyChosenMenuExist(isExistedChosenMenus)
    }, [isExistedChosenMenus]);

    return isAnyChosenMenuExist;
};

const ChosenMenuEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const placeId = useSelector(state => state.project.activePlaceId);
    const open = useSelector(state => state.project.isChosenMenuEditOpen);
    const chosenCategories = useSelector(state => state.project.chosenCategories);
    const isAnyChosenMenuExist = useChosenMenuDeletingStatus(placeId);

    const handleChosenMenuEditClose = useCallback(() => {
        dispatch(toggleChosenMenuEdit(false));
    }, [dispatch]);

    const handleChosenMenuDeleteAll = useCallback(() => {
        dispatch(deleteChosenMenuAll(placeId));
    }, [dispatch, placeId]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handleChosenMenuEditClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.scrollbar}>
                            {
                                chosenCategories.map(category => {
                                    return (
                                        <ChosenCategory
                                            key={category.id}
                                            id={category.id}
                                            name={category.name}
                                            placeId={placeId}
                                        />
                                    )
                                })
                            }
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        variant="contained"
                        type="button"
                        className={classes.deleteButton}
                        startIcon={<DeleteIcon/>}
                        onClick={handleChosenMenuDeleteAll}
                        disabled={!isAnyChosenMenuExist}
                    >
                        Удалить всё
                    </Button>
                    <div>
                        <Button
                            onClick={handleChosenMenuEditClose}
                            variant="contained"
                            type="button"
                        >
                            Закрыть
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </Modal>
    );
};

ChosenMenuEdit.displayName = 'ChosenMenuEdit';

ChosenMenuEdit.propTypes = {
    className: PropTypes.string
};

export default ChosenMenuEdit;