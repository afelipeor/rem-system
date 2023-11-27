import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdPerson, MdPassword } from 'react-icons/md';
import styles from './Register.module.scss';
import { MessageType } from '../../enums/message-type.enum';
import Message from '../message/Message';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const redirect = useNavigate();
    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        watch,
    } = useForm({
        defaultValues: { username: '', password: '', passwordConfirmation: '' },
        mode: 'onTouched',
    });
    const passwordWatcher = watch('password');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setMessage('');
            if (success) {
                setSuccess(false);
            }
        }, 3000);
    }, [message, success]);

    const submitData = async data => {
        try {
            const response = await fetch('http://localhost:3500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            });
            const responseData = await response?.json();
            if (!response?.ok) {
                setSuccess(false);
                if ([400, 409, 500].includes(response?.status)) {
                    setMessage(responseData.message);
                }
            } else {
                reset();
                setSuccess(true);
                setMessage(responseData.message);
                localStorage.setItem('token', responseData.token);
                redirect('/home');
            }
        } catch (error) {
            if (error instanceof TypeError) {
                setMessage('Falha na rede.');
            } else {
                setMessage('Falha na criação do usuário.');
            }
        }
    };

    return (
        <div className={styles.register}>
            <form className={styles.form} onSubmit={handleSubmit(submitData)}>
                {message ? (
                    success ? (
                        <Message type={MessageType.Success} message={message} />
                    ) : (
                        <Message type={MessageType.Error} message={message} />
                    )
                ) : null}
                <div className={styles.input_block}>
                    <label className={styles.label} htmlFor="username">
                        <MdPerson className={styles.icon} />
                        Usuário:
                    </label>
                    <input
                        className={styles.input}
                        {...register('username', {
                            pattern: {
                                value: /^[a-zA-Z]{8,15}$/,
                                message: 'Somente letras. De 8 à 15 caracteres',
                            },
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
                        Senha:
                    </label>
                    <input
                        className={styles.input}
                        {...register('password', {
                            pattern: {
                                value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{5,10}$).*/,
                                message:
                                    'Letras, números e caracteres especiais. De 5 à 15 caracteres',
                            },
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
                <div className={styles.input_block}>
                    <label
                        className={styles.label}
                        htmlFor="passwordConfirmation"
                    >
                        <MdPassword className={styles.icon} />
                        Confirme sua senha:
                    </label>
                    <input
                        className={styles.input}
                        {...register('passwordConfirmation', {
                            required: 'Campo obrigatório',
                            validate: value =>
                                value === passwordWatcher ||
                                'As senhas não coincidem',
                        })}
                        autoComplete="off"
                        type="password"
                    />
                    {errors.passwordConfirmation?.message && (
                        <Message
                            type={MessageType.Error}
                            message={errors.passwordConfirmation.message}
                        />
                    )}
                </div>

                <div className={styles.button_wrapper}>
                    <button className={styles.button} type="submit">
                        Criar
                    </button>
                </div>
            </form>

            <div className={styles.login_wrapper}>
                <p>
                    Já tem cadastro?
                    <span className={styles.login_wrapper}>
                        <Link to="/login"> Fazer Login</Link>
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Register;
