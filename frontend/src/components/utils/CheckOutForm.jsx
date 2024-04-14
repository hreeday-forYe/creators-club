import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useCreateSubscriptionMutation } from '../../redux/slices/subscriptionApiSlice';
import { redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';
import { useProfileQuery } from '../../redux/slices/usersApiSlice';
import Loader from '../Loader';

import socketIO from 'socket.io-client';
import { server } from '../../constants';
const socketId = socketIO(server, { transports: ['websocket'] });

const CheckOutForm = ({ setOpenPay, data, userData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState('');
  const [
    createSubscription,
    { data: subscribeData, error, isLoading: subscribeLoading },
  ] = useCreateSubscriptionMutation();
  const { data: user, refetch: userRefetch } = useProfileQuery();
  // console.log(user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(userData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    } else {
      setIsLoading(true);
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsLoading(false);
      createSubscription({
        pageId: data?.creator?._id,
        payment_info: paymentIntent,
      });
    }
  };

  useEffect(() => {
    if (subscribeData) {
      userRefetch();
      dispatch(setCredentials({ ...user }));
      setOpenPay(false);
      // Socket server connection
      socketId.emit('notification', {
        title: 'New Subscription',
        message: `You have a new Subscription from ${userData.name}`,
        from: userData._id,
        to: data.creator._id,
      });

      // console.log('Subscription confirmend');
      toast.success('Subscription Successfull..');
      // redirect('/page/subscribe-success');
    }
    if (error) {
      toast.error(error);
    }
  }, [subscribeData, error, userData]);
  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        <LinkAuthenticationElement id="link-authentication-element" />
        <PaymentElement id="payment-element" className="mt-2" />
        {isLoading || (subscribeLoading && <Loader />)}
        <button
          disabled={isLoading || !stripe || !elements}
          className="border p-2 rounded-md font-Roboto font-medium text-lg mt-4 bg-blue-600 hover:bg-blue-900 transition duration-200 text-white"
        >
          <span id="button-text" className={`mt-2 !h-[35px]`}>
            {isLoading
              ? 'Paying...'
              : `Pay $${data?.creator?.subscriptionCharge}`}
          </span>
        </button>
        {message && (
          <div id="payment-message" className="text-red font-Poppins pt-2">
            {message}
          </div>
        )}
      </form>
    </>
  );
};

export default CheckOutForm;
