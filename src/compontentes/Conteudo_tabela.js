import React, { useEffect, useState } from "react";
import "../estilo/compras.css";

export default function Conteudo_tabela({ salvarSelecionados,setItensSelecionados, itensSelecionados }) {
    const [compras, setCompras] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [indiceSelecionado, setIndiceSelecionado] = useState(null); // Estado para o índice clicado
    const itensPorPag = 10;

    // Filtros para cada coluna
    const [filtroAno, setFiltroAno] = useState("");
    const [filtroMunicipio, setFiltroMunicipio] = useState("");
    const [filtroUnidade, setFiltroUnidade] = useState("");
    const [filtroProcesso, setFiltroProcesso] = useState("");
    const [filtroFornecedor, setFiltroFornecedor] = useState("");
    const [filtroValor, setFiltroValor] = useState("");


    async function fetchData(limite = 3000) {
        try {
            // Requisição com o parâmetro limite
            const response = await fetch(`http://localhost:5000/api/compras?limite=${limite}`);
            if (!response.ok) throw new Error('Erro na requisição');

            const data = await response.json();
            setCompras(data['Compras']);
        } catch (error) {
            console.error('Erro:', error);
        }
    }


useEffect(() => {
    fetchData(); 
}, []);


    

const [ordenacaoValor, setOrdenacaoValor] = useState(null); 


function ordenarPorValor() {
    if (ordenacaoValor === "asc") {
        setOrdenacaoValor("desc");
    } else {
        setOrdenacaoValor("asc");
    }
}


let comprasFiltradas = compras.filter((item) => {
    const anoProcesso = item.AnoProcesso ? item.AnoProcesso.toString() : "";
    const municipio = item.Municipio ? item.Municipio.toLowerCase() : "";
    const unidade = item.Unidade ? item.Unidade.toLowerCase() : "";
    const processo = item.Processo ? item.Processo.toLowerCase() : "";
    const fornecedor = item.Fornecedor ? item.Fornecedor.toLowerCase() : "";
    const valorTotal = item.ValorTotalCompra ? item.ValorTotalCompra.toString() : "";

    return (
        (filtroAno === "" || anoProcesso.includes(filtroAno)) &&
        (filtroMunicipio === "" || municipio.includes(filtroMunicipio.toLowerCase())) &&
        (filtroUnidade === "" || unidade.includes(filtroUnidade.toLowerCase())) &&
        (filtroProcesso === "" || processo.includes(filtroProcesso.toLowerCase())) &&
        (filtroFornecedor === "" || fornecedor.includes(filtroFornecedor.toLowerCase())) &&
        (filtroValor === "" || valorTotal === filtroValor) 
    );
});


if (ordenacaoValor) {
    comprasFiltradas.sort((a, b) => {
        const valorA = parseFloat(a.ValorTotalCompra) || 0;
        const valorB = parseFloat(b.ValorTotalCompra) || 0;

        return ordenacaoValor === "asc" ? valorA - valorB : valorB - valorA;
    });
}
;

  
    function handleMostrarDetalhes(index) {
        setIndiceSelecionado(index === indiceSelecionado ? null : index);
    }

    return (
        <>
            <section className="compras_diretas">
                <div className="compra">
                    {compras.length > 0 ? (
                        <>
                            <table className="compras-table">
                            <thead>
                                <tr>
                                    <th>Ano do Processo</th>
                                    <th>Municipio</th>
                                    <th>Unidade</th>
                                    <th onClick={ordenarPorValor} style={{ cursor: "pointer" }}>
                                        Valor Total {ordenacaoValor === "asc" ? "⬆️" : ordenacaoValor === "desc" ? "⬇️" : ""}
                                    </th>
                                    <th>Fornecedor</th>
                                    <th>Ações</th>
                                </tr>
                                <tr>
                                    <th>
                                        <input
                                            type="text"
                                            placeholder="Filtrar Ano"
                                            value={filtroAno}
                                            onChange={(e) => setFiltroAno(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            placeholder="Filtrar Município"
                                            value={filtroMunicipio}
                                            onChange={(e) => setFiltroMunicipio(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            placeholder="Filtrar Unidade"
                                            value={filtroUnidade}
                                            onChange={(e) => setFiltroUnidade(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            placeholder="Filtrar Valor"
                                            value={filtroValor}
                                            onChange={(e) => setFiltroValor(e.target.value)}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="text"
                                            placeholder="Filtrar Fornecedor"
                                            value={filtroFornecedor}
                                            onChange={(e) => setFiltroFornecedor(e.target.value)}
                                        />
                                    </th>
                                </tr>
                            </thead>

                                <tbody>
                                    {comprasFiltradas.slice(
                                        (paginaAtual - 1) * itensPorPag,
                                        paginaAtual * itensPorPag
                                    ).map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>{item.AnoProcesso}</td>
                                                <td>{item.Municipio}</td>
                                                <td>{item.Unidade}</td>

                                                <td>{item.ValorTotalCompra}</td>
                                                <td>{item.Fornecedor}</td>
                                                <td>
                                                    <button
                                                        className="btn-info"
                                                        onClick={() => handleMostrarDetalhes(index)}
                                                    >
                                                        ...
                                                    </button>
                                                </td>
                                            </tr>

                                         
                                            {indiceSelecionado === index && (
                                                <tr>
                                                    <td colSpan="8">
                                                        <div className="detalhes">
                                                            <p>Objeto: {item.Objeto}</p>
                                                            <p>Enquadramento Legal: {item.EnquadramentoLegal}</p>
                                                            <p>Fundamentação: {item.Fundamentacao}</p>
                                                            <p>CPF/CNPJ: {item.CPFCNPJFornecedor}</p>
                                                            <p>Tipo do Fornecedor: {item.TipoFornecedor}</p>
                                                            <p>Ano: {item.AnoProcesso}</p>
                                                            <p>Municipio: {item.Municipio}</p>
                                                            <p>Unidade: {item.Unidade}</p>
                                                            <p>Processo: {item.Processo}</p>
                                                            <p>Valor: {item.ValorTotalCompra}</p>
                                                            <p>Fornecedor: {item.Fornecedor}</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p>Carregando dados...</p>
                    )}
                </div>

                <div className="pagination">
                    <button
                        onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                        disabled={paginaAtual === 1}
                    >
                        Anterior
                    </button>
                    <span>Página {paginaAtual} de {Math.ceil(comprasFiltradas.length / itensPorPag)}</span>
                    <button
                        onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, Math.ceil(comprasFiltradas.length / itensPorPag)))}
                        disabled={paginaAtual === Math.ceil(comprasFiltradas.length / itensPorPag)}
                    >
                        Próxima
                    </button>
                </div>

            </section>
        </>
    );
}
