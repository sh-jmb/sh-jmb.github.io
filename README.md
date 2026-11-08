# sh-jmb.github.io

Meu portfólio pessoal e profissional, publicado em **https://sh-jmb.github.io**.

## Estrutura

```
index.html            página inicial (só HTML)
sobre.html            formação e objetivo
criacoes.html         galeria de texturas e mapas (VRChat)
css/
  pages.css           estilos das páginas internas (detalhes e galeria)
  tokens.css          cores (claro/escuro), fontes, tamanhos, espaçamentos, tempos de animação
  base.css            reset, tipografia e acessibilidade
  layout.css          estrutura da página e responsivo
  components.css      botões, cards, tecnologias e demais elementos
  animations.css      animações, hover e prefers-reduced-motion
js/
  theme-init.js       aplica o tema salvo antes da página aparecer
  theme.js            botão de modo claro/escuro
  animations.js       seções que aparecem ao rolar e menu ativo
  main.js             ponto de entrada
assets/
  favicon.svg         ícone da aba
  criacoes/           imagens da galeria (texturas/ e mapas/), de preferência .webp
```

Para adicionar uma criação à galeria, siga o modelo comentado no início do `<main>` em `criacoes.html`.

## Como testar localmente

Os scripts são módulos ES, então o site precisa ser aberto por um servidor local (abrir o `index.html` com dois cliques não funciona):

- **VS Code:** extensão *Live Server* → botão **Go Live**.
- **Python:** `python -m http.server 8000` na pasta do projeto e abra http://localhost:8000.

## Boas práticas adotadas

- Nenhum CSS ou JavaScript inline (permite a Content Security Policy definida no `index.html`).
- Animações só com `transform`/`opacity` e respeitando `prefers-reduced-motion`.
- Nenhum segredo no repositório (`.gitignore` cobre `.env` e arquivos de editor).
