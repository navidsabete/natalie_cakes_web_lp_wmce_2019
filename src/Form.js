import React from 'react';
import './App.css';
import { Alert } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { bdd } from './database';
import {Form, Select, InputNumber, Button, Upload, Icon, Rate, Input, message} from 'antd';
import 'antd/dist/antd.css';


const { Option } = Select;
var modif = "";
let id = 0;

class Formulaire extends React.Component {
    removeI = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_ing = form.getFieldValue('keys_ing');
        // We need at least one passenger
        if (keys_ing.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys_ing: keys_ing.filter(key => key !== k),
        });
    }
    removeM = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_mat = form.getFieldValue('keys_mat');
        // We need at least one passenger
        if (keys_mat.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys_mat: keys_mat.filter(key => key !== k),
        });
    }

    removeP = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_prep = form.getFieldValue('keys_prep');
        // We need at least one passenger
        if (keys_prep.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys_prep: keys_prep.filter(key => key !== k),
        });
    }

    removeT = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_tag = form.getFieldValue('keys_tag');
        // We need at least one passenger
        if (keys_tag.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys_tag: keys_tag.filter(key => key !== k),
        });
    }

    addI = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_ing = form.getFieldValue('keys_ing');
        const nextKeys_ing = keys_ing.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys_ing: nextKeys_ing,
        });
    }

    addM = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_mat = form.getFieldValue('keys_mat');
        const nextKeys_mat = keys_mat.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys_mat: nextKeys_mat,
        });
    }

    addP = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_prep = form.getFieldValue('keys_prep');
        const nextKeys_prep = keys_prep.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys_prep: nextKeys_prep,
        });
    }

    addT = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys_tag = form.getFieldValue('keys_tag');
        const nextKeys_tag = keys_tag.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys_tag: nextKeys_tag,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {


                console.log('Received values of form: ', values);
                var nom = values.name;
                var difficulte = values.rate;
                var nb_pers = values.nb_pers;
                var tps_cuis = values.tps_cuis;
                var tps_prep = values.tps_prep;
                var type = values.select;
                var ingredient = values.ingredient;
                var materiaux = values.materiaux;
                var preparation = values.preparation;
                var tag = values.tags;



                if(typeof tag !== 'undefined' && typeof materiaux!=='undefined' && typeof  preparation!=='undefined' && typeof ingredient!=='undefined' && typeof values.upload!=='undefined'){
                    console.log(ingredient);
                    console.log(preparation);
                    console.log(materiaux);
                    var image =  values.upload.file.thumbUrl;
                    this.get();

                    bdd.ref('Recettes/recette_'+this.state.idSup).set({
                        nom: nom,
                        difficulte: parseInt(difficulte),
                        nb_pers: parseInt(nb_pers),
                        tps_cuisson: tps_cuis,
                        tps_prep: tps_prep,
                        type: type,
                        ingredients: ingredient,
                        materiels: materiaux,
                        preparation: preparation,
                        id: this.state.idSup,
                        image: image,
                        tags: tag,
                    });
                    this.props.history.push('/');
                }
                else{
                    window.scrollTo(0, 0);
                    this.setState( {error: "visible"})
                    //alert("Veuillez remplir tous les champs!")
                }
                /*
                 var file = values.upload.thumbUrl;
                 let reader = new FileReader();
                 reader.readAsDataURL(file);
                 console.log(reader.result);

                 reader.onload = () => {
                   this.setState({
                     image: reader.result
                   })
                 };

                 var image = reader.result;*/
                //console.log(image);


            }
            else{
                window.scrollTo(0, 0);
                this.setState( {error: "visible"})
                //alert("Veuillez remplir tous les champs!")
            }
        });
    }

    constructor(props){
        super(props);
        modif = "0";
        this.get = this.get.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.state ={
            idSup: "",
            imageUrl:"",
            error:"hidden",
        };

        this.get();
        console.log(this.props.match.params.id);
    }

    componentDidMount(){
        if (typeof this.props.match.params.id !== 'undefined') {
            modif = "1";
            bdd.ref('/Recettes/recette_'+this.props.match.params.id).once('value', (snapshot) => {
                    var data = snapshot.val();
                    //console.log(data);
                    let recettes = Object.values(data);
                    console.log(recettes);
                    this.setState({recette: recettes});
                    this.setState({bouton: "Modifer"});
                }
            );
        }
        else{
            this.setState({bouton: "Ajouter"});
        }

    }

    get(){
        bdd.ref('Recettes').on("value", (snapchot) => {
            let data = snapchot.val();
            let resource = Object.values(data);
            let tableId = [];
            let idC = 0;
            for(var i=0; i<resource.length;i++){
                idC = resource[i].id;
                if(i===0){
                    tableId.push(idC);
                }
                for(let k=0;k<tableId.length;k++){
                    if(idC<tableId[k]){
                        idC = tableId[k];
                    }
                }
                tableId.push(idC);
            }
            this.setState({idSup: idC+1});
        });
    }

    getBase64(img) {
        console.log(img);
        const reader = new FileReader();
        reader.readAsDataURL(img);
        this.setState({imageUrl: reader.result});
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys_ing', { initialValue: [] });
        getFieldDecorator('keys_mat', { initialValue: [] });
        getFieldDecorator('keys_prep', { initialValue: [] });
        getFieldDecorator('keys_tag', { initialValue: [] });
        const keys_ing = getFieldValue('keys_ing');
        const keys_mat = getFieldValue('keys_mat');
        const keys_prep = getFieldValue('keys_prep');
        const keys_tag = getFieldValue('keys_tag');


        const formItems = keys_ing.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Ingrédients' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`ingredient[${k}].nom`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter le nom de l'ingrédient.",
                    }],
                })(
                    <Input placeholder="nom de l'ingrédient" style={{ width: '60%', marginRight: 8 }} />
                )}
                {getFieldDecorator(`ingredient[${k}].quantite`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter la quantité de l'ingrédient.",
                    }],
                })(
                    <InputNumber placeholder="quantité de l'ingrédient" style={{ width: '60%', marginRight: 8 }} />
                )}
                {getFieldDecorator(`ingredient[${k}].mesure`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter l'unité de l'ingrédient.",
                    }],
                })(
                    <Input placeholder="unité de l'ingrédient" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys_ing.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys_ing.length === 1}
                        onClick={() => this.removeI(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const formItems2 = keys_mat.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Matériaux' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`materiaux[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter un ustensile.",
                    }],
                })(
                    <Input placeholder="nom de l'ustencile" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys_mat.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys_mat.length === 1}
                        onClick={() => this.removeM(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const formItems3 = keys_prep.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Préparation' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`preparation[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter une étape de préparation.",
                    }],
                })(
                    <Input placeholder="intitulé de l'étape" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys_prep.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys_prep.length === 1}
                        onClick={() => this.removeP(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const formItems4 = keys_tag.map((k, index) => (
            <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Tags' : ''}
                required={false}
                key={k}
            >
                {getFieldDecorator(`tags[${k}]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        message: "Veuillez ajouter un tag.",
                    }],
                })(
                    <Input placeholder="nom du tag" style={{ width: '60%', marginRight: 8 }} />
                )}
                {keys_tag.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys_tag.length === 1}
                        onClick={() => this.removeT(k)}
                    />
                ) : null}
            </Form.Item>
        ));

        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                    //console.log(info.file.thumbUrl);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (

            <Form {...formItemLayout} onSubmit={this.handleSubmit}>

                <div  style={{visibility: this.state.error}}>
                    <Alert
                        message="Attention!"
                        description="Veuillez remplir tout les champs"
                        type="error"
                        showIcon


                    />
                </div>

                <Form.Item label="Image">
                    {getFieldDecorator('upload')(
                        <Upload {...props} accept="image/png, image/jpeg"  name="imgUpload"  listType="picture">
                            <Button><Icon type="upload" /> Click to upload</Button>
                        </Upload>
                    )}
                </Form.Item>

                <Form.Item label="Nom" >
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'Please write a name!' },
                        ],
                    })(
                        <Input id="nom"/>
                    )}
                </Form.Item>

                <Form.Item label="Difficulté" >
                    {getFieldDecorator('rate', {
                        initialValue: 3,
                    })(
                        <Rate id="diff"/>
                    )}
                </Form.Item>

                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addI} style={{ width: '60%' }}>
                        <Icon type="plus" /> Ajouter un ingrédient
                    </Button>
                </Form.Item>

                {formItems2}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addM} style={{ width: '60%' }}>
                        <Icon type="plus" /> Ajouter un ustensile
                    </Button>
                </Form.Item>

                <Form.Item label="Nombre de personnes" >
                    {getFieldDecorator('nb_pers', {
                        initialValue: 0,
                        rules: [
                            { required: true, message: 'Please write something!' },
                        ],
                    })(
                        <InputNumber/>
                    )}
                </Form.Item>

                {formItems3}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addP} style={{ width: '60%' }}>
                        <Icon type="plus" /> Ajouter une étape de préparation
                    </Button>
                </Form.Item>

                {formItems4}
                <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.addT} style={{ width: '60%' }}>
                        <Icon type="plus" /> Ajouter un tag
                    </Button>
                </Form.Item>

                <Form.Item label="Temps de cuisson">
                    {getFieldDecorator('tps_cuis', {
                        rules: [
                            { required: true, message: 'Please write something!' },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="Temps de préparation">
                    {getFieldDecorator('tps_prep', {
                        rules: [
                            { required: true, message: 'Please write something!' },
                        ],
                    })(
                        <Input />
                    )}
                </Form.Item>

                <Form.Item label="Select" hasFeedback >
                    {getFieldDecorator('select', {
                        rules: [
                            { required: true, message: 'Please select your type!' },
                        ],
                    })(
                        <Select placeholder="Please select a type" id="type">
                            <Option value="Classique">Classique</Option>
                            <Option value="Bizarre">Bizarre</Option>
                        </Select>
                    )}
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit" onClick={this.writeRecetteData} >Valider</Button>
                    <Link to="/"><Button type="danger" htmlType="submit" style={{marginLeft:10}}>Retour</Button></Link>
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(Formulaire);