import s from './FilterContacts.module.css';
import PropTypes from 'prop-types';

export default function FilterContacts({ filter, onFilter }) {
  const onFilterChange = e => {
    onFilter(e.target.value);
  };
  return (
    <input
      className={s.filterInput}
      type="text"
      name="filter"
      value={filter}
      placeholder="Filter contacts by name or number"
      onChange={onFilterChange}
    />
  );
}

FilterContacts.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
