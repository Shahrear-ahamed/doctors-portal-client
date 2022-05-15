import { useState } from "react";
const useToken = (user) => {
  const [token, setToken] = useState("");
  const email = user?.user?.email;
  const currentUser = { email };
  if (user) {
    fetch(`http://localhost:5000/user/${email}`, {
      method: "PUT",
      headers: {
        "content-typr": "application/json",
      },
      body: JSON.stringify(currentUser),
    })
      .then((res) => res.json())
      .then((data) => {
        const accessToken = data.token;
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken);
      });
  }
  return [token];
};
export default useToken;
