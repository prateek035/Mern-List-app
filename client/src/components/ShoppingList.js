import React , {Component} from 'react' ;
import {Container,ListGroup, ListGroupItem , Button} from 'reactstrap';
import {CSSTransition ,TransitionGroup} from 'react-transition-group';

import {connect } from 'react-redux';
import { getItems ,deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component{

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick =(id) =>{
        this.props.deleteItem(id);
    }

   /* state ={
        items:[
            { id:uuid(), name:'Eggs'},
            { id:uuid(), name:'Patoto'},
            { id:uuid(), name:'Milk'},
            { id:uuid(), name:'Water'}
        ]
    }*/

    render(){
        //pulling out state from this.state
        //destructuring
       
        const { items } = this.props.item;
        return (
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-List">
                    {items.map (({_id,name}) =>(
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                            <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            onClick ={this.onDeleteClick.bind(this,_id)}
                            /*onClick={()=>{
                                this.setState(state =>({
                                  //  items:state.items.filter(item=> item.id !=id)
                                }));
                            }} */
                            >&times;
                                </Button>
                            {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

ShoppingList.propTypes ={
    getItems : PropTypes.func.isRequired,
    item : PropTypes.object.isRequired
}

const mapStateToProps =(state)=>({
    item:state.item
});

export default connect(
    mapStateToProps , 
    {getItems,deleteItem}
)(ShoppingList);