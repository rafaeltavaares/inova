import React, { useEffect, useState } from "react";
import "../estilo/Conteudo_header.css"
import pesquisa_icon from "../img/icon_pesquisa.svg"

export default function Conteudo_header({salvarSelecionados, itensSelecionados}){
    const [todos,setTodos] = useState(false)
    const [relevantes,setRelevantes] = useState(true)
    const [selecionados,setSelecionados] = useState([])
    const [mostrar,setMostrar] = useState(false)
    useEffect(
        ()=>{
            const itensSalvos = JSON.parse(localStorage.getItem('itensSelecionados'))
            setSelecionados(itensSalvos)
        },[])

    

    return(
            <>   


                {mostrar?(
                    <div className="dados">
                    {selecionados.map((e, i) => (
                        <div className="dados-selecionados" key={i}>
                            <div className="dados-selecionados-esq">
                                <p>
                                    Ano: {e.AnoProcesso}<br/>
                                    Municipio: {e.Municipio}<br/>
                                    Unidade: {e.Unidade}<br/>
                                    Processo: {e.Processo}<br/>
                                    Valor: {e.ValorTotalCompra}<br/>
                                    Fornecedor: {e.Fornecedor}<br/>
                                </p>
                            </div>
                            <div className="dados-selecionados-dir">
                                <p>
                                    Objeto: {e.Objeto}<br/>
                                    Enquadramento Legal: {e.EnquadramentoLegal}<br/>
                                    Fundamentação: {e.Fundamentacao}<br/>
                                    CPF/CNPJ: {e.CPFCNPJFornecedor}<br/>
                                    Tipo do Fornecedor: {e.TipoFornecedor}<br/>
                                </p>

                            </div>
                        </div>
                    ))}
                    </div>
                ):""}
             </>
 
)
}