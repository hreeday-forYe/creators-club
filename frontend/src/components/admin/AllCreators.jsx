import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@mui/material';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  useGetAllCreatorsQuery,
  useAdminBanCreatorMutation,
} from '../../redux/slices/pagesApiSlice';
import { FaBan } from 'react-icons/fa';
import { CiMail } from 'react-icons/ci';
import Loader from '../Loader';

const AllCreators = () => {
  const { data, isLoading, refetch } = useGetAllCreatorsQuery();
  // console.log(data);
  const [open, setOpen] = useState(false);
  const [creatorId, setCreatorId] = useState('');

  const [creators, setCreators] = useState([]);
  const [adminBanCreator, { isLoading: banLoading }] =
    useAdminBanCreatorMutation();

  const handleBan = async (creatorId) => {
    await adminBanCreator(creatorId);
    refetch();
  };

  useEffect(() => {
    setCreators(data?.creators);
  }, [data, setCreators]);

  // const headerCellStyle = 'font-bold text-sm text-gray-800 bg-gray-200';

  const columns = [
    { field: 'id', headerName: 'Creator ID', flex: 1 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'charge', headerName: 'Subscription', flex: 1 },
    { field: 'joinedAt', headerName: 'Joined At', flex: 1 },
    { field: 'isbanned', headerName: 'Is Banned', flex: 0.6 },
    {
      field: 'preview',
      headerName: 'Preview',
      sortable: false,
      flex: 0.6,
      renderCell: (params) => (
        <Link to={`/page/${params.id}`}>
          <Button startIcon={<AiOutlineEye size={20} />}></Button>
        </Link>
      ),
    },
    {
      field: 'mail',
      headerName: 'Mail',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <a href={`mailto:${params.row.email}`}>
          <Button
            startIcon={<CiMail size={23} className="text-blue-700" />}
          ></Button>
        </a>
      ),
    },
    {
      field: 'ban',
      headerName: 'Ban/ unban ',
      sortable: false,
      flex: 0.5,
      renderCell: (params) => (
        <Button onClick={() => setCreatorId(params.id) || setOpen(true)}>
          {params.row.isbanned ? (
            <button
              className='p-1 font-bold border-blue-500 border-2'
            >Unban</button>
          ) : (
            <FaBan size={20} className="text-red-500" />
          )}
        </Button>
      ),
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
        isbanned: item?.isBanned || false,
        charge: `$ ${item.subscriptionCharge}`,
      });
    });

  return (
    <div className="w-full flex justify-center  p-16 md:p-8 pt-5">
      <div className="w-[100%]">
        <h3 className="text-[22px] font-Poppins text-center md:text-left pb-2">
          All Creators
        </h3>
        {isLoading || (banLoading && <Loader />)}
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            className="w-full h-auto font-Poppins"
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
                Are you sure you want to ban or unban this Page?
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
