import AXIOS from '../constants/constAxios';
import axios from 'axios';

const BASE_URL = AXIOS.BASE_URL;
const USER_URL = AXIOS.USER_API;

interface userProps {
    email: string,
    passwd: string,
    name: string,
    phoneNumber: string,
    code: string,
    image: string,
}


const userStore = {
    
    async userRegist(userInfo: userProps) {
        const userData = {
            name: userInfo.name,
            phoneNumber :userInfo.phoneNumber,
            email:userInfo.email,
            password:userInfo.passwd,
        }
        const res = await axios.post(USER_URL+"/register",userData,{
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(res.data === "SUCCESS") alert("가입 완료")
    },
    
    // GET
    async userGoogle() {
        const res =  await axios.get(BASE_URL + "/google/login");
        if(res.data.token) sessionStorage.setItem("access-token",res.data.token);
        else alert("구글 로그인 실패!")
    },

    // POST
    async userLogin1(userInfo: userProps) {                                                                                         
        const userData = {
            email: userInfo.email,
            password: userInfo.passwd,
        }
        return await axios.post(USER_URL + "/login", JSON.stringify(userData));
    },

    async userLogin2(userInfo: userProps) {


        const userData = {
            email: userInfo.email,
            password: userInfo.passwd,
        }
       

        try{
            const res = await axios.post(USER_URL+"/login2", JSON.stringify(userData), {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if(res.data.token) {
                sessionStorage.setItem("access-token",res.data.token);
                sessionStorage.setItem("email",userData.email);
            }
            else{
                alert('비밀번호가 올바르지 않습니다.')
            }
        }catch{
            console.log("err")
        }
    },

///api/users/myteam
    async userTokenTest() {
        console.log(sessionStorage.getItem("access-token"))
        try{
            const res = await axios.post(USER_URL+"/myteam", "",{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data)
        }catch{
            console.log("err");
        }
    },

    async userFindEmail(userInfo: userProps) {
        const userData = {
            name: userInfo.name,
            phoneNumber: userInfo.phoneNumber,
        }
        try{
            console.log(userData)
            const res = await axios.post(USER_URL+"/find-email", userData,{
                headers: {
                    "Content-Type" : "application/json",
                }
            });
            if(res.data.result === "SUCCESS") alert(res.data.value);
            else alert("이메일 찾기 실패")
        }catch{
            console.log("err");
        }
    },
    
    async userFindPwd(userInfo: userProps) {
        const userData = {
            name: userInfo.name,
            email : userInfo.email,
            phoneNumber: userInfo.phoneNumber,
        }
        try{
            const res = await axios.post(USER_URL+"/find-password", userData,{
                headers: {
                    "Content-Type" : "application/json",
                }
            });
            if(res.data != "FAILED" ) alert(res.data);
            else alert("비밀번호 찾기 실패");
        }catch{
            
        }
    },

    async userModify(userInfo: userProps) {
        const userData = {
            name: userInfo.name,
            phoneNumber: userInfo.phoneNumber,
            profileImage: userInfo.image,
        }
        try{
            const res = await axios.post(USER_URL+"/modify", userData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data)
        }catch{
            console.log("err");
        }
    },



    async userInfo() : Promise<{ name: string; phoneNumber: string; profileImage: string; }>{
            try{
                
                const res = await axios.post(USER_URL+"/info", "",{
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : sessionStorage.getItem("access-token")
                    }
                });


                return {name : res.data.name,
                    phoneNumber : res.data.phoneNumber,
                    profileImage : res.data.profileImage} 
            }catch{
                console.log("err");
                return {
                    name : '',
                    phoneNumber : '',
                    profileImage : ''
                }
            }

        },

     async userWithDraw() {

        try{
            const res = await axios.post(USER_URL+"/withdraw","",{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data)
        }catch{
            console.log("err");
        }
    },

    async groupInfo() : Promise<{ newGroupName:string; newGroupIntro:string; newGroupImage:string; }>{
        try {
            const res = await axios.post(AXIOS.BASE_URL+`api/main/create-team`, '', {
                  headers: {
                        "Authorization": sessionStorage.getItem("access-token"),
                        'Content-Type': 'multipart/form-data',
                      }
            });
            console.log(res.data.GroupName)

            return {newGroupName : res.data.newGroupName,
                newGroupIntro:res.data.newGroupIntro,
                newGroupImage:res.data.newGroupImage}
        }catch{
            console.log('err났다.');
            return {newGroupName : '',
            newGroupIntro:'',
            newGroupImage:''
            }
        }
    },



    async groupModify() {

    },

    

};

export default userStore;

