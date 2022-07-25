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
    if (!response.ok) {
      console.log("before error thrown", data);
      let error = new Error();
      error = { message: data.error, status: response.status };
      throw error;
    }

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
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(newContact),
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      let error = new Error();
      error = { message: data.error, status: response.status };
      console.log(error);
      throw error;
    }
    alert(data.message);
    return data;
  } else {
    console.log("No jwt, I guess!");
  }
}

export async function deleteContact(jwt, id) {
  if (jwt && id) {
    console.log("calling contacts/DELETE API");
    const response = await fetch(
      `https://interview.intrinsiccloud.net/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      let error = new Error();
      error = { message: data.error, status: response.status };
      throw error;
    }
    console.log(data);
    return data;
  } else {
    console.log("No jwt, I guess!");
  }
}

export async function updateContact(jwt, id, newData) {
  if (jwt && id) {
    console.log("calling contacts/PUT API");
    const response = await fetch(
      `https://interview.intrinsiccloud.net/contacts/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify(newData),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      let error = new Error();
      error = { message: response.message, status: response.status };
      throw error;
    }
    alert(data.message);
    console.log(data);

    return data;
  } else {
    console.log("No jwt, I guess!");
  }
}
