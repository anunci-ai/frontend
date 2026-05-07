import * as React from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Testimonial = {
  name: string
  username: string
  content: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    name: "Marina Santos",
    username: "@marina.santos",
    content:
      "Incrível como o Anuncia.ai transformou minhas fotos de produtos! Em segundos, tenho anúncios profissionais prontos para publicar.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Ricardo Oliveira",
    username: "@ricardo.vendas",
    content:
      "Uso todos os dias para criar listings no Mercado Livre. O SEO gerado é impressionante - minhas visualizações triplicaram.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Carla Mendes",
    username: "@carla.boutique",
    content:
      "Como dona de boutique online, preciso de muitos anúncios rápidos. Essa ferramenta é essencial no meu fluxo de trabalho.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Bruno Ferreira",
    username: "@bruno.tech",
    content:
      "A qualidade do conteúdo gerado me surpreendeu. Parece que foi escrito por alguém que entende de vendas.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Fernanda Costa",
    username: "@fernanda.estilo",
    content:
      "Finalmente uma ferramenta que entende o mercado brasileiro! Os anúncios ficam naturais e atraentes.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "André Lima",
    username: "@andre.ebay",
    content:
      "Testei muitas ferramentas de IA para criar anúncios. Essa é de longe a melhor para o mercado brasileiro.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Juliana Rocha",
    username: "@ju.modaintima",
    content:
      "Automatizou completamente minha criação de anúncios. O que antes levava horas, agora faço em minutos.",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Pedro Henrique",
    username: "@pedro.autoparts",
    content:
      "A descrição gerada é perfeita para SEO. Meus produtos estão aparecendo nas primeiras posições.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
]

const CARD_WIDTH = 420
const CARD_GAP = 24
const CARD_TOTAL = CARD_WIDTH + CARD_GAP

function TestimonialCard({
  testimonial,
  style,
}: {
  testimonial: Testimonial
  style?: React.CSSProperties
}) {
  return (
    <div
      className="flex h-50 w-105 shrink-0 flex-col rounded-2xl border border-border/50 bg-card/80 p-5 shadow-lg backdrop-blur-sm"
      style={style}
    >
      <div className="flex items-center gap-3">
        <Avatar className="size-12 ring-2 ring-primary/20">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-card-foreground">
            {testimonial.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {testimonial.username}
          </span>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-card-foreground/80">
        &ldquo;{testimonial.content}&rdquo;
      </p>
    </div>
  )
}

function MarqueeRow({
  testimonials,
  direction = 1,
  duration = 40,
  delay = 0,
}: {
  testimonials: Testimonial[]
  direction?: 1 | -1
  duration?: number
  delay?: number
}) {
  const duplicated = [...testimonials, ...testimonials]

  return (
    <div className="relative flex w-full items-center overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{
          x:
            direction === 1
              ? [0, -CARD_TOTAL * testimonials.length]
              : [-CARD_TOTAL * testimonials.length, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "reverse",
            duration,
            ease: "linear",
            delay,
          },
        }}
        style={{ display: "flex", gap: CARD_GAP }}
      >
        {duplicated.map((testimonial, index) => (
          <TestimonialCard
            key={`${testimonial.username}-${index}`}
            testimonial={testimonial}
          />
        ))}
      </motion.div>
    </div>
  )
}

export function TestimonialCarousel() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-muted px-8 py-12">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/80" />

      <div className="relative z-10 flex w-full flex-col gap-8">
        <MarqueeRow
          testimonials={testimonials.slice(0, 4)}
          direction={1}
          duration={35}
          delay={0}
        />
        <MarqueeRow
          testimonials={testimonials.slice(4, 8)}
          direction={-1}
          duration={45}
          delay={2}
        />
      </div>
    </div>
  )
}
