export async function handleLoginSubmit(username, password) {
  console.log("Calling auth API with: ", username, password);
  const response = await fetch(
    "https://interview.intrinsiccloud.net/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({
        password: password,
        username: username,
      }),
    }
  );
  const data = await response.json();
  const jwt = data.token;
  return jwt;
}
