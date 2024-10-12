//Funções de consulta
const mascararCEP = (campo) => {
    let cep = campo.value.replace(/\D/g, '');
    cep = cep.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
    campo.value = cep;
};

const consultarCEP = async () => {
    let resultado = document.getElementById('resultado');
    let cep = document.getElementById('cepInput').value.trim();
    cep = cep.replace(/\D/g, '');

    if (!/^\d{8}$/.test(cep)) {
        resultado.innerHTML = '<p>CEP inválido. Por favor, insira um CEP válido com 8 dígitos.</p>';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
            resultado.innerHTML = '<h4>CEP não encontrado.</h4>';
        }
        else {
            resultado.innerHTML = `
                <hr />
                <h4>Resultado</h4>                        
                <p><span>Logradouro:</span> ${data.logradouro || 'N/A'}</p>
                <p><span>Bairro:</span> ${data.bairro || 'N/A'}</p>
                <p><span>Cidade:</span> ${data.localidade || 'N/A'}</p>
                <p><span>Estado:</span> ${data.estado || 'N/A'}</p>
            `;
        }
    }
    catch (error) {
        resultado.innerHTML = '<p>Erro ao consultar o CEP. Tente novamente mais tarde.</p>';
    }
};