IMPORTANTE — ARQUITETURA DE ANIMAÇÕES

Desconsidere qualquer orientação anterior para utilizar ScrollMagic.

Utilize como stack oficial de animações:

- GSAP 3
- GSAP ScrollTrigger
- GSAP SplitText
- @gsap/react
- useGSAP()
- Lenis apenas como enhancement opcional

O ScrollTrigger deve ser responsável por:

- pinning;
- scrub;
- progress de scroll;
- timelines ligadas ao scroll;
- reveals;
- seções sticky;
- galerias horizontais;
- troca de estados;
- parallax sutil.

Não instalar ScrollMagic.

--------------------------------------------------
REACT + GSAP
--------------------------------------------------

Toda animação de componentes React deve ser criada utilizando:

useGSAP()

e um container ref como scope sempre que possível.

Exemplo conceitual:

const sectionRef = useRef(null)

useGSAP(() => {
  // timelines
  // ScrollTriggers
}, {
  scope: sectionRef
})

Não criar animações GSAP diretamente no corpo do componente.

Não espalhar querySelector pelo projeto.

Evitar múltiplos refs quando o scope do useGSAP puder resolver os seletores.

Garantir cleanup automático ao desmontar componentes.

Registrar plugins apenas uma vez na camada apropriada:

gsap.registerPlugin(
  ScrollTrigger,
  SplitText,
  useGSAP
)

--------------------------------------------------
ARQUITETURA DE MOTION
--------------------------------------------------

Criar primitives reutilizáveis para animação.

Sugestão:

RevealText
RevealImage
ScrollProgress
PinnedStory
HorizontalGallery
ParallaxImage
PlantSwitcher

Cada primitive deve receber propriedades.

Exemplo:

<RevealText
  type="lines"
  stagger={0.08}
  duration={1}
  yPercent={105}
/>

Evitar recriar a mesma timeline em todas as seções.

--------------------------------------------------
PROGRESSIVE ENHANCEMENT
--------------------------------------------------

A página deve funcionar 100% sem animações.

Regra:

HTML e CSS apresentam todo o conteúdo inicialmente em estado válido.

JavaScript apenas aprimora a experiência.

Não deixar elementos permanentemente:

opacity: 0

ou

visibility: hidden

antes da inicialização do GSAP.

Se JavaScript falhar:
o usuário ainda deve conseguir ler todo o site e enviar o formulário.

--------------------------------------------------
MOBILE PERFORMANCE
--------------------------------------------------

Não simplesmente reproduzir as animações desktop.

Utilizar:

ScrollTrigger.matchMedia()

ou gsap.matchMedia().

Criar comportamentos diferentes.

DESKTOP

Pode utilizar:

- pin;
- scrub;
- horizontal scrolling;
- parallax;
- SplitText;
- sticky storytelling.

MOBILE

Priorizar:

- entrada simples;
- pequenas transições;
- sliders nativos;
- scroll normal;
- menos elementos simultaneamente animados.

Remover ou simplificar:

- pinning longo;
- horizontal scroll controlado por scroll;
- parallax complexo;
- timelines muito extensas.

--------------------------------------------------
PREFERS REDUCED MOTION
--------------------------------------------------

Detectar:

prefers-reduced-motion: reduce

Nesse cenário:

- remover scrub;
- remover parallax;
- remover pinning narrativo;
- remover movimentos contínuos;
- reduzir duração de transições;
- manter conteúdo imediatamente visível.

--------------------------------------------------
LENIS
--------------------------------------------------

Lenis NÃO é obrigatório.

Primeiro implemente toda a experiência utilizando scroll nativo + ScrollTrigger.

Somente utilizar Lenis se:

- realmente melhorar a experiência;
- não causar problemas de pin;
- não prejudicar mobile;
- não prejudicar acessibilidade;
- não aumentar significativamente o custo de manutenção.

Caso Lenis seja utilizado:

sincronizar seu requestAnimationFrame com GSAP.

Atualizar ScrollTrigger durante mudanças de scroll.

Garantir que:

ScrollTrigger.refresh()

seja executado após mudanças relevantes de layout.

Não criar dois loops de requestAnimationFrame independentes.

--------------------------------------------------
DESIGN TOKENS
--------------------------------------------------

Antes de desenvolver as seções, criar uma camada de tokens baseada no Nature existente.

Estrutura conceitual:

--nature-background
--nature-background-alt
--nature-surface
--nature-text
--nature-text-muted
--nature-primary
--nature-accent
--nature-border

--font-display
--font-body

--space-xs
--space-sm
--space-md
--space-lg
--space-xl
--space-2xl

--radius-sm
--radius-md

Também definir:

container-max-width
header-height
grid-gap
section-spacing

Não adicionar valores arbitrários diferentes em cada componente.

--------------------------------------------------
IMAGENS / CLS
--------------------------------------------------

Toda imagem deve possuir espaço reservado antes de carregar.

Definir aspect-ratio explicitamente.

Exemplos possíveis:

Hero:
16 / 10 ou proporção compatível com o asset oficial.

Retrato arquitetônico:
4 / 5

Galeria horizontal:
16 / 9

Plantas:
aspect ratio correspondente ao arquivo real.

Não utilizar altura determinada somente após carregamento da imagem.

Para placeholders:

utilizar uma cor neutra derivada da paleta real do Nature.

Nada de skeleton azul/cinza de dashboard.

--------------------------------------------------
COMPONENTIZAÇÃO
--------------------------------------------------

Evitar criar uma única HomePage com centenas de linhas.

Estrutura esperada:

components/
  nature/
    Header
    Hero
    LifeMoment
    Pillars
    Location
    FloorPlans
    Amenities
    Architecture
    Gallery
    Trust
    LeadForm
    Footer

motion/
    RevealText
    RevealImage
    PinnedStory
    HorizontalScroll
    ParallaxImage

data/
    nature.ts

Separar conteúdo de implementação.

Exemplo conceitual:

const floorPlans = [
  {
    area: "65,88 m²",
    image: "...",
    available: true
  }
]

Isso deve permitir futuramente mover os conteúdos para CMS sem reescrever as animações.

--------------------------------------------------
GALERIA
--------------------------------------------------

Não codificar posições arbitrárias para cada imagem.

Construir um sistema editorial controlado.

Exemplo:

gallery-item--wide
gallery-item--portrait
gallery-item--landscape
gallery-item--offset

As composições devem utilizar:

CSS Grid
grid-column
aspect-ratio

e não dezenas de:

position: absolute

Isso é essencial para manter responsividade.

--------------------------------------------------
FALLBACK DAS SEÇÕES PINNED
--------------------------------------------------

Toda seção pinned deve possuir uma versão estrutural normal.

Desktop:
storytelling baseado em scroll.

Mobile ou reduced-motion:
blocos sequenciais normais.

Nunca depender exclusivamente de pin para mostrar conteúdo.

--------------------------------------------------
FORMULÁRIO
--------------------------------------------------

O formulário deve permanecer funcional independentemente do sistema de animação.

Estados:

idle
loading
success
error

Desabilitar botão apenas durante loading.

Manter mensagem de erro acessível.

Não utilizar animações GSAP para esconder feedback obrigatório do usuário.

--------------------------------------------------
CRITÉRIO PRINCIPAL
--------------------------------------------------

Não avaliar a qualidade da implementação pela quantidade de animações.

Prioridades:

1. narrativa;
2. legibilidade;
3. qualidade visual;
4. responsividade;
5. performance;
6. motion.

Motion deve elevar as cinco primeiras.

Se uma animação comprometer performance, legibilidade ou estabilidade, simplifique ou remova.