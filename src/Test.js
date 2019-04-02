import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { bdd } from './database';
import {
    Form, Select, InputNumber, Button, Upload, Icon, Rate, Input, List,} from 'antd';

import 'antd/dist/antd.css';

const { Option } = Select;

class Test extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }

      render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const data = ['Tristan', 'Erwan', 'Valou', 'Navid'];    
        const formItemLayout = {
          labelCol: { span: 7 },
          wrapperCol: { span: 10 },
        };
            return (
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="Image">
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                        })(
                            <Upload accept="image/png, image/jpeg"  name="imgUpload"  listType="picture" onChange={this.getBase64}>
                            <Button>
                                <Icon type="upload"/> Click to upload
                            </Button>
                            </Upload>
                        )}
                    </Form.Item>

                    <Form.Item label="Nom" ref="nom">
                    {getFieldDecorator('name', {
                            rules: [
                            { required: true, message: 'Please write a name!' },
                            ],
                        })(
                        <Input/>
                        )}
                    </Form.Item>

                    
                    <Form.Item label="Difficulté" ref="diff">
                        {getFieldDecorator('rate', {
                            initialValue: 3.5,
                        })(
                            <Rate />
                        )}
                    </Form.Item>
                    
                    <Form.Item label="Ingrédients" >
                        {getFieldDecorator('ingredient_nom', {
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                            
                        <Input placeholder="Nom"/>
                        )}
                         <span className="ant-form-text"> Quantité :
                        {getFieldDecorator('ingredient_qte', {
                            initialValue: 0,
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <InputNumber />
                        )}
                        </span>
                        {getFieldDecorator('ingredient_mesure', {
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <Input placeholder="Mesure"/>
                        )}
                        <Button type="default" htmlType="submit" >Ajouter</Button>

                        <List
                            bordered
                            dataSource=""
                            renderItem={item => (<List.Item> {item} <Button type="danger"> Supprimer</Button></List.Item>)}
                        />
                    </Form.Item>

                    
                    
                    <Form.Item label="Matériaux">
                    {getFieldDecorator('matériaux', {
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <Input />
                        )}
                        <Button type="default" htmlType="submit" >Ajouter</Button>
                        <List
                            bordered
                            dataSource=""
                            renderItem={item => (<List.Item> {item} <Button type="danger"> Supprimer</Button></List.Item>)}
                        />
                    </Form.Item>

                    <Form.Item label="Nombre de personnes">
                    {getFieldDecorator('nb_pers', {
                            initialValue: 0,
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <InputNumber />
                        )}
                    </Form.Item>

                    <Form.Item label="Préparation">
                    {getFieldDecorator('préparation', {
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <Input />
                        )}
                        <Button type="default" htmlType="submit" >Ajouter</Button>
                        <List
                            bordered
                            dataSource=""
                            renderItem={item => (<List.Item> {item} <Button type="danger"> Supprimer</Button></List.Item>)}
                        />
                    </Form.Item>

                    <Form.Item label="Tags">
                    {getFieldDecorator('tags', {
                            rules: [
                            { required: true, message: 'Please write something!' },
                            ],
                        })(
                        <Input />
                        )}
                        <Button type="default" >Ajouter</Button>
                        <List
                            bordered
                            dataSource=""
                            renderItem={item => (<List.Item> {item} <Button type="danger"> Supprimer</Button></List.Item>)}
                        />
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
                    
                    <Form.Item label="Select" hasFeedback ref="type">
                        {getFieldDecorator('select', {
                            rules: [
                            { required: true, message: 'Please select your type!' },
                            ],
                        })(
                            <Select placeholder="Please select a type">
                            <Option value="china">Classique</Option>
                            <Option value="usa">Bizarre</Option>
                            </Select>
                        )}
                     </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                        <Button type="primary" htmlType="submit" onClick={this.writeRecetteData} >Valider</Button>
                        <Button type="danger" htmlType="submit" style={{marginLeft:10}}>Retour</Button>
                    </Form.Item>
                </Form>

            );
        }
    }
export default Form.create()(Test);