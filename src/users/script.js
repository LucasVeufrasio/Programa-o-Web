// Validação de Cadastro
document.querySelector('#cadastro-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;

    if (senha !== confirmaSenha) {
        alert('Senhas não coincidem!');
        return;
    }

    // Envia dados para o backend
    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            senha: senha
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) window.location.href = 'login.html';
        else alert(data.message);
    });
});

// Upload de Arquivo com Criptografia
document.querySelector('#upload-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('arquivo', document.getElementById('arquivo').files[0]);
    formData.append('senha', document.getElementById('senha-cripto').value);

    const response = await fetch('/upload', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    alert(result.message);
});