document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");
    const codigoHtml = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    formulario.addEventListener("submit", async function (evento) {
        evento.preventDefault();

        // Obtém o valor do campo de descrição
        const descricao = descricaoInput.value.trim();

        if (!descricao) {
            return;
        }

        mostrarCarregamento(true);

        try {
            const resposta = await fetch("https://lxhrvn.app.n8n.cloud/webhook/fundo-magico", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ descricao }),
            });

            const dados = await resposta.json();

            codigoHtml.textContent = dados.html || "";
            codigoCss.textContent = dados.css || "";

            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || "";

            let tagEstilo = document.getElementById("estilo-dinamico");
            if (tagEstilo) {
                tagEstilo.remove();
            }

            if (dados.css) {
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }
        } catch (error) {
            console.error("Erro ao gerar o background:", error);
            codigoHtml.textContent = "Erro ao gerar o código HTML.";
            codigoCss.textContent = "Erro ao gerar o código CSS.";
            secaoPreview.innerHTML = "";
        } finally {
            mostrarCarregamento(false);
        }
    });

    function mostrarCarregamento(estaCarregando) {
        const botaoEnviar = document.getElementById("generate-button");
        if (estaCarregando) {
            botaoEnviar.textContent = "Carregando Background...";
        } else {
            botaoEnviar.textContent = "Gerar Background Mágico";
        }
    }



});