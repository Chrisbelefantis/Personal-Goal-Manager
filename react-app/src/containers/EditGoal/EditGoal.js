import React,{Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
import classes from './EditGoal.module.css';
import Input from '../../components/GoalForm/Input/Input';
import Button from '../../components/UI/Button/Button';
import axios from '../../axios-instance';


class EditGoal extends Component{

    state = {
        editForm:{
            title: {
                elementType: 'input',
                elementLabel: 'title',
                elementTitle: 'Goal Title',
                elementConfig:{
                    type: 'text',
                    id: 'title',
                    placeholder: 'Goal Title',
                    value: ''
                },
                validation:{
                    required: true
                },
                validity: true
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
                validity: true
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
                validity: true
            }
        },
        formIsValid: true,
        submiting: false
    };
 

    checkValidity(value,rules){
        let isValid = true;
        if(rules){
            if(rules.required){
                isValid = value.trim() !== '' && isValid;

            }

        }

        return isValid;

    }

    onChangeHandler=(event,inputLabel)=>{

        for(let key in this.state.editForm){
            if(this.state.editForm[key].elementLabel===inputLabel){
                let updatedEditForm = {...this.state.editForm};
                let updatedSelectedElement = {...updatedEditForm[key]};

                //Add check vality (update validity attribute)
                updatedSelectedElement.elementConfig.value = event.target.value;
                updatedSelectedElement.validity = this.checkValidity(event.target.value,updatedSelectedElement.validation);

                
                updatedEditForm[key] = updatedSelectedElement;

                let formIsValid = true;
                for(let inputIndentifiers in updatedEditForm){
                    formIsValid = updatedEditForm[inputIndentifiers].validity && formIsValid;

                }


                updatedEditForm[key] = updatedSelectedElement;
                this.setState({
                    editForm: updatedEditForm,
                    formIsValid: formIsValid
                });

                break;
            }

        }


    }

    saveButtonHandler=()=>{


        this.setState({
            submiting: true
        });

        let editedGoal = {};

        
        for(let key in this.state.editForm){
            let value = this.state.editForm[key].elementConfig.value;
            if(value!=='')
            editedGoal[key] = value;
        }

        
        axios.patch('/goals/'+this.props.match.params.id,editedGoal)
        .then(res=>{
            this.props.update();
            this.props.history.push('/goals');
            
            
        })
        .catch(err=>{
            alert(err);
        })

        
    


    }

    closeButtonHandler=()=>{

    
        this.props.history.push('/goals');
        

    }

    componentDidMount=()=>{
        const goalId = this.props.match.params.id;
        axios.get('/goals/'+goalId)
        .then(res=>{

           

            const updatedEditForm = {...this.state.editForm};

            const updatedTitle = {...updatedEditForm['title']};
            const updatedDescription = {...updatedEditForm['description']};
            const updatedDueDate = {...updatedEditForm['dueDate']};

            updatedDescription.elementConfig.value = res.data.description;
            updatedTitle.elementConfig.value = res.data.title;

            if(res.data.dueDate){
            updatedDueDate.elementConfig.value = res.data.dueDate.split('T')[0];
            }
            updatedEditForm['title'] = updatedTitle;
            updatedEditForm['description'] = updatedDescription;
            updatedEditForm['dueDate'] = updatedDueDate;

            

            this.setState({
                editForm: updatedEditForm
            });
            
        })
        .catch(err=>{
            alert(err);
        })
    }


    render(){
        const goalId = this.props.match.params.id;
        let inputElementsArray = [];
        for(let key in this.state.editForm){
            inputElementsArray.push(this.state.editForm[key]);
        }
      
        return(
            <Modal>
                <div className={classes.EditGoal}>
                    Edit Current Goal: {goalId}
                    {inputElementsArray.map(element=>(
                        <Input
                            key = {element.elementLabel}
                            label = {element.elementLabel}
                            elementType = {element.elementType}
                            elementConfig = {element.elementConfig}
                            elementTitle = {element.elementTitle}
                            isValid = {element.validity}
                            changed = {(event)=>this.onChangeHandler(event,element.elementLabel)}/>

                    ))}


                </div>
                <Button 
                    clicked={this.closeButtonHandler}
                    btnType='danger'>Close</Button>
                <Button 
                    clicked={this.saveButtonHandler}
                    btnType='success'
                    disabled = {!this.state.formIsValid}>Save</Button>
            </Modal>
        );
    }


}

export default EditGoal