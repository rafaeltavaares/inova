import React, { useState } from "react";
import Conteudo_header from "./conteudo_header";
import Tabela from "./Tabela";

export default function Conteudo(props) {
    const [todos, setTodos] = useState(false);
    const [itensSelecionados, setItensSelecionados] = useState([]);

    // Função elevada
    function salvarSelecionados(itens) {
        setItensSelecionados(itens);
        console.log("teste")
        localStorage.setItem("itensSelecionados", JSON.stringify(itens));
        alert("Itens salvos com sucesso!");
    }

    return (
        <section className="conteudo">
            <Conteudo_header
                todos={todos}
                setTodos={setTodos}
                itensSelecionados={itensSelecionados}
                salvarSelecionados={salvarSelecionados} // Passa a função
            />
            <Tabela
                load={props.load}
                setLoading={props.setLoading}
                salvarSelecionados={salvarSelecionados} // Passa a função
                setItensSelecionados={setItensSelecionados}
                itensSelecionados={itensSelecionados}
            />
        </section>
    );
}
