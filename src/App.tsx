/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MapPin,
  Instagram,
  Star,
  Clock,
  ArrowUpRight,
  Copy,
  Check,
  Share2,
  Navigation,
  Utensils,
  Maximize2,
  X,
  Phone,
} from 'lucide-react';

const BRAND_DATA = {
  name: 'POINT DA FAVA',
  category: 'Bar & Restaurante',
  foundedYear: 2011,
  heroHeadline: 'Tradição e sabor em Jaboatão desde 2011.',
  heroSubtext: 'Há mais de uma década fazendo parte dos bons momentos de Jaboatão.',
  traditionTitle: 'Uma tradição que começou em 2011.',
  traditionBody:
    'Mais do que um bar e restaurante, o Point da Fava faz parte da história de Jaboatão. São anos de tradição, encontros e bons momentos. Venha conhecer nosso espaço!',
  addressStreet: 'Rua Santa Mônica, 360',
  addressCity: 'Jaboatão dos Guararapes – PE',
  addressFull: 'Rua Santa Mônica, 360 – Jaboatão dos Guararapes – PE',
  hours: 'ABERTO TODOS OS DIAS',
  whatsappNumber: '(81) 98735-4683',
  whatsappUrl: 'https://wa.me/5581987354683',
  mapsUrl: 'https://maps.app.goo.gl/uqpv1CYWWAwcMP3m9',
  instagramUrl: 'https://www.instagram.com/pointdafava/',
  instagramHandle: '@pointdafava',
  googleReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ6YYcK5fhqgcRwBI5wKNIhK4',
  imageLocal: '/pointdafava.jpg',
  imageExternal:
    'https://i.postimg.cc/zGTz7ThK/pointdafava-1790593603-3996111013291985416-7485246140.jpg',
};

function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

export default function App() {
  const [imgSrc, setImgSrc] = useState<string>(BRAND_DATA.imageLocal);
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const [copiedField, setCopiedField] = useState<'address' | 'phone' | 'link' | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleImageError = () => {
    if (imgSrc === BRAND_DATA.imageLocal) {
      setImgSrc(BRAND_DATA.imageExternal);
    } else {
      setImgFailed(true);
    }
  };

  const handleCopy = async (text: string, field: 'address' | 'phone' | 'link') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      window.setTimeout(() => {
        setCopiedField((prev) => (prev === field ? null : prev));
      }, 2200);
    } catch {
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Point da Fava — Bar & Restaurante desde 2011',
          text: 'Tradição e sabor em Jaboatão desde 2011. Rua Santa Mônica, 360 – Jaboatão dos Guararapes – PE.',
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to copy URL if user cancels or share fails
      }
    }
    handleCopy(shareUrl, 'link');
  };

  const primaryActions = [
    {
      id: 'whatsapp',
      label: 'WHATSAPP',
      subtitle: 'Fale conosco',
      meta: BRAND_DATA.whatsappNumber,
      href: BRAND_DATA.whatsappUrl,
      icon: WhatsAppIcon,
      isPrimary: true,
    },
    {
      id: 'maps',
      label: 'COMO CHEGAR',
      subtitle: 'Encontre nossa localização',
      meta: BRAND_DATA.addressStreet,
      href: BRAND_DATA.mapsUrl,
      icon: MapPin,
      isPrimary: false,
    },
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      subtitle: 'Acompanhe nosso Instagram',
      meta: BRAND_DATA.instagramHandle,
      href: BRAND_DATA.instagramUrl,
      icon: Instagram,
      isPrimary: false,
    },
    {
      id: 'review',
      label: 'AVALIE NO GOOGLE',
      subtitle: 'Sua opinião é importante',
      meta: 'Avaliação rápida no Google',
      href: BRAND_DATA.googleReviewUrl,
      icon: Star,
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-[#14261B] selection:bg-[#C88A2B]/20">
      {/* Top Navigation Bar — Strict 3-Zone Contract */}
      <header className="sticky top-0 z-30 bg-[#FAF6EE]/95 backdrop-blur-md border-b border-[#14261B]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Title (single text element, one line) */}
          <a
            href="#apresentacao"
            className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#14261B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C88A2B]"
          >
            POINT DA FAVA
          </a>

          {/* Zone 2: Concise single-line navigation links */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#14261B]/75"
          >
            <a
              href="#canais"
              className="hover:text-[#14261B] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Canais de Atendimento
            </a>
            <a
              href="#tradicao"
              className="hover:text-[#14261B] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Nossa Tradição
            </a>
            <a
              href="#localizacao"
              className="hover:text-[#14261B] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Localização
            </a>
            <a
              href="#funcionamento"
              className="hover:text-[#14261B] underline-offset-4 hover:underline transition-colors whitespace-nowrap shrink-0"
            >
              Funcionamento
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-[#14261B] bg-[#EFE7D6] hover:bg-[#E5DAC3] border border-[#14261B]/15 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A2B]"
            >
              {copiedField === 'link' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1E4620]" />
                  <span>Link copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#9A6518]" />
                  <span>Compartilhar Bio</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* SEÇÃO 1 (APRESENTAÇÃO) & SEÇÃO 2 (BOTÕES PRINCIPAIS) */}
        <section
          id="apresentacao"
          className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-12 sm:py-12 lg:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Coluna de Apresentação & Identidade Visual */}
            <div className="lg:col-span-6 flex flex-col">
              {/* Fotografia de Referência do Estabelecimento */}
              <div className="relative rounded-2xl overflow-hidden bg-[#14261B] border border-[#14261B]/15 shadow-sm">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
                  {!imgFailed ? (
                    <img
                      src={imgSrc}
                      onError={handleImageError}
                      referrerPolicy="no-referrer"
                      alt="Fotografia de referência do Point da Fava na Rua Santa Mônica, 360 em Jaboatão dos Guararapes"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#14261B] text-[#FAF6EE]">
                      <Utensils className="w-10 h-10 text-[#C88A2B] mb-3" />
                      <span className="font-display text-2xl font-bold tracking-tight">
                        {BRAND_DATA.name}
                      </span>
                      <span className="text-sm text-[#FAF6EE]/75 mt-1">
                        {BRAND_DATA.addressFull}
                      </span>
                    </div>
                  )}

                  {/* Scrim calibrado para contraste perfeito */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0D1A12]/85 via-[#0D1A12]/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Botão de ampliação */}
                  <div className="absolute top-3 right-3 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      aria-label="Ampliar fotografia do estabelecimento"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-[#0D1A12]/80 hover:bg-[#0D1A12] text-[#FAF6EE] backdrop-blur-md border border-[#FAF6EE]/15 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#C88A2B]" />
                      <span>Ampliar</span>
                    </button>
                  </div>

                  {/* Legenda inferior sobre a foto */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-4 text-[#FAF6EE]">
                    <div>
                      <p className="text-xs font-medium tracking-wide text-[#E5C17B]">
                        {BRAND_DATA.addressStreet} · Jaboatão
                      </p>
                      <p className="text-xs text-[#FAF6EE]/80">
                        Esquina tradicional em Cajueiro Seco
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco Tipográfico de Apresentação */}
              <div className="mt-6 sm:mt-7">
                {/* Identificação limpa (Zero-Pill Metadata) */}
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-[#8C5A14] tabular-nums">
                  <span>{BRAND_DATA.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Desde {BRAND_DATA.foundedYear}</span>
                  <span aria-hidden="true">·</span>
                  <span>Jaboatão dos Guararapes, PE</span>
                </div>

                {/* Nome em destaque */}
                <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-[#14261B] leading-[1.1] [text-wrap:balance]">
                  {BRAND_DATA.name}
                </h1>

                {/* Frase oficial em destaque */}
                <p className="mt-3 font-display text-lg sm:text-xl font-semibold text-[#1E3A29] leading-snug [text-wrap:balance]">
                  {BRAND_DATA.heroHeadline}
                </p>

                {/* Pequeno texto de apoio */}
                <p className="mt-2.5 text-sm sm:text-base text-[#14261B]/80 leading-relaxed max-w-[60ch]">
                  {BRAND_DATA.heroSubtext}
                </p>

                {/* Metadados rápidos de funcionamento e endereço */}
                <div className="mt-5 pt-5 border-t border-[#14261B]/12 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs sm:text-sm text-[#14261B]/85">
                  <span className="font-semibold text-[#14261B]">
                    {BRAND_DATA.hours}
                  </span>
                  <span aria-hidden="true" className="text-[#14261B]/30">
                    |
                  </span>
                  <span>{BRAND_DATA.addressFull}</span>
                </div>
              </div>
            </div>

            {/* SEÇÃO 2 — BOTÕES PRINCIPAIS */}
            <div id="canais" className="lg:col-span-6 flex flex-col justify-center">
              <div className="p-5 sm:p-7 rounded-2xl bg-[#F3ECE0] border border-[#14261B]/12">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-[#14261B]">
                    Acesso Rápido
                  </h2>
                  <span className="text-xs font-medium text-[#14261B]/65">
                    Toque para abrir
                  </span>
                </div>

                <div className="flex flex-col gap-3.5">
                  {primaryActions.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative flex items-center justify-between gap-4 p-4 sm:px-5 sm:py-4 rounded-xl border transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A2B] ${
                          item.isPrimary
                            ? 'bg-[#14261B] text-[#FAF6EE] border-[#14261B] hover:bg-[#1B3324] shadow-sm'
                            : 'bg-[#FAF6EE] text-[#14261B] border-[#14261B]/15 hover:border-[#C88A2B] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                          <div
                            className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 ${
                              item.isPrimary
                                ? 'bg-[#C88A2B] text-[#0D1A12]'
                                : 'bg-[#EFE7D6] text-[#14261B] group-hover:bg-[#14261B] group-hover:text-[#FAF6EE]'
                            }`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-sm sm:text-base font-bold tracking-tight whitespace-nowrap ${
                                  item.isPrimary ? 'text-[#FAF6EE]' : 'text-[#14261B]'
                                }`}
                              >
                                {item.label}
                              </span>
                              <span
                                aria-hidden="true"
                                className={
                                  item.isPrimary
                                    ? 'text-[#C88A2B]'
                                    : 'text-[#14261B]/30'
                                }
                              >
                                —
                              </span>
                              <span
                                className={`text-xs sm:text-sm font-medium truncate ${
                                  item.isPrimary
                                    ? 'text-[#E5C17B]'
                                    : 'text-[#8C5A14]'
                                }`}
                              >
                                {item.subtitle}
                              </span>
                            </div>

                            <p
                              className={`text-xs mt-0.5 truncate tabular-nums ${
                                item.isPrimary
                                  ? 'text-[#FAF6EE]/75'
                                  : 'text-[#14261B]/65'
                              }`}
                            >
                              {item.meta}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                            item.isPrimary
                              ? 'text-[#E5C17B]'
                              : 'text-[#14261B]/50 group-hover:text-[#14261B]'
                          }`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* Ações auxiliares rápidas de contato e endereço */}
                <div className="mt-5 pt-4 border-t border-[#14261B]/10 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleCopy(BRAND_DATA.whatsappNumber, 'phone')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#FAF6EE] hover:bg-white border border-[#14261B]/12 text-xs font-semibold text-[#14261B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1E4620]" />
                        <span>Telefone copiado</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-3.5 h-3.5 text-[#8C5A14]" />
                        <span>Copiar WhatsApp</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(BRAND_DATA.addressFull, 'address')}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#FAF6EE] hover:bg-white border border-[#14261B]/12 text-xs font-semibold text-[#14261B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedField === 'address' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1E4620]" />
                        <span>Endereço copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#8C5A14]" />
                        <span>Copiar Endereço</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 3 — NOSSA TRADIÇÃO */}
        <section
          id="tradicao"
          className="bg-[#14261B] text-[#FAF6EE] border-y border-[#C88A2B]/25"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#E5C17B] tabular-nums">
                  <span>Nossa História</span>
                  <span aria-hidden="true">·</span>
                  <span>Desde 2011 em Jaboatão</span>
                </div>

                <h2 className="mt-3 font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FAF6EE] tracking-tight leading-tight [text-wrap:balance]">
                  {BRAND_DATA.traditionTitle}
                </h2>

                <p className="mt-4 text-base sm:text-lg text-[#FAF6EE]/85 leading-relaxed max-w-[62ch]">
                  {BRAND_DATA.traditionBody}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href={BRAND_DATA.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#C88A2B] hover:bg-[#D69838] text-[#0D1A12] text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Falar com o Point da Fava</span>
                  </a>

                  <a
                    href={BRAND_DATA.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/15 text-[#FAF6EE] border border-[#FAF6EE]/20 text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <Instagram className="w-4 h-4 text-[#E5C17B]" />
                    <span>Ver no Instagram</span>
                  </a>
                </div>
              </div>

              {/* Marcos de Tradição — Sem cartões aninhados pesados, linhas editoriais sutis */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#FAF6EE]/15 pt-6 lg:pt-0 lg:pl-10 flex flex-col gap-6">
                <div>
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#E5C17B] tabular-nums">
                    2011
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[#FAF6EE]">
                    Início da nossa caminhada
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#FAF6EE]/75 leading-relaxed">
                    Ponto de encontro tradicional na Rua Santa Mônica, reunindo famílias e amigos em Jaboatão dos Guararapes.
                  </p>
                </div>

                <div className="border-t border-[#FAF6EE]/12 pt-5">
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#E5C17B]">
                    Bar &amp; Restaurante
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[#FAF6EE]">
                    Ambiente acolhedor e autêntico
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#FAF6EE]/75 leading-relaxed">
                    Gastronomia com identidade, atendimento próximo e respeito à preferência de cada cliente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 4 — LOCALIZAÇÃO */}
        <section id="localizacao" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C5A14]">
                <span>Onde Estamos</span>
                <span aria-hidden="true">·</span>
                <span>Jaboatão dos Guararapes – PE</span>
              </div>
              <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#14261B] tracking-tight [text-wrap:balance]">
                Localização e Como Chegar
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={BRAND_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14261B] hover:bg-[#1E3828] text-[#FAF6EE] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-4 h-4 text-[#E5C17B]" />
                <span>Abrir no Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
              </a>
            </div>
          </div>

          {/* Card de Endereço em Destaque + Visualização Dupla (Referência Visual + Mapa Incorporado) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Fotografia de Referência do Mapa e Fachada */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl overflow-hidden bg-[#F3ECE0] border border-[#14261B]/12 p-4 sm:p-5">
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-[#14261B] border border-[#14261B]/10">
                  {!imgFailed ? (
                    <img
                      src={imgSrc}
                      onError={handleImageError}
                      referrerPolicy="no-referrer"
                      alt="Referência visual de localização do Point da Fava na Rua Santa Mônica, 360"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#FAF6EE] text-sm p-4 text-center">
                      {BRAND_DATA.addressFull}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0D1A12]/80 hover:bg-[#0D1A12] text-[#FAF6EE] text-xs font-medium backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#C88A2B]" />
                    <span>Ver imagem</span>
                  </button>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-semibold text-[#8C5A14]">
                    Endereço Oficial
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#14261B]">
                    {BRAND_DATA.addressStreet}
                  </h3>
                  <p className="text-sm text-[#14261B]/80 mt-0.5">
                    {BRAND_DATA.addressCity}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#14261B]/10 flex flex-wrap items-center gap-2.5">
                <a
                  href={BRAND_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C88A2B] hover:bg-[#B87B20] text-[#0D1A12] text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Abrir no Google Maps</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(BRAND_DATA.addressFull, 'address')}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#FAF6EE] hover:bg-white border border-[#14261B]/15 text-xs sm:text-sm font-semibold text-[#14261B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedField === 'address' ? (
                    <>
                      <Check className="w-4 h-4 text-[#1E4620]" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#8C5A14]" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Mapa Incorporado (Google Maps Embed) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden bg-[#F3ECE0] border border-[#14261B]/12 flex flex-col min-h-[320px] sm:min-h-[380px]">
              <div className="px-4 py-3 border-b border-[#14261B]/10 flex items-center justify-between gap-4 bg-[#FAF6EE]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#14261B]">
                  <MapPin className="w-4 h-4 text-[#8C5A14] shrink-0" />
                  <span className="truncate">{BRAND_DATA.addressFull}</span>
                </div>
                <a
                  href={BRAND_DATA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#8C5A14] hover:text-[#14261B] underline-offset-4 hover:underline whitespace-nowrap shrink-0"
                >
                  Traçar rota
                </a>
              </div>

              <div className="relative flex-1 w-full bg-[#E5DEC9]">
                <iframe
                  title="Mapa de localização do Point da Fava na Rua Santa Mônica, 360"
                  src="https://www.google.com/maps?q=Rua+Santa+M%C3%B4nica,+360,+Jaboat%C3%A3o+dos+Guararapes+-+PE&output=embed"
                  className="w-full h-full min-h-[290px] sm:min-h-[340px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 5 — HORÁRIO DE FUNCIONAMENTO */}
        <section id="funcionamento" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-20">
          <div className="rounded-2xl bg-[#F3ECE0] border border-[#14261B]/15 p-6 sm:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#14261B] text-[#E5C17B] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#8C5A14]">
                    Horário de Funcionamento
                  </p>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-[#14261B] tracking-tight">
                    {BRAND_DATA.hours}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#14261B]/75 max-w-[54ch]">
                    Recebemos você e sua família todos os dias na Rua Santa Mônica, 360. Para dúvidas ou atendimento direto, fale conosco pelo WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={BRAND_DATA.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#14261B] hover:bg-[#1E3828] text-[#FAF6EE] text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#E5C17B]" />
                  <span>Confirmar pelo WhatsApp</span>
                </a>

                <a
                  href={BRAND_DATA.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#FAF6EE] hover:bg-white text-[#14261B] border border-[#14261B]/15 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <Star className="w-4 h-4 text-[#C88A2B]" />
                  <span>Avaliar no Google</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SEÇÃO 6 — RODAPÉ */}
      <footer className="bg-[#0F1E15] text-[#FAF6EE] border-t border-[#C88A2B]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-[#FAF6EE]/12">
            <div>
              <p className="font-display text-xl font-bold tracking-tight text-[#FAF6EE]">
                {BRAND_DATA.name}
              </p>
              <p className="mt-1 text-sm text-[#E5C17B] font-medium">
                Bar &amp; Restaurante desde {BRAND_DATA.foundedYear}.
              </p>
              <p className="mt-1 text-xs text-[#FAF6EE]/70">
                {BRAND_DATA.addressFull}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BRAND_DATA.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/15 text-[#FAF6EE] text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-4 h-4 text-[#E5C17B]" />
                <span>Instagram</span>
              </a>

              <a
                href={BRAND_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#C88A2B] hover:bg-[#D69838] text-[#0D1A12] text-xs font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#FAF6EE]/60">
            <p>
              © {BRAND_DATA.foundedYear}–{new Date().getFullYear()} {BRAND_DATA.name}. Todos os direitos reservados.
            </p>
            <p>Jaboatão dos Guararapes – PE</p>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a
        href={BRAND_DATA.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale conosco pelo WhatsApp"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#14261B] hover:bg-[#1E3828] text-[#FAF6EE] border border-[#C88A2B]/50 shadow-lg transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C88A2B]"
      >
        <span className="w-7 h-7 rounded-full bg-[#C88A2B] text-[#0D1A12] flex items-center justify-center shrink-0">
          <WhatsAppIcon className="w-4 h-4" />
        </span>
        <span className="text-xs sm:text-sm font-bold tracking-tight pr-1 whitespace-nowrap">
          WhatsApp
        </span>
      </a>

      {/* Lightbox Modal para visualizar a fotografia de referência completa */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fotografia de referência do Point da Fava"
          className="fixed inset-0 z-50 bg-[#0D1A12]/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#14261B] rounded-2xl overflow-hidden border border-[#FAF6EE]/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#FAF6EE]/15 text-[#FAF6EE]">
              <div className="text-xs sm:text-sm font-semibold">
                {BRAND_DATA.name} — {BRAND_DATA.addressFull}
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Fechar visualização"
                className="p-1.5 rounded-lg bg-[#FAF6EE]/10 hover:bg-[#FAF6EE]/20 text-[#FAF6EE] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto bg-[#0D1A12] flex items-center justify-center">
              <img
                src={imgSrc}
                onError={handleImageError}
                referrerPolicy="no-referrer"
                alt="Fotografia de referência do Point da Fava em Jaboatão dos Guararapes"
                className="w-full h-auto max-h-[78vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
