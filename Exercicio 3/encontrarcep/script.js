//Funções de consulta
const consultarCEP = async () => {
    let resultado = document.getElementById('resultado');
    let uf = document.getElementById('ufInput').value;
	let localidade = document.getElementById('localidadeInput').value;
	let logradouro = document.getElementById('logradouroInput').value;

    if (uf === "") {
        resultado.innerHTML = '<p>Campo UF está vazio. Por favor, insira um UF válido com 2 caracteres.</p>';
        return;
    }
	
	if (localidade === "") {
        resultado.innerHTML = '<p>Campo Localidade está vazio. Por favor, insira a Localidade.</p>';
        return;
    }
	
	if (logradouro === "") {
        resultado.innerHTML = '<p>Campo Logradouro está vazio. Por favor, insira a Logradouro.</p>';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${uf}/${localidade}/${logradouro}/json/`);
        const data = await response.json();
        let max = data.length;
		
        if (data.erro  || max === 0) {
            resultado.innerHTML = '<h4>CEP não encontrado.</h4>';
        }
        else {	
            let html = '<hr /><h4>Resultado</h4>';
            
            data.forEach(item => {
                html += ` 					
                    <p><span>Logradouro:</span> ${item.logradouro || 'N/A'}</p>
                    <p><span>Bairro:</span> ${item.bairro || 'N/A'}</p>
					<p><span>Cidade:</span> ${item.localidade || 'N/A'}</p>
                    <p><span>Estado:</span> ${item.uf || 'N/A'}</p>
					<p><span>CEP:</span> ${item.cep || 'N/A'}</p>
                `;
				if(max > 1) html +='<hr />';				
            });

            resultado.innerHTML = html;
        }
    }
    catch (error) {
        resultado.innerHTML = '<p>Erro ao consultar o CEP. Tente novamente mais tarde.</p>';
    }
};