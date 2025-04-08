// 폼 제출 이벤트 리스너 추가
document.getElementById("cloudServiceForm").addEventListener("submit", function(event) {
  event.preventDefault(); // 기본 폼 제출 동작 중지

  // 폼 데이터를 JSON 객체로 변환
  const formData = new FormData(event.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // 백엔드 API URL (실제 API 엔드포인트로 수정 필요)
  const apiUrl = 'https://wandsol.kr/write/write_draft';

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
    // Blob 데이터를 URL 객체로 변환 후, 다운로드 링크를 생성하여 파일 다운로드 실행
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "draft.hwp"; // 파일명을 "draft.hwp"로 고정합니다.
    document.body.appendChild(a);
    a.click();
    // 사용 후 DOM에서 제거 및 URL 객체 메모리 해제
    a.remove();
    window.URL.revokeObjectURL(url);
  })
  .catch(error => {
    console.error("오류 발생: ", error);
    alert("파일 생성 중 오류가 발생했습니다.");
  });

});
