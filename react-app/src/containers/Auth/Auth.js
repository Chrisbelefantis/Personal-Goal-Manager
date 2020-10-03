import React, { Component } from 'react';
import classes from './Auth.module.css'
import Input from '../../components/GoalForm/Input/Input';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import {auth} from '../../store/actions/actionCreators';
import {Redirect} from 'react-router-dom';
import Spinner from '../../components/UI/Spinner/Spinner';


class Auth extends Component{

    state = {
        authForm:{
            email:{
                elementType: 'input',
                elementLabel: 'userEmail',
                elementTitle: 'Email',
                elementConfig:{
                    type: 'email',
                    id: 'userEmail',
                    placeholder: 'example@email.com',
                    value: ''
                },
                validation:{
                    required: true,
                    isMail: true
                },
                validity: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementLabel: 'userPassword',
                elementTitle: 'Password',
                elementConfig:{
                    type: 'password',
                    id: 'userPassword',
                    placeholder: '*******',
                    value: ''
                },
                validation:{
                    required: true,
                    minLength: 6
                },
                validity: false,
                touched: false
            }
            
        },
        formIsValid: false,
        isSignup: false
    }

    checkValidity(value,rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;

            }
            if(rules.minLength){
                isValid = value.length>rules.minLength && isValid
            }
            if(rules.isMail){
                const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                isValid = regEx.test(value) && isValid
            }

        }

        return isValid;

    }

    onChangeHandler=(event,inputLabel)=>{
    
        for(let key in this.state.authForm){
            if(this.state.authForm[key].elementLabel===inputLabel){
                let updatedauthForm = {...this.state.authForm};
                let updatedSelectedElement = {...updatedauthForm[key]};

             
                updatedSelectedElement.elementConfig.value = event.target.value;
                updatedSelectedElement.validity = this.checkValidity(event.target.value,updatedSelectedElement.validation);
                updatedSelectedElement.touched = true;

                
                updatedauthForm[key] = updatedSelectedElement;

                let formIsValid = true;
                for(let inputIndentifiers in updatedauthForm){
                    formIsValid = updatedauthForm[inputIndentifiers].validity && formIsValid;

                }


                updatedauthForm[key] = updatedSelectedElement;
                this.setState({
                    authForm: updatedauthForm,
                    formIsValid: formIsValid
                });

                break;
            }
        }
    }

    buttonClickedHandler = () =>{
        this.props.onAuth(
            this.state.authForm.email.elementConfig.value,
            this.state.authForm.password.elementConfig.value,
            this.state.isSignup);

    }

    switchButtonClickedHandler=()=>{
        this.setState(prevState=>{
            return{
                isSignup: !prevState.isSignup
            }
        })
    }

    render=()=>{

      
        let inputElementsArray = [];
        for(let key in this.state.authForm){
            inputElementsArray.push(this.state.authForm[key])
        }

        let redirect = null;
        if(this.props.isLoggedIn){
            redirect = <Redirect to = '/goals'/>;
        }

        return(
            
            <div className={classes.Auth}>
                {!this.props.loading ?
                <React.Fragment>
                    {redirect}
                    {inputElementsArray.map(element=>(
                    <Input
                        key = {element.elementLabel}
                        label = {element.elementLabel}
                        elementType = {element.elementType}
                        elementConfig = {element.elementConfig}
                        elementTitle = {element.elementTitle}
                        isValid = {element.validity}
                        isTouched = {element.touched}
                        changed = {(event)=>this.onChangeHandler(event,element.elementLabel)}/>

                    ))}
                </React.Fragment>:<Spinner/>}
                <div className={classes.Button}> 
                    {this.props.error? <p>{this.props.error}</p>:null}
                    <Button
                        clicked = {this.buttonClickedHandler}
                        btnType='success'
                        disabled={!this.state.formIsValid}>
                        {this.state.isSignup? 'Signup':'Login'}</Button>
                    <Button  
                        clicked = {this.switchButtonClickedHandler}
                        btnType='danger'
                        >{this.state.isSignup? 'Switch to Login':'Switch to Signup'}</Button>
                </div>
           </div> 
        );
    }
}


const mapDispatchToProps=(dispatch)=>{
    return{
        onAuth: (email,password,isSignup)=> dispatch(auth(email,password,isSignup))
    }
};

const mapStateToProps = (state)=>{
    return{
        isLoggedIn : state.isAuthenticated,
        loading: state.loading,
        error : state.error
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);