import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import s from './AddContactForm.module.css';

export default class AddContactForm extends Component {
  state = {
    name: '',
    phone: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name) {
      this.props.onAddNewContact({
        ...this.state,
        id: nanoid(),
      });
      this.resetForm();
    }
  };

  resetForm = () => {
    this.setState({ name: '', phone: '' });
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <>
        <form className={s.addContactForm} onSubmit={this.handleSubmit}>
          <label className={s.addContactLabel}>
            new contact
            <input
              className={s.addContactInput}
              placeholder="Bohdan Skochii"
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.onInputChange}
            />
          </label>
          <label className={s.addContactLabel}>
            phone
            <input
              onChange={this.onInputChange}
              type="tel"
              placeholder="+380633065553"
              className={s.addContactInput}
              name="phone"
              value={this.state.phone}
              required
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
          </label>
          <button className={`btn ${s.addContactBtn}`} type="submit">
            Submit
          </button>
        </form>
      </>
    );
  }
}

AddContactForm.propTypes = {
  onAddNewContact: PropTypes.func.isRequired,
};
