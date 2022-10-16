import React from 'react';
import {connect} from "react-redux";
import {asyncLoginAction} from "../redux/slices/userSlice";
import {AppDispatch, RootState} from "../redux/store";
import LoginForm from "../components/Login/LoginForm";
import {IForm} from "../helpers/types";

const mapStateToProps = (state:RootState) => {
    return { serverErrors: state.user.error };
};
const mapDispatchToProps = (dispatch:AppDispatch) => {
    return {
        login: (values:IForm) => dispatch(asyncLoginAction(values))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);