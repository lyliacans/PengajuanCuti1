document.getElementById('form-cuti').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const response = await fetch('/ajukanCuti', {
      method: 'POST',
      body: formData
    });
  
    const result = await response.json();
    alert(result.message);
  });
  