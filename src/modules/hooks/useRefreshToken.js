import useGlobal from './useGlobal';

const useRefreshToken = () => {
    const { setAuth } = useGlobal();

    const refresh = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/refresh`,
            {
                method: 'GET',
                credentials: 'include',
            }
        );
        const responseData = await response?.json();
        console.log('responseData:', responseData);
        setAuth(prev => {
            return { ...prev, accessToken: responseData.accessToken };
        });
        return responseData.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
