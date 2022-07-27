import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from './context/AuthContext';

const MockComponent = () => {
  let navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  //Es mock, era para probar si hacia algo aun no lifa tenemos SIIIIIII
  if (!isAuthenticated) {
    navigate('/login');
  }
  return (
    <fieldset className="scheduler-border">
      <legend className="scheduler-border">Start Time</legend>
      <div className="control-group">
        <label className="control-label input-label" for="startTime">
          Start :
        </label>
        <div className="controls bootstrap-timepicker">
          <input type="text" className="datetime" id="startTime" name="startTime" placeholder="Start Time" />
          <i className="icon-time"></i>
        </div>
      </div>
    </fieldset>
  );
};

export default MockComponent;
