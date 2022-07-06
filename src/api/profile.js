export async function getUserProfile(jwt) {
  if (jwt) {
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
//change password
