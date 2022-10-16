import React, {FC} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../redux/store";
import {Button} from "antd";
import {asyncLogoutAction} from "../redux/slices/userSlice";
import {Link} from 'react-router-dom';

const Home:FC = () => {
    const {isAuth, account} = useSelector((state:RootState) => state.user);
    const {isActivated,email} = account;
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div className={'container'}>
            {!isAuth ? <div className={'wrap'}>
                <Link className={'ant-btn ant-btn-primary btn'} to={"/login"}>Sign In</Link>
                <Link className={'ant-btn ant-btn-primary btn'} to={"/register"}>Sign Up</Link>
            </div> :
                <>
                    <p>Hello, {email}</p>
                    {!isActivated ?
                        <p style={{color:"#ff0000"}}>Account not activated your check E-mail <span style={{color:"#000000",fontWeight:600,textDecoration:'underline'}}>{email}</span></p>
                        :
                        <p style={{color:"#00ff55"}}>Account activated <span style={{color:"#000000",fontWeight:600,textDecoration:'underline'}}>{email}</span></p>
                    }
                    <Button onClick={()=>dispatch(asyncLogoutAction())} type="primary">Sign Out</Button>
                </>
            }
        </div>
    );
};

export default Home;