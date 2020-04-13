import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    colors,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { addMenuFile, changeMenuFilePosition, toggleMenuFileEdit } from "../../../../../../../actions";
import PerfectScrollbar from "react-perfect-scrollbar";
import { MenuFile } from "./components";
import AddIcon from '@material-ui/icons/Add';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 1250,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    scrollbar: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        },
    },
    title: {
        flex: '1 1 100%',
    },
    row: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        }
    },
    actions: {
        justifyContent: 'flex-end',
        position: 'sticky',
        bottom: 0,
        backgroundColor: theme.palette.white,
    },
    addButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const SortableItem = SortableElement(({menuFileId, placeId}) => {
    return (
        <MenuFile
            id={menuFileId}
            placeId={placeId}
        />
    );
});

const SortableList = SortableContainer(({menuFiles, placeId}) => {
    return (
        <TableBody>
            {
                menuFiles.map((id, index) => {
                    return (
                        <SortableItem
                            key={id}
                            index={index}
                            menuFileId={id}
                            placeId={placeId}
                        />
                    );
                })
            }
        </TableBody>
    );
});

const MenuFileEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const placeId = useSelector(state => state.project.activePlaceId);
    const open = useSelector(state => state.project.isMenuFileEditOpen);
    const menuFiles = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'menu_files'], [])
    );

    const handleMenuFileEditClose = useCallback(() => {
        dispatch(toggleMenuFileEdit(false));
    }, [dispatch]);

    const handleMenuFileAdd = useCallback(() => {
        dispatch(addMenuFile(placeId));
    }, [dispatch, placeId]);

    const handleOnSortEnd = useCallback(({oldIndex, newIndex}) => {
        dispatch(changeMenuFilePosition(placeId, oldIndex, newIndex));
    }, [dispatch, placeId]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handleMenuFileEditClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.scrollbar}>
                            <Typography className={classes.title} variant="h6">
                                Файлы меню
                            </Typography>
                            <TableContainer className={classes.container}>
                                <Table>
                                    <TableHead>
                                        <TableRow className={classes.row}>
                                            <TableCell style={{ width: 400 }}>Название</TableCell>
                                            <TableCell style={{ width: 200 }}>Дата актуальности</TableCell>
                                            <TableCell style={{ width: 300 }}>Медиа</TableCell>
                                            <TableCell style={{ width: 250, maxWidth: 250 }}>Рубрики</TableCell>
                                            <TableCell style={{ width: 100 }}>Действия</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <SortableList
                                        menuFiles={menuFiles}
                                        placeId={placeId}
                                        axis={`y`}
                                        onSortEnd={handleOnSortEnd}
                                        distance={1} />

                                </Table>
                            </TableContainer>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={handleMenuFileEditClose}
                        variant="contained"
                        type="button"
                    >
                        Закрыть
                    </Button>
                    <Button
                        className={classes.addButton}
                        onClick={handleMenuFileAdd}
                        variant="contained"
                        type="button"
                        startIcon={<AddIcon />}
                    >
                        Добавить
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

MenuFileEdit.displayName = 'MenuFileEdit';

MenuFileEdit.propTypes = {
    className: PropTypes.string
};

export default MenuFileEdit;