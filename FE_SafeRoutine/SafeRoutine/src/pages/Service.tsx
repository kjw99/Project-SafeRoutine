import React from 'react';

import manager1 from '../assets/manager1.png';
import manager2 from '../assets/manager2.png';

import manager3 from '../assets/manager3.png';

import manager32 from '../assets/manager32.png';
import manager4 from '../assets/manager4.png';
import manager5 from '../assets/manager5.png';

import user1 from '../assets/user1.png';
import user2 from '../assets/user2.png';
import user3 from '../assets/user3.png';








const GroupManage: React.FC = () => {
  // const { isManageBarActive, toggleBar } = useToggle();

  return (
    <div style={{ paddingTop: '180px' }}>
      {/* {isManageBarActive ? <ManageBar onToggle={toggleBar} /> : <GroupListBar onToggle={toggleBar} />} */}
      <h1>서비스페이지.</h1>
    
    <div style={{ paddingTop: '55px', display:'flex', flexDirection:'column', alignItems :'center', width :'800px' }}>

      <h1 style={{marginTop: '30px'}}>서비스 이용 방법 </h1>     
              <div><h2>Case 1. 관리자의 경우</h2></div>
      <img src={manager1} alt="" />
              <div>관리자로 시작할 경우, 우선 자신이 관리할 그룹을 생성해야 합니다. <div></div>우측 그룹 생성 버튼을 눌러 원하는 대로 그룹을 생성하실 수 있습니다.</div>
              <img src={manager2} alt="" />
              <div>그룹명, 그룸을 대표할 이미지, 그룹을 간략하게 소개할 멘트를 적어 그룹생성을 완료합니다.</div>
           
        <div>축하합니다. 당신이 관리할 그룹이 생성되었습니다.  이 화면에서 그룹 통계, <div></div> 각 멤버별 체크리스트, 그룹 관리를 진행하실 수 있습니다.</div>
        <img src={manager3} alt="" />
        <div>저희 서비스의 핵심인 체크리스트 기능을 알아보겠습니다.  본 기능을 통해 여러분은<div></div> 쉽게 다양한 체크리스트들을 생성하고, 초기화 주기를 설정해 업무를 자동화 할 수 있습니다. </div>
        <img src={manager32} alt="" />
        <div>그럼 이어서 새로운 체크리스트를 만들어보겠습니다. 하단에 ‘새로운 체크리스트 만들기’<div></div>를 클릭하여 들어가실 수 있습니다.</div>
        <img src={manager4} alt="" />
        <div>여기서 당신은 체크리스트에 들어갈 검사항목들과 그들의 초기화 주기를 설정할 수 있습니다.   <div></div>직접 리스트를 구성할 수 있습니다.</div>
        <img src={manager5} alt="" />
        <div>축하합니다! 완성입니다.</div>
        <div style={{marginTop :'30px'}}> <h2>CASE 2. 일반 사용자로 시작할 경우</h2> </div>
        <div></div>
        <img src={user1} alt="" />
        <div>일반 사용자로 그룹에 참여하게되면 보는 첫번째 화면입니다. </div>
        <img src={user2} alt="" />

        <div >첨부된 화면처럼, 이미지를 첨부하여 체크리스트를 제출할 수 있습니다.</div>
        <img src={user3} alt="" />

        <div style={{marginBottom :'50px'}}>제출된 체크리스트는 관리자 페이지에서 확인이 가능합니다.</div>



    </div>
    </div>
  );
  
};

export default GroupManage;
