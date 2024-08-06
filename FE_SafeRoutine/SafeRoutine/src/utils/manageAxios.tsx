import AXIOS from '../constants/constAxios';
import axios from 'axios';

const MAIN_URL = AXIOS.MAIN_API;

interface memberProps {
    teamId : number,
    memberEmail : string,
    memberPosition : string,
}

const manageStore = {
    
    // 팀 관리자의 팀원 직위 수정
    async manageUpdate( memInfo : memberProps) {
        const memData = {
            teamId : memInfo.teamId,
            memberEmail : memInfo.memberEmail,
            memberPosition: memInfo.memberPosition,
        }
        try{
            console.log(memData)
            const res = await axios.post(MAIN_URL+"/manage-team/update", memData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            return res.data;
        }catch{
            console.log("err");
        }
    },

    // 팀 관리자의 팀원 추방
    async manageWithDraw( memInfo : memberProps) {
        const memData = {
            teamId : memInfo.teamId,
            memberEmail : memInfo.memberEmail,
        }
        try{
            console.log(memData)
            const res = await axios.post(MAIN_URL+"/manage-team/withdraw", memData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            return(res.data)
        }catch{
            console.log("err");
        }
    },

    // 멤버 직위 반환
    async memberPosition( memInfo : memberProps) {
        const memData = {
            teamId : memInfo.teamId,
        }
        try{
            console.log(memData)
            const res = await axios.post(MAIN_URL+"/position-auth", memData,{
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

}

export default manageStore;
