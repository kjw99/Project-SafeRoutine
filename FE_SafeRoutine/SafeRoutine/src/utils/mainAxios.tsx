import AXIOS from '../constants/constAxios';
import axios from 'axios';

const MAIN_URL = AXIOS.MAIN_API;

interface mainProps {
    teamName?: string;
    teamIntro?: string;
    teamImage?: string;
    teamId?: number;
    teamLink?: string;
  }

const mainStore = {

    // 팀생성
    async teamCreate(teamInfo: mainProps) {
        const teamData = {
            teamName : teamInfo.teamName,
            teamIntro : teamInfo.teamIntro,
            teamImage: teamInfo.teamImage,
        }
        try{
            console.log(teamData)
            const res = await axios.post(MAIN_URL+"/create-team", teamData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            console.log(res.data)
            return res.data;

        }catch{
            console.log("err");
        }
    },

    // 팀해체
    async teamDestroy(teamInfo: mainProps) {
        const teamData = {
            teamId : teamInfo.teamId,
        }
        try{
            console.log(teamData)
            await axios.post(MAIN_URL+"/destroy-team", teamData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            window.location.reload()
        }catch{
            console.log("실패");
        }
    },

    // 팀 탈퇴
    async teamWithDraw(teamInfo: mainProps) {
        const teamData = {
            teamId : teamInfo.teamId,
        }
        try{
            console.log(teamData)
            const res = await axios.post(MAIN_URL+"/withdraw-team", teamData,{
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

    // 팀 정보 수정
    async teamUpdate(teamInfo: mainProps) {
        const teamData = {
            teamId : teamInfo.teamId,
            teamIntro : teamInfo.teamIntro,
            teamImage: teamInfo.teamImage,
        }
        try{
            console.log(teamData)
            const res = await axios.post(MAIN_URL+"/update-team", teamData,{
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

    // 팀 가입기간 갱신
    async teamRecruit(teamInfo: mainProps) {
        const teamData = {
            teamId : teamInfo.teamId
        }
        try{
            console.log(teamData)
            const res = await axios.post(MAIN_URL+"/recruit-team", teamData,{
                headers: {
                    "Content-Type" : "application/json",
                }
            });
            console.log(res.data)
        }catch{
            console.log("err");
        }
    },
    
    // 팀 가입요청
    async teamJoin(teamInfo: mainProps) {
        const teamData = {
            teamLink : teamInfo.teamLink
        }
        try{
            console.log(teamData)
            const res = await axios.post(MAIN_URL+"/join-team/"+teamData.teamLink, "",{
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

    // 팀 관리자의 팀원 조회
    async teamManage(teamInfo: mainProps): Promise<any[]> { // 함수의 반환 타입을 Promise<any[]>로 명시
        const teamData = {
            teamId : teamInfo.teamId,
        }
        try{
            const res = await axios.post(MAIN_URL+"/manage-team", teamData,{
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization" : sessionStorage.getItem("access-token")
                }
            });
            return res.data;
        }catch{
            console.log("err");
            return []; // 오류 발생 시 빈 배열 반환

        }
    },

    async getTeams() {
        try {
          const response = await axios.post(MAIN_URL+'/users/myteams', '',{
            headers: {
              "Authorization": sessionStorage.getItem("access-token")
            }
          });
          console.log('성공')
          return response.data; // API 응답에서 팀 목록 반환
          
        } catch (error) {
          console.error("팀 목록 불러오기 실패:", error);
          throw error; // 오류를 외부로 전파
        }
      }

}
export default mainStore;
