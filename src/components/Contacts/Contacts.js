import css from "./contacts.module.css";
import { getContacts } from "../../api/contacts";
import ContactTile from "../ContactTile/ContactTile";

import { React, useEffect, useState } from "react";
import { AiOutlineContacts } from "react-icons/ai";

function Contacts({
  jwt,
  showAddContact,
  setShowAddContact,
  hasContactsChanged,
  setHasContactsChanged,
}) {
  const [contacts, setContacts] = useState([]);

  //   const receivedContacts = getContacts(jwt);

  let receivedContacts;

  async function assignContacts() {
    receivedContacts = await getContacts(jwt);
    setContacts(receivedContacts);
  }

  useEffect(() => {
    assignContacts();
  }, [jwt, hasContactsChanged]);

  return (
    <div className={css.contactsContainer}>
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
