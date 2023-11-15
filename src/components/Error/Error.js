import css from '../App.module.css';
import { FaInfoCircle } from 'react-icons/fa';

export const Error = ({ text }) => {
  return (
    <div className={css.info}>
      <FaInfoCircle size={45} color="red" />
      <div className={css.infoText}>{text}</div>
    </div>
  );
};
