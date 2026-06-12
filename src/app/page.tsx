
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Smartphone, 
  ChevronRight,
  TrendingUp,
  Award,
  User,
  HelpCircle,
  Menu
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { generateSpinalAnalysis, type PersonalizedSpinalAnalysisOutput } from "@/ai/flows/generate-spinal-analysis";

export default function SuperColunaLanding() {
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState<PersonalizedSpinalAnalysisOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const heroImg = PlaceHolderImages?.find(img => img.id === "hero-mockup")?.imageUrl;
  const symptomImg = PlaceHolderImages?.find(img => img.id === "symptom-back-pain")?.imageUrl;
  const appHomeImg = PlaceHolderImages?.find(img => img.id === "app-home")?.imageUrl;
  const appEvolutionImg = PlaceHolderImages?.find(img => img.id === "app-evolution")?.imageUrl;
  const appAchievementsImg = PlaceHolderImages?.find(img => img.id === "app-achievements")?.imageUrl;

  const handleStartQuiz = () => {
    setQuizStep(1);
    const element = document.getElementById("quiz-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const completeQuiz = async () => {
    setIsGenerating(true);
    try {
      const result = await generateSpinalAnalysis({
        symptoms: ["Dor lombar crônica", "Rigidez matinal"],
        lifestyleFactors: ["Trabalho sedentário", "Stress"],
        quizSummary: "Usuário reporta dores frequentes ao acordar e dificuldade de mobilidade após longas horas sentado."
      });
      setQuizResult(result);
      setQuizStep(3); // Result view
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">SUPER COLUNA</span>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
          <div className="hidden md:flex gap-6 items-center">
            <nav className="flex gap-4 text-sm font-medium">
              <a href="#benefits" className="hover:text-primary transition-colors">Benefícios</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
              <a href="#faq" className="hover:text-primary transition-colors">Dúvidas</a>
            </nav>
            <Button size="sm" onClick={handleStartQuiz}>Começar Agora</Button>
          </div>
        </div>
      </header>

      <main className="pt-16">
        {/* SEÇÃO 1: Hero Section */}
        <section className="relative overflow-hidden bg-white py-12 lg:py-24">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                <Smartphone className="w-3 h-3" />
                <span>O FUTURO DA SAÚDE LOMBAR</span>
              </div>
              <h1 className="font-headline text-4xl lg:text-6xl font-bold leading-tight">
                Liberte-se da dor e recupere sua mobilidade
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                O primeiro programa digital personalizado que combina ciência, tecnologia e acompanhamento para transformar a saúde da sua coluna.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="h-14 px-8 text-lg font-semibold rounded-full group" onClick={handleStartQuiz}>
                  Começar Avaliação Gratuita
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <div className="flex items-center justify-center lg:justify-start gap-4 text-xs font-medium text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted overflow-hidden relative">
                        <Image 
                          src={`https://picsum.photos/seed/user${i}/40`} 
                          alt="user" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span>+10k Usuários Ativos</span>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 grayscale opacity-60">
                <ShieldCheck className="w-8 h-8" />
                <div className="h-6 w-px bg-border" />
                <Award className="w-8 h-8" />
              </div>
            </div>
            <div className="relative animate-fade-in-up delay-200">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="relative mx-auto max-w-[320px] lg:max-w-none">
                <Image 
                  src={heroImg || "https://placehold.co/800x1200"} 
                  alt="App Mockup" 
                  width={800} 
                  height={1200}
                  className="rounded-[3rem] shadow-2xl border-8 border-white"
                  data-ai-hint="mobile app health"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 2: Identificação */}
        <section className="bg-ghost-grey py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl font-bold mb-4">Você se identifica com algum desses problemas?</h2>
              <p className="text-muted-foreground">A dor nas costas não precisa ser parte da sua rotina normal.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Rigidez Matinal", desc: "Sentir as costas travadas logo ao acordar, dificultando os primeiros movimentos do dia." },
                { title: "Dor após Sentar", desc: "Desconforto agudo ou constante após passar poucas horas trabalhando em frente ao computador." },
                { title: "Limitação Física", desc: "Dificuldade em realizar atividades simples como brincar com os filhos ou praticar esportes." }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-premium bg-white">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 3: Quiz Area */}
        <section id="quiz-section" className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-premium border-none overflow-hidden">
              <div className="h-2 bg-muted w-full">
                <Progress value={quizStep === 1 ? 50 : quizStep === 2 ? 100 : 0} className="h-full rounded-none" />
              </div>
              <CardContent className="p-8 lg:p-12">
                {quizStep === 0 && (
                  <div className="text-center space-y-6">
                    <h2 className="font-headline text-2xl font-bold">Vamos analisar sua coluna</h2>
                    <p className="text-muted-foreground">Responda a 3 perguntas rápidas para receber um diagnóstico preliminar e seu plano de ação.</p>
                    <Button size="lg" className="w-full rounded-full" onClick={() => setQuizStep(1)}>
                      Iniciar Diagnóstico
                    </Button>
                  </div>
                )}

                {quizStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold">Onde você sente mais desconforto?</h3>
                    <div className="grid gap-3">
                      {["Lombar (baixo)", "Cervical (pescoço)", "Dorsal (meio)", "Toda a Coluna"].map(opt => (
                        <Button key={opt} variant="outline" className="h-14 justify-start px-6 rounded-xl hover:bg-primary/5 hover:border-primary" onClick={() => setQuizStep(2)}>
                          {opt}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-6 text-center">
                    <h3 className="text-xl font-bold">Processando seu perfil...</h3>
                    <div className="py-8 flex justify-center">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <p className="text-muted-foreground">Estamos criando seu plano personalizado com base nos seus sintomas.</p>
                    <Button size="lg" className="w-full rounded-full" onClick={completeQuiz} disabled={isGenerating}>
                      {isGenerating ? "Gerando..." : "Ver Diagnóstico"}
                    </Button>
                  </div>
                )}

                {quizStep === 3 && quizResult && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center space-y-4">
                      <div className="inline-flex p-3 bg-secondary/10 text-secondary rounded-full">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h2 className="font-headline text-2xl font-bold">Diagnóstico Concluído</h2>
                      <p className="italic text-muted-foreground">"{quizResult.empathyStatement}"</p>
                    </div>
                    
                    <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                      <p className="text-sm font-medium text-primary mb-2">Resumo da sua condição:</p>
                      <p className="text-sm leading-relaxed">{quizResult.currentConditionSummary}</p>
                    </div>

                    <div className="space-y-4">
                      <p className="font-bold">Pontos de atenção identificados:</p>
                      {quizResult.identifiedProblems.map((prob, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border">
                          <div className="mt-1 w-5 h-5 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{prob.problem}</p>
                            <p className="text-xs text-muted-foreground mt-1">{prob.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full h-14 rounded-full text-lg font-bold" onClick={() => {
                      const element = document.getElementById("revelation");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      Continuar para Solução
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SEÇÃO 5: Revelação do Problema */}
        <section id="revelation" className="py-20 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="font-headline text-3xl font-bold">Por que os tratamentos comuns falham?</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A maioria das pessoas tenta resolver a dor com repouso ou remédios. No entanto, sem fortalecer a estrutura de suporte e recuperar a mobilidade funcional, o problema sempre retorna — muitas vezes pior.
                </p>
                <div className="flex gap-4 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                  <Zap className="text-destructive w-6 h-6 flex-shrink-0" />
                  <p className="text-sm font-medium text-destructive-foreground">A inatividade é a maior inimiga da saúde lombar.</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[3/2]">
                <Image 
                  src={symptomImg || "https://placehold.co/600x400"} 
                  alt="Problema" 
                  fill
                  className="object-cover"
                  data-ai-hint="back pain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6: Amplificação (Timeline) */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-16">O Caminho da Negligência</h2>
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {[
                { title: "Hoje", desc: "Dores ocasionais que você ignora ou trata com analgésicos." },
                { title: "Em 6 Meses", desc: "A dor se torna crônica. Perda visível de mobilidade e flexibilidade." },
                { title: "Em 2 Anos", desc: "Limitação total de atividades físicas e risco de intervenções invasivas." }
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-slate-900">{item.title}</div>
                    </div>
                    <div className="text-slate-500">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO 7: Quebra de Crenças */}
        <section className="py-20 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Dúvidas Frequentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Preciso de equipamentos?", a: "Não. A maioria dos exercícios é baseada em peso corporal e pode ser feita em casa." },
                { q: "Tenho hérnia de disco, posso fazer?", a: "Sim. O método é adaptável e focado em fortalecimento seguro, mas sempre recomendamos acompanhamento profissional." },
                { q: "Quanto tempo por dia?", a: "Apenas 15 a 20 minutos são suficientes para ver resultados em poucas semanas." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-xl border px-6 shadow-sm overflow-hidden">
                  <AccordionTrigger className="hover:no-underline py-6 font-bold text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* SEÇÃO 8: Primeira Esperança */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4 max-w-3xl space-y-6">
            <h2 className="font-headline text-4xl font-bold">Uma vida sem dor é possível</h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Imagine acordar sem rigidez, trabalhar sem desconforto e voltar a fazer o que você ama. O SUPER COLUNA foi desenhado para tornar isso sua nova realidade.
            </p>
          </div>
        </section>

        {/* SEÇÃO 9: Apresentação do SUPER COLUNA */}
        <section className="py-20 bg-ghost-grey overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline text-4xl font-bold">Conheça o SUPER COLUNA</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Sua jornada de recuperação guiada passo a passo.</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[280px]">
                  <Image 
                    src={appHomeImg || "https://placehold.co/400x800"} 
                    alt="Home" 
                    width={400} 
                    height={800} 
                    className="rounded-[2.5rem] shadow-2xl border-4 border-white"
                    data-ai-hint="app dashboard"
                  />
                  <div className="absolute -right-12 top-1/4 p-4 bg-white rounded-2xl shadow-xl flex gap-3 items-center animate-bounce duration-[3000ms]">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Progresso</p>
                      <p className="text-sm font-bold">+85% Mobilidade</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                {[
                  { t: "Plano Diário", d: "Rotinas rápidas adaptadas ao seu nível de dor e condicionamento." },
                  { t: "Acompanhamento", d: "Gráficos de evolução para você ver seu progresso real dia após dia." },
                  { t: "Gamificação", d: "Conquistas que mantêm você motivado a manter a consistência." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-primary/20">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-bold">{item.t}</h3>
                      <p className="text-muted-foreground mt-2">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 13: Demonstração do Aplicativo */}
        <section className="py-20 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="font-headline text-4xl font-bold">O aplicativo na palma da sua mão</h2>
                <div className="space-y-4">
                  {[
                    { label: "Dashboard Inteligente", icon: Smartphone },
                    { label: "Programa de Exercícios", icon: Activity },
                    { label: "Acompanhamento de Evolução", icon: TrendingUp },
                    { label: "Conquistas e Gamificação", icon: Award },
                    { label: "Perfil Personalizado", icon: User },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-ghost-grey transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-lg">{item.label}</span>
                      <ChevronRight className="ml-auto w-5 h-5 text-muted-foreground group-hover:text-primary" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Image 
                  src={appEvolutionImg || "https://placehold.co/400x800"} 
                  alt="Evolution" width={400} height={800} 
                  className="rounded-3xl shadow-xl mt-12"
                  data-ai-hint="health progress"
                />
                <Image 
                  src={appAchievementsImg || "https://placehold.co/400x800"} 
                  alt="Achievements" width={400} height={800} 
                  className="rounded-3xl shadow-xl"
                  data-ai-hint="gamification awards"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 15: Oferta */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-primary rounded-[3rem] p-8 lg:p-16 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="font-headline text-4xl font-bold">Acesso Vitalício</h2>
                  <ul className="space-y-3">
                    {[
                      "Programa completo de 12 semanas",
                      "Acesso a todas as atualizações futuras",
                      "Guia de Postura para Home Office",
                      "Suporte prioritário"
                    ].map((text, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-[2rem] p-8 text-foreground text-center space-y-6 shadow-2xl">
                  <p className="text-sm font-bold tracking-widest text-muted-foreground uppercase">Promoção de Lançamento</p>
                  <div className="space-y-2">
                    <p className="text-muted-foreground line-through text-lg">R$ 497,00</p>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-2xl font-bold">R$</span>
                      <span className="text-6xl font-black text-primary">197</span>
                    </div>
                    <p className="text-sm text-muted-foreground">ou 12x de R$ 19,70</p>
                  </div>
                  <Button size="lg" className="w-full h-16 rounded-full text-xl font-bold shadow-xl shadow-primary/20">
                    QUERO MEU ACESSO
                  </Button>
                  <p className="text-[10px] text-muted-foreground">* Compra 100% segura via criptografia SSL</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 18: CTA Final */}
        <section className="py-24 bg-ghost-grey">
          <div className="container mx-auto px-4 text-center max-w-3xl space-y-12">
            <div className="space-y-4">
              <h2 className="font-headline text-4xl lg:text-5xl font-bold">Pronto para a transformação?</h2>
              <p className="text-xl text-muted-foreground">A decisão está em suas mãos. Recupere sua saúde hoje.</p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <Button size="lg" className="h-20 px-12 text-2xl font-bold rounded-full shadow-2xl shadow-primary/30 w-full sm:w-auto" onClick={handleStartQuiz}>
                QUERO MINHA SAÚDE DE VOLTA
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium">Acesso imediato após confirmação</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Activity className="text-white w-4 h-4" />
            </div>
            <span className="font-headline font-bold text-lg">SUPER COLUNA</span>
          </div>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <p className="text-xs text-muted-foreground max-w-lg mx-auto">
            AVISO: Este produto não substitui orientação médica. Sempre consulte um profissional de saúde antes de iniciar qualquer programa de exercícios.
          </p>
          <p className="text-xs text-muted-foreground">© 2024 Super Coluna. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
