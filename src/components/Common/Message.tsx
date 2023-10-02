/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppSelector, useTypedDispatch } from 'hooks';
import { messageSelector } from 'redux/reducers/message';
import { clearMessage } from 'redux/actions/message';

const Message = () => {
  const message = useAppSelector(messageSelector);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toast.dismiss();
      }
    };

    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, [dispatch, message]);

  useEffect(() => {
    if (!message.status && !message.error && !message.message) {
      return;
    }
    toast.dismiss();

    // If API return error
    if (message.status && message.error) {
      const messageError = message.error;

      // @ts-ignore
      if (messageError.errorMessage) {
        // @ts-ignore
        toast.error(`${message.status}: ${messageError.errorMessage}`);
      }

      // @ts-ignore
      if (messageError.errorData) {
        // @ts-ignore
        message.error.errorData.forEach((keyError) =>
          // @ts-ignore
          toast.error(`${message.status}: ${keyError.msg}`));
      }
    }

    // If fetch error
    else if (!message.status && message.error) {
      toast.error(message.error.message);
    }
    else if (message.message) toast(message.message);

    dispatch(clearMessage());
  }, [message, dispatch]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default Message;
