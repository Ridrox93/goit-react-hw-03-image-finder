import { BounceLoader } from 'react-spinners';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.overlay}>
      <BounceLoader color="rgba(90, 214, 54, 1)" />
    </div>
  );
};
