import css from "./contactTile.module.css";
import React from "react";
import { deleteContact } from "../../api/contacts";

function ContactTile({
  contact,
  jwt,
  hasContactsChanged,
  setHasContactsChanged,
}) {
  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      let deletedContact = await deleteContact(jwt, contact.id);
      console.log(deletedContact);
      setHasContactsChanged(!hasContactsChanged);
    }
  }

  return (
    <div className={css.contactTile} key={contact.id}>
      <div>
        <h3 className={css.contactName}>{contact.contactName}</h3>
        <p className={css.company}>
          <em>{contact.company}</em>
        </p>
        <a href={`mailto:${contact.primaryEmailAddress}`}>
          {contact.primaryEmailAddress}
        </a>
        <p>
          +{contact.phoneNumbers[0].phoneNumberFormatted} (
          {contact.phoneNumbers[0].category})
        </p>
      </div>
      <button onClick={() => handleDelete()}>Delete Contact</button>
    </div>
  );
}

export default ContactTile;
