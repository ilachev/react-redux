import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';


const Project = props => {
    const { route } = props;

    return renderRoutes(route.routes);
};

Project.propTypes = {
    route: PropTypes.object
};

export default Project;