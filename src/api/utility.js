export async function getCountries(jwt) {
  const response = await fetch(
    `https://interview.intrinsiccloud.net/utility/countries`,
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
