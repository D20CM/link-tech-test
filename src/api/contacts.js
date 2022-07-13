export async function getContacts(jwt) {
  if (jwt) {
    console.log("calling contacts/GET API");
    const response = await fetch(
      `https://interview.intrinsiccloud.net/contacts`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const data = await response.json();
    console.log("In getContacts: ", data);
    return data;
  } else return "please ensure the jwt is present";
}

export async function addContact(jwt, newContact) {
  if (jwt) {
    console.log("calling contacts/POST API", jwt, newContact.contactName);
    const response = await fetch(
      `https://interview.intrinsiccloud.net/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(newContact),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
}
