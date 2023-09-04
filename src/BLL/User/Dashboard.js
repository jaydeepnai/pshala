import React from "react";
import { useEffect } from "react";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";

function Dashboard() {
  store.dispatch(changeProgress(100));
  useEffect(() => {},[]);
  return (
    <div>
      <b>Welcome to Pathshala</b>
    </div>
  );
}

export default Dashboard;
