import axios from 'axios';

export default {
    logIn: function(user){
        return new Promise(function(resolve, reject){
            axios.post('/api/auth/login', user)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data.user))
                localStorage.setItem("isAuth", true);
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err);
            })
        })
    },
    register: function(user){
        return new Promise(function(resolve, reject){
            axios.post('/api/auth/register', user)
            .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data))
                localStorage.setItem("isAuth", true);
                return resolve(res.data);
            })
            .catch(err => {
                return reject(err);
            })
        })
    },
    isAuthenticated: function(){
        return localStorage.getItem("isAuth");
    },
    getUser: function(){
        return new Promise(function(resolve, reject){
            let user = JSON.parse(localStorage.getItem("user"));
            if(user){
                let data = {...user};
                data.logoutPending = false;
                data.isLoggedIn = true;
                // user.logoutPending = false;
                return resolve(data)
            }else{
               reject(null)
                // return function(dispatch){
                //     dispatch({type: "LOGOUT_USER_FULFILLED", payload: {user:{logoutPending: false}}});
                // }
            }
        })
    },
    logOut: function(){
        return new Promise(function(resolve, reject){
            localStorage.removeItem("user");
            localStorage.removeItem("isAuth");
            let data = {
                logoutPending: true
            }
            resolve(data)
            data.logoutPending = false;
            return function(dispatch){
                dispatch({type: "LOGOUT_USER_FULFILLED", payload: data});
            }
        })
        
        
    }
}