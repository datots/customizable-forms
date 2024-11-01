import React from "react";

const UserData = ({ users }) => {
  return (
    <div className="border mt-4">
      <h2 className="text-xl p-2 bg-gray-100">User Data</h2>
      {users.length === 0 ? (
        <div className="p-2">No users found.</div>
      ) : (
        users.map((user) => (
          <div key={user._id} className="flex justify-between p-2 border-b">
            <div>
              <strong>
                {user.firstName} {user.lastName}
              </strong>{" "}
              ({user.email})
            </div>
            <div>{user.role}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserData;
