import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
import {AppDispatch, RootState} from "./redux/store";
import {asyncCheckAuthAction} from "./redux/slices/userSlice";
import {connect} from "react-redux";
import Preloader from "./components/Preloader";

interface IPropsApp {
    isLoading: boolean;
    checkAuth: ()=>void
}

class App extends Component<IPropsApp,any> {
    constructor(props:IPropsApp){
        super(props);
    }
    componentDidMount(): void {
        if (localStorage.getItem('token')) {
            this.props.checkAuth()
        }
    }
    render() {
        if (this.props.isLoading) return <Preloader />;
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        );
    }
}

const mapStateToProps = (state:RootState) => {
    return { isLoading: state.user.isLoading};
};
const mapDispatchToProps = (dispatch:AppDispatch) => {
    return {
        checkAuth: () => dispatch(asyncCheckAuthAction())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

