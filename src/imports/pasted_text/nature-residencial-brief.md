Crie DO ZERO uma nova versão completa, premium, responsiva e altamente orientada à conversão do site do empreendimento:

https://residencialnature.com.br/

PROJETO:
Nature Residencial — Gênesis Empreendimentos
Local: Alto, Teresópolis — RJ

IMPORTANTE:
O site existente deve ser usado como FONTE DE VERDADE da identidade visual.

NÃO crie uma identidade nova.

Preserve:
- logotipo e assinatura visual do Nature;
- paleta de cores atual;
- tipografias atuais;
- proporções tipográficas;
- linguagem fotográfica;
- tons naturais;
- sensação arquitetônica sofisticada;
- materiais e texturas já associados ao empreendimento.

Antes de começar o layout, identifique no projeto/site atual:
- cores primárias;
- cores secundárias;
- fundos;
- cor de texto;
- tipografia display;
- tipografia de corpo;
- estilos de botão;
- raios;
- grid;
- linguagem de imagens.

Transforme isso em design tokens reutilizáveis.

Não introduza azul, roxo, gradientes tecnológicos, glassmorphism genérico ou estética de startup.

A nova página deve parecer uma EVOLUÇÃO muito mais sofisticada do site atual, e não outro empreendimento.

--------------------------------------------------
OBJETIVO
--------------------------------------------------

Não quero apenas um site institucional.

Quero uma landing page premium para um empreendimento de alto padrão, capaz de conduzir o usuário por uma narrativa de evolução de vida e terminar em uma ação comercial.

A experiência deve transmitir:

sofisticação;
maturidade;
arquitetura;
natureza;
espaço;
tranquilidade;
conveniência;
segurança patrimonial;
qualidade de vida.

Mas sem ostentação.

Não usar linguagem de “mansão”, “exclusividade extrema”, “luxo ao seu alcance”, riqueza ou status social explícito.

O comprador deve sentir que o Nature representa uma escolha madura, não uma demonstração de riqueza.

CONCEITO CENTRAL:

“NATURE.
O essencial em um novo padrão.”

O site inteiro deve construir essa conclusão.

A página deve seguir esta lógica:

1. apresentar claramente o produto;
2. provocar identificação com o momento de vida;
3. mostrar que uma evolução de vida pede uma evolução de endereço;
4. demonstrar como o Nature entrega isso;
5. provar cada atributo;
6. gerar segurança;
7. somente então fazer a chamada comercial forte.

--------------------------------------------------
STACK / INTERAÇÕES
--------------------------------------------------

Criar a experiência preparada para uma implementação moderna em React.

Utilizar:

- GSAP 3;
- GSAP SplitText;
- ScrollMagic 3 para cenas baseadas em scroll;
- timelines GSAP;
- scroll progress;
- sticky/pinned sections;
- parallax muito sutil;
- máscaras de imagem;
- clip-path reveals;
- stagger;
- text reveal;
- microinterações;
- transições cinematográficas suaves.

Pode utilizar Lenis para smooth scrolling apenas se a integração não prejudicar ScrollMagic, acessibilidade ou performance.

Prioridade:
fluidez e estabilidade > quantidade de animações.

ANIMAÇÃO NÃO É DECORAÇÃO.

Toda animação deve contribuir para:
- hierarquia;
- narrativa;
- percepção de espaço;
- descoberta do produto.

Evite animações repetidas de:
fade-up + fade-up + fade-up em todas as sessões.

Cada grande sessão deve possuir comportamento próprio.

--------------------------------------------------
DIREÇÃO DE MOTION
--------------------------------------------------

Usar SplitText principalmente por LINHAS e PALAVRAS.

Evitar animação exagerada letra por letra.

Headlines:
reveal vertical com mask/overflow hidden.

Exemplo:
linha começa em yPercent: 105
e termina em 0.

Stagger curto.

Duração aproximada:
0.8s a 1.2s.

Ease:
power3.out
power4.out
expo.out

Imagens:
scale inicial extremamente discreto:
1.04 → 1

Nada de zoom dramático.

Elementos entrando lateralmente:
20–40px no máximo.

Movimento deve parecer editorial/arquitetônico.

Respeitar:
prefers-reduced-motion.

No mobile, reduzir drasticamente:
- pinning;
- parallax;
- duração de scenes.

--------------------------------------------------
HEADER
--------------------------------------------------

Header minimalista.

Desktop:
logo Nature à esquerda.

Navegação:
O Nature
Localização
Plantas
Experiência
Gênesis

CTA à direita:

“Consultar unidades”

Inicialmente o header pode ficar transparente sobre o Hero.

Ao sair do Hero:
transformar suavemente em header sólido utilizando o fundo principal da identidade existente.

Adicionar backdrop somente se já combinar com a identidade.

Não criar header com aparência SaaS.

Mobile:
logo + menu hamburger.

CTA comercial deve continuar acessível.

--------------------------------------------------
01 — HERO
--------------------------------------------------

Altura:
100svh desktop.

Hero extremamente visual.

Usar um dos melhores renders reais do Nature.

NÃO gerar prédios fictícios.
NÃO alterar arquitetura.
NÃO usar imagens genéricas de condomínios.

Layout editorial assimétrico.

Imagem ocupando grande parte da tela.

Overlay extremamente sutil apenas para leitura.

Eyebrow:

RESIDENCIAL DE ALTO PADRÃO
ALTO · TERESÓPOLIS

Headline:

Nature.
O essencial em
um novo padrão.

A palavra “Nature” pode possuir tratamento editorial um pouco maior.

Subheadline:

Apartamentos de 2 e 3 quartos, com plantas de 65,88 m² a 292,49 m², arquitetura contemporânea, natureza integrada e uma estrutura completa de lazer e conveniência.

CTA primário:

“Conhecer o Nature”

CTA secundário:

“Ver plantas disponíveis”

Inserir pequeno indicador:

SCROLL TO DISCOVER

ou apenas uma linha vertical animada.

ANIMAÇÃO DO HERO:

Ao carregar:
1. imagem faz scale 1.04 → 1;
2. eyebrow aparece;
3. headline SplitText aparece por linhas;
4. parágrafo aparece;
5. CTAs aparecem juntos;
6. indicador de scroll entra por último.

Tudo sofisticado.

Sem preloader longo.

Ao scroll:
imagem faz parallax extremamente pequeno.

Headline pode perder levemente opacity conforme deixa a viewport.

--------------------------------------------------
02 — MOMENTO DE VIDA
--------------------------------------------------

Esta é a primeira grande mudança em relação ao site institucional tradicional.

Não mostrar amenities ainda.

Criar uma seção emocional e editorial.

Fundo limpo.

Muito espaço negativo.

Texto inicial pequeno:

HÁ CONQUISTAS QUE MUDAM
O QUE PASSAMOS A CONSIDERAR ESSENCIAL.

Headline grande:

Depois de conquistar
um novo padrão de vida,

é natural procurar
um endereço à altura dele.

Transformar essa sessão em uma experiência de scroll.

DESKTOP:

Criar uma section com aproximadamente 180–220vh.

Conteúdo fica parcialmente pinned.

Conforme o usuário rola:

ETAPA 1
“Mais espaço.”

ETAPA 2
“Mais tempo.”

ETAPA 3
“Mais tranquilidade.”

ETAPA 4
“Mais natureza.”

ETAPA 5

“O essencial mudou.”

E então revelar:

“Nature.
O essencial em um novo padrão.”

Os textos devem substituir uns aos outros usando opacity, blur mínimo e movimento vertical.

Não criar um efeito chamativo.

O foco é na leitura.

--------------------------------------------------
03 — UMA ESCOLHA. VÁRIOS ATRIBUTOS.
--------------------------------------------------

Fazer a transição da emoção para o produto.

Eyebrow:

POR QUE NATURE

Headline:

Você não deveria precisar
escolher entre tudo aquilo
que importa.

Texto:

Localização, espaço, natureza, arquitetura, lazer e conveniência passam a fazer parte da mesma escolha.

Criar quatro pilares principais.

01
Localização no Alto

02
Plantas para diferentes momentos

03
Lazer e conveniência

04
Arquitetura integrada à natureza

Não transformar isso em quatro cards SaaS comuns.

Criar uma experiência editorial.

DESKTOP:

lado esquerdo:
número + texto do pilar.

lado direito:
uma grande imagem correspondente.

Usar section sticky.

Quando o usuário rolar:
- texto ativo muda;
- imagem correspondente é revelada;
- indicador vertical acompanha progresso.

Cada pilar ocupa aproximadamente uma viewport de scroll.

Imagem utilizando mask/clip-path transition em vez de simples fade.

--------------------------------------------------
04 — LOCALIZAÇÃO
--------------------------------------------------

A localização precisa parecer parte do produto.

Eyebrow:

ALTO · TERESÓPOLIS

Headline:

Entre a natureza
e tudo que faz parte
da sua rotina.

Texto:

O Nature está no Alto, uma das regiões mais desejadas de Teresópolis, próximo a serviços, comércio, gastronomia e conveniências, preservando a atmosfera da serra.

Mostrar endereço:

Rua Hidelgardo de Noronha, 1516
Alto · Teresópolis — RJ

Criar um mapa sofisticado, monocromático e integrado ao design.

Nada de iframe do Google Maps visualmente solto.

Adicionar pontos de contexto de forma discreta:
- gastronomia;
- comércio;
- serviços;
- natureza;
- principais acessos.

Não colocar dezenas de marcadores.

Abaixo ou lateralmente criar dois pequenos textos editoriais:

TERESÓPOLIS

“Você já vive onde muitas pessoas gostariam de estar.
Agora pode viver Teresópolis em um novo padrão.”

RIO DE JANEIRO

“O seu padrão continua.
O ritmo da vida muda.”

Não atacar Rio de Janeiro.

Não usar discurso de fuga da cidade.

--------------------------------------------------
05 — PLANTAS
--------------------------------------------------

Criar uma das sessões visualmente mais importantes da página.

Eyebrow:

UM ESPAÇO PARA CADA MOMENTO

Headline:

Encontre o espaço
que acompanha a sua vida.

Texto:

Apartamentos de 2 e 3 quartos com diferentes configurações para quem busca praticidade, conforto ou espaços maiores para viver.

Mostrar metragens:

65,88 m²
76,40 m²
146,19 m²
292,49 m²

IMPORTANTE:

Não associar uma quantidade específica de quartos a uma metragem se essa relação não estiver explicitamente confirmada nos dados disponíveis.

Não inventar:
- suítes;
- vagas;
- quantidade de banheiros;
- posição solar;
- preços.

DESKTOP:

Criar seletor elegante das metragens.

Ao trocar:
a planta correspondente ocupa grande área da tela.

Transição:
opacity + mask reveal.

Possibilidade de botão:

“Ampliar planta”

E CTA:

“Consultar disponibilidade desta configuração”

No mobile:
slider horizontal extremamente fluido.

--------------------------------------------------
06 — MAIS DO QUE ÁREAS COMUNS
--------------------------------------------------

Aqui não apresentar uma lista de amenities sem contexto.

Eyebrow:

O ESSENCIAL TAMBÉM ESTÁ NO TEMPO

Headline:

Uma estrutura pensada
para fazer a vida acontecer
mais perto de casa.

Criar experiência visual para:

Piscina
Deck
Sauna a vapor
Academia
Espaço gourmet
Fireplace
Game zone
Playground
Easy market
Lavanderia compartilhada

Separar conceitualmente em:

VIVER
Piscina
Sauna
Academia

REUNIR
Espaço gourmet
Fireplace

FACILITAR
Easy market
Lavanderia

COMPARTILHAR
Playground
Game zone

Pode existir um gallery rail horizontal no desktop controlado pelo scroll.

O usuário rola verticalmente e as imagens atravessam horizontalmente.

Não exagerar na velocidade.

Inserir pequenos textos relacionando estrutura com:
tempo;
conveniência;
família;
rotina.

--------------------------------------------------
07 — ARQUITETURA + NATUREZA
--------------------------------------------------

Esta seção deve ser extremamente visual.

Utilizar imagens reais do empreendimento.

Headline:

Arquitetura que não
compete com a natureza.

Texto:

Grandes aberturas, varandas, luz natural, materiais de tons neutros e paisagismo integrado criam uma relação contínua entre arquitetura e ambiente.

Criar composição editorial:
imagem grande + duas imagens secundárias.

Ao scroll:
imagens podem mudar discretamente de escala e posição.

Criar detalhes tipográficos:

LUZ NATURAL

PAISAGISMO INTEGRADO

ARQUITETURA CONTEMPORÂNEA

MATERIAIS NATURAIS

Usar esses elementos como legendas arquitetônicas, não como cards.

--------------------------------------------------
08 — GALERIA IMERSIVA
--------------------------------------------------

Criar galeria com:
fachada;
interiores;
lazer;
paisagismo.

Layout irregular/editorial.

Evitar grid 3x3 padrão.

Imagens grandes.

Alternar:
full-width;
duas colunas;
imagem vertical;
imagem horizontal.

Scroll reveal com mask.

Lightbox ao clicar.

Cursor customizado extremamente discreto em desktop:

VER IMAGEM

Não usar no mobile.

--------------------------------------------------
09 — SEGURANÇA DA ESCOLHA
--------------------------------------------------

ESTA SEÇÃO PRECISA APARECER ANTES DO FORMULÁRIO.

Criar transição visual para Gênesis Empreendimentos.

Eyebrow:

UMA ESCOLHA DESSE TAMANHO
PRECISA DE CONFIANÇA.

Headline:

Um novo padrão de vida
também exige segurança
na decisão.

Mostrar provas:

Gênesis Empreendimentos

ISO 9001

PBQP-H Nível A

Parceria com a Caixa Econômica Federal

Atuação consolidada na Região Serrana

Assistência pós-entrega apresentada pela empresa

Usar logos oficiais quando disponíveis.

Não inventar selos.

Não mostrar métricas como:
“15+ anos”
“5.000 famílias”
“80% vendido”
ou qualquer outro número institucional/comercial sem confirmação.

Mesmo que esses dados existam em versões anteriores do site, criar o componente de forma que os valores possam ser inseridos posteriormente.

A credibilidade deve parecer institucional e premium.

Não uma seção cheia de badges.

--------------------------------------------------
10 — CTA / CONVERSÃO
--------------------------------------------------

Depois de toda a construção narrativa, criar um CTA final forte.

Fundo utilizando uma das cores principais do Nature.

Pode existir imagem arquitetônica ao fundo parcialmente visível.

Eyebrow:

ENCONTRE A CONFIGURAÇÃO IDEAL

Headline:

Qual é o espaço
do seu próximo momento?

Texto:

Consulte as plantas e unidades disponíveis e descubra qual configuração do Nature combina melhor com a sua vida.

Formulário curto:

Nome
WhatsApp
E-mail

CTA:

“Consultar plantas e unidades”

Checkbox LGPD discreto.

Após envio, prever estado visual de sucesso.

CTA alternativo:
“Falar com um especialista”

NÃO usar:

“CORRA”
“ÚLTIMA CHANCE”
“APROVEITE AGORA”
“OFERTA IMPERDÍVEL”
contadores regressivos
popups de falsa urgência
quantidades falsas de pessoas olhando
escassez não comprovada.

A única urgência permitida deve estar relacionada à disponibilidade REAL de tipologia/unidade.

--------------------------------------------------
11 — FOOTER
--------------------------------------------------

Footer elegante e simples.

Nature Residencial
Gênesis Empreendimentos

Endereço

Rua Hidelgardo de Noronha, 1516
Alto · Teresópolis — RJ

Links:
O Nature
Plantas
Localização
Contato
Política de Privacidade

Contatos institucionais existentes.

Redes sociais.

Nada excessivamente grande.

--------------------------------------------------
ELEMENTOS DE CONVERSÃO
--------------------------------------------------

Depois que o usuário ultrapassar aproximadamente 35% da página, adicionar um CTA discreto sticky no desktop:

“Consultar unidades”

Não ocupar muito espaço.

No mobile:
barra fixa inferior compacta:

“Consultar disponibilidade”

Ela deve respeitar safe areas do iOS.

Não abrir popups automaticamente.

--------------------------------------------------
RESPONSIVIDADE
--------------------------------------------------

Não quero apenas o desktop reduzido.

Criar experiência específica para mobile.

Desktop:
1440px como viewport principal.

Também validar:
1920
1280
1024

Mobile:
390px como referência principal.

Também validar:
430
375

Tablet:
768.

No mobile:

- hero continua impactante;
- evitar headline minúscula;
- imagens continuam grandes;
- reduzir espaços excessivos;
- transformar sticky storytelling em sequências naturais quando necessário;
- amenities viram slider;
- plantas viram slider;
- galeria continua editorial;
- evitar pinning longo;
- remover cursor customizado;
- reduzir parallax.

--------------------------------------------------
GRID
--------------------------------------------------

Desktop:
12 colunas.

Max-width entre aproximadamente:
1280–1360px.

Laterais generosas.

Usar bastante espaço negativo.

Textos principais nunca devem ocupar largura exagerada.

Headlines devem ter aparência editorial.

Criar hierarquia usando escala e composição, não dezenas de pesos diferentes.

--------------------------------------------------
DESIGN
--------------------------------------------------

O resultado NÃO deve parecer:

template imobiliário;
site feito por IA;
landing page de infoproduto;
dashboard;
site de startup;
site de arquitetura experimental difícil de navegar.

Referência conceitual:

editorial imobiliário premium +
arquitetura contemporânea +
natureza +
conversão sofisticada.

Criar ritmo visual alternando:

imagem;
texto;
espaço negativo;
experiência sticky;
conteúdo arquitetônico;
prova.

Não colocar tudo dentro de cards.

Evitar:
border-radius excessivo;
cards flutuantes;
sombras pesadas;
gradientes modernos genéricos;
bento grid por todo lado;
ícones Lucide em todas as sessões.

--------------------------------------------------
IMAGENS
--------------------------------------------------

Sempre priorizar materiais REAIS do Nature.

Usar:
renders oficiais;
plantas oficiais;
imagens dos ambientes;
fachada;
paisagismo;
áreas comuns.

Não criar imagens falsas do edifício.

Não criar pessoas por IA.

Não modificar características arquitetônicas.

Quando uma imagem ainda não estiver disponível, criar apenas um placeholder visual claramente substituível e manter o aspect ratio correto.

--------------------------------------------------
COPY
--------------------------------------------------

Todo texto deve obedecer a esta lógica:

EMOÇÃO → ATRIBUTO REAL.

Exemplo:

“mais espaço”
→ plantas e metragens.

“mais tempo”
→ lazer e conveniência.

“mais natureza”
→ paisagismo, arquitetura e localização.

“tranquilidade”
→ atmosfera do Alto sem isolamento da cidade.

Evitar completamente:

“paraíso”
“refúgio perfeito”
“sonho de consumo”
“luxo ao seu alcance”
“oportunidade imperdível”

Não escrever manifesto abstrato sem mostrar produto.

Não prometer:
valorização;
rentabilidade;
retorno de investimento.

--------------------------------------------------
PERFORMANCE
--------------------------------------------------

Mesmo sendo uma página altamente animada, performance importa.

Prever:

lazy loading;
responsive images;
WebP/AVIF;
carregamento prioritário apenas da imagem do Hero;
animações baseadas principalmente em transform e opacity;
will-change somente quando necessário;
limpeza das instâncias GSAP;
cleanup dos listeners;
destruição das ScrollMagic Scenes ao desmontar;
prefers-reduced-motion;
sem vídeos pesados em autoplay se não forem necessários.

SplitText deve usar principalmente:
lines/words.

Evitar milhares de spans de caracteres.

--------------------------------------------------
ACESSIBILIDADE
--------------------------------------------------

Manter semântica HTML clara.

Um único H1.

Headings em ordem correta.

Contraste adequado.

Links e botões navegáveis por teclado.

Alt text para imagens.

Focus states.

aria-label onde necessário.

SplitText não pode prejudicar leitores de tela.

--------------------------------------------------
RESULTADO FINAL
--------------------------------------------------

Entregue uma página visualmente completa.

Não entregue wireframe.

Não use blocos genéricos.

Não use lorem ipsum.

Crie todo o layout já com copy real.

Todas as sessões precisam parecer parte do mesmo sistema visual.

Quero que a sensação ao terminar a página seja:

“Eu já conquistei uma determinada forma de viver.
O Nature parece ser a evolução natural desse momento.”

E a conclusão visual e verbal da experiência deve voltar para:

NATURE.
O ESSENCIAL EM UM NOVO PADRÃO.