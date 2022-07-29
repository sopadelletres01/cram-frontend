import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import AuthService from '../../services/auth.service';

export default function EmailVerification() {
  let form = useParams();
  let location = useLocation();
  const navigate = useNavigate();
  const handleResend = async e => {
    e.preventDefault();
    let data;
    if (form.email) {
      data = form;
    }
    if (location?.state?.email) {
      data = location.state;
    }
    let res = await AuthService.forgotPassword(data);
  };
  const handleRedirect = async e => {
    e.preventDefault();
    navigate('/login', { replace: true });
  };

  return (
    <div className="container w-50 mt-5 bg-light rounded p-3">
      <div className="text-center d-flex flex-column gap-3 align-items-center">
        <h2>Se ha enviado un email a tu cuenta para restablecer tu contraseña</h2>
        <Col>
          <Button onClick={handleResend}>Resend the link</Button>
        </Col>
        <span>Already verified?</span>
        <Col>
          <Button onClick={handleRedirect}>Return to login</Button>
        </Col>
      </div>
    </div>
  );
}
