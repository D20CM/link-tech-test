import css from "./contacts.module.css";
import { getContacts } from "../../api/contacts";
import ContactTile from "../ContactTile/ContactTile";

import { React, useEffect, useState } from "react";

function Contacts({ jwt }) {
  const [contacts, setContacts] = useState([]);

  //   const receivedContacts = getContacts(jwt);

  let receivedContacts;

  async function assignContacts() {
    receivedContacts = await getContacts(jwt);
    console.log(contacts[0]);
    setContacts(receivedContacts);
    console.log("in Contacts element: ", contacts);
  }

  useEffect(() => {
    assignContacts();
  }, [jwt]);

  return (
    <div className={css.contactsContainer}>
      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        contacts.map((contact) => <ContactTile contact={contact} />)
      ) : (
        <div>No contacts to show</div>
      )}
    </div>
  );
  //   return <div>something</div>;
}

export default Contacts;
