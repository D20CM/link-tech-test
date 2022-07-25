export async function getUserProfile(jwt) {
  if (jwt) {
    console.log("calling profile/GET API");
    const response = await fetch(
      `https://interview.intrinsiccloud.net/profile`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
}

export async function getUserProfileImage(jwt, id) {
  if (jwt) {
    console.log("calling profil/profileImage/GET API");
    const response = await fetch(
      `https://interview.intrinsiccloud.net/profile/profileImage/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    );
    const data = response.url;
    console.log("This should be the image: ", data);

    return data;
  }
}

//post profile image

export async function changeProfileImage(jwt, formData) {
  if (jwt) {
    console.log("calling profile/profileImage/POST API");

    const response = await fetch(
      `https://interview.intrinsiccloud.net/profile/profileImage`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
        },
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.log("before error thrown", data);
      let error = new Error();
      error = { message: data.error, status: response.status };
      throw error;
    }
    return data;
  }
}

//change password

export async function changePassword(jwt, passwordInfo) {
  if (jwt) {
    console.log("calling profile/changePassword/POST API");

    const response = await fetch(
      `https://interview.intrinsiccloud.net/profile/changePassword`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + jwt,
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(passwordInfo),
      }
    );

    const data = await response.json();
    return data;
  }
}
