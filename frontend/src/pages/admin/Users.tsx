import { fetchUsers } from "@shared/api/admin";
import { useEffect } from "react";

function Users() {
  useEffect(() => {
    fetchUsers({}).then((users) => console.log(users));
  }, []);

  return <div>Users</div>;
}

export default Users;
