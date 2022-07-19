import { React, useEffect, useState } from "react";
import { getCountries } from "../../api/utility";
import css from "./countrySelector.module.css";

function CountrySelector({ setCountryCode }) {
  const [countries, setCountries] = useState(null);

  async function assignCountries() {
    let recievedCountries = await getCountries();
    setCountries(recievedCountries);
  }

  function getCodeFromInputValue(inputValue) {
    let index = inputValue.indexOf("+");
    let code = inputValue.slice(index);
    console.log(code);
    return code;
  }

  useEffect(() => {
    assignCountries();
  }, []);

  return countries !== null ? (
    <div className={css.countrySelector}>
      <label htmlFor="countries">Country Code</label>
      <select
        name="Country Code"
        className={css.countrySelector}
        // onChange={(e) => setCountryCode(e.target)}
        onChange={(e) => setCountryCode(getCodeFromInputValue(e.target.value))}
      >
        {countries.map((country) => (
          <option key={country.isoCode}>
            {country.name} {country.dialCode}
          </option>
        ))}
      </select>
    </div>
  ) : (
    <p>loading countries...</p>
  );
}

export default CountrySelector;
