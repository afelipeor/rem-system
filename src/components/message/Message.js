import styles from './Message.module.scss';
import { MdWarningAmber, MdErrorOutline, MdInfoOutline } from 'react-icons/md';
import { MessageType } from '../../enums/message-type.enum';

const Message = ({ type, message }) => {
    const setClassName = type => {
        switch (type) {
            case MessageType.Info:
                return `${styles.message} ${styles.info}`;
            case MessageType.Warning:
                return `${styles.message} ${styles.warning}`;
            case MessageType.Error:
                return `${styles.message} ${styles.error}`;
            default:
                return `${styles.message} ${styles.info}`;
        }
    };
    return (
        <div className={setClassName(type)}>
            {type === MessageType.Info && <MdInfoOutline />}
            {type === MessageType.Warning && <MdWarningAmber />}
            {type === MessageType.Error && <MdErrorOutline />}

            <p>{message}</p>
        </div>
    );
};
export default Message;
