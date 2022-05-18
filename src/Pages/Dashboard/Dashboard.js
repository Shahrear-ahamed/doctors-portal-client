import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="drawer md:w-11/12 mx-auto md:mt-5 drawer-mobile">
      <input id="dashboard-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-11/12 mx-auto md:mx-auto">
        {/* <!-- Page content here --> */}
        <h2 className="text-3xl text-secondary font-semibold my-5">
          Welcome to your dashboard
        </h2>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-menu" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto space-y-1 w-48 md:mt-5 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li>
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li>
            <Link to="/dashboard/myreviews">My Reviews</Link>
          </li>
          <li>
            <Link to="/dashboard/history">My History</Link>
          </li>
          {admin && (
            <>
              <li>
                <Link to="/dashboard/users">All Users</Link>
              </li>
              <li>
                <Link to="/dashboard/addDoctor">Add a Doctor</Link>
              </li>
              <li>
                <Link to="/dashboard/manageDoctor">Manage Doctors</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
