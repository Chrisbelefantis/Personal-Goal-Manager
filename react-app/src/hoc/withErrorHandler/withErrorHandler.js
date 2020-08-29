
//Copied code from Q&A see below 
import React, {useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

  const WithErrorHandler = props => {

    const [error, setError] = useState(null);
    
    const requestInterceptor = axios.interceptors.request.use(
      req => {
        setError(null);
        return req;
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error);
        console.log('WithErrorHandler: ', error);
        return Promise.reject(error);
      }
    );

    useEffect(
      () => {
        return () => {
          axios.interceptors.request.eject(requestInterceptor);
          axios.interceptors.response.eject(responseInterceptor);
        };
      },
      [requestInterceptor, responseInterceptor]
    );

    return <>
      <Modal 
        show={error !== null}
        modalClosed={() => setError(null)}
      >
        {error !== null ? error.message : null}
      </Modal>
      <WrappedComponent {...props}/>
    </>
  };


  return WithErrorHandler;


};

export default withErrorHandler;





/*
//Class component version, the only problem is that 
//you call setState in constructor or you need to use the UNSAFE_componentWillMount
//which trows a warning


import React, {Component} from 'react';
import Aux from '../../HOC/Auxilliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent,axios)=>{


    return class extends Component{

        state = {
            error: null
        };

        UNSAFE_componentWillMount=()=>{
            axios.interceptors.request.use(req=>{
                this.setState({
                    error: null
                });
                return req;
            })
            axios.interceptors.response.use(res=>res,error=>{
                this.setState({
                    error: error
                });
            });

        }

        errorConfirmedHandler = ()=>{
            this.setState({
                error:null
            });
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error}
                    closed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        
        }

    }
}

export default withErrorHandler;

*/