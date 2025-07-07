// // src/components/Navbar.jsx
// import React from 'react';
// import { NavLink, Link, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold">SmartQ</h1>

//       <div className="space-x-4">
//         {!user && (
//           <>
//             <Link to="/login" className="hover:underline">
//               Login
//             </Link>
//             <Link to="/register" className="hover:underline">
//               Register
//             </Link>
//           </>
//         )}

//         {user && user.role === 'STUDENT' && (
//           <>
//             <NavLink
//               to="/student"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/student/available-slots"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               Available Slots
//             </NavLink>
//             <NavLink
//               to="/student/my-bookings"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               My Bookings
//             </NavLink>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         )}

//         {user && user.role === 'ADMIN' && (
//           <>
//             <NavLink
//               to="/admin"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/admin/manage-slots"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               Manage Slots
//             </NavLink>
//             <NavLink
//               to="/admin/user-bookings"
//               className={({ isActive }) =>
//                 `px-3 py-1 rounded ${isActive ? 'bg-blue-800' : 'hover:bg-blue-700'}`
//               }
//             >
//               All Bookings
//             </NavLink>
//             <button
//               onClick={handleLogout}
//               className="px-3 py-1 rounded bg-red-600 hover:bg-red-700"
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
// );

// };

// export default Navbar;


import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center shadow-lg animate-fade-in-down">
      <h1 className="text-2xl font-extrabold tracking-wide drop-shadow-lg text-blue-100">SmartQ</h1>
      <div className="space-x-2 md:space-x-4 flex items-center">
        {!user && (
          <>
            <Link to="/login" className="px-4 py-2 rounded-lg font-semibold text-blue-100 hover:bg-blue-800 hover:text-blue-200 transition">Login</Link>
            <Link to="/register" className="px-4 py-2 rounded-lg font-semibold text-blue-100 hover:bg-blue-800 hover:text-blue-200 transition">Register</Link>
          </>
        )}
        {user && user.role === 'STUDENT' && (
          <>
            <NavLink
              to="/student/available-slots"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition text-blue-100 ${isActive ? 'bg-blue-900' : 'hover:bg-blue-800 hover:text-blue-200'}`
              }
            >
              Available Slots
            </NavLink>
            <NavLink
              to="/student/my-bookings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition text-blue-100 ${isActive ? 'bg-blue-900' : 'hover:bg-blue-800 hover:text-blue-200'}`
              }
            >
              My Bookings
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-500 font-semibold shadow hover:scale-105 transition text-blue-100 hover:text-blue-200"
            >
              Logout
            </button>
          </>
        )}
        {user && user.role === 'ADMIN' && (
          <>
            <NavLink
              to="/admin/manage-slots"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition text-blue-100 ${isActive ? 'bg-blue-900' : 'hover:bg-blue-800 hover:text-blue-200'}`
              }
            >
              Manage Slots
            </NavLink>
            <NavLink
              to="/admin/user-bookings"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition text-blue-100 ${isActive ? 'bg-blue-900' : 'hover:bg-blue-800 hover:text-blue-200'}`
              }
            >
              All Bookings
            </NavLink>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-500 font-semibold shadow hover:scale-105 transition text-blue-100 hover:text-blue-200"
            >
              Logout
            </button>
          </>
        )}
      </div>
      <style>
        {`
          .animate-fade-in-down {
            animation: fadeInDown 1s cubic-bezier(0.23, 1, 0.32, 1);
          }
          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-40px);}
            100% { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;