// 폼 제출 이벤트 리스너 추가
document.getElementById("cloudServiceForm").addEventListener("submit", function(event) {
  event.preventDefault(); // 기본 폼 제출 동작 중지

  // 로딩창과 카운트다운 요소 선택
  const loader = document.getElementById("loader");
  const countdownEl = document.getElementById("countdown");
  
  // 로딩창 보이기
  loader.style.display = "block";
  
  // 100초 카운트다운 초기화
  let remainingSeconds = 100;
  countdownEl.textContent = remainingSeconds;
  
  // 타이머 시작 (1초마다 감소)
  const timerInterval = setInterval(() => {
    remainingSeconds--;
    countdownEl.textContent = remainingSeconds;
    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
  
  // 폼 데이터를 JSON 객체로 변환
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  
  // 백엔드 API URL (실제 API 엔드포인트로 수정)
  const apiUrl = 'https://wandsol.kr/write/write_draft';
  
  // API 호출 및 Blob 데이터 처리
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("네트워크 응답에 문제가 있습니다.");
    }
    return response.blob();
  })
  .then(blob => {
    // API 응답 완료: 타이머 정지 및 로딩창 숨김
    clearInterval(timerInterval);
    loader.style.display = "none";
    
    // Blob 데이터를 파일로 다운로드
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "draft.hwp"; // 파일명 고정: draft.hwp
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => {
    clearInterval(timerInterval);
    loader.style.display = "none";
    console.error("오류 발생: ", error);
    alert("파일 생성 중 오류가 발생했습니다.");
  });
});
