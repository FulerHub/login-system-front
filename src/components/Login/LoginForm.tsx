import React, {Component} from "react";
import {Formik} from "formik";
import {Button, Input} from "antd";
import {Link, Navigate} from "react-router-dom";
import {IForm} from "../../helpers/types";
import {valSchemaLogin} from "../../helpers/schemas";

interface ILoginForm {
    login: (user:any)=>void
    serverErrors: string
}

class LoginForm extends Component<ILoginForm,any> {
    constructor(props:ILoginForm) {
        super(props);
        this.Login = this.Login.bind(this);
    }
    Login(values:IForm){
        this.props.login(values)
    }
    render() {
        if (localStorage.getItem('token')) return <Navigate to="/" />;
        return (
            <div className={"wrap"}>
                <div className="form">
                    <h1>Login</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={valSchemaLogin}
                        onSubmit={this.Login}
                    >
                        {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                            <form onSubmit={handleSubmit} >
                                <Input name={'email'} type={"email"} placeholder={"E-mail"} onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                                <p style={{color:"#ff0000"}}>{errors.email && touched.email && errors.email}</p>
                                <Input name={"password"} type={"password"} placeholder={"Password"} onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                                <p style={{color:"#ff0000"}}>{errors.password && touched.password && errors.password}</p>

                                {this.props.serverErrors && <p style={{color:"#ff0000"}}>{this.props.serverErrors}</p>}
                                <div className="input-block">
                                    <Button htmlType={"submit"} type="primary">Sign In</Button>
                                    <Link to={"/register"} className="btn">Sign Up</Link>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    }
}

export default LoginForm;