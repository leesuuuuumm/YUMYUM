
export function chkEmail(str) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str);
}
// // 한글,영문 대소문자 2~8자
// export function chkNickname(str) {
//     var regNm = /^[가-힣]{2,8}|[a-zA-Z]{2,8}\s[a-zA-Z]{2,8}$/;
//     return regNm.test(str);
// }
// 비밀번호  8 ~ 10자 영문, 숫자 조합
export function chkPassword(asValue) {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; 
  return regExp.test(asValue); // 형식에 맞는 경우 true 리턴
}