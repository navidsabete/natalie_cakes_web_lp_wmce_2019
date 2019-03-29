import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Form extends React.Component {

    constructor(){
        super();

        this.state ={

            bouton: "Ajouter"
        };
    }

    render() {
        return (
            <div>
                <form>
                    <Image/>
                    <label>Nom</label><br/>
                    <input type="text" placeholder="Nom"/><br/>

                    <label>Difficulté</label><br/>
                    <input type="text" placeholder="Difficulté"/><br/>
                    <Ingredients/>
                    <Materiaux/>

                    <label>Nombre pers</label><br/>
                    <input type="number"/><br/>

                    <Tags/>

                    <label>Temps de cuisson</label><br/>
                    <input type="text"/><br/>

                    <label>Temps de préparation</label><br/>
                    <input type="text"/><br/>

                    <label>Type</label><br/>
                    <select for="type_select">
                    <option></option>
                    <option>Je ne</option>
                    <option>sais plus</option>
                    <option>les options</option>
                    </select><br/>


                    <Link to="/"><input type="button" value="Retour"/></Link>
                    <input type="button" value={this.state.bouton}/>
                </form>
            </div>
        );
    }
}

class Ingredients extends React.Component{

    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={
            Ingredient: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Ingredient') == null){
            var Ingredient = [];
            Ingredient.push(title);
            localStorage.setItem('Ingredient', JSON.stringify(Ingredient));
        }
        else{
            var Ingredient = JSON.parse(localStorage.getItem('Ingredient'));
            Ingredient.push(title);
            localStorage.setItem('Ingredient', JSON.stringify(Ingredient));
        }
        this.setState({
            Ingredient: JSON.parse(localStorage.getItem('Ingredient'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Ingredient'));
        list.splice(index,1);
        this.setState({
            Ingredient: list
        });
        localStorage.setItem('Ingredient', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Ingredients</label>
                <input type="text" placeholder="Nouvel Ingredient" ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Ingredient.map(function(Ingredients, index){
                        return(
                            <li key={index}>{Ingredients} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

class Materiaux extends React.Component{

    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={

            Materiel: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Materiel') == null){
            var Materiel = [];
            Materiel.push(title);
            localStorage.setItem('Materiel', JSON.stringify(Materiel));
        }
        else{
            var Materiel = JSON.parse(localStorage.getItem('Materiel'));
            Materiel.push(title);
            localStorage.setItem('Materiel', JSON.stringify(Materiel));
        }
        this.setState({
            Materiel: JSON.parse(localStorage.getItem('Materiel'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Materiel'));
        list.splice(index,1);
        this.setState({
            Materiel: list
        });
        localStorage.setItem('Materiel', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Matériel</label>
                <input type="text" placeholder="Nouveau Materiel..." ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Materiel.map(function(Materiels, index){
                        return(
                            <li key={index}>{Materiels} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}


class Tags extends React.Component{

    constructor(){
        super();
        this.delete = this.delete.bind(this);
        this.state ={

            Tags: []
        };
    }

    add(){
        var title = this.refs.title.value;
        if(localStorage.getItem('Tags') == null){
            var Tags = [];
            Tags.push(title);
            localStorage.setItem('Tags', JSON.stringify(Tags));
        }
        else{
            var Tags = JSON.parse(localStorage.getItem('Tags'));
            Tags.push(title);
            localStorage.setItem('Tags', JSON.stringify(Tags));
        }
        this.setState({
            Tags: JSON.parse(localStorage.getItem('Tags'))
        });
    }

    delete(e){
        var index = e.target.getAttribute('data-key')
        var list = JSON.parse(localStorage.getItem('Tags'));
        list.splice(index,1);
        this.setState({
            Tags: list
        });
        localStorage.setItem('Tags', JSON.stringify(list));
    }
    render(){
        return(
            <div>
                <label>Tags</label>
                <input type="text" placeholder="Nouveau Tag..." ref="title"/>
                <input type="button" value="Ajouter" onClick={this.add.bind(this)}/>
                <br/><br/>
                <ul>
                    {this.state.Tags.map(function(Tag, index){
                        return(
                            <li key={index}>{Tag} <input type="button" value="supprimer" onClick={this.delete.bind(this)} data-key={index}/></li>
                        )
                    }, this)}
                </ul>
            </div>
        );
    }
}

class Image extends React.Component {
    render() {
        return (
            <div>
                <img src="#"/>
                <input type="file" id="image"/>
            </div>

        );
    }
}
export default Form;