import css from "./contacts.module.css";
import { getContacts } from "../../api/contacts";
import ContactTile from "../ContactTile/ContactTile";

import { React, useEffect, useState } from "react";
import { AiOutlineContacts } from "react-icons/ai";
import { FaWindowClose } from "react-icons/fa";

function Contacts({
  jwt,
  setShowContacts,
  showAddContact,
  setShowAddContact,
  hasContactsChanged,
  setHasContactsChanged,
  setError,
}) {
  const [contacts, setContacts] = useState([]);

  let receivedContacts;

  async function assignContacts() {
    setError(null);
    try {
      receivedContacts = await getContacts(jwt);
      setContacts(receivedContacts);
    } catch (error) {
      setError(error);
    }
  }

  useEffect(() => {
    assignContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, hasContactsChanged]);

  return (
    <div className={css.contactsContainer}>
      <div className={css.closeIcon}>
        <FaWindowClose
          onClick={() => {
            setShowContacts(false);
            setShowAddContact(false);
          }}
        />
      </div>
      <h2>Contacts</h2>
      <div className={css.tileGrid}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <ContactTile
              contact={contact}
              key={contact.id}
              jwt={jwt}
              hasContactsChanged={hasContactsChanged}
              setHasContactsChanged={setHasContactsChanged}
            />
          ))
        ) : (
          <div>No contacts to show</div>
        )}
      </div>
      <div className={css.contactsFooter}>
        <button
          onClick={() => setShowAddContact(!showAddContact)}
          className={css.addContactButton}
        >
          <AiOutlineContacts className={css.contactButtonIcon} />+ Add Contact
        </button>
      </div>
    </div>
  );
  //   return <div>something</div>;
}

export default Contacts;
