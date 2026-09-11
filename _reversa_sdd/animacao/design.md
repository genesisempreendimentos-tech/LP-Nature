# Animação, Design Técnico

> Unit de módulo · `animacao` · Writer · 2026-09-10  
> Foca no COMO a unit é construída, com base no código legado lido.

## Interface

| Símbolo | Assinatura | Retorno | Observação |
|---------|------------|---------|------------|
| `usePageMotion` | `(scope, ready)` | void | useGSAP scoped |
| `RevealText` | `({text, as?, className?, delay?})` | JSX | SplitText se h2/h3 |
| `natureEase` | CustomEase | ease | nature-out |

### Registry (seletores em usePageMotion)

| Seletor / trigger | Efeito |
|-------------------|--------|
| `[data-motion-heading]` | SplitText lines from |
| `.contact-copy > p` | fade/slide |
| `.pillar-grid` | timeline items + images |
| `.location-experience` | map/panel/proximity |
| `.amenities-rail` | amenity-card stagger |
| `.architecture-gallery` | architecture-image |
| `.trust-certifications` | trust-certificate |

## Fluxo Principal

1. Plugins registrados (motion/gsap + main). 🟢
2. App chama usePageMotion(pageRef, ready). 🟢
3. Se ready, matchMedia cria ScrollTriggers. 🟢
4. RevealText monta tweens locais. 🟢

## Fluxos Alternativos

- **ready false→true:** revertOnUpdate recria. 🟢
- **lib/gsap.ts vs motion/gsap.ts:** Dois pontos de registro — possível redundância. 🟡

## Dependências

- gsap
- @gsap/react
- SplitText (club?)
- ScrollTrigger
- CustomEase

## Decisões de Design Identificadas

| Decisão | Evidência no código | Confiança |
|---------|---------------------|-----------|
| GSAP ScrollTrigger em vez de ScrollMagic (ADR-001) | `motion/gsap.ts` | 🟢 |
| Scroll nativo sem Lenis (ADR-005) | sem lenis no repo | 🟢 |
| Registry centralizado no hook vs motion por seção | `usePageMotion.ts` | 🟢 |

## Estado Interno

Nenhum React state; GSAP/ScrollTrigger no runtime. 🟢

## Observabilidade

Nenhuma. 🟢

## Riscos e Lacunas

- 🟡 Duplicidade main.tsx / lib/gsap.ts / motion/gsap.ts.
- 🟡 SplitText pode exigir licença GSAP Club — validar deploy.
- 🟡 useScrollDirection não usado pelo Header — possível morto.
