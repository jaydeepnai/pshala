import { Suspense } from 'react';

const Loadable = (Component) => (props) => {
    return (
        <Suspense >
            <Component {...props} />
        </Suspense>
    );
};

export default Loadable;
