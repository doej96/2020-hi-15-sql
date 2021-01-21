function onSave(f) {
  if(f.name.value.trim() === ""){//trim:문자열의 앞뒤 공백 지워줌
    alert('도시명은 필수정보입니다.');
    f.name.focus();
    return false;
  }
  return true;
}