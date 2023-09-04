import React from "react";

function UserList({ handleSubmit }) {
  return (
    <div>
      <div className="Form-Container">
        <form onSubmit={handleSubmit} className="Content-form" id="form1">
          <div className="Form-Header">All Users Details</div>
          <div className="Form-Body"></div>
        </form>
      </div>
    </div>
  );
}

export default UserList;
