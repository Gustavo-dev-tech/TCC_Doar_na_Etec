        // Alternar tema entre claro e escuro
            const themeToggle = document.getElementById('theme-toggle');
            const themeEmoji = document.getElementById('themeEmoji');

        // Função para aplicar o tema baseado no localStorage
        function applyTheme() {
        if (localStorage.getItem('tema') === 'escuro') {
            document.body.classList.add('dark-mode');
            themeEmoji.textContent = '🌙';
        } else {
            document.body.classList.remove('dark-mode');
            themeEmoji.textContent = '☀️';
        }
        }

        // Função para alternar o tema e salvar no localStorage
        function toggleTheme() {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('tema', 'escuro');
            themeEmoji.textContent = '🌙';
        } else {
            localStorage.setItem('tema', 'claro');
            themeEmoji.textContent = '☀️';
        }
        }

        // Configura o event listener apenas uma vez
        themeToggle.addEventListener('click', toggleTheme);

        // Aplica o tema assim que a página carrega
        window.addEventListener('load', applyTheme);


        
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
