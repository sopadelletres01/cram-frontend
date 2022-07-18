import { Button, Modal, Spinner } from 'react-bootstrap'
import React from 'react'

export default function LoadingSpinner(){
    return(
        <Spinner
            size='lg'
            style={{
                margin:"0 auto",
                display:"flex",
                color:"white",
                width:"100px",
                height:"100px",
            }} 
            animation="border"
            role="status"
        >
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
} 