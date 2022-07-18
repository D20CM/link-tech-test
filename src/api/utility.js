export async function getCountries() {
  console.log("calling utility/GET API");

  const response = await fetch(
    `https://interview.intrinsiccloud.net/utility/countries`,
    {
      method: "GET",
      headers: {},
    }
  );
  const data = await response.json();

  return data;
}
