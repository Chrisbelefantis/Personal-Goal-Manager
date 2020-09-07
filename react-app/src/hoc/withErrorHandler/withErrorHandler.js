import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent,axiosInstance)=>{


  const WithErrorHandler = (props)=>{
    const [error,setError] = useState(null);

    const requestInterceptor = axiosInstance.interceptors.request.use(req=>{
      setError(null);
      return req;
    },err=>{
        setError(err);
        return Promise.reject(err);
      }
    );


    const responseInterceptor = axiosInstance.interceptors.response.use(res=>{
      setError(null);
      return res;
    },err=>{
        setError(err);
        return Promise.reject(err);
      }
    );

    useEffect(()=>{
      return ()=>{
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      }
    },[requestInterceptor,responseInterceptor]);

    return(

      <Aux>
        {error ? <Modal>{error.message}</Modal>:null}
        <WrappedComponent {...props}/>
      </Aux>

    )

  }

    return WithErrorHandler;  


  }

export default withErrorHandler;