import css from "./contactTile.module.css";

import React from "react";

function ContactTile({ contact }) {
  return (
    <div className={css.contactTile} key={contact.id}>
      <div>
        <h3 className={css.contactName}>{contact.contactName}</h3>
        <p className={css.company}>
          <em>{contact.company}</em>
        </p>
        <p>{contact.primaryEmailAddress}</p>
        <p>
          +{contact.phoneNumbers[0].phoneNumberFormatted} (
          {contact.phoneNumbers[0].category} )
        </p>
      </div>
    </div>
  );
}

export default ContactTile;
