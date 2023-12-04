import { Routes, Route } from 'react-router-dom';
import useGlobal from './modules/hooks/useGlobal';
import RequiredAuth from './modules/RequiredAuth';
import PublicLayout from './layout/PublicLayout';
import MainLayout from './layout/MainLayout';
import AssetsLayout from './layout/AssetsLayout';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import Assets from './components/assets/Assets';
import AssetByCode from './components/assets/AssetByCode';
import NewAsset from './components/assets/new-asset/NewAsset';
import Search from './components/search/Search';
import Clients from './components/clients/Clients';
import Manager from './components/manager/Manager';
import Logout from './components/logout/Logout';

function App() {
    const { roles } = useGlobal();

    return (
        <Routes>
            {/*Public routes */}
            <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/*Private routes*/}
            <Route element={<RequiredAuth allowedRoles={[roles.Broker]} />}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/assets" element={<AssetsLayout />}>
                        <Route
                            index
                            element={
                                <Assets
                                    config={{
                                        title: 'Imóveis',
                                        showToolbar: true,
                                        showSearch: true,
                                        showAdd: true,
                                    }}
                                />
                            }
                        />
                        <Route
                            path="/assets/newasset"
                            element={
                                <NewAsset
                                    config={{
                                        title: 'Criar nova listagem',
                                        showToolbar: true,
                                        showSearch: false,
                                        showAdd: true,
                                    }}
                                />
                            }
                        />
                        <Route
                            path="/assets/search"
                            element={
                                <Search
                                    config={{
                                        title: 'Buscar por imóvel',
                                        showToolbar: true,
                                        showSearch: true,
                                        showAdd: false,
                                    }}
                                />
                            }
                        />
                        <Route
                            path="/assets/:code"
                            element={
                                <AssetByCode
                                    config={{
                                        title: '',
                                        showToolbar: true,
                                        showSearch: true,
                                        showAdd: true,
                                    }}
                                />
                            }
                        />
                    </Route>
                    <Route path="clients" element={<Clients />} />
                    <Route path="manager" element={<Manager />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
