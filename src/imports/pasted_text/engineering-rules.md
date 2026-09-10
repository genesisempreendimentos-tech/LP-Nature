REGRAS FINAIS DE ENGENHARIA

A implementação deve separar claramente:

DESIGN
components/nature/

MOTION
motion/

CONTEÚDO
data/

TOKENS
styles/theme.css

Não misturar conteúdo, animação e layout dentro de componentes monolíticos.

--------------------------------------------------
TAILWIND CSS
--------------------------------------------------

Assumir Tailwind CSS v4.

Utilizar configuração CSS-first.

Criar os tokens do Nature através de:

@theme

Exemplo estrutural:

@import "tailwindcss";

@theme {
  --color-nature-background: ...;
  --color-nature-surface: ...;
  --color-nature-text: ...;
  --color-nature-muted: ...;
  --color-nature-primary: ...;
  --color-nature-accent: ...;

  --font-display: ...;
  --font-body: ...;

  --spacing-section: ...;

  --radius-nature: ...;

  --breakpoint-wide: ...;
}

Não espalhar cores hexadecimais pelo JSX.

Não utilizar valores diferentes para representar semanticamente a mesma cor.

Quando um token não precisar gerar uma utility Tailwind, utilizar variável CSS normal em :root.

--------------------------------------------------
RESPONSIVE MOTION
--------------------------------------------------

Não utilizar:

window.innerWidth

para decidir qual timeline GSAP deve existir.

Não criar DOM desktop e DOM mobile duplicados apenas para animações.

Manter a mesma estrutura semântica sempre que possível.

Controlar comportamento utilizando:

gsap.matchMedia()

Criar condições:

isDesktop:
(min-width: 1024px)

isTablet:
(min-width: 768px) and (max-width: 1023px)

isMobile:
(max-width: 767px)

reduceMotion:
(prefers-reduced-motion: reduce)

Exemplo conceitual:

useGSAP(() => {

  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    },
    context => {

      const {
        isDesktop,
        isMobile,
        reduceMotion
      } = context.conditions;

      if (reduceMotion) {
        return;
      }

      if (isDesktop) {
        // enhanced motion
      }

      if (isMobile) {
        // simplified motion
      }

    }
  );

  return () => mm.revert();

}, {
  scope: containerRef
});

--------------------------------------------------
LENIS
--------------------------------------------------

Não instalar Lenis inicialmente.

FASE 1:
scroll nativo + ScrollTrigger.

FASE 2:
analisar experiência.

FASE 3:
somente então experimentar Lenis.

Caso Lenis seja adicionado:

integrá-lo ao ticker do GSAP.

Exemplo conceitual:

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

Sincronizar atualizações de scroll quando necessário.

IMPORTANTE:

Não assumir:

gsap.ticker.lagSmoothing(0)

como regra obrigatória.

Manter inicialmente o comportamento padrão do GSAP.

Alterar lagSmoothing apenas se testes reais demonstrarem problema de sincronização.

Não aplicar otimizações copiadas de snippets sem medir impacto.

--------------------------------------------------
PERFORMANCE BUDGET
--------------------------------------------------

O site deve manter percepção de 60fps em equipamentos modernos.

Não perseguir 60fps adicionando complexidade desnecessária.

Prioridades:

1. nenhuma animação bloqueia interação;
2. nada causa Layout Shift relevante;
3. nada exige cálculo pesado contínuo;
4. animações utilizam preferencialmente transform e opacity;
5. imagens possuem dimensões conhecidas antes de carregar;
6. timelines não são recriadas a cada render;
7. listeners são destruídos corretamente.

Não utilizar ScrollTrigger para elementos que podem ser resolvidos simplesmente com CSS.

--------------------------------------------------
SCROLLTRIGGER
--------------------------------------------------

Utilizar ScrollTrigger apenas onde o scroll realmente fizer parte da narrativa.

Bom uso:

Hero progression
LifeMoment storytelling
Pillars sticky
Gallery horizontal
Arquitetura parallax
scroll progress

Não utilizar ScrollTrigger para:

hover;
botões;
accordion;
dropdown;
simples estados visuais.

Para esses casos utilizar CSS ou GSAP convencional.

--------------------------------------------------
PINNING
--------------------------------------------------

O layout base NÃO pode depender do pin.

Antes do JavaScript:

o conteúdo deve possuir fluxo vertical normal.

O ScrollTrigger transforma essa estrutura em experiência pinned somente no desktop.

Não escrever CSS dependendo diretamente da existência de:

.pin-spacer

Não editar manualmente o pin-spacer.

Ele pertence ao ScrollTrigger.

Após mudanças estruturais relevantes, imagens dinâmicas ou troca de conteúdo:

executar ScrollTrigger.refresh()
quando realmente necessário.

Evitar refresh contínuo.

--------------------------------------------------
IMAGE ARCHITECTURE
--------------------------------------------------

Toda imagem deve possuir:

width
height

ou:

aspect-ratio

antes de carregar.

Para Next.js:

priorizar next/image.

Hero:
priority apenas para o asset principal above-the-fold.

Restante:
lazy loading.

Definir sizes corretamente.

Não carregar uma imagem de 2500px quando o slot possui 500px.

Manter placeholder com token Nature.

--------------------------------------------------
CMS READY
--------------------------------------------------

Conteúdo não deve morar diretamente na timeline.

ERRADO:

gsap.to(... {
  onComplete: () => {
    element.innerText = "Mais natureza";
  }
});

CORRETO:

conteúdo renderizado pelo React.

GSAP apenas controla:

posição;
opacidade;
máscara;
progresso;
estado visual.

Isso mantém o projeto pronto para CMS.

--------------------------------------------------
ARQUITETURA FINAL
--------------------------------------------------

src/

app/

components/
  nature/
    Header.tsx
    Hero.tsx
    LifeMoment.tsx
    Pillars.tsx
    Location.tsx
    FloorPlans.tsx
    Amenities.tsx
    Architecture.tsx
    Gallery.tsx
    Trust.tsx
    LeadForm.tsx
    Footer.tsx

motion/
  RevealText.tsx
  RevealImage.tsx
  ParallaxImage.tsx
  PinnedStory.tsx
  HorizontalGallery.tsx
  ScrollProgress.tsx

data/
  nature.ts

styles/
  theme.css

lib/
  gsap.ts

--------------------------------------------------
REGRA FINAL
--------------------------------------------------

Primeiro construa uma página excelente sem GSAP.

Depois adicione GSAP.

A experiência estática precisa já parecer premium, completa e pronta para produção.

As animações entram somente como uma segunda camada de qualidade.

Se retirar todo o JavaScript de motion e o design perder sua qualidade ou sua narrativa deixar de fazer sentido, a implementação está errada.