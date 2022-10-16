import React from 'react';
import {AppDispatch, RootState} from "../redux/store";
import { asyncRegisterAction} from "../redux/slices/userSlice";
import {connect} from "react-redux";
import RegisterForm from "../components/Register/RegisterForm";
import {IForm} from "../helpers/types";

const mapStateToProps = (state:RootState) => {
    return { serverErrors: state.user.error };
};
const mapDispatchToProps = (dispatch:AppDispatch) => {
    return {
        register: (values:IForm) => dispatch(asyncRegisterAction(values))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);