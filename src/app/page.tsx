
"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Menu,
  Check,
  Circle,
  ArrowDown
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { generateSpinalAnalysis, type PersonalizedSpinalAnalysisOutput } from "@/ai/flows/generate-spinal-analysis";
import { cn } from "@/lib/utils";

export default function SuperColunaLanding() {
  // -- States for Quiz and UX Journey --
  const [quizStep, setQuizStep] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<PersonalizedSpinalAnalysisOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // -- Images --
  const heroImg = PlaceHolderImages?.find(img => img.id === "hero-mockup")?.imageUrl;
  const symptomImg = PlaceHolderImages?.find(img => img.id === "symptom-back-pain")?.imageUrl;
  const appHomeImg = PlaceHolderImages?.find(img => img.id === "app-home")?.imageUrl;
  const appEvolutionImg = PlaceHolderImages?.find(img => img.id === "app-evolution")?.imageUrl;
  const appAchievementsImg = PlaceHolderImages?.find(img => img.id === "app-achievements")?.imageUrl;

  // -- Progress Tracking Logic --
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleStartQuiz = () => {
    setQuizStep(1);
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers(prev => [...prev, answer]);
    if (currentQuestion < 3) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = async () => {
    setQuizStep(2); // Loading State
    setIsGenerating(true);
    try {
      // In a real scenario, we'd use quizAnswers here
      const result = await generateSpinalAnalysis({
        symptoms: quizAnswers.length > 0 ? [quizAnswers[0]] : ["Dor lombar"],
        lifestyleFactors: quizAnswers.length > 1 ? [quizAnswers[1]] : ["Sedentarismo"],
        quizSummary: "Perfil gerado através de diagnóstico interativo."
      });
      setQuizResult(result);
      setQuizStep(3); // Result view
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // -- Component: Section Progress Marker --
  const SectionMarker = ({ label, step }: { label: string; step: number }) => (
    <div className="flex flex-col items-center justify-center py-10 opacity-40 hover:opacity-100 transition-opacity">
      <div className="h-10 w-px bg-border mb-4" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">
        PASSO {step}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  // -- Component: Checklist Item --
  const ChecklistItem = ({ checked, label }: { checked: boolean; label: string }) => (
    <div className={cn("flex items-center gap-3 transition-all duration-500", !checked && "opacity-40")}>
      <div className={cn(
        "w-5 h-5 rounded-full flex items-center justify-center border transition-colors",
        checked ? "bg-secondary border-secondary text-white" : "border-border"
      )}>
        {checked ? <Check className="w-3 h-3" /> : <Circle className="w-2 h-2 fill-muted-foreground" />}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10">
      
      {/* Invisible Progress: Top Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">SUPER COLUNA</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <nav className="flex gap-6 text-sm font-semibold text-muted-foreground">
              <a href="#benefits" className="hover:text-primary transition-colors">Benefícios</a>
              <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
            </nav>
            <Button size="sm" className="rounded-full px-6" onClick={handleStartQuiz}>Avaliação</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="pt-16">
        
        {/* PROGRESSION STATE 1: Identification */}
        <section className="relative overflow-hidden bg-white py-16 lg:py-32">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>DESCOBERTA PESSOAL</span>
              </div>
              <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                Uma nova forma de entender sua <span className="text-primary">coluna.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Pare de tratar apenas os sintomas. Entenda o que o seu corpo está tentando dizer e recupere sua liberdade de movimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full group shadow-xl shadow-primary/20" onClick={handleStartQuiz}>
                  Começar Jornada
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl -z-10" />
              <div className="relative mx-auto max-w-[340px] lg:max-w-none group cursor-pointer">
                <Image 
                  src={heroImg || "https://placehold.co/800x1200"} 
                  alt="App Mockup" 
                  width={800} 
                  height={1200}
                  className="rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border-[12px] border-white transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        <SectionMarker step={1} label="Sintomas e Identificação" />

        {/* PROGRESSION STATE 2: Curiosity */}
        <section className="bg-ghost-grey py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20 space-y-4">
              <h2 className="font-headline text-4xl font-bold text-slate-900">Identificação Inicial</h2>
              <p className="text-muted-foreground text-lg">Selecione o que melhor descreve seu momento atual.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Rigidez Persistente", desc: "Aquela sensação de 'travado' ao levantar ou após longos períodos na mesma posição." },
                { title: "Impacto no Trabalho", desc: "Dificuldade de concentração ou irritabilidade causada pelo desconforto constante." },
                { title: "Medo de Movimento", desc: "Evitar atividades simples por receio de que a coluna 'saia do lugar' ou trave." }
              ].map((item, i) => (
                <Card key={i} className="border-none shadow-premium bg-white hover:translate-y-[-8px] transition-all duration-500 cursor-pointer group">
                  <CardContent className="p-8 space-y-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <HelpCircle className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-bold text-xl">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRESSION STATE 3: Discovery (The Enhanced Quiz) */}
        <section id="quiz-section" className="py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="shadow-[0_40px_80px_-16px_rgba(0,0,0,0.08)] border-none overflow-hidden rounded-[2.5rem]">
              <div className="h-1.5 bg-muted w-full relative">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: quizStep === 1 ? `${(currentQuestion / 3) * 100}%` : '0%' }}
                />
              </div>
              
              <CardContent className="p-10 lg:p-16">
                {quizStep === 0 && (
                  <div className="text-center space-y-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
                      <Activity className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                      <h2 className="font-headline text-3xl font-bold">Diagnóstico de Perfil</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Inicie uma análise personalizada de 15 segundos para entender as necessidades específicas da sua coluna.
                      </p>
                    </div>
                    <Button size="lg" className="w-full rounded-full h-16 text-lg font-bold shadow-lg shadow-primary/10" onClick={() => setQuizStep(1)}>
                      Iniciar Avaliação
                    </Button>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Privacidade 100% garantida</p>
                  </div>
                )}

                {quizStep === 1 && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">Etapa {currentQuestion} de 3</span>
                      <span className="text-xs font-bold text-muted-foreground">{Math.round((currentQuestion/3)*100)}%</span>
                    </div>

                    <div className="space-y-8">
                      {currentQuestion === 1 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold">Onde está o foco do seu desconforto?</h3>
                          <div className="grid gap-4">
                            {["Lombar (base)", "Cervical (pescoço)", "Dorsal (meio)", "Toda a Coluna"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary hover:bg-primary/5 group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 2 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold">Como é sua rotina de movimento?</h3>
                          <div className="grid gap-4">
                            {["Sentado +8h/dia", "Frequente levantamento de peso", "Ativo, mas com dores", "Sedentário"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary hover:bg-primary/5 group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 3 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold">Qual seu objetivo principal?</h3>
                          <div className="grid gap-4">
                            {["Alívio imediato", "Fortalecimento", "Voltar ao esporte", "Prevenção"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary hover:bg-primary/5 group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-10 text-center animate-fade-in-up py-10">
                    <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                      <Activity className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Analisando Perfil...</h3>
                      <p className="text-muted-foreground">Cruzando dados de sintomas com padrões de mobilidade.</p>
                    </div>
                  </div>
                )}

                {quizStep === 3 && quizResult && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="text-center space-y-6">
                      <div className="inline-flex p-4 bg-secondary/10 text-secondary rounded-3xl animate-bounce">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h2 className="font-headline text-3xl font-bold">Perfil Concluído</h2>
                      <p className="text-lg italic text-muted-foreground px-6 leading-relaxed">
                        "{quizResult.empathyStatement}"
                      </p>
                    </div>
                    
                    {/* Discovery Checklist: Gamification Element 1 */}
                    <div className="bg-ghost-grey rounded-[2rem] p-8 space-y-6 border border-border/50 shadow-inner">
                      <p className="text-xs font-black text-primary uppercase tracking-widest">PROGRESSO DA DESCOBERTA</p>
                      <div className="space-y-4">
                        <ChecklistItem checked={true} label="Etapa Concluída: Diagnóstico Inicial" />
                        <ChecklistItem checked={true} label="Etapa Concluída: Perfil de Sintomas" />
                        <ChecklistItem checked={false} label="Próxima Descoberta: Causa Raiz" />
                        <ChecklistItem checked={false} label="Próximo Passo: Plano de Ação" />
                      </div>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20 space-y-3">
                      <p className="text-sm font-bold text-primary flex items-center gap-2">
                        <Zap className="w-4 h-4" /> RESUMO DA CONDIÇÃO:
                      </p>
                      <p className="text-slate-700 leading-relaxed text-sm">
                        {quizResult.currentConditionSummary}
                      </p>
                    </div>

                    <Button className="w-full h-16 rounded-full text-lg font-bold group shadow-xl shadow-primary/20" onClick={() => {
                      document.getElementById("revelation")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      Explorar Causa Raiz
                      <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionMarker step={2} label="A Causa Raiz" />

        {/* PROGRESSION STATE 4: Relief (Understanding) */}
        <section id="revelation" className="py-24 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="w-12 h-1 bg-primary rounded-full" />
                <h2 className="font-headline text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">O ciclo invisível da dor</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tratamentos convencionais focam no alívio imediato, mas ignoram a desidratação discal e o enfraquecimento dos músculos profundos. Sem tratar a base, o corpo entra em um ciclo de compensação.
                </p>
                <div className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-border/50 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex-shrink-0 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <p className="font-medium text-slate-800 leading-relaxed">
                    A falta de movimento específico é o que acelera o desgaste, não o excesso.
                  </p>
                </div>
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-[4/5] lg:aspect-square group">
                <Image 
                  src={symptomImg || "https://placehold.co/600x400"} 
                  alt="Problema" 
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        <SectionMarker step={3} label="A Jornada de Evolução" />

        {/* PROGRESSION STATE 5: Hope (Timeline) */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-20 space-y-4">
              <h2 className="font-headline text-4xl font-bold">Jornada de Transformação</h2>
              <p className="text-muted-foreground text-lg">O que acontece quando você decide agir.</p>
            </div>
            
            <div className="relative space-y-16">
              {/* Vertical line: Gamification Element 2 */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden md:block" />
              
              {[
                { title: "Desbloqueio Inicial", desc: "Primeiros 7 dias focados em reduzir a inflamação e recuperar micro-mobilidade.", color: "bg-primary/20 text-primary" },
                { title: "Estabilização Ativa", desc: "Entre 2 e 4 semanas: fortalecimento dos músculos de suporte e melhora postural.", color: "bg-secondary/20 text-secondary" },
                { title: "Liberdade Plena", desc: "Retomada de atividades de alto impacto e manutenção preventiva vitalícia.", color: "bg-amber-100 text-amber-600" }
              ].map((item, i) => (
                <div key={i} className={cn(
                  "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                )}>
                  <div className="md:w-1/2 px-8">
                    <div className={cn(
                      "p-8 rounded-[2rem] border transition-all duration-500 hover:shadow-xl",
                      i % 2 === 0 ? "text-right" : "text-left"
                    )}>
                      <h3 className="font-bold text-2xl mb-4">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center z-10",
                    item.color
                  )}>
                    <Check className="w-6 h-6" />
                  </div>
                  
                  <div className="md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <SectionMarker step={4} label="Solução Integrada" />

        {/* PROGRESSION STATE 6: Confidence (App & FAQ) */}
        <section className="py-24 bg-ghost-grey">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="relative flex justify-center group">
                <div className="relative w-full max-w-[300px]">
                  <Image 
                    src={appHomeImg || "https://placehold.co/400x800"} 
                    alt="Home" 
                    width={400} 
                    height={800} 
                    className="rounded-[3rem] shadow-[0_48px_96px_-16px_rgba(0,0,0,0.2)] border-[10px] border-white"
                  />
                  {/* Floating Micro-Interaction Indicator */}
                  <div className="absolute -right-16 top-1/3 p-5 bg-white rounded-3xl shadow-2xl flex gap-4 items-center animate-bounce duration-[4000ms] border border-border/50">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">MOBILIDADE</p>
                      <p className="text-lg font-bold">+85%</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-10">
                <div className="space-y-4">
                  <h2 className="font-headline text-4xl font-bold text-slate-900 leading-tight">O seu guia diário de liberdade.</h2>
                  <p className="text-lg text-muted-foreground">Tecnologia e ciência aplicadas para que você nunca mais se sinta sozinho na sua recuperação.</p>
                </div>
                <div className="space-y-6">
                  {[
                    { t: "Algoritmo de Evolução", d: "As rotinas se ajustam conforme sua dor diminui e sua força aumenta." },
                    { t: "Suporte Especializado", d: "Acesso a orientações para garantir que cada movimento seja seguro." },
                    { t: "Check-ins de Biofeedback", d: "Monitore como sua coluna reage a diferentes estímulos do dia a dia." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-border/50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Check className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-xl">{item.t}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ with Progress Markers: Gamification Element 3 */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-16">Consolidação de Confiança</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "O programa é para todas as idades?", a: "Sim. A tecnologia SUPER COLUNA adapta a intensidade dos movimentos com base no seu perfil inicial e feedback diário." },
                { q: "Posso fazer no meu tempo?", a: "Totalmente. O programa foi desenhado para quem tem agendas cheias, com sessões que variam de 10 a 20 minutos." },
                { q: "Como vejo meus resultados?", a: "Através do dashboard de evolução, que mostra seu ganho de mobilidade e redução de picos de dor." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-white rounded-[1.5rem] border border-border/50 px-8 shadow-sm overflow-hidden transition-all hover:border-primary/30">
                  <AccordionTrigger className="hover:no-underline py-6 font-bold text-lg text-left">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-muted-foreground text-lg leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* PROGRESSION STATE 7: Decision (The Final Completion Indicator) */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[120px]" />
          <div className="container mx-auto px-4 text-center max-w-4xl relative z-10 space-y-12">
            
            {/* Completion Indicator: Gamification Element 4 */}
            <div className="space-y-6">
              <div className="w-24 h-24 rounded-full border-4 border-secondary flex items-center justify-center mx-auto bg-secondary/10">
                <Check className="w-12 h-12 text-secondary" />
              </div>
              <p className="text-xs font-black tracking-[0.3em] text-secondary uppercase">JORNADA DE DESCOBERTA 100% CONCLUÍDA</p>
              <h2 className="font-headline text-5xl lg:text-7xl font-bold leading-tight">Chegou a hora de decidir pelo alívio.</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-stretch">
              <div className="bg-white/5 backdrop-blur-sm p-10 rounded-[3rem] border border-white/10 text-left space-y-6">
                <h3 className="text-2xl font-bold">O Que Você Garante Agora:</h3>
                <ul className="space-y-4">
                  {["Plano de 12 semanas personalizado", "Acesso total ao app Super Coluna", "Protocolos de emergência para crises", "Vitalício: atualizações e novos recursos"].map((t, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                      <span className="text-lg opacity-80">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-[3rem] p-10 text-slate-900 flex flex-col justify-between items-center shadow-2xl">
                <div className="space-y-2">
                  <p className="text-xs font-black text-muted-foreground tracking-widest uppercase">OFERTA DE LANÇAMENTO</p>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-xl font-bold">12x R$</span>
                    <span className="text-7xl font-black text-primary">19</span>
                    <span className="text-2xl font-bold">,70</span>
                  </div>
                  <p className="text-sm font-medium opacity-60">ou R$ 197,00 à vista</p>
                </div>
                
                <Button size="lg" className="w-full h-20 rounded-full text-2xl font-bold shadow-2xl shadow-primary/30 mt-8 group">
                  QUERO MINHA LIBERDADE
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Button>
                
                <p className="text-[10px] font-bold text-muted-foreground mt-6 uppercase tracking-widest">Acesso imediato • 100% Seguro</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t py-16">
        <div className="container mx-auto px-4 text-center space-y-10">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <Activity className="text-white w-4 h-4" />
            </div>
            <span className="font-headline font-bold text-lg">SUPER COLUNA</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Este site e o produto SUPER COLUNA não são afiliados ao Facebook ou a qualquer entidade do Facebook. Uma vez que você sai do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
          <div className="flex justify-center gap-10 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Termos</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2024 Super Coluna. Desenvolvido para sua saúde.</p>
        </div>
      </footer>
    </div>
  );
}
