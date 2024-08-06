import React, { useEffect, useState } from 'react';
import DescriptionInput from '../components/input/DescriptionInput';
import axios from 'axios';
import AXIOS from '../constants/constAxios';
import { format } from 'date-fns';
import {useParams} from 'react-router-dom';
interface MyResponseType {
  id: number;
  checkListName: string;
  checkListType: string;
  checkListCol: Array<{ question: string }>;
  checkListRow: Array<{ id: number; question: string; questionType: any }>;
}

interface CheckedItem {
  checked: boolean;
  description: string | boolean;
  image?: string;
  type: string;
}

const Home: React.FC = () => {
  const { teamId, userName } = useParams();

  const [responseData, setResponseData] = useState<MyResponseType[]>([]);
  const [checkedItemsCol, setCheckedItemsCol] = useState<{ [key: string]: CheckedItem }>({});
  const [selectedOuterIndex, setSelectedOuterIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCheckList = async () => {
      try {
        const response = await axios({
          method: 'POST',
          url: `${AXIOS.BASE_URL}/team/user/check/list`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': sessionStorage.getItem('access-token'),
          },
          data: `${teamId}`,
        });
  
        setResponseData(response.data);

        setSelectedOuterIndex(0);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCheckList();
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    setCheckedItemsCol({});
  }, [selectedOuterIndex]);

  const handleCheckboxChangeCol = (outId: number, itemId: number) => {
    const key = `${outId}-${itemId}`;
    setCheckedItemsCol((prevCheckedItems) => {
      const innerItem = responseData[outId].checkListRow[itemId];
      let updatedItem;
  
      if (prevCheckedItems[key] === undefined) {
        // Initialize the item if it doesn't exist in the state
        updatedItem = {
          checked: false,
          description: '',
          image: '',
          type: innerItem.questionType,
        };
      } else {
        updatedItem = {
          ...prevCheckedItems[key],
          checked: !prevCheckedItems[key]?.checked || false,
        };
      }
  
      return { ...prevCheckedItems, [key]: updatedItem };
    });
  };
  
  const handleInputChangeCol = (outId: number, itemId: number, value: any) => {
    const key = `${outId}-${itemId}`;
    setCheckedItemsCol((prevCheckedItems) => {
      const innerItem = responseData[outId].checkListRow[itemId];
      let updatedItem;
  
      if (prevCheckedItems[key] === undefined) {
        // Initialize the item if it doesn't exist in the state
        updatedItem = {
          checked: false,
          description: '',
          image: '',
          type: innerItem.questionType,
        };
      } else {
        if (innerItem.questionType === 'checkbox') {
          updatedItem = {
            ...prevCheckedItems[key],
            checked: value !== undefined ? value : false,
          };
        } else if (innerItem.questionType === 'input') {
          updatedItem = {
            ...prevCheckedItems[key],
            description: value !== undefined ? value : '기본 문자열 값',
          };
        } else if (innerItem.questionType === 'img') {
          updatedItem = {
            ...prevCheckedItems[key],
            image: value,
          };
        } else {
          updatedItem = {
            ...prevCheckedItems[key],
          };
        }
      }
  
      return { ...prevCheckedItems, [key]: updatedItem };
    });
  };

  const handleSubmit = (index: number): ((e: React.FormEvent<HTMLFormElement>) => void) => (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (index !== null) {
      const currentDate = format(new Date(), 'yyyy-MM-dd');
      const checkedItemsColValues = Object.values(checkedItemsCol);
      const extractedValues: any[] = [];
  
      checkedItemsColValues.forEach((item) => {
        if (item.type === 'checkbox') {
          extractedValues.push(item.checked);
        }
  
        if (item.type === 'input') {
          extractedValues.push(item.description);
        }
  
        if (item.type === 'img') {
          extractedValues.push(item.image);
        }
      });
  
      const submitData = {
        teamId: teamId,
        checkListName: responseData[index].checkListName,
        commentInfo: [{
          createDate: currentDate,
          userEmail: sessionStorage.getItem('email'),
          userName: userName,
          comments: extractedValues,
        }]
      };
  
      axios({
        method: 'POST',
        url: `${AXIOS.BASE_URL}/team/user/check/list/add`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('access-token'),
        },
        data: submitData
      })
        .then(() => {
  
          alert('제출되었습니다.')
          location.reload()
        })
        .catch((err: string) => {
          console.log(err);
          return err;
        });
    }
  };
  

  return (
    <div style={{ marginTop: '100px', marginBottom: '20px' }}>
      <div>
        <label>Select an item:</label>
        <select onChange={(e) => setSelectedOuterIndex(Number(e.target.value))}>
          {responseData &&
            responseData.map((outerItem, index) => (
              <option key={index} value={index}>
                {outerItem.checkListName}
              </option>
            ))}
        </select>

        {selectedOuterIndex !== null && (
          <div>
            <p>{responseData[selectedOuterIndex].checkListName}</p>
            <form onSubmit={handleSubmit(selectedOuterIndex)}>
              {responseData[selectedOuterIndex].checkListRow.map((innerItem, innerIndex) => (
                <div key={innerIndex}>
                  <DescriptionInput
                    content={innerItem.question}
                    checked={checkedItemsCol[`${selectedOuterIndex}-${innerIndex}`]?.checked || false}
                    onCheckboxChange={() => handleCheckboxChangeCol(selectedOuterIndex, innerIndex)}
                    onInputChange={(value) => handleInputChangeCol(selectedOuterIndex, innerIndex, value)}
                    type={innerItem.questionType}
                  />
                </div>
              ))}
              <button type='submit'> 제출</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
