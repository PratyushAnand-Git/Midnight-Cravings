import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notifications() {
  return <ToastContainer />;
}

export const notify = (message) => {
  toast(message);
};

export default Notifications;
