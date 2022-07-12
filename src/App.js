import './App.css';
import { Component } from 'react';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactsList';
import Container from './components/Container';
import FilterContacts from './components/FilterContacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    let storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      let serializedContacts = JSON.parse(storedContacts);

      this.setState({ contacts: serializedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  checkForDuplicate = name => {
    let { contacts } = this.state;
    let normalizedName = name.toLowerCase();

    return contacts.some(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
  };

  onAddNewContact = contact => {
    const isDuplicate = this.checkForDuplicate(contact.name);

    if (isDuplicate) {
      alert(`${contact.name} is already in your phonebook`);
    } else {
      this.setState(current => ({
        contacts: [...current.contacts, contact],
      }));
    }
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    // filters by name or phone number
    return contacts.filter(contact => {
      return (
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.phone.includes(normalizedFilter)
      );
    });
  };

  handleRemove = id => {
    this.setState(current => ({
      contacts: current.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const {
      getFilteredContacts,
      onAddNewContact,
      onFilterChange,
      handleRemove,
    } = this;
    const { contacts, filter } = this.state;
    const contactsAreNotEmpty = contacts.length;
    const filteredContacts = getFilteredContacts();

    return (
      <div>
        <Container>
          <h1>Phonebook</h1>
          <AddContactForm onAddNewContact={onAddNewContact} />

          {contactsAreNotEmpty ? (
            <>
              <h2>Contacts</h2>
              <FilterContacts filter={filter} onFilter={onFilterChange} />
            </>
          ) : null}
          <ContactList contacts={filteredContacts} onRemove={handleRemove} />
        </Container>
      </div>
    );
  }
}

export default App;
