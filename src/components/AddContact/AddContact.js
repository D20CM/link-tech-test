import css from "./addContact.module.css";
import { React, useState } from "react";
import { addContact } from "../../api/contacts";

function AddContact({ jwt }) {
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
  }

  return (
    <section className={css.addContactArea}>
      <h2>Add Contact</h2>
      <form>
        <input
          type="text"
          className={css.contactNameInput}
          placeholder="Contact Name"
          onChange={(e) => handleInput(setContactName, e.target.value)}
        ></input>

        <input
          type="text"
          className={css.companyInput}
          placeholder="Company"
          onChange={(e) => handleInput(setCompany, e.target.value)}
        ></input>
      </form>

      <input
        type="text"
        className={css.emailInput}
        placeholder="Primary Email Addtess"
        onChange={(e) => handleInput(setPrimaryEmailAddress, e.target.value)}
      ></input>
      <input type="submit" onClick={handleSubmit}></input>
    </section>
  );
}

export default AddContact;
