import TITLE from '../assets/title.png'
import MAIN_IMG from '../assets/checklistEmogi.png'

import SECOND_EXAMPLE_IMG1 from '../assets/lab.png'
import SECOND_EXAMPLE_IMG2 from '../assets/hospital.png'
import SECOND_EXAMPLE_IMG3 from '../assets/outside.png'
import SECOND_EXAMPLE_IMG4 from '../assets/factory.png'

import THIRD_EXAMPLE_IMG1 from '../assets/left.png'
import THIRD_EXAMPLE_IMG2 from '../assets/graph.png'


const MAIN = 
    {
        TITLE : TITLE,
        MAIN_IMG : MAIN_IMG,
        MAIN_CONTENT : "안전을 위한 가장 사소한 시작 세이프루틴과 함께 \n 효율적인 안전관리를 경험하세요.\n\n 안전, 단 하루도 놓칠 수 없습니다.",
        SECOND_TITLE : "맞춤형 체크리스트 제공",
        SECOND_EXAMPLE_IMG : [
                                {
                                    img : SECOND_EXAMPLE_IMG1,
                                    name : "연구실",
                                    css_1st : "block_content_mid_v1",
                                    css_2nd : "block_content_mid_v2"
                                },
                                {
                                    img : SECOND_EXAMPLE_IMG2,
                                    name : "병원",
                                    css_1st : "block_content_mid_v2",
                                    css_2nd : "block_content_mid_v1",
                                },
                                {
                                    img : SECOND_EXAMPLE_IMG3,
                                    name : "야외현장",
                                    css_1st : "block_content_mid_v1",
                                    css_2nd : "block_content_mid_v2"
                                },
                                {
                                    img : SECOND_EXAMPLE_IMG4,
                                    name : "공장",
                                    css_1st : "block_content_mid_v2",
                                    css_2nd : "block_content_mid_v1",
                                },
                            ],

        SECOND_CONTENT : "각 분야에 맞는 맞춤형 템플릿 제공을 통해 사용자의 안전관리를 돕습니다.\n 또한, 사용자가 템플릿을 수정하여 내용을 추가, 삭제할 수 있어 원하는 형태의 체크리스트를 설정할 수 있습니다.",
        THIRD_TITLE : "안전 관리 통계를 한 눈에",
        THIRD_EXAMPLE_IMG : [
                                {
                                    img : THIRD_EXAMPLE_IMG1,
                                    content : "속해있는 다수의 그룹을 한번에 확인",
                                },
                                {
                                    img : THIRD_EXAMPLE_IMG2,
                                    content : "그룹원들의 체크리스트 현황을 \n 그래프로 시각화하여 제공",
                                }
                            ],

    }


export default MAIN
