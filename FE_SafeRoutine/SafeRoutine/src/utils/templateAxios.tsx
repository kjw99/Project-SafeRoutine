import AXIOS from '../constants/constAxios';
import axios from 'axios';

const TEAM_URL = AXIOS.TEAM_API;

interface tempProps {
    teamId : number,
    checkListName : string,
    id : string,
    checkList : {
        "id" : string | null,
        "teamId": number,
        "checkListName": String,
        "resetTime": String,
        "resetCycle": String,
        "checkListRow": 
            {
                "questionType": String,
                "question": String
            }[]
        ,
        "checkListCol": 
            {
                question: String
            }[],
        "checkListType": String,
        "checkListActive": boolean,
        "checkListUse": boolean,
        "checkListBackUpDate": String,
    }
}

const templateStore = {

    // 체크리스트 템플릿 조회
    async templateChoice(tempInfo : tempProps){
        const tempData = {
            teamId : tempInfo.teamId
        }
        try{
            console.log(tempData)
            const res = await axios.post(TEAM_URL+"/manager/check/choice", tempData, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 체크리스트 생성
    // 체크리스트의 id 값은 null로
    async templateCreate(tempInfo : tempProps){
        
        try{
            console.log("--------------------")
            console.log(tempInfo.checkList)
            console.log("--------------------")
            tempInfo.checkList.id = null;
            const res = await axios.post(TEAM_URL+"/manager/check/add", tempInfo.checkList, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 체크리스트 수정화면 이동 ( 원래 체크리스트 값 받아오기 )
    async templateUpdateView(tempInfo : tempProps){
        
        try{
            const teamData = {
                teamId : tempInfo.teamId,
                checkListName : tempInfo.checkListName,
            }
            const res = await axios.post(TEAM_URL+"/manager/check/updateView", teamData, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 체크리스트 수정
    async templateUpdate(tempInfo : tempProps){
        
        try{
            
            const res = await axios.post(TEAM_URL+"/manager/check/update", tempInfo.checkList, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 체크리스트 삭제
    async templateDelete(tempInfo : tempProps){
        
        try{
            const tempData = {
                id : tempInfo.id
            }
            const res = await axios.post(TEAM_URL+"/manager/check/delete", tempData, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 그룹생성 체크리스트 확인
    async templateGroupChoice(tempInfo : tempProps){
        const tempData = {
            teamId : tempInfo.teamId
        }
        try{
            console.log(tempData)
            const res = await axios.post(TEAM_URL+"/manager/check/list", tempData, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },

    // 체크리스트 사용 여부 변경
    async templateChangeState(tempInfo : tempProps){
        const tempData = {
            id : tempInfo.id
        }
        try{
            console.log(tempData)
            const res = await axios.post(TEAM_URL+"/manager/check/list/active", tempData, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data);
        }catch(err){
            console.log(err)   
        }
    },
}

export default templateStore;