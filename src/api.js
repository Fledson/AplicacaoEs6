// importando o axioss
import axios from 'axios'

// criando uma configuração do axios
const api = axios.create({
    // definindo uma base para o axios
    // assim com a baseURL todas as requisições saem do endereço configurado
    baseURL: 'https://api.github.com',
})

// exportando a api
export default api