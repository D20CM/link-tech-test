import css from "./contactTile.module.css";
import { React, useEffect, useState } from "react";
import { deleteContact, updateContact } from "../../api/contacts";
import CountrySelector from "../CountrySelector/CountrySelector";
import { AiFillDelete, AiFillSave } from "react-icons/ai";
import { FaEdit, FaWindowClose } from "react-icons/fa";

function ContactTile({
  contact,
  jwt,
  hasContactsChanged,
  setHasContactsChanged,
  setError,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [contactName, setContactName] = useState(contact.contactName);
  const [company, setCompany] = useState(contact.company);
  // const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [areaCode, setAreaCode] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [extension, setExtension] = useState("");
  const [id, setId] = useState("");
  const [primaryEmailAddress, setPrimaryEmailAddress] = useState(
    contact.primaryEmailAddress
  );

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        let deletedContact = await deleteContact(jwt, contact.id);
        console.log(deletedContact);
        setHasContactsChanged(!hasContactsChanged);
      } catch (error) {
        setError(error);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  }

  async function handleEdit() {
    console.log("editing");
    setIsEditing(true);
  }

  async function handleSave() {
    const updatedUserInfo = {
      company: company,
      contactName: contactName,
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
    //will call the updateContact PUT function here
    try {
      const updatedUser = await updateContact(jwt, contact.id, updatedUserInfo);
      console.log("Save edits");
      setIsEditing(false);
      setHasContactsChanged(!hasContactsChanged);
      console.log(updatedUser);
    } catch (error) {
      setError(error);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function handleInput(callback, e) {
    callback(e);
  }

  useEffect(() => {
    function seperatePhoneNumber(contact) {
      setCountryCode(
        contact.phoneNumbers[0].phoneNumberFormatted.split("-")[0]
      );
      setAreaCode(contact.phoneNumbers[0].phoneNumberFormatted.split("-")[1]);
      setNumber(contact.phoneNumbers[0].phoneNumberFormatted.split("-")[2]);
      if (extension) {
        setExtension(
          contact.phoneNumbers[0].phoneNumberFormatted.split("#")[1]
        );
      } else {
        setExtension("");
      }
      setCategory(contact.phoneNumbers[0].category);
      setId(contact.phoneNumbers[0].id);
    }

    seperatePhoneNumber(contact);
    // console.log(countryCode, areaCode, number, extension, category);
  }, [contact, extension]);

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
          {contact.phoneNumbers[0].phoneNumberFormatted} (
          {contact.phoneNumbers[0].category})
        </p>
      </div>
      <div className={css.iconRow}>
        <AiFillDelete onClick={() => handleDelete()} className={css.tileIcon} />

        <FaEdit onClick={() => handleEdit()} className={css.tileIcon} />
      </div>
    </div>
  ) : (
    //end of display tile
    //start of edit tile
    <div className={css.contactTileEdit} key={contact.id}>
      <div className={css.form}>
        <input
          className={css.contactName}
          value={contactName}
          //these input handlers are only changing the state in THIS component - should be ok for constructing an object to pass to the put request.  Is there anywhere that might get broken by this???
          onChange={(e) => handleInput(setContactName, e.target.value)}
        ></input>

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
          {contact.phoneNumbers[0].phoneNumberFormatted} (
          {contact.phoneNumbers[0].category})
        </p>
        <input
          value={number}
          onChange={(e) => handleInput(setNumber, e.target.value)}
        ></input>
        <input
          value={areaCode}
          onChange={(e) => handleInput(setAreaCode, e.target.value)}
        ></input>
        <CountrySelector setCountryCode={setCountryCode} />
        <input
          value={id}
          onChange={(e) => handleInput(setId, e.target.value)}
        ></input>
        <input
          value={extension}
          onChange={(e) => handleInput(setExtension, e.target.value)}
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
      </div>

      <div className={css.iconRow}>
        <AiFillDelete onClick={() => handleDelete()} className={css.tileIcon} />

        <AiFillSave onClick={() => handleSave()} className={css.tileIcon} />
        <FaWindowClose
          onClick={() => {
            setIsEditing(false);
          }}
          className={css.tileIcon}
        />
      </div>
    </div>
    //end of edit tile
  );
}

export default ContactTile;
