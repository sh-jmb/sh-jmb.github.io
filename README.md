# sh-jmb.github.io

Meu portfólio pessoal e profissional, publicado em **https://sh-jmb.github.io**.

Feito com **HTML, CSS, JavaScript e Bootstrap 5.3.3**, hospedado no **GitHub Pages**.

## Estrutura

```
index.html            página inicial
sobre.html            formação e objetivo
criacoes.html         galeria de texturas e mapas (VRChat)
vendor/bootstrap/     Bootstrap 5.3.3 (arquivos locais + LICENSE MIT)
css/
  tokens.css          cores (claro/escuro) e fontes, aplicadas às variáveis --bs-* do Bootstrap
  base.css            ajustes gerais, tipografia e acessibilidade
  components.css      personalização dos componentes do Bootstrap (navbar, botões, cards) e componentes próprios
  pages.css           estilos das páginas internas (detalhes e galeria)
  animations.css      animações, hover e prefers-reduced-motion
js/
  theme-init.js       aplica o tema salvo antes da página aparecer
  theme.js            botão de modo claro/escuro (data-bs-theme)
  animations.js       seções que aparecem ao rolar e menu ativo
  main.js             ponto de entrada
assets/
  favicon.svg         ícone da aba
  criacoes/           imagens da galeria: texturas/ e mapas/ (criar ao adicionar a primeira imagem)
perfil/, site/        versões antigas do README de perfil e do site, mantidas como histórico
```

Para adicionar uma criação à galeria, siga o modelo comentado no início do `<main>` em `criacoes.html` (de preferência imagens `.webp`).

## Como testar localmente

Os scripts são módulos ES, então o site precisa ser aberto por um servidor local (abrir o `index.html` com dois cliques não funciona):

- **Python:** `python -m http.server 8000` na pasta do projeto e abra http://localhost:8000.
- **VS Code:** extensão *Live Server* → botão **Go Live**.

## Como publicar

1. Teste localmente e confira tema, páginas e versão para celular.
2. No **GitHub Desktop**, preencha o **Summary**, clique em **Commit to main** e depois em **Push origin**.
3. O GitHub Pages atualiza o site em 1 a 2 minutos (use **Ctrl+F5** se aparecer a versão antiga).

## Boas práticas adotadas

- **Content Security Policy** em todas as páginas: só carrega scripts e estilos do próprio site e as fontes do Google.
- Nenhum CSS ou JavaScript inline (necessário para a CSP rígida).
- Bootstrap guardado no projeto e verificado pelo navegador com `integrity` (SHA-384).
- Links externos com `rel="noopener noreferrer"`.
- Animações só com `transform`/`opacity` e respeitando `prefers-reduced-motion`.
- Nenhum segredo no repositório (`.gitignore` cobre `.env` e arquivos de editor).
