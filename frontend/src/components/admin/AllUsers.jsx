import React, { useState } from 'react';
import { FaPlus, FaBan } from 'react-icons/fa6';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog } from '@mui/material';
import { CiMail } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import {
  useAdminGetAllUsersQuery,
  useAdminAddUserMutation,
  useAdminDeleteUserMutation,
} from '../../redux/slices/usersApiSlice';
import styles from '../../styles/styles';
import toast from 'react-hot-toast';
const AllUsers = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, refetch } = useAdminGetAllUsersQuery();
  // console.log(data);
  const users = data?.users;
  const headerCellStyle = 'font-bold text-sm text-gray-800 bg-gray-200';

  const columns = [
    { field: 'id', headerName: 'User ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    {
      field: 'edit',
      headerName: 'Edit',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
          <Button
            startIcon={<FaRegEdit size={23} className="text-blue-700" />}
          ></Button>
      ),
    },
    {
      field: 'mail',
      headerName: 'Mail',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <a href={``}>
          <Button
            startIcon={<CiMail size={23} className="text-blue-700" />}
          ></Button>
        </a>
      ),
    },
    {
      field: 'ban',
      headerName: 'Delete',
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => handleDeleteUser(params.id) || setOpen(true)}>
          <FaBan size={20} className="text-red-500" />
        </Button>
      ),
    },
  ];
  const row = [];
  users &&
    users.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        role: item.role,
      });
    });

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [addUser, { isLoading: addUserLoading }] = useAdminAddUserMutation();
  const [deleteUser, { isLoading: deleteLoading }] =
    useAdminDeleteUserMutation();

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await addUser({
        name,
        email,
        password,
        isAdmin,
      }).unwrap();
      if (response) {
        toast.success('User Added');
      }
      setOpen(false);
      refetch();
    } catch (error) {
      toast.error(error.error);
    }
    // console.log('output');
  };

  const handleDeleteUser = async (id) => {
    // e.preventDefault();
    if (window.confirm('Are you sure you want to delete? ')) {
      try {
        await deleteUser({ id }).unwrap();
        refetch();
      } catch (error) {
        toast.error(error.errror);
      }
    }
  };

  const handleUpdateUser = async(id)=>{
    console.log('gpt handle the logic of edit user');
  }

  return (
    <div className="w-full sm:p-4 md:p-8">
      <h1 className="text-2xl mb-4 font-normal text-center md:text-left">
        All Users
      </h1>
      <button
        className="bg-blue-700 p-2 text-white flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        Add New User <FaPlus size={17} />
      </button>
      <div className="w-full flex items-center pt-5 justify-center">
        <div className="w-[95%] bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(!open)} sx={{ p: '20px' }}>
        <h3 className="text-center text-2xl mt-2">Add a New User</h3>
        <div className="p-10">
          <form className="space-y-6 w-full" onSubmit={handleAddUser}>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="w-full">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="text-blue-500 h-4 w-4 mr-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="isAdmin"
                  className="text-sm font-medium text-gray-700"
                >
                  Assign Admin Role
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default AllUsers;
