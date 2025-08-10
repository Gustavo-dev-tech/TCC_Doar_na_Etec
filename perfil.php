<?php
session_start();

// Verificar se o usuário está logado
if (!isset($_SESSION['user_email'])) {
    die("Usuário não está logado.");
}

// Conectar ao banco de dados
include("conexao.php");

$email = $_SESSION['user_email'];  // Recupera o e-mail da sessão

// Recuperar os dados do usuário
$query = "SELECT nome, email, telefone, foto_perfil FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($nome, $email, $telefone, $foto_perfil);
$stmt->fetch();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Usuário</title>
    <link rel="stylesheet" href="perfil.css">
    
</head>
<body>
    <div class = "formulario" >
        <div class = "form"> 
        <a href="etecs.html" class="back-button" title="Voltar para a lista de ETECs">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
    </a>
        
        
    <!-- Formulário de edição do perfil -->
    <h2 id="title">Perfil de Usuário</h2> 
    
    
    
    <form class="edit-form"  method="POST" action="atualizar_perfil.php" enctype="multipart/form-data">

    <label for="foto_perfil">Foto de Perfil</label>
            <br>
                <input class = "insirir" type="file" id="foto_perfil" name="foto_perfil" accept="image/*">
                <br><br>
            <img src="<?php echo htmlspecialchars($foto_perfil); ?>" alt="Foto de Perfil" style="max-width: 150px; max-height: 150px;">

<?php
if (isset($_FILES['foto_perfil']) && $_FILES['foto_perfil']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'uploads/';
    $fileTmpPath = $_FILES['foto_perfil']['tmp_name'];
    $fileName = basename($_FILES['foto_perfil']['name']);
    $destPath = $uploadDir . $fileName;

    // Validação simples de extensão (exemplo)
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if (in_array($fileExtension, $allowedExtensions)) {
        if (move_uploaded_file($fileTmpPath, $destPath)) {
            // Sucesso, salve $destPath no banco ou atualize $foto_perfil
            // Exemplo:
            $foto_perfil = $destPath;
            // Atualize banco aqui...
        } else {
            echo "Erro ao mover o arquivo.";
        }
    } else {
        echo "Tipo de arquivo não permitido.";
    }
} else {
    // Nenhum arquivo enviado ou erro no upload
}
?>



            

          <br><br>
            <label for="nome">Nome</label>
            <br>
                <input class = "insirir" type="text" id="nome" name="nome" value="<?php echo htmlspecialchars($nome); ?>" required>
        <br>
            <label for="email">Email</label>
            <br>
                <input class = "insirir" type="email" id="email" name="email"  value="<?php echo htmlspecialchars($email); ?>" required>
        <br>
            <label for="telefone">Telefone</label>
                <input class = "insirir" type="text" id="telefone" name="telefone" value="<?php echo htmlspecialchars($telefone); ?>" required>
                <br><br>
        <!-- Botão "Editar" que habilita os campos para edição -->
        <button type="button" class="editar" id="editButton" onclick="toggleEdit()">Editar</button>
        
        <input class="insirir" id="atualizar" type="submit" value="Atualizar Perfil">
        <br>
            
    </form>
        
    <script>
        // Função para alternar entre edição e visualização
        function toggleEdit() {
            let form = document.querySelector('.edit-form');
            let button = document.getElementById('editButton');
            let edit = document.getElementById('editButton')
            
            
            if (edit.textContent.trim() === "Editar") {
                edit.style.backgroundColor = '#a50c0cff'; // Preto
            } 
            if (edit.textContent.trim() === "Cancelar Edição") {
                edit.style.backgroundColor = '#4CAF50'; // Branco
            }

            form.classList.toggle('editable');  // Alterna a classe para habilitar ou desabilitar os campos
            if (form.classList.contains('editable')) {
                button.textContent = 'Cancelar Edição';  // Muda o texto do botão para "Cancelar"
            } else {
                button.textContent = 'Editar';  // Muda o texto do botão de volta para "Editar"
            }
        }
    </script>
    
</div>   

   
</body>
</html>
