import { lazy } from 'react';

import ActualizationLayout from '../layouts/Actualization';
import ProjectLayout from '../layouts/Project';

export const actualizationRoutes = {
    path: '/admin/actualization',
    exact: false,
    component: ActualizationLayout,
    routes: [
        {
            path: '/admin/actualization/projects',
            exact: true,
            component: lazy(() => import('../views/Actualization/ProjectsList'))
        },
        {
            path: '/admin/actualization/projects/project',
            component: ProjectLayout,
            routes: [
                {
                    path: '/admin/actualization/projects/:slug/:id',
                    exact: true,
                    component: lazy(() => import('../views/Actualization/ProjectDetails')),
                }
            ],
        },
        {
            path: '/admin/actualization/projects/first-project',
            component: ProjectLayout,
            routes: [
                {
                    path: '/admin/actualization/projects/:slug/:id',
                    exact: true,
                    component: lazy(() => import('../views/Actualization/FirstProjectDetails')),
                }
            ],
        },
        {
            path: '/admin/actualization/projects/work-time-project',
            component: ProjectLayout,
            routes: [
                {
                    path: '/admin/actualization/projects/:slug/:id',
                    exact: true,
                    component: lazy(() => import('../views/Actualization/WorkTimeProjectDetails')),
                }
            ],
        },
        {
            path: '/admin/actualization/projects/menu-file-project',
            component: ProjectLayout,
            routes: [
                {
                    path: '/admin/actualization/projects/:slug/:id',
                    exact: true,
                    component: lazy(() => import('../views/Actualization/MenuFileProjectDetails')),
                }
            ],
        },
        {
            path: '/admin/actualization/projects/menu-file-chosen-project',
            component: ProjectLayout,
            routes: [
                {
                    path: '/admin/actualization/projects/:slug/:id',
                    exact: true,
                    component: lazy(() => import('../views/Actualization/MenuFileChosenProjectDetails')),
                }
            ],
        },
    ]
};