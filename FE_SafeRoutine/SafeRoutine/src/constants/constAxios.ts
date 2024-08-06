import axios from "axios";

const BASE_URL = "https://i10b102.p.ssafy.io/api";
const AXIOS = 
{
    BASE_URL : BASE_URL,
    USER_API : BASE_URL + "/users",
    MAIN_API : BASE_URL + "/main",
    TEAM_API : BASE_URL + "/team",
    S3_API : BASE_URL + "/s3",

    AXIOS_GET : async function axiosGet(url : string){
    
        axios({
            method : "GET",
            url : url,
        }).then((res)=>{
            console.log(res);
            return res;
        }).catch((err:string) => {
            console.log(err)
        })
    
    },
    
    AXIOS_POST : async function axiosPost(url : string, props : any, token? : string ){
        axios({
            method : "POST",
            url : url,
            data : props,
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined // token이 있을 경우에만 Authorization 헤더 추가
            }
        },).then((res)=>{
            console.log("SUCCESS");
            if(res.data != null) return res.data;
        }).catch((err:string)=>{
            console.log("fail")
            console.log(err)
        })
    }
}

export default AXIOS;