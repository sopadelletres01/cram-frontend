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
    <fieldset class="scheduler-border">
      <legend class="scheduler-border">Start Time</legend>
      <div class="control-group">
        <label class="control-label input-label" for="startTime">
          Start :
        </label>
        <div class="controls bootstrap-timepicker">
          <input type="text" class="datetime" id="startTime" name="startTime" placeholder="Start Time" />
          <i class="icon-time"></i>
        </div>
      </div>
    </fieldset>
  );
};

export default MockComponent;
