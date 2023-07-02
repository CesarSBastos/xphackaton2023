const fs = require('fs');
let somaGastos = 0
let somaEntradas = 0

    
try {
    //Leitura do JSON
    const jsonString = fs.readFileSync('./mock.json', 'utf-8');
    const jsonData = JSON.parse(jsonString);
    //console.log(jsonData);
    let movimentacoes = jsonData.movimentacoes

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

        // Verificar se a categoria já existe no objeto gastosPorCategoria
        if (gastosPorCategoria.hasOwnProperty(categoria)) {
            // Se a categoria já existe, adiciona o gasto ao array correspondente
            gastosPorCategoria[categoria].push(gasto);
        } else {
            // Se a categoria não existe, cria um novo array com o gasto
            gastosPorCategoria[categoria] = [gasto];
        }
    }

    // (Provisório) Exibir os gastos por categoria
    for (const categoria in gastosPorCategoria) {
        console.log(`Categoria: ${categoria}`);
        console.log(gastosPorCategoria[categoria]);
        console.log("-------------------------");
    }


    console.log("Valor gasto:" + somaGastos)
    console.log("Valor de entradas: " + somaEntradas)















} catch (error) {
    console.log('Ocorreu um erro ao ler o arquivo:', error);
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
