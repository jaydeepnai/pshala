import React from 'react'
import ResetPassword from '../../Components/User/ResetPassword'
import { useState } from 'react';
function ResetPasswordBLL() {
  const [user, setuser] = useState({
    userId: "",
  });

  const resetPassword = () => {
    // console.log("you r in reset password function");
    setuser(...user);
  }

  return (
    <>
      <ResetPassword
        user={user}
        resetPassword={resetPassword}
      />
    </>
  )
}

export default ResetPasswordBLL