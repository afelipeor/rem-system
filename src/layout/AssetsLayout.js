import { Outlet } from 'react-router-dom';
import SubContainer from '../components/container/subcontainer/SubContainer';

const AssetsLayout = () => {
    return (
        <>
            <SubContainer>
                <Outlet />
            </SubContainer>
        </>
    );
};

export default AssetsLayout;
