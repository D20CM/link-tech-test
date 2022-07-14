import css from "./contactTile.module.css";
import { React, useState } from "react";
import { deleteContact } from "../../api/contacts";

function ContactTile({
  contact,
  jwt,
  hasContactsChanged,
  setHasContactsChanged,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [dummy, setDummy] = useState("");
  const [contactName, setContactName] = useState(contact.contactName);
  const [company, setCompany] = useState(contact.company);
  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  // const [areaCode, setAreaCode] = useState("");
  // const [number, setNumber] = useState("");
  // const [category, setCategory] = useState("");
  // const [countryCode, setCountryCode] = useState("");
  // const [extension, setExtension] = useState("");
  // const [id, setId] = useState("");
  const [primaryEmailAddress, setPrimaryEmailAddress] = useState(
    contact.primaryEmailAddress
  );

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      let deletedContact = await deleteContact(jwt, contact.id);
      console.log(deletedContact);
      setHasContactsChanged(!hasContactsChanged);
    }
  }

  async function handleEdit() {
    console.log("editing");
    setIsEditing(true);
  }

  async function handleSave() {
    //will call the updateContact PUT function here
    console.log("Save edits");
    setIsEditing(false);
    setHasContactsChanged(!hasContactsChanged);
  }

  function handleInput(callback, e) {
    callback(e);
    // console.log(contactName, company, primaryEmailAddress);
  }

  //choose between 2 different versions of the tile
  //editing version will need change handlers and state for each field - is there a better way???
  //how to display/edit phone numbers - reverse the formatting???

  return !isEditing ? (
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
      <button onClick={() => handleEdit()}>Edit Contact</button>
    </div>
  ) : (
    //end of display tile
    //start of edit tile
    <div className={css.contactTileEdit} key={contact.id}>
      <div>
        <input
          className={css.contactName}
          value={contactName}
          //these input handlers are only changing the state in THIS component - should be ok for constructing an object to pass to the put request.  Is there anywhere that might get broken by this???
          onChange={(e) => handleInput(setContactName, e.target.value)}
        ></input>
        <p>{contactName}</p>
        <input
          className={css.company}
          value={company}
          onChange={(e) => handleInput(setCompany, e.target.value)}
        ></input>
        <input
          value={primaryEmailAddress}
          onChange={(e) => handleInput(setPrimaryEmailAddress, e.target.value)}
        ></input>
        <p>
          +{contact.phoneNumbers[0].phoneNumberFormatted} (
          {contact.phoneNumbers[0].category})
        </p>
      </div>
      <button onClick={() => handleDelete()}>Delete Contact</button>
      <button onClick={() => handleSave()}>Save Contact</button>
    </div>
    //end of edit tile
  );
}

export default ContactTile;
