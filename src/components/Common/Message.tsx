import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useTypedDispatch } from 'hooks';
import { messageSelector } from 'redux/reducers/message.reducer';
import { clearMessage } from 'redux/actions/message.action';

const Message = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useTypedDispatch();
  useEffect(() => {
    if (!message.status && !message.error && !message.message) return undefined;

    // If API return error
    if (message.status && message.error) {
      const messageError = message.error;
      if (messageError.data) {
        Object.keys(message.error.data).forEach((key) => toast.error(`${message.status}: ${messageError.data[key][0]}`));
      }
      else {
        toast.error(`${message.status}: ${message.error.message}`);
      }
      // eslint-disable-next-line brace-style
    }

    // If fetch error
    else if (!message.status && message.error) {
      toast.error(message.error.message);
    }
    else if (message.message) toast(message.message);

    return () => {
      dispatch(clearMessage());
    };
  }, [message, dispatch]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
