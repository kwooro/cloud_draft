function submitForm() {
  const formData = new FormData(document.getElementById('dataForm'));
  const data = Object.fromEntries(formData.entries());

  // 백엔드 API URL (실제 운영 중인 API의 엔드포인트로 변경 필요)
  const apiUrl = 'https://your-backend-api-domain.com/create-hwp';

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("네트워크 응답에 문제가 있습니다.");
    }
    return response.blob();
  })
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'result.hwp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  })
  .catch(error => {
    console.error("오류 발생: ", error);
    alert("파일 생성 중 오류가 발생했습니다.");
  });
}
