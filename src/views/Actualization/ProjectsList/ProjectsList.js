import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Page } from '../../../components';
import { Header, Results } from './components';
import { fetchProjects } from '../../../actions'

const useStyles = makeStyles(theme => ({
    results: {
        marginTop: theme.spacing(2)
    }
}));

const ProjectsList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const project = useSelector(state => state.project);

    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    return (
        <Page
            className={classes.root}
            title="Список проектов"
        >
            <Header/>
            {project.list && (
                <Results
                    className={classes.results}
                    projects={project.list}
                />
            )}
        </Page>
    );
};

export default ProjectsList;