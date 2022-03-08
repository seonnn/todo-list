// Basic Mission1: 모두 지우기 컴포넌트 추가
const RemoveAll = ({ setTodoData }) => {
  const handleRemoveAll = () => {
    setTodoData([]);
  };

  return (
    <div>
      <button onClick={handleRemoveAll}>모두 지우기</button>
    </div>
  );
};

export default RemoveAll;
