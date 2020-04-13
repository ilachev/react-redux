import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ChosenMenu } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 700,
    },
    title: {
        flex: '1 1 100%',
    },
}));

const ChosenCategory = props => {
    const { name, id, placeId } = props;

    const classes = useStyles();

    const chosenMenus = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'chosen_menu', id], [])
    );

    if (!chosenMenus.length) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.title} variant="h6">
                {name}
            </Typography>
            <TableContainer className={classes.container}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.row}>
                            <TableCell style={{ width: 400 }}>Название</TableCell>
                            <TableCell style={{ width: 150 }}>Цена</TableCell>
                            <TableCell style={{ width: 300 }}>Дата актуальности</TableCell>
                            <TableCell style={{ width: 100 }}>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            chosenMenus.map(chosenMenu => {
                                const { name, price, actualizedAt } = chosenMenu;
                                const chosenMenuId = chosenMenu.id;

                                return (
                                    <ChosenMenu
                                        key={chosenMenuId}
                                        id={chosenMenuId}
                                        categoryId={id}
                                        placeId={placeId}
                                        name={name}
                                        price={price}
                                        actualizedAt={actualizedAt}
                                    />
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

ChosenCategory.displayName = 'ChosenCategory';

ChosenCategory.propTypes = {
    id: PropTypes.number.isRequired,
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default ChosenCategory;