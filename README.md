# Asael — protótipo clicável

Protótipo front-end (sem backend e sem pagamentos reais) do aplicativo Asael, para abrir no navegador do celular e sentir a experiência.

Todos os dados são fictícios (Joinville / SC). Nada é enviado a um servidor.

## Como abrir

Abra a URL publicada no Chrome do Android. Para instalar na tela inicial: menu do Chrome → **Adicionar à tela inicial**.

No computador, a interface aparece em um recorte de celular.

## Como navegar

1. Tela de abertura e carrossel de apresentação (deslize ou toque em Continuar).
2. **Criar conta** ou **Entrar** (qualquer e-mail/senha funciona).
3. Depois da verificação, escolha um perfil: **Contratante**, **Empresa Terceirizada** ou **Colaborador**. A faixa azul no topo troca de perfil.

Fluxos para testar:

- Empresa: **Solicitar profissionais** — escolha Vigilância, altere o valor da hora para **20,00** (aviso amarelo) ou **19,00** (bloqueio).
- Profissional: abra uma vaga, aceite, faça check-in com foto (pode usar a câmera) e veja a carteira Asael.
- Pagamento fora do app aparece como regra de banimento nos termos e nos resumos.
- **Busca (lupa):** no início, a barra de busca ou o ícone de lupa. O colaborador busca empresas e vagas perto (localização simulada em Joinville) ou por estado/cidade. A empresa busca colaboradores com filtros de segmento, disponibilidade e avaliação. Os resultados são perfis demonstrativos.
- **Chat:** o ícone de conversa no início, ou a lista em **Conversas**. A conversa entre colaborador e empresa (terceirizada ou contratante que contrata direto) fica bloqueada até o pagamento no app. Depois do pagamento simulado, dá para enviar mensagens (só neste dispositivo). Contatos pessoais não aparecem.

## Código

Site estático: `index.html`, `css/app.css`, `js/app.js`. Sem etapa de build.

Fotos de apresentação geradas para o protótipo; demais imagens de evento, limpeza, enfermagem e bombeiro a partir de Pexels/Unsplash, redimensionadas no projeto.
