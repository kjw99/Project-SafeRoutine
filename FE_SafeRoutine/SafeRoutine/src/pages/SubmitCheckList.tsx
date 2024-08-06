import React, { useEffect, useState } from "react";
import AXIOS from "../constants/constAxios";
import axios from "axios";

interface CheckList {
    teamId: number;
    createDate: string;
    userEmail: string;
}

interface cklist{
        id : string | null,
        teamId: number,
        checkListName: String,
        resetTime: String,
        resetCycle: String,
        checkListRow: 
            {
                questionType: String,
                question: String
            }[]
        ,
        checkListCol: 
            {
                question: String
            }[],
        checkListType: String,
        checkListActive: boolean,
        checkListUse: boolean,
        checkListBackUpDate: String,
    }

const SubmitCheckList: React.FC<CheckList> = ({ teamId, createDate, userEmail }) => {
    
    const [list, setList] = useState<cklist[] | null | undefined>(null);
    useEffect(()=>{
        const fetchData = async () => {
            try{
                await axios.post(AXIOS.TEAM_API+"/manager/check/submitDetail",{
                    teamId : teamId, createDate : createDate, userEmail : userEmail
                },{
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : sessionStorage.getItem("access-token")
                    }
                }).then((res)=>setList(res.data));
            }catch{
                console.log("err")
            }
        };
        fetchData();
    },[teamId, createDate, userEmail])

    if(list != null){
        return(
            <div>
                {list.map((lst:cklist)=>(
                    <div>
                        <div>{lst.checkListName}</div>
                        <div>
                            {lst.checkListRow.map((ques: any) => (
                                <p key={ques.question}>{ques.question}</p>
                            ))}
                        </div>
                    </div>
                ))};
            </div>
        )
    }else{
        return (<div> 제출한 체크리스트가 없습니다 </div>);
    }
};

export default SubmitCheckList;