import css from './Button.module.css';

export const Button = props => {
  return (
    <button className={css.button} type="button" onClick={props.onClick}>
      Load more
    </button>
  );
};
