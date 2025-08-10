        // Alternar tema entre claro e escuro
        const themeToggle = document.getElementById('theme-toggle');
        const themeEmoji = document.getElementById('themeEmoji');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode'); // Alterna a classe 'dark-mode' no corpo do documento
            if (document.body.classList.contains('dark-mode')) {
                themeEmoji.textContent = '🌙'; // Define o emoji da lua para o tema escuro
            } else {
                themeEmoji.textContent = '☀️'; // Define o emoji do sol para o tema claro
            }
        });

        // Alterar tamanho da fonte baseado na seleção
        const fontSizeSelector = document.getElementById('font-size');
        fontSizeSelector.addEventListener('change', (event) => {
            document.body.classList.remove('small-font', 'medium-font', 'large-font'); // Remove classes de tamanho de fonte
            document.body.classList.add(event.target.value); // Adiciona a classe correspondente ao valor selecionado
        });

        // Mostrar ou esconder informações adicionais
        const toggleInfoButton = document.getElementById('toggle-info');
        const infoSection = document.getElementById('info');
        toggleInfoButton.addEventListener('click', () => {
            infoSection.classList.toggle('hidden'); // Alterna a visibilidade da seção de informações
        });