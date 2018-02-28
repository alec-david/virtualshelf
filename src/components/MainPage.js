import React from 'react';
import { toastr } from 'react-redux-toastr';

const Main = () => (
  <div>
    main
    <button
      onClick={() => toastr.success('Success', 'Logged In')}
      type="button"
    >
      Toastr Success
    </button>
  </div>
);

export default Main;
