document.getElementById('registro-form').addEventListener('submit', async (e) => {
         e.preventDefault();
         const lesao = document.getElementById('lesao').value.trim();
         const esporte = document.getElementById('esporte').value.trim();
         const metodo = document.getElementById('metodo').value.trim();
         const resultado = document.getElementById('resultado');
         try {
             const response = await fetch('http://localhost:3001/adicionar', {
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ lesao, esporte, metodo })
             });
             const data = await response.json();
             if (response.ok) {
                 resultado.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                 document.getElementById('registro-form').reset();
             } else {
                 resultado.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
             }
         } catch (error) {
             resultado.innerHTML = `<div class="alert alert-danger">Erro ao conectar ao servidor.</div>`;
         }
     });
     document.getElementById('listar-registros').addEventListener('click', async () => {
         try {
             const response = await fetch('http://localhost:3001/dados.json');
             const dados = await response.json();
             const listaRegistros = document.getElementById('lista-registros');
             if (dados.length === 0) {
                 listaRegistros.innerHTML = '<p>Nenhum registro encontrado.</p>';
                 return;
             }
             let html = '';
             dados.forEach((item, index) => {
                 html += `
                     <div class="card mb-3">
                         <div class="card-body">
                             <h5 class="card-title">Registro ${index + 1}</h5>
                             <p class="card-text"><strong>Lesão:</strong> ${item.lesao}</p>
                             <p class="card-text"><strong>Esporte:</strong> ${item.esporte}</p>
                             <p class="card-text"><strong>Método:</strong> ${item.metodo}</p>
                         </div>
                     </div>
                 `;
             });
             listaRegistros.innerHTML = html;
         } catch (error) {
             listaRegistros.innerHTML = '<p class="text-danger">Erro ao carregar registros.</p>';
         }
     });