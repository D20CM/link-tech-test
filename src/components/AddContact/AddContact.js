import css from "./addContact.module.css";
import { React, useState } from "react";
import { addContact } from "../../api/contacts";

import CountrySelector from "../CountrySelector/CountrySelector";
import { FaWindowClose } from "react-icons/fa";

function AddContact({
  jwt,
  hasContactsChanged,
  setHasContactsChanged,
  setShowAddContact,
  setError,
}) {
  const [contactName, setContactName] = useState("");
  const [company, setCompany] = useState("");
  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [areaCode, setAreaCode] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("HOME");
  const [countryCode, setCountryCode] = useState("");
  const [extension, setExtension] = useState("");
  const [id, setId] = useState("");
  const [primaryEmailAddress, setPrimaryEmailAddress] = useState("");

  function handleInput(callback, e) {
    callback(e);
    // console.log(contactName, company, primaryEmailAddress);
  }

  async function handleSubmit(e) {
    try {
      const newContact = {
        contactName: contactName,
        company: company,
        phoneNumbers: [
          {
            areaCode: areaCode,
            category: category,
            countryCode: countryCode,
            extension: extension,
            id: id,
            number: number,
          },
        ],
        primaryEmailAddress: primaryEmailAddress,
      };
      e.preventDefault();
      console.log(JSON.stringify(newContact));
      const addedUser = await addContact(jwt, newContact);
      console.log("you have added the contact: ", addedUser);
      //clear form inputs
      setContactName("");
      setCompany("");
      setPrimaryEmailAddress("");
      setAreaCode("");
      setNumber("");
      setCategory("");
      setCountryCode("");
      setExtension("");
      setId("");
      setHasContactsChanged(!hasContactsChanged);
    } catch (error) {
      setError(error);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return (
    <section className={css.addContactArea}>
      <div className={css.closeIcon}>
        <FaWindowClose
          onClick={() => {
            setShowAddContact(false);
          }}
        />
      </div>
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
        <div className={css.phoneInputArea}>
          <input
            type="text"
            className={css.areaCodeInput}
            placeholder="Area Code"
            value={areaCode}
            onChange={(e) => handleInput(setAreaCode, e.target.value)}
          ></input>
          <input
            type="text"
            className={css.numberInput}
            placeholder="Number"
            value={number}
            onChange={(e) => handleInput(setNumber, e.target.value)}
          ></input>

          <select
            name="categories"
            className={css.categoryInput}
            onChange={(e) => handleInput(setCategory, e.target.value)}
          >
            <option value="HOME">HOME</option>
            <option value="MOBILE">MOBILE</option>
            <option value="WORK">WORK</option>
          </select>
          <CountrySelector setCountryCode={setCountryCode} />

          {/* <input
            type="text"
            className={css.countryCodeInput}
            placeholder="Country Code"
            value={countryCode}
            onChange={(e) => handleInput(setCountryCode, e.target.value)}
          ></input> */}
          <input
            type="text"
            className={css.extensionInput}
            placeholder="Extension"
            value={extension}
            onChange={(e) => handleInput(setExtension, e.target.value)}
          ></input>
          <input
            type="text"
            className={css.idInput}
            placeholder="ID"
            value={id}
            onChange={(e) => handleInput(setId, e.target.value)}
          ></input>
        </div>
        <input
          type="email"
          className={css.emailInput}
          placeholder="primaryEmailAddress"
          value={primaryEmailAddress}
          onChange={(e) => handleInput(setPrimaryEmailAddress, e.target.value)}
        ></input>
        <input
          type="submit"
          onClick={handleSubmit}
          className={css.formSubmit}
        ></input>
      </form>
    </section>
  );
}

export default AddContact;
