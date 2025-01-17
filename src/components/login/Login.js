import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MdPerson, MdPassword } from 'react-icons/md';
import useGlobal from '../../modules/hooks/useGlobal';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { MessageType } from '../../enums/message-type.enum';
import Message from '../message/Message';

const Login = () => {
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
    } = useForm({
        mode: 'onTouched',
    });
    const { setAuth, setRoles } = useGlobal();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || '/';

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage('');
        }, 5000);
    }, [errorMessage]);

    const submitData = async data => {
        try {
            data.token = localStorage.getItem('token');
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/auth`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data),
                }
            );
            if (!response?.ok) {
                const responseData = await response?.json();
                if ([400, 401, 500].includes(response?.status)) {
                    setErrorMessage(responseData.message);
                }
            } else {
                const responseData = await response?.json();
                const userData = responseData.userData;
                const roles = userData?.roles;
                const rolesList = responseData?.rolesList;
                setAuth({
                    username: userData.username,
                    password: userData.password,
                    roles,
                    accessToken: userData.refreshToken,
                });
                setRoles(rolesList);
                reset();
                navigate(redirectTo, { replace: true });
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setErrorMessage('Falha na rede.');
            } else {
                setErrorMessage('Falha no login.');
            }
        }
    };

    return (
        <div className={styles.login}>
            <form onSubmit={handleSubmit(submitData)}>
                {errorMessage && (
                    <Message type={MessageType.Error} message={errorMessage} />
                )}

                <div className={styles.input_block}>
                    <label className={styles.label} htmlFor="username">
                        <MdPerson className={styles.icon} />
                        Usuário
                    </label>
                    <input
                        className={styles.input}
                        {...register('username', {
                            required: 'Campo obrigatório',
                        })}
                        autoComplete="off"
                        type="text"
                    />
                    {errors.username?.message && (
                        <Message
                            type={MessageType.Error}
                            message={errors.username.message}
                        />
                    )}
                </div>
                <div className={styles.input_block}>
                    <label className={styles.label} htmlFor="password">
                        <MdPassword className={styles.icon} />
                        Senha
                    </label>
                    <input
                        className={styles.input}
                        {...register('password', {
                            required: 'Campo obrigatório',
                        })}
                        autoComplete="off"
                        type="password"
                    />
                    {errors.password?.message && (
                        <Message
                            type={MessageType.Error}
                            message={errors.password.message}
                        />
                    )}
                </div>

                <div className={styles.button_wrapper}>
                    <button className={styles.button} type="submit">
                        Login
                    </button>
                </div>
            </form>

            <div className={styles.register_wrapper}>
                <p>
                    Ainda não tem cadastro?
                    <span>
                        <Link to="/register"> Criar novo cadastro</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
