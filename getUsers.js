const getUsers = async () => {
  try {
    const response = await fetch("http://localhost:5000/get-users");
    const result = await response.json();
    // console.log(result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
};

(async () => {
  const users = await getUsers();
  console.log(users);
  const div = document.getElementById("users_list");
  users.users.forEach((user) => {
    const p = document.createElement("p");
    p.textContent = `Usuario: ${user.usuario}, Email: ${user.email}`;
    div.appendChild(p);
  });
})();
