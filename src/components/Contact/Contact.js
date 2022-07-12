import s from './Contact.module.css';
import PropTypes from 'prop-types';

export default function Contact({ name, phone }) {
  return (
    <div className={s.contactDataWrapper}>
      <p className={s.contactData}>{name}</p>
      <p className={s.contactData}>{phone}</p>
    </div>
  );
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};
