/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import useRouter from '../../utils/useRouter';

const NODE_ENV = process.env.NODE_ENV;

const Page = props => {
    const { title, children, ...rest } = props;

    const router = useRouter();

    useEffect(() => {
        if (NODE_ENV !== 'production') {
            return;
        }
    }, [title, router]);

    return (
        <div {...rest}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string
};

export default Page;