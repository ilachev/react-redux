import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/styles';
import { Page } from '../../../components';
import { FilterBar, Header } from '../../../components/Actualization/Details/components';
import { Results } from './components';
import {
    fetchChosenCategories,
    fetchCuisines,
    fetchFeatures,
    fetchFilterOptions,
    fetchPlaceTypes,
    fetchProject,
    fetchRubrics,
    fetchStatistic
} from "../../../actions";

const useStyles = makeStyles(theme => ({
    results: {
        marginTop: theme.spacing(2)
    }
}));

const ProjectDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const name = useSelector(state => state.project.project.name);
    const instruction = useSelector(state => state.project.project.instruction);
    const pagination = useSelector(state => state.pagination);
    const { id, slug } = useParams();

    useEffect(() => {
        dispatch(fetchProject(slug, id, pagination.page, pagination.rowsPerPage));
    }, [dispatch, slug, id, pagination.page, pagination.rowsPerPage]);

    useEffect(() => {
        dispatch(fetchFeatures(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchFilterOptions(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchStatistic(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchChosenCategories(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchRubrics(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchPlaceTypes(slug, id));
    }, [dispatch, slug, id]);

    useEffect(() => {
        dispatch(fetchCuisines(slug, id));
    }, [dispatch, slug, id]);

    return (
        <Page
            className={classes.root}
            title={name}
        >
            <Header
                name={name}
            />
            <FilterBar
                instruction={instruction}
            />
            <Results
                className={classes.results}
            />
        </Page>
    );
};

export default ProjectDetails;