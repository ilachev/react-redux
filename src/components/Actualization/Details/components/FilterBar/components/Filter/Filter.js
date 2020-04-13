import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Collapse,
    Divider,
    Drawer,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import {
    applyFilter,
    changeFilter,
    clearFilter,
    fetchPlacesForProject,
    receivePlaces
} from "../../../../../../../actions";
import { useParams } from "react-router";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    drawer: {
        width: 420,
        maxWidth: '100%'
    },
    header: {
        padding: theme.spacing(2, 1),
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    },
    content: {
        padding: theme.spacing(0, 3),
        flexGrow: 1
    },
    contentSection: {
        padding: theme.spacing(2, 0)
    },
    contentSectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        cursor: 'pointer'
    },
    contentSectionContent: {},
    formGroup: {
        padding: theme.spacing(2, 0)
    },
    fieldGroup: {
        display: 'flex',
        alignItems: 'center'
    },
    field: {
        marginTop: 0,
        marginBottom: 0
    },
    flexGrow: {
        flexGrow: 1
    },
    addButton: {
        marginLeft: theme.spacing(1)
    },
    tags: {
        marginTop: theme.spacing(1)
    },
    minAmount: {
        marginRight: theme.spacing(3)
    },
    maxAmount: {
        marginLeft: theme.spacing(3)
    },
    radioGroup: {},
    actions: {
        padding: theme.spacing(3),
        '& > * + *': {
            marginTop: theme.spacing(2)
        }
    },
    legend: {
        marginBottom: 0,
        borderBottom: 'none'
    },
    formControlLabel: {
        marginBottom: 0
    },
    autocomplete: {}
}));

const Filter = props => {
    const { open, onClose, className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const currentValues = useSelector(state => state.filter.current);
    const userOptions = useSelector(state => state.filter.options.userOptions);
    const completionOptions = useSelector(state => state.filter.options.completionOptions);
    const places = useSelector(state => state.filter.current.places);
    const placesSuggestions = useSelector(state => state.filter.placesSuggestions);
    const isLoadingPlaces = useSelector(state => state.filter.isLoadingPlaces);
    const { id, slug } = useParams();

    const [expandProject, setExpandProject] = useState(true);
    const [expandPlace, setExpandPlace] = useState(true);
    const [openSearch, setOpenSearch] = useState(false);
    const [placeQuery, setPlaceQuery] = useState('');

    const handleClear = useCallback(() => {
        dispatch(clearFilter());
    }, [dispatch]);

    const handleFieldChange = useCallback((event, field, value) => {
        event.persist && event.persist();
        dispatch(changeFilter(field, value));
    }, [dispatch]);

    const handleToggleProject = () => {
        setExpandProject(expandProject => !expandProject);
    };

    const handleTogglePlace = () => {
        setExpandPlace(expandPlace => !expandPlace);
    };

    const handleFilter = useCallback((event) => {
        event.persist && event.persist();
        dispatch(applyFilter(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        let active = true;

        if (placeQuery.length === 0) {
            return undefined;
        }

        if (active) {
            dispatch(fetchPlacesForProject(slug, id, placeQuery));
        }

        return () => {
            active = false;
        };
    }, [dispatch, id, placeQuery, slug]);

    useEffect(() => {
        if (!openSearch) {
            setPlaceQuery('');
            dispatch(receivePlaces([]));
        }
    }, [dispatch, openSearch]);

    return (
        <Drawer
            anchor="right"
            classes={{ paper: classes.drawer }}
            onClose={onClose}
            open={open}
            variant="temporary"
        >
            <form
                {...rest}
                className={clsx(classes.root, className)}
                onSubmit={handleFilter}
            >
                <div className={classes.header}>
                    <Button
                        onClick={onClose}
                        size="small"
                    >
                        <CloseIcon className={classes.buttonIcon}/>
                        Закрыть
                    </Button>
                </div>
                <div className={classes.content}>
                    <div className={classes.contentSection}>
                        <div
                            className={classes.contentSectionHeader}
                            onClick={handleToggleProject}
                        >
                            <Typography variant="h5">Проект</Typography>
                            {expandProject ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </div>
                        <Divider/>
                        <Collapse in={expandProject}>
                            <div className={classes.contentSectionContent}>
                                <div className={classes.formGroup}>
                                    <TextField
                                        className={classes.field}
                                        fullWidth
                                        label="Исполнитель"
                                        margin="dense"
                                        name="user"
                                        onChange={event =>
                                            handleFieldChange(
                                                event,
                                                'user',
                                                event.target.value
                                            )
                                        }
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={currentValues.user}
                                        variant="outlined"
                                    >
                                        <option
                                            disabled
                                            value=""
                                        />
                                        {userOptions.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={classes.formGroup}>
                                    <TextField
                                        className={classes.field}
                                        fullWidth
                                        label="Готовность"
                                        margin="dense"
                                        name="completion"
                                        onChange={event =>
                                            handleFieldChange(
                                                event,
                                                'completion',
                                                event.target.value
                                            )
                                        }
                                        select
                                        // eslint-disable-next-line react/jsx-sort-props
                                        SelectProps={{ native: true }}
                                        value={currentValues.completion}
                                        variant="outlined"
                                    >
                                        <option
                                            disabled
                                            value=""
                                        />
                                        {completionOptions.map(option => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={classes.formGroup}>
                                    <Typography
                                        component="p"
                                        gutterBottom
                                        variant="overline"
                                    >
                                        Комментарий
                                    </Typography>
                                    <div className={classes.fieldGroup}>
                                        <RadioGroup
                                            className={classes.radioGroup}
                                            name="comment"
                                            onChange={event =>
                                                handleFieldChange(
                                                    event,
                                                    'comment',
                                                    event.target.value
                                                )
                                            }
                                            value={currentValues.comment}
                                        >
                                            <FormControlLabel
                                                control={<Radio color="primary"/>}
                                                label="Все"
                                                value="null"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary"/>}
                                                label="Есть"
                                                value="true"
                                            />
                                            <FormControlLabel
                                                control={<Radio color="primary"/>}
                                                label="Нет"
                                                value="false"
                                            />
                                        </RadioGroup>
                                    </div>

                                </div>
                                <div className={classes.formGroup}>
                                    <TextField
                                        className={classes.field}
                                        fullWidth
                                        label="Текст комментария"
                                        margin="dense"
                                        name="commentText"
                                        onChange={event =>
                                            handleFieldChange(
                                                event,
                                                'commentText',
                                                event.target.value
                                            )
                                        }
                                        value={currentValues.commentText}
                                        variant="outlined"
                                    />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                    <div className={classes.contentSection}>
                        <div
                            className={classes.contentSectionHeader}
                            onClick={handleTogglePlace}
                        >
                            <Typography variant="h5">Заведение</Typography>
                            {expandPlace ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                        </div>
                        <Divider/>
                        <Collapse in={expandPlace}>
                            <div className={classes.contentSectionContent}>
                                <div className={classes.formGroup}>
                                    <div>
                                        <Autocomplete
                                            multiple
                                            id="place-search"
                                            size="small"
                                            classes={{
                                                popper: classes.autocomplete
                                            }}
                                            open={openSearch}
                                            onOpen={() => {
                                                setOpenSearch(true);
                                            }}
                                            onClose={() => {
                                                setOpenSearch(false);
                                            }}
                                            onChange={(event, value) =>
                                                handleFieldChange(
                                                    event,
                                                    'places',
                                                    value
                                                )
                                            }
                                            onInputChange={event => setPlaceQuery(event.target.value)}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            getOptionLabel={option => option.name}
                                            value={places}
                                            options={placesSuggestions}
                                            loading={isLoadingPlaces}
                                            renderInput={params => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    label="Название"
                                                    variant="outlined"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <React.Fragment>
                                                                {isLoadingPlaces ? <CircularProgress color="inherit"
                                                                                             size={20}/> : null}
                                                                {params.InputProps.endAdornment}
                                                            </React.Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button
                        fullWidth
                        type="button"
                        onClick={handleClear}
                        variant="contained"
                    >
                        <DeleteIcon className={classes.buttonIcon}/>
                        Сбросить
                    </Button>
                    <Button
                        color="primary"
                        fullWidth
                        type="button"
                        variant="contained"
                        onClick={handleFilter}
                    >
                        Фильтровать
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

Filter.propTypes = {
    className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired
};

export default Filter;