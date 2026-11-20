# sh-jmb.github.io

Meu portfólio pessoal e profissional, publicado em **https://sh-jmb.github.io**.

Feito com **HTML, CSS, JavaScript e Bootstrap 5.3.3**, hospedado no **GitHub Pages**.

## Estrutura

```
index.html            página inicial
sobre.html            formação e objetivo
criacoes.html         galeria de texturas e mapas (VRChat)
404.html              página "Game Over" para endereços que não existem (chuva de código + glitch)
vendor/bootstrap/     Bootstrap 5.3.3 (arquivos locais + LICENSE MIT)
css/
  fonts.css           fontes hospedadas no próprio site (Inter e JetBrains Mono)
  tokens.css          cores (claro/escuro) e fontes, aplicadas às variáveis --bs-* do Bootstrap
  base.css            ajustes gerais, tipografia e acessibilidade
  components.css      personalização dos componentes do Bootstrap (navbar, botões, cards) e componentes próprios
  pages.css           estilos das páginas internas (detalhes e galeria)
  animations.css      animações, hover e prefers-reduced-motion
  error404.css        estilos da página 404 (glitch e "Continue?")
js/
  theme-init.js       aplica o tema salvo antes da página aparecer
  theme.js            botão de modo claro/escuro (data-bs-theme)
  animations.js       seções que aparecem ao rolar e menu ativo
  main.js             ponto de entrada
  rain.js             chuva de código em <canvas> (404 e topo da página inicial), nas cores do tema
  error404.js         página 404: chuva + tecla Enter para voltar ao início
  cursor.js           luz neon do mouse, brilho nos blocos e textos, e efeito de toque no celular
assets/
  favicon.svg         ícone da aba
  cursor/             cursores neon em SVG (normal e para links)
  fonts/inter/        Inter variável (.woff2) + OFL.txt
  fonts/jetbrains-mono/ JetBrains Mono 500 (.woff2) + OFL.txt
  fonts/8-bit-wonder/ fonte 8-BIT WONDER (Joiro Hatagaya, freeware) usada na chuva da 404, com README.TXT e 8-BIT WONDER.TXT originais
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

- **Content Security Policy** em todas as páginas: só carrega scripts, estilos e fontes do próprio site (nada de servidores externos).
- Nenhum CSS ou JavaScript inline (necessário para a CSP rígida).
- Bootstrap guardado no projeto e verificado pelo navegador com `integrity` (SHA-384).
- Links externos com `rel="noopener noreferrer"`.
- Animações só com `transform`/`opacity` e respeitando `prefers-reduced-motion`.
- Nenhum segredo no repositório (`.gitignore` cobre `.env` e arquivos de editor).
