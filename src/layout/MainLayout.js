import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import Container from '../components/container/Container';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default MainLayout;
