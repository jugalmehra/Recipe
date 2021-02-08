import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import Showrecipe from './Showrecipe'
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      [theme.breakpoints.down("md")] : {
        minWidth: 200
        }
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
        position: 'relative',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
  }));


function Addrecipe() {

    const classes = useStyles();

    const initialvalue = JSON.parse(window.localStorage.getItem('recipe')) || []
    //console.log(initialvalue)

    const [modal, setModal] = useState(false);
    const [recipe,setRecipe] = useState(initialvalue)
    const [singleitem, setSingleitem] = useState({
        RecipeName: '',
        RecipeIngrediants: [],
        Recipesteps: '',
        Imageurl: ''
    });
   


    const toggle = () => {
        setModal(!modal)
       
    };

    useEffect(() => {
        window.localStorage.setItem('recipe', JSON.stringify(recipe))
    }, [recipe])

    const handlechange = (field,value) => {
        let ingrediants,Recipesteps,Imageurl;
        
        if(field === 'RecipeName'){
            setSingleitem({...singleitem,[field] : value})
        }
        else if(field === 'RecipeIngrediants'){
            // setSingleitem{(RecipeIngrediants: ingr})
            // console.log(ingrediants)
            let recipearray = value.trim().split(',');
            setSingleitem({...singleitem,[field]: recipearray })
        }
        else if(field === 'Recipesteps'){
            let recipestepsarray = value.trim();
            setSingleitem({...singleitem,[field]: recipestepsarray })
        }
        else if(field === 'Imageurl'){
            setSingleitem({...singleitem,[field] : value})
            
        }
        

    }


    const handlesubmit = (e) =>{
        e.preventDefault();
        if(singleitem.RecipeName && singleitem.RecipeIngrediants.length){
            setRecipe(prevItems => [...prevItems, singleitem])
            setModal(!modal);
        }else{
            alert('RecipeName and RecipeIngredients is required');
        }

    }

    

    return (
        <>
             <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                    
                    <Typography variant="h6" color="inherit">
                        Food Recipe's
                    </Typography>
                    <div className={classes.search}>
                        <div className="recipe_btn">
                            <Button color="danger" onClick={toggle}> Add Recipe </Button>
                        </div>
                    </div>
                    </Toolbar>
                </AppBar>
            </div>
             <div>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Add Recipe</ModalHeader>
                    <ModalBody>
                        <Label>Recipe's Name
                            <Input type="text" placeholder="Enter recipe name" onChange={(e) => handlechange("RecipeName",e.target.value.trim())} />
                        </Label><br/>
                        <Label>Recipe's Ingrediants
                            <Input type="textarea" placeholder="Enter the ingrediants" id="ingrediants" onChange={(e) => handlechange("RecipeIngrediants",e.target.value)} />
                        </Label><br />
                        <Label>Recipe's Steps
                            <Input type="textarea" placeholder="Enter the steps for the Recipe" id="recipe-steps" onChange={(e) => handlechange("Recipesteps",e.target.value)} />
                        </Label><br />
                        <Label>Image Url
                            <Input type="text" placeholder="Enter image url" onChange={(e) => handlechange("Imageurl",e.target.value.trim())}  />
                        </Label>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={handlesubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="recipearea">
                    <div className={classes.root}>
                        <Grid container spacing={0.2}>
                            {recipe.map(recipe => (
                                <Grid item xs={3} spacing={3} >
                                <Showrecipe title={recipe.RecipeName} image={recipe.Imageurl} ingredients={recipe.RecipeIngrediants} recipesteps={recipe.Recipesteps} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>

            </div>
            
        </>
    )
}

export default Addrecipe
