import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Avatar,
    Button,
    Fade,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Popper,
    Typography
} from '@material-ui/core';
import { Filter } from './components';
import FilterListIcon from '@material-ui/icons/FilterList';
import NotesIcon from '@material-ui/icons/Notes';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import DoneIcon from '@material-ui/icons/Done';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { toggleFilter } from "../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    info: {
        display: 'flex',
        padding: theme.spacing(2),
        '& > *:not(:first-child)': {
            marginLeft: theme.spacing(2),
        },
    },
    search: {
        flexGrow: 1,
        maxWidth: 480,
        flexBasis: 480
    },
    button: {
        marginLeft: 'auto'
    },
    icon: {
        marginRight: theme.spacing(1)
    },
    typography: {
        marginBottom: theme.spacing(2),
    },
    statHeading: {
        alignSelf: 'center'
    },
    list: {
        flexGrow: 1
    },
    paper: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: theme.spacing(2),
        maxWidth: 400
    },
    popper: {
        zIndex: 3
    }
}));

const FilterBar = props => {
    const { instruction, className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);
    const statistic = useSelector(state => state.project.statistic);

    const [instructionAnchorEl, setInstructionAnchorEl] = useState(null);
    const [statisticAnchorEl, setStatisticAnchorEl] = useState(null);
    const [openInstruction, setOpenInstruction] = useState(false);
    const [openStatistic, setOpenStatistic] = useState(false);

    const handleFilterOpen = () => {
        dispatch(toggleFilter(true));
    };

    const handleFilterClose = () => {
        dispatch(toggleFilter(false));
    };

    const handleOpenInstruction = event => {
        setInstructionAnchorEl(event.currentTarget);
        setOpenInstruction(prev => !prev);
    };

    const handleOpenStatistic = event => {
        setStatisticAnchorEl(event.currentTarget);
        setOpenStatistic(prev => !prev);
    };

    return (
        <Grid
            {...rest}
            className={clsx(classes.root, className)}
            container
            spacing={3}
        >
            <div className={classes.info}>
                {
                    instruction &&
                    <Grid item>
                        <Button
                            color="primary"
                            type="button"
                            variant="outlined"
                            size="small"
                            onClick={handleOpenInstruction}
                        >
                            <NotesIcon className={classes.icon}/> Инструкция
                        </Button>
                        <Popper open={openInstruction}
                                anchorEl={instructionAnchorEl}
                                placement="bottom-start"
                                transition
                                className={classes.popper}
                        >
                            {({ TransitionProps }) => (
                                <Fade
                                    {...TransitionProps}
                                    timeout={350}
                                >
                                    <Paper className={classes.paper}>
                                        <p className={classes.typography}
                                           dangerouslySetInnerHTML={{ __html: instruction }}/>
                                        <div>
                                            <Button
                                                onClick={handleOpenInstruction}
                                                variant="contained"
                                                type="button"
                                            >
                                                Понятно
                                            </Button>
                                        </div>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </Grid>
                }
                <Grid item>
                    <Button
                        color="primary"
                        type="button"
                        variant="outlined"
                        size="small"
                        onClick={handleOpenStatistic}
                    >
                        <EqualizerIcon className={classes.icon}/> Статистика
                    </Button>
                    <Popper open={openStatistic}
                            anchorEl={statisticAnchorEl}
                            placement="bottom-start"
                            transition
                            className={classes.popper}
                    >
                        {({ TransitionProps }) => (
                            <Fade
                                {...TransitionProps}
                                timeout={350}
                            >
                                <div>
                                    <Grid container>
                                        <Paper className={classes.paper}>
                                            <Typography variant="h4" className={classes.statHeading}>
                                                Общая
                                            </Typography>
                                            <List className={classes.list}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <AllInclusiveIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Всего" secondary={statistic.withoutFilter.allCount} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <DoneIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Выполнено" secondary={statistic.withoutFilter.doneCount} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <MessageIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="С комментариями" secondary={statistic.withoutFilter.withCommentCount} />
                                                </ListItem>
                                                {
                                                    statistic.withoutFilter.groupedByUserCount.map((elem, index) => {
                                                        return (
                                                            <ListItem key={index}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <AccountCircleIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={`Выполнено (${elem.nickname})`} secondary={elem.count} />
                                                            </ListItem>
                                                        );
                                                    })
                                                }
                                            </List>
                                        </Paper>
                                        <Paper className={classes.paper}>
                                            <Typography variant="h4" className={classes.statHeading}>
                                                С фильтром
                                            </Typography>
                                            <List className={classes.list}>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <AllInclusiveIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Всего" secondary={statistic.withFilter.allCount} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <DoneIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Выполнено" secondary={statistic.withFilter.doneCount} />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <MessageIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary="С комментариями" secondary={statistic.withFilter.withCommentCount} />
                                                </ListItem>
                                                {
                                                    statistic.withFilter.groupedByUserCount.map((elem, index) => {
                                                        return (
                                                            <ListItem key={index}>
                                                                <ListItemAvatar>
                                                                    <Avatar>
                                                                        <AccountCircleIcon />
                                                                    </Avatar>
                                                                </ListItemAvatar>
                                                                <ListItemText primary={`Выполнено (${elem.nickname})`} secondary={elem.count} />
                                                            </ListItem>
                                                        );
                                                    })
                                                }
                                            </List>
                                            <div>
                                                <Button
                                                    onClick={handleOpenStatistic}
                                                    variant="contained"
                                                    type="button"
                                                >
                                                    Понятно
                                                </Button>
                                            </div>
                                        </Paper>
                                    </Grid>
                                </div>

                            </Fade>
                        )}
                    </Popper>
                </Grid>
            </div>
            <Grid item>
                <Button
                    className={classes.button}
                    color="primary"
                    onClick={handleFilterOpen}
                    size="small"
                    variant="outlined"
                >
                    <FilterListIcon className={classes.icon}/> Фильтры
                </Button>
            </Grid>
            <Filter
                onClose={handleFilterClose}
                open={filter.isOpen}
            />
        </Grid>
    );
};

FilterBar.propTypes = {
    className: PropTypes.string,
    instruction: PropTypes.string,
    onFilter: PropTypes.func
};

export default FilterBar;