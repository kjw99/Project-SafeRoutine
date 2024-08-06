
import axios from 'axios';
import AXIOS from '../constants/constAxios';

const S3_URL = AXIOS.S3_API;

interface answerProps{
    image : File,
    teamId : number,
}
const S3_STORE = {
    async selfImageUpload(imageProps: File) {
    
        const imageData = {
            image : imageProps,
        }
        console.log(S3_URL);
        try{
            const res = await axios.post(S3_URL+"/upload-user-image",imageData ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                  },
            }
            );
            console.log(res.data)
            return res.data;
        }catch{
            console.log("err");
        }
    },

    async teamImageUpload(imageProps: File) {
    
        const imageData = {
            image : imageProps
        }

        try{
            const res = await axios.post(S3_URL+"/upload-team-image",imageData ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                  },
            }
            );
            return res.data;
        }catch{
            console.log("err");
        }
    },

    async answerImageUpload(ansProps: answerProps) {
    
        const imageData = {
            image : ansProps.image,
            teamId : ansProps.teamId
        }
        try{
            const res = await axios.post(S3_URL+"/upload-team-image",imageData ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                  },
            }
            );
            console.log(res.data)
            return res.data;
        }catch{
            console.log("err");
        }
    },
}
export default S3_STORE;