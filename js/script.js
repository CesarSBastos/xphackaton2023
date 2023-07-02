const fs = require('fs');
let somaGastos = 0
let somaEntradas = 0
let totalGastosFixos = 0;
let totalGastosDesejosPessoais = 0;
let totalProjetosFuturos = 0;
let gastosIndispensaveis = ["Pagamento de conta de luz", "Pagamento de conta de água", "Aluguel", "Alimentação", "Pagamento de conta de gás"] // 50% 
let gastosDesejos = ["Compra online", "Serviços de streaming"] //30%
let reservaEmergencia = [] //20%


try {
    //Leitura do JSON
    const jsonString = fs.readFileSync('./mock.json', 'utf-8');
    const jsonData = JSON.parse(jsonString);
    //console.log(jsonData);
    let movimentacoes = jsonData.movimentacoes
    let cliente = jsonData.cliente
    let salarioCliente = cliente.salario

    let metaFixo = (salarioCliente * 0.5)
    let metaDesejos = (salarioCliente * 0.3)
    let metaReserva = (salarioCliente * 0.2)

    //Soma dos valores gastos durante o mês 
    const gastos = movimentacoes.filter(obj => obj.tipo === "saida")
    const valorGasto = gastos.forEach(element => {
        somaGastos += element.valor
    });

    //Soma das entradas de valores durante o mês
    const entradas = movimentacoes.filter(obj => obj.tipo === "entrada")
    const valorDeEntradas = entradas.forEach(element => {
        somaEntradas += element.valor
    })


    // Criar um objeto vazio para armazenar os gastos por categoria
    let gastosPorCategoria = {};

    // Percorrer os gastos e categorizá-los
    for (const gasto of gastos) {

        const categoria = gasto.descricao;
        const valor = gasto.valor;

        if (gastosIndispensaveis.includes(categoria)) {
            // Se o gasto pertence às categorias indispensáveis, adiciona ao total de gastos fixos
            totalGastosFixos += valor;
        } else if (gastosDesejos.includes(categoria)) {
            // Caso contrário, adiciona ao total de gastos com desejos pessoais
            totalGastosDesejosPessoais += valor;
        }

    }
    callOpenAi(totalGastosFixos,totalGastosDesejosPessoais,totalProjetosFuturos,salarioCliente)

} catch (error) {
    console.log('Ocorreu um erro ao ler o arquivo:', error);
}



function callOpenAi(gastosFixos,gastosDesejos,reservaEmergencial,salario) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer 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");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
            {
                "role": "user",
                "content": `Seja meu consultor financeiro, desejo organizar meus gastos com o método 50/30/20. Meus gastos fixos são: S${gastosFixos}, meus gastos com desejos pessoais são: ${gastosDesejos}, e minha reserva de emergencia ${reservaEmergencial}. Meu salario é de ${salario}, onde posso aprimorar para conseguir uma estabilidade financeira melhor. Me de uma resposta resumida com breves insights`
            }
        ]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}




/*$.ajax({
    url: "https://viacep.com.br/ws/01001000/json/",
    contentType: "application/json",
    dataType: "json",
    type: 'GET',
    success: function (response) {
        console.log(response)
    }
});*/
