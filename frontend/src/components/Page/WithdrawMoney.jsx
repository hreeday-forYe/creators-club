import React, { useEffect, useState } from 'react';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  usePageProfileQuery,
  useUpdateWithdrawMethodMutation,
  useDeleteWithdrawMethodMutation,
  useCreateWithdrawRequestMutation,
} from '../../redux/slices/pagesApiSlice';
import { AiOutlineDelete } from 'react-icons/ai';
import { setCredentials } from '../../redux/slices/authSlice';

const WithdrawMoney = () => {
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [open, setOpen] = useState(false);
  const { authInfo } = useSelector((state) => state.auth);
  const { creator } = authInfo;
  // console.log(creator);
  const dispatch = useDispatch();
  const [withdrawAmount, setWithdrawAmount] = useState(10);

  const [updateWithdrawMethod, { isLoading }] =
    useUpdateWithdrawMethodMutation();
  const [deleteWithdrawMethod] = useDeleteWithdrawMethodMutation();
  const [createWithdrawRequest, { isLoading: withdrawLoading }] =
    useCreateWithdrawRequestMutation();
  const [bankInfo, setBankInfo] = useState({
    bankName: '',
    bankCountry: '',
    bankSwiftCode: null,
    bankAccountNumber: null,
    bankHolderName: '',
    bankAddress: '',
  });
  const { data: pageProfile, refetch: pageRefetch } = usePageProfileQuery();
  // console.log(pageProfile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      bankCountry: bankInfo.bankCountry,
      bankSwiftCode: bankInfo.bankSwiftCode,
      bankAccountNumber: bankInfo.bankAccountNumber,
      bankHolderName: bankInfo.bankHolderName,
      bankAddress: bankInfo.bankAddress,
    };
    // console.log(withdrawMethod);
    try {
      await updateWithdrawMethod(withdrawMethod).unwrap();
      pageRefetch();
      setBankInfo({
        bankName: '',
        bankCountry: '',
        bankSwiftCode: null,
        bankAccountNumber: null,
        bankHolderName: '',
        bankAddress: '',
      });
      toast.success('Withdraw method added');
    } catch (error) {
      toast.error('Not successfull');
    }
    console.log(creator?.withdrawMethod);
    setPaymentMethod(false);
  };
  const error = () => {
    toast.error('You not have enough balance to withdraw!');
  };

  const withdrawHandler = async () => {
    try {
      if (withdrawAmount < 10 || withdrawAmount > creator?.availableBalance) {
        toast.error("You can't withdraw this amount!");
        return;
      }
      const amount = withdrawAmount;
      const withdraw = createWithdrawRequest(amount).unwrap();
      console.log(withdraw);
      toast.success('Withdraw money request is successful!');
      // Update available balance in Redux store
      dispatch(
        setCredentials({
          ...pageProfile,
          creator: {
            ...creator,
            availableBalance: creator.availableBalance - amount,
          },
        })
      );
      // Close the popup
      setOpen(false);
    } catch (error) {
      console.error('Error:', error?.data?.message || error.error);
      toast.error(
        'An error occurred while processing your request. Please try again later.'
      );
    }
  };

  const deleteHandler = async () => {
    try {
      await deleteWithdrawMethod().unwrap();
      toast.success('withDraw method delete successfully');
      pageRefetch();
      dispatch(setCredentials({ ...pageProfile }));
      // pageRefetch();
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if (pageProfile) {
      // Update the Redux state with the new profile data
      dispatch(setCredentials({ ...pageProfile }));
    }
  }, [pageProfile, dispatch]);

  return (
    <div className="w-full p-3 800px:p-8">
      <div className="w-full h-[70vh] p-8">
        <h1 className="text-2xl font-normal font-Poppins">Withdraw Your Money</h1>
        <div className="w-full bg-white h-[50vh] rounded flex items-center justify-center flex-col">
          <h5 className="text-[20px] pb-4">
            Available Balance: ${creator?.availableBalance.toFixed(2)}
          </h5>
          <div
            className={`${styles.button} text-white !h-[42px] !rounded`}
            onClick={() =>
              creator?.availableBalance < 10 ? error() : setOpen(true)
            }
          >
            Withdraw
          </div>
        </div>
        {open && (
          <div className="w-full h-screen z-[9999] fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
            <div
              className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
                paymentMethod ? 'h-[80vh] overflow-y-scroll' : 'h-[unset]'
              } min-h-[40vh] p-3`}
            >
              <div className="w-full flex justify-end">
                <RxCross1
                  size={25}
                  onClick={() => setOpen(false) || setPaymentMethod(false)}
                  className="cursor-pointer"
                />
              </div>
              {paymentMethod ? (
                <div>
                  <h3 className="text-[22px] font-Poppins text-center font-[600]">
                    Add new Withdraw Method:
                  </h3>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label>
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        required
                        value={bankInfo.bankName}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, bankName: e.target.value })
                        }
                        id=""
                        placeholder="Enter your Bank name!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>
                    <div className="pt-2">
                      <label>
                        Bank Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        value={bankInfo.bankCountry}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankCountry: e.target.value,
                          })
                        }
                        id=""
                        required
                        placeholder="Enter your bank Country!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>
                    <div className="pt-2">
                      <label>
                        Bank Swift Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        id=""
                        required
                        value={bankInfo.bankSwiftCode}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankSwiftCode: e.target.value,
                          })
                        }
                        placeholder="Enter your Bank Swift Code!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Account Number{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name=""
                        id=""
                        value={bankInfo.bankAccountNumber}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankAccountNumber: e.target.value,
                          })
                        }
                        required
                        placeholder="Enter your bank account number!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>
                    <div className="pt-2">
                      <label>
                        Bank Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        required
                        value={bankInfo.bankHolderName}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankHolderName: e.target.value,
                          })
                        }
                        id=""
                        placeholder="Enter your bank Holder name!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <div className="pt-2">
                      <label>
                        Bank Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name=""
                        required
                        id=""
                        value={bankInfo.bankAddress}
                        onChange={(e) =>
                          setBankInfo({
                            ...bankInfo,
                            bankAddress: e.target.value,
                          })
                        }
                        placeholder="Enter your bank address!"
                        className={`${styles.input} mt-2`}
                      />
                    </div>

                    <button
                      type="submit"
                      className={`bg-blue-600 px-4 py-2 mt-2 rounded-lg mb-3 text-white`}
                    >
                      Add
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <h3 className="text-[22px] font-Poppins">
                    Available Withdraw Methods:
                  </h3>

                  {creator && creator?.withdrawMethod ? (
                    <div>
                      <div className="800px:flex w-full justify-between items-center">
                        <div className="800px:w-[50%]">
                          <h5>
                            Account Number:{' '}
                            {'*'.repeat(
                              creator?.withdrawMethod.bankAccountNumber.length -
                                3
                            ) +
                              creator?.withdrawMethod.bankAccountNumber.slice(
                                -3
                              )}
                          </h5>
                          <h5>Bank Name: {creator?.withdrawMethod.bankName}</h5>
                        </div>
                        <div className="800px:w-[50%]">
                          <AiOutlineDelete
                            size={25}
                            className="cursor-pointer"
                            onClick={() => deleteHandler()}
                          />
                        </div>
                      </div>
                      <br />
                      <h4>Available Balance: {creator?.availableBalance}$</h4>
                      <br />
                      <div className="800px:flex w-full items-center">
                        <input
                          type="number"
                          placeholder="Amount..."
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                        />
                        <div
                          className={`${styles.button} !h-[42px] text-white`}
                          onClick={withdrawHandler}
                        >
                          Withdraw
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[18px] pt-2">
                        No Withdraw Methods available!
                      </p>
                      <div className="w-full flex items-center">
                        <div
                          className={`${styles.button} text-[#fff] text-[18px] mt-4`}
                          onClick={() => setPaymentMethod(true)}
                        >
                          Add new
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawMoney;
