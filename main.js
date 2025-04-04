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
  const apiUrl = 'http://222.239.67.159/write/write_draft';

  // fetch를 통해 데이터 전송
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
    // 응답받은 Blob 데이터를 다운로드 링크로 변환하여 파일 다운로드
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "result.hwp"; // 원하는 파일명으로 변경 가능
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
  .catch(error => {
    console.error("오류 발생: ", error);
    alert("파일 생성 중 오류가 발생했습니다.");
  });
});
