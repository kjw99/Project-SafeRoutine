import React, { useState, useEffect } from 'react';
import styles from '../../styles/NewCheckList.module.scss';

interface OptionProps {
  initialQuestion?: string; // Add initialQuestion to OptionProps
  onQuestionContentChange: (content: string) => void;
  onAnswerChange: (answer: string) => void;
}

const Option: React.FC<OptionProps> = ({ initialQuestion = '', onQuestionContentChange, onAnswerChange }) => {
  const [questionContent, setQuestionContent] = useState(initialQuestion); // Set initial value

  useEffect(() => {
    console.log(initialQuestion)
    setQuestionContent(initialQuestion);
  }, [initialQuestion]);

  const [answer, setAnswer] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionContent(e.target.value);
    onQuestionContentChange(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswer(e.target.value);
    onAnswerChange(e.target.value);
  };

  return (
    <div className={styles.CheckOption}>
      <input
        type="text"
        value={questionContent}
        onChange={handleInputChange}
        placeholder="질문 내용"
        className={styles.questionInput}
      />
      <select 
        onChange={handleSelectChange} 
        className={styles.answerSelect}
        value={answer}
      >
        <option value="">답변 형태를 지정해주세요.</option>
        <option value="checkbox">체크박스</option>
        <option value="input">서술</option>
        <option value="img">이미지</option>
      </select>
    </div>
  );
};

export default Option;
