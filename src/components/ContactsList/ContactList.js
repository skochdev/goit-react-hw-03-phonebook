import PropTypes from 'prop-types';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Contact from '../Contact';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onRemove }) {
  return (
    <ul>
      {contacts.map(({ id, name, phone }) => (
        <li className={s.ContactListItem} key={id}>
          <Contact name={name} phone={phone} onRemove={() => onRemove(id)} />
          <button
            type="button"
            className={s.ContactRemoveBtn}
            onClick={() => onRemove(id)}
          >
            <RiDeleteBin2Line
              className={s.deleteIcon}
              title="remove from contacts"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired,
};
