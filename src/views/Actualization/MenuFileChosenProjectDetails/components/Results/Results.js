import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import { Place } from "./components";
import {
    ChosenMenuEdit,
    CommentEdit,
    CuisineEdit,
    MenuFileEdit
} from "../../../../../components/Actualization/Details/components/Results/components";
import { ErrorSnackbar, SuccessSnackbar } from "../../../../../components";
import { changePage, changeRowsPerPage } from "../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    container: {
        maxWidth: '100vw',
    },
    content: {
        padding: 0
    },
    inner: {
        minWidth: 700
    },
    tableCell: {
        border: 'none',
        textAlign: 'center'
    },
    actions: {
        padding: theme.spacing(1),
        justifyContent: 'flex-end'
    },
}));

const Results = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const pagination = useSelector(state => state.pagination);
    const places = useSelector(state => state.project.placesResult);
    const isFetching = useSelector(state => state.project.isFetching);

    const handleChangePage = useCallback((event, page) => {
        dispatch(changePage(page));
        window.scrollTo(0, 0);
    }, [dispatch]);

    const handleChangeRowsPerPage = useCallback((event) => {
        dispatch(changeRowsPerPage(event.target.value));
    }, [dispatch]);

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
            >
            </Typography>
            <Card>
                <Divider/>
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Заведение</TableCell>
                                            <TableCell style={{ maxWidth: 200 }}>Файлы меню</TableCell>
                                            <TableCell>Цитаты из меню</TableCell>
                                            <TableCell style={{ maxWidth: 200 }}>Средний чек</TableCell>
                                            <TableCell style={{ maxWidth: 200 }}>Кухни</TableCell>
                                            <TableCell>Комментарий</TableCell>
                                            <TableCell>История</TableCell>
                                            <TableCell style={{ width: 100 }}>Действия</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            isFetching &&
                                            Array.from(new Array(pagination.rowsPerPage)).map((item, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell colSpan={9} style={{ padding: '5px 16px' }}>
                                                            <Skeleton width="100%" height="120px"/>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                        {
                                            !isFetching && places.map(id => (
                                                <Place
                                                    key={id}
                                                    id={id}
                                                />
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <TablePagination
                        component="div"
                        count={pagination.count}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        page={pagination.page}
                        rowsPerPage={pagination.rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage={`Строк`}
                    />
                    <CommentEdit/>
                    <ChosenMenuEdit/>
                    <MenuFileEdit/>
                    <CuisineEdit/>
                    <SuccessSnackbar/>
                    <ErrorSnackbar/>
                </CardActions>
            </Card>
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
};

export default Results;