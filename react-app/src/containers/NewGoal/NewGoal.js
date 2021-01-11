import React,{Component} from 'react';
import classes from './NewGoal.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import GoalForm from '../../components/GoalForm/GoalForm';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class NewGoal extends Component{

    state = {
        goalForm:{
            title: {
                elementType: 'input',
                elementLabel: 'title',
                elementTitle: 'Goal Title*',
                elementConfig:{
                    type: 'text',
                    id: 'title',
                    placeholder: 'Goal Title',
                    value: ''
                },
                validation:{
                    required: true
                },
                validity: false,
                touched: false
            },
            description: {
                elementType: 'textarea',
                elementLabel: 'description',
                elementTitle: 'Description',
                elementConfig:{
                    id: 'description',
                    placeholder: 'Add a quick description of your goal...',
                    rows: 4,
                    columns: 5,
                    value: ''
                },
                validation:{
                    required: false
                },
                validity: true,
                touched: false
            },
            dueDate: {
                elementType: 'input',
                elementLabel: 'dueDate',
                elementTitle: 'Due Date',
                elementConfig:{
                    type: 'date',
                    id: 'dueDate',
                    value: ''
                },
                validation:{
                    required: false
                },
                validity: true,
                touched: false
            },
            category: {
                elementType: 'select',
                elementLabel: 'category',
                elementTitle: 'Select Category*',
                elementConfig:{
                    id:"category",
                    value:"",
                    options: [],
                },
                validation:{
                    required: true
                },
                validity: false,
                touched: false
            },
          
        },
        formIsValid: false,
        submiting:false,
        categoriesLoaded:false
    };


    checkValidity(value,rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;

            }
            if(rules.minLength){
                isValid = value.length>rules.minLength && isValid
            }

        }

        return isValid;

    }

    saveButtonHandler=()=>{


        this.setState({
            submiting: true
        });

        let newGoal = {};

        
        for(let key in this.state.goalForm){
            if(key !== 'newCategory')
            {
                let value = this.state.goalForm[key].elementConfig.value;
                if(value!==''){
                    newGoal[key] = value;
                }
            }
        }

        //In case there is a new category
        if(this.state.goalForm.hasOwnProperty('newCategory')){
            const newCategory = {
                title: this.state.goalForm.newCategory.elementConfig.value
            }

            

            axios.post('/categories',newCategory)
            .then(res=>{
                newGoal['category'] = res.data.category._id;
                axios.post('/goals',newGoal)
                .then(res=>{
                    
                    this.props.history.push('/goals');  
                    
                })
                .catch(err=>{
                    console.log(err);
                })
            })
            .catch(err=>{
                console.log(err);
            })

        }
        //Standard case without a new category
        else{

            axios.post('/goals',newGoal)
            .then(res=>{
                
                this.props.history.push('/goals');  
                
            })
            .catch(err=>{
                console.log(err);
            })

        }

        


    }

    closeButtonHandler=()=>{

    
        this.props.history.push('/goals');
        

    }

    onChangeHandler=(event,inputLabel)=>{
    

        for(let key in this.state.goalForm){
            if(this.state.goalForm[key].elementLabel===inputLabel){
                let updatedgoalForm = {...this.state.goalForm};
                let updatedSelectedElement = {...updatedgoalForm[key]};

                updatedSelectedElement.elementConfig.value = event.target.value;
                updatedSelectedElement.validity = this.checkValidity(event.target.value,updatedSelectedElement.validation);
                updatedSelectedElement.touched = true;

                
                updatedgoalForm[key] = updatedSelectedElement;

                let formIsValid = true;
                for(let inputIndentifiers in updatedgoalForm){
                    formIsValid = updatedgoalForm[inputIndentifiers].validity && formIsValid;
                }


                updatedgoalForm[key] = updatedSelectedElement;
                this.setState({
                    goalForm: updatedgoalForm,
                    formIsValid: formIsValid
                },()=>{
                    //I know this is ugly
                    if(this.state.goalForm.category.elementConfig.value==='newCategory'){

                        if(!this.state.goalForm.hasOwnProperty('newCategory')){
                            this.setState({
                                goalForm: {...this.state.goalForm,
                                    newCategory: {
                                        elementType: 'input',
                                        elementLabel: 'newCategory',
                                        elementTitle: 'Category Title*',
                                        elementConfig:{
                                            type: 'text',
                                            id: 'newCategory',
                                            placeholder: 'New Category Title',
                                            value: ''
                                        },
                                        validation:{
                                            required: true
                                        },
                                        validity: false,
                                        touched: false
                                    }
                                } ,
                                formIsValid: false
                            })
                        }
                    }
                    else
                    {
                        if(this.state.goalForm.hasOwnProperty('newCategory')){
            
                            let updatedgoalForm = {...this.state.goalForm};
                            delete updatedgoalForm.newCategory;
            
                            let formIsValid = true;
                            for(let inputIndentifiers in updatedgoalForm){
                                formIsValid = updatedgoalForm[inputIndentifiers].validity && formIsValid;
            
                            }
            
                            this.setState({
                                goalForm: updatedgoalForm,
                                formIsValid: formIsValid
                            });
                
                        }
                    }   


                });

                break;
            }
        }
        
    }



    loadCategories = () =>{
        const updatedgoalForm = {...this.state.goalForm};
        const updatedCategories = {...updatedgoalForm['category']};
        const upadatedCategoryConfig = {...updatedCategories['elementConfig']};

        
        if(this.props.isLoggedIn)
        {
            axios.get('/categories')
            .then(res=>{
                
                let options = [];

                for(let i=0; i<res.data.length; i++){
                    let newOption = {
                        value: res.data[i]._id,
                        display: res.data[i].title.charAt(0).toUpperCase() + res.data[i].title.slice(1),
                    
                    }
                    options.push(newOption);
                }
                upadatedCategoryConfig['options'] = options;

                updatedCategories['elementConfig'] = upadatedCategoryConfig;
                updatedgoalForm['category'] = updatedCategories;

                this.setState({
                    goalForm: updatedgoalForm,
                    categoriesLoaded: true
                });


            })
            .catch(err=>{
                console.log(err);
            })
        }
    }



    componentDidUpdate=()=>{
        if(!this.state.categoriesLoaded)
        {
            this.loadCategories();
        }
    }

    componentDidMount=()=>{

       this.loadCategories();
    }




    render(){

        return(

            this.props.isLoggedIn || !this.props.isLocalStoragedChecked?
            <div className={classes.NewGoal}>

                    {!this.state.submiting ?
                        <React.Fragment>
                            <h2>SET YOUR NEXT GOAL</h2>
                            
                            <p>
                                Choose a clear and specific goal in the
                                category of your choice. Always try hitting
                                those goals within a fixed period of time.
                            </p>
                            <GoalForm 
                                formElements ={this.state.goalForm}
                                changed = {this.onChangeHandler}
                                isFormValid = {this.state.formIsValid}
                                save = {this.saveButtonHandler}
                                close = {this.closeButtonHandler}/>
                        </React.Fragment>
                    :<Spinner/>}

            </div>:<Redirect to="/home"/>
        );
    }


}

const mapStateToProps = (state)=>{
    return{
        isLoggedIn: state.isAuthenticated,
        isLocalStoragedChecked: state.isLocalStoragedChecked
    }
}


export default connect(mapStateToProps,null)(withErrorHandler(NewGoal,axios));