import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardContent,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';
import { Project } from './components';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 700
    }
}));

const Results = props => {
    const { className, projects, ...rest } = props;

    const classes = useStyles();

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
                <Divider />
                <CardContent className={classes.content}>
                    <PerfectScrollbar>
                        <div className={classes.inner}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Дата создания</TableCell>
                                        <TableCell>Название</TableCell>
                                        <TableCell>Готовность</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map(project => (
                                        <Project
                                            key={project.id}
                                            id={project.id}
                                            name={project.name}
                                            createdAt={project.created_at}
                                            slug={project.slug}
                                            rate={project.completion_pct}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
            </Card>
        </div>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            completion_pct: PropTypes.string
        })
    )
};

Results.defaultProps = {
    projects: []
};

export default Results;