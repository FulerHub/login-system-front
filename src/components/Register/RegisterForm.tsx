import React, {Component} from "react";
import {Formik} from "formik";
import {Button, Input} from "antd";
import {Link, Navigate} from "react-router-dom";

import {IForm} from "../../helpers/types";
import { valSchemaRegister } from "../../helpers/schemas";

interface IRegisterForm {
    serverErrors: string;
    register: (user:IForm)=>void
}

class RegisterForm extends Component<IRegisterForm,any> {
    constructor(props:IRegisterForm) {
        super(props);
        this.Register = this.Register.bind(this);
    }
    Register(values:IForm){
        this.props.register(values);
    }
    render() {
        if (localStorage.getItem('token')) return <Navigate to="/" />;
        return (
            <div className={"wrap"}>
                <div className="form">
                    <h1>Registration</h1>
                    <Formik
                        initialValues={{email: '', password: '', passwordConfirm:'' }}
                        validationSchema={valSchemaRegister}
                        onSubmit={this.Register}
                    >{({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                            <form onSubmit={handleSubmit} >
                                <Input name={'email'} type={"email"} placeholder={"E-mail"} onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                <p style={{color:"#ff0000"}}>{errors.email && touched.email && errors.email}</p>
                                
                                <Input name={"password"} type={"password"} placeholder={"Password"} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                <p style={{color:"#ff0000"}}>{errors.password && touched.password && errors.password}</p>
                                
                                <Input name={"passwordConfirm"} type={"password"} placeholder={"Password confirm"} onChange={handleChange} onBlur={handleBlur} value={values.passwordConfirm}/>
                                <p style={{color:"#ff0000"}}>{errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}</p>

                                {this.props.serverErrors && <p style={{color:"#ff0000"}}>{this.props.serverErrors}</p>}
                                
                                <div className="input-block">
                                    <Button htmlType={"submit"} type="primary">Sign Up</Button>
                                    <Link to={"/login"} className="btn">Sign In</Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default RegisterForm;