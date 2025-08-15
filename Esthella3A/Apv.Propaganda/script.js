document.addEventListener('DOMContentLoaded', () => {
    const approveButton = document.getElementById('approve-button');
    const rejectButton = document.getElementById('reject-button');
    const statusMessage = document.getElementById('status-message');
    const rejectionReasonContainer = document.getElementById('rejection-reason-container');
    const rejectionReasonTextarea = document.getElementById('rejection-reason');

    approveButton.addEventListener('click', () => {
        statusMessage.textContent = 'Campanha Aprovada! 🎉';
        statusMessage.className = 'status-message approved';
        rejectionReasonContainer.style.display = 'none'; // Esconde o campo caso estivesse visível
    });

    rejectButton.addEventListener('click', () => {
        rejectionReasonContainer.style.display = 'block'; // Mostra o campo
        
        // Oculta a mensagem de status anterior e remove as classes
        statusMessage.textContent = ''; 
        statusMessage.className = 'status-message';
    });

    // Você pode adicionar um ouvinte para o campo de rejeição para exibir a mensagem final
    rejectionReasonTextarea.addEventListener('input', () => {
        if (rejectionReasonTextarea.value.trim() !== '') {
            statusMessage.textContent = 'Campanha Rejeitada! ❌';
            statusMessage.className = 'status-message rejected';
        } else {
            statusMessage.textContent = '';
            statusMessage.className = 'status-message';
        }
    });
});