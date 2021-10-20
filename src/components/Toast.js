import React from 'react'
import { ToastHeader,Toast, ToastBody } from 'react-bootstrap'

const MyToast = ({message}) => {
    const tostStyle={
        position:"fixed",
        top:"30px",
        right:"20px",
        boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
        zIndex:1
    }
    return (
        <div style={tostStyle}>
            <Toast className="bg-success border border-success text-white"  >
                <ToastHeader closeButton={false} className="bg-success text-white" >
                    <strong className="mr-auto">Success</strong>
                </ToastHeader>
                <ToastBody className="mr-auto">
                    {message}
                </ToastBody>
            </Toast>
        </div>
    )
}

export default MyToast
