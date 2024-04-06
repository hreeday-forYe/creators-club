import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { server } from "../../server";
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { BsPencil } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import { toast } from 'react-hot-toast';
import {
  useGetAllWithdrawRequestQuery,
  useUpdateWithdrawRequestMutation,
} from '../../redux/slices/pagesApiSlice';
import Loader from '../Loader';
const WithdrawRequest = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState('Processing');
  const {
    data: allWithdraws,
    isLoading,
    refetch,
  } = useGetAllWithdrawRequestQuery();
  console.log(allWithdraws);
  const withdraws = allWithdraws?.withdraws;
  console.log(withdraws);

  const [updateWithdrawRequest, { isLoading: updateLoading }] =
    useUpdateWithdrawRequestMutation();

  // GET ALL withdraw Requests

  const columns = [
    { field: 'id', headerName: 'Withdraw Id', minWidth: 150, flex: 1.4 },
    {
      field: 'name',
      headerName: 'Page Name',
      minWidth: 180,
      flex: 1,
    },
    {
      field: 'pageId',
      headerName: 'Page Id',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'status',
      headerName: 'status',
      type: 'text',
      minWidth: 80,
      flex: 0.7,
    },
    {
      field: 'createdAt',
      headerName: 'Requested At',
      type: 'number',
      minWidth: 130,
      flex: 0.4,
    },
    {
      field: ' ',
      headerName: 'Update Status',
      type: 'number',
      minWidth: 130,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <BsPencil
            size={20}
            className={`${params.row.status !== 'Processing' ? 'hidden' : ''} mr-5 cursor-pointer`}
            onClick={() => setOpen(true) || setWithdrawData(params.row)}
          />
        );
      },
    },
  ];

  const handleSubmit = async () => {
    try {
      const withdrawId = withdrawData.id;
      const pageId = withdrawData.pageId;
      console.log(withdrawId, pageId);
      await updateWithdrawRequest({
        withdrawId,
        pageId,
      }).unwrap();
      setOpen(false);
      toast.success('Withdraw Request Updated Successfully');
    } catch (error) {
      toast.error(error.error);
    }
  };

  useEffect(() => {
    // Fetch updated data after successful status update
    if (!isLoading && !open) {
      refetch();
    }
  }, [open, isLoading, refetch]);

  const row = [];

  withdraws &&
    withdraws.forEach((item) => {
      row.push({
        id: item._id,
        pageId: item.creator._id,
        name: item.creator.name,
        amount: 'US $' + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl mb-4 font-normal">All Withdraw Requests</h1>
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
        {open && (
          <div className="w-full fixed h-screen top-0 left-0 bg-[#00000031] z-[9999] flex items-center justify-center">
            <div className="w-[50%] min-h-[40vh] bg-white rounded shadow p-4">
              <div className="flex justify-end w-full cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h1 className="text-[25px] text-center font-Poppins">
                Update Withdraw status
              </h1>
              <br />
              <select
                name=""
                id=""
                onChange={(e) => setWithdrawStatus(e.target.value)}
                className="w-[200px] h-[35px] ml-4 border rounded"
              >
                <option value={withdrawStatus}>{withdrawData.status}</option>
                <option value={withdrawStatus}>Succeed</option>
              </select>
              {updateLoading && <Loader />}
              <button
                type="submit"
                className={`block ${styles.button} text-white !h-[42px] ml-4 mt-8 text-[18px]`}
                onClick={handleSubmit}
                disabled={updateLoading}
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawRequest;
