import css from "./addContact.module.css";
import { React, useState } from "react";
import { addContact } from "../../api/contacts";

function AddContact({ jwt, hasContactsChanged, setHasContactsChanged }) {
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [primaryEmailAddress, setPrimaryEmailAddress] = useState("");

  function handleInput(callback, e) {
    callback(e);
    // console.log(contactName, company, primaryEmailAddress);
  }

  function handleSubmit(e) {
    const newContact = {
      contactName: contactName,
      company: company,
      phoneNumbers: [
        {
          areaCode: "0151",
          category: "HOME",
          countryCode: "44",
          extension: "",
          id: "someprimaryid",
          number: "987654",
        },
      ],
      primaryEmailAddress: primaryEmailAddress,
    };
    e.preventDefault();
    console.log(JSON.stringify(newContact));
    addContact(jwt, newContact);
    //clear form inputs
    setContactName("");
    setCompany("");
    setPrimaryEmailAddress("");
    setHasContactsChanged(!hasContactsChanged);
  }

  return (
    <section className={css.addContactArea}>
      <h2>Add Contact</h2>
      <form>
        <input
          type="text"
          className={css.contactNameInput}
          placeholder="Contact Name"
          value={contactName}
          onChange={(e) => handleInput(setContactName, e.target.value)}
        ></input>

        <input
          type="text"
          className={css.companyInput}
          placeholder="Company"
          value={company}
          onChange={(e) => handleInput(setCompany, e.target.value)}
        ></input>

        <input
          type="text"
          className={css.emailInput}
          placeholder="Primary Email Address"
          value={primaryEmailAddress}
          onChange={(e) => handleInput(setPrimaryEmailAddress, e.target.value)}
        ></input>
        <input type="submit" onClick={handleSubmit}></input>
      </form>
    </section>
  );
}

export default AddContact;
