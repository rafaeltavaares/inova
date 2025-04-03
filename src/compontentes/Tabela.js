import React, { useState } from "react";
import "../estilo/tabela.css"
import Conteudo_tabela from "./Conteudo_tabela";

export default function Tabela({ salvarSelecionados, setItensSelecionados, itensSelecionados }){
    
    return(
        <>
            <section className="tabela">
                <div className="tabela-header">
                    <div className="conteudo-header">
                        <div className="titulo-div">
                        <span className="titulo">Compras diretas</span>
                        </div>
                        <p>Gerêncie e analise as aquisições de bens pelo poder público.</p>
                    </div>
                </div>
                <Conteudo_tabela salvarSelecionados={salvarSelecionados} setItensSelecionados={setItensSelecionados} itensSelecionados={itensSelecionados} ></Conteudo_tabela>
            </section>
        </>
    )
}