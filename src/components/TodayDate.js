// 오늘 날짜 출력 기능 추가
const TodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const today = year + "년 " + month + "월 " + day + "일";

  return today;
};

export default TodayDate;
