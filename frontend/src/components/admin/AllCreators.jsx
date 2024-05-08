import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useGetAllCreatorsQuery } from '../../redux/slices/pagesApiSlice';

const AllCreators = () => {
  const { data, isLoading } = useGetAllCreatorsQuery();
  // console.log(data);
  const [open, setOpen] = useState(false);
  const [creatorId, setCreatorId] = useState('');

  const [creators, setCreators] = useState([]);

  const handleBan = async () => {};

  useEffect(() => {
    setCreators(data?.creators);
  }, [data, setCreators]);

  const headerCellStyle = 'font-bold text-sm text-gray-800 bg-gray-200';
  const columns = [
    { field: 'id', headerName: 'Creator ID', minWidth: 150, flex: 0.7 },

    {
      field: 'name',
      headerName: 'name',
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'text',
      minWidth: 130,
      flex: 1.3,
    },
    {
      field: 'address',
      headerName: 'Creator Address',
      type: 'text',
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: 'charge',
      headerName: 'Subscription',
      type: 'text',
      minWidth: 130,
      flex: 1,
    },

    {
      field: 'joinedAt',
      headerName: 'Joined At',
      type: 'text',
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: '  ',
      flex: 1,
      minWidth: 150,
      headerName: 'Preview Page',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/page/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: 'Ban Page',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setCreatorId(params.id) || setOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  creators &&
    creators.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        joinedAt: item.createdAt.slice(0, 10),
        address: item.address,
        charge: `$ ${item.subscriptionCharge}`,
      });
    });

  return (
    <div className="w-full flex justify-center  p-16 md:p-8 pt-5">
      <div className="w-[100%]">
        <h3 className="text-[22px] font-Poppins text-center md:text-left pb-2">
          All Creators
        </h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            checkboxSelection
            className="w-full h-auto font-Poppins bg-gray-100"
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to ban this Page?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} bg-gray-500  hover:bg-gray-300 hover:text-black hover:shadow-md transition-all duration-100  text-white border text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white hover:bg-blue-500 text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleBan(creatorId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCreators;
