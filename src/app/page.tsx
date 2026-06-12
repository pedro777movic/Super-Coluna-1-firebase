"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Activity, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Smartphone, 
  ChevronRight,
  TrendingUp,
  Menu,
  Check,
  Circle,
  ArrowDown,
  Info
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { generateSpinalAnalysis, type PersonalizedSpinalAnalysisOutput } from "@/ai/flows/generate-spinal-analysis";
import { cn } from "@/lib/utils";

export default function SuperColunaLanding() {
  // -- States --
  const [quizStep, setQuizStep] = useState(0); // 0: Intro, 1: Questions, 2: Loading, 3: Result
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<PersonalizedSpinalAnalysisOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // -- Images --
  const heroImg = PlaceHolderImages?.find(img => img.id === "hero-mockup")?.imageUrl;
  const symptomImg = PlaceHolderImages?.find(img => img.id === "symptom-back-pain")?.imageUrl;
  const appHomeImg = PlaceHolderImages?.find(img => img.id === "app-home")?.imageUrl;

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
    document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" });
    if (quizStep === 0) setQuizStep(1);
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (currentQuestion < 3) {
      setCurrentQuestion(curr => curr + 1);
    } else {
      completeQuiz(newAnswers);
    }
  };

  const completeQuiz = async (answers: string[]) => {
    setQuizStep(2);
    setIsGenerating(true);
    try {
      const result = await generateSpinalAnalysis({
        mainDiscomfort: answers[0],
        duration: answers[1],
        routineImpact: answers[2]
      });
      setQuizResult(result);
      setQuizStep(3);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const SectionMarker = ({ label, step }: { label: string; step: number }) => (
    <div className="flex flex-col items-center justify-center py-10 opacity-30">
      <div className="h-10 w-px bg-border mb-4" />
      <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-1">
        PASSO {step}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

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
      
      {/* Scroll Progress Bar */}
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
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">SUPER COLUNA</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <nav className="flex gap-6 text-sm font-semibold text-muted-foreground">
              <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
              <a href="#benefits" className="hover:text-primary transition-colors">Diferenciais</a>
            </nav>
            <Button size="sm" className="rounded-full px-6" onClick={handleStartQuiz}>Avaliação Gratuita</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="pt-16">
        
        {/* STATE 1: Identification (Hero) */}
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide">
                <span>SUPER COLUNA</span>
              </div>
              <h1 className="font-headline text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-slate-900">
                Sua lombar está roubando mais da sua vida do que <span className="text-primary">você imagina.</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Talvez tenha começado com um pequeno desconforto. Uma rigidez ao acordar. Nada grave, até que você começou a adaptar sua vida à sua lombar.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-full group shadow-xl shadow-primary/20" onClick={handleStartQuiz}>
                  Começar agora
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-2" onClick={handleStartQuiz}>
                  Quero entender meu caso
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl -z-10" />
              <Image 
                src={heroImg || "https://picsum.photos/seed/coluna1/800/1200"} 
                alt="App Mockup" 
                width={800} 
                height={1200}
                className="rounded-[3rem] shadow-2xl border-[12px] border-white mx-auto max-w-[320px] lg:max-w-md"
                data-ai-hint="health app"
              />
            </div>
          </div>
        </section>

        <SectionMarker step={1} label="Identificação" />

        {/* STATE 2: Curiosity (Symptoms) */}
        <section className="bg-ghost-grey py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline text-4xl font-bold text-slate-900">Você sente isso no dia a dia?</h2>
              <p className="text-muted-foreground text-lg">Se você se identificou com alguns desses pontos, você não está sozinho.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Acorda com o corpo rígido e demora para 'destravar'",
                "Precisa mudar de posição várias vezes para encontrar conforto",
                "Sente a lombar reclamar depois de muito tempo sentado",
                "Percebe que sua mobilidade já não é a mesma de antes",
                "Vive prometendo para si mesmo que vai cuidar melhor da coluna",
                "Já tentou algumas soluções, mas nunca conseguiu manter constância"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-border/50 items-start hover:border-primary/30 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATE 3: Discovery (The Quiz) */}
        <section id="quiz-section" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="font-headline text-3xl font-bold">Faça o teste rápido</h2>
              <p className="text-muted-foreground">Em apenas alguns segundos, descubra o que mais se aproxima da sua situação atual.</p>
            </div>

            <Card className="shadow-2xl border-none overflow-hidden rounded-[2.5rem]">
              <div className="h-1.5 bg-muted w-full">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: quizStep === 1 ? `${(currentQuestion / 3) * 100}%` : quizStep === 3 ? '100%' : '0%' }}
                />
              </div>
              
              <CardContent className="p-10 lg:p-16">
                {quizStep === 0 && (
                  <div className="text-center space-y-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
                      <Activity className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold">Diagnóstico de Perfil</h2>
                    <Button size="lg" className="w-full rounded-full h-16 text-lg font-bold" onClick={() => setQuizStep(1)}>
                      Iniciar Avaliação (15s)
                    </Button>
                  </div>
                )}

                {quizStep === 1 && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary">
                      <span>Pergunta {currentQuestion} de 3</span>
                    </div>

                    <div className="space-y-6">
                      {currentQuestion === 1 && (
                        <>
                          <h3 className="text-2xl font-bold">1. O que mais incomoda você hoje?</h3>
                          <div className="grid gap-3">
                            {["Dor ou desconforto ao acordar", "Incômodo após ficar muito tempo sentado", "Desconforto ao dirigir", "Sensação constante de rigidez"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 2 && (
                        <>
                          <h3 className="text-2xl font-bold">2. Há quanto tempo isso acontece?</h3>
                          <div className="grid gap-3">
                            {["Menos de 3 meses", "Entre 3 e 12 meses", "Mais de 1 ano"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 3 && (
                        <>
                          <h3 className="text-2xl font-bold">3. Isso já interfere na sua rotina?</h3>
                          <div className="grid gap-3">
                            {["Sim, bastante", "Às vezes", "Ainda pouco"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-lg hover:border-primary group" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100" />
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
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <h3 className="text-2xl font-bold">Analisando seu perfil...</h3>
                  </div>
                )}

                {quizStep === 3 && quizResult && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="text-center space-y-6">
                      <CheckCircle2 className="w-16 h-16 text-secondary mx-auto" />
                      <h2 className="text-3xl font-bold">Seu Resultado</h2>
                      <p className="text-lg italic text-muted-foreground leading-relaxed">
                        "{quizResult.empathyStatement}"
                      </p>
                    </div>

                    <div className="bg-ghost-grey rounded-[2rem] p-8 space-y-6 border border-border/50">
                      <p className="text-xs font-black text-primary uppercase tracking-widest">PROGRESSO DA JORNADA</p>
                      <div className="space-y-4">
                        <ChecklistItem checked={true} label="Diagnóstico Inicial Concluído" />
                        <ChecklistItem checked={true} label="Perfil de Consistência Analisado" />
                        <ChecklistItem checked={false} label="Revelação do Vilão da Dor" />
                        <ChecklistItem checked={false} label="Plano de 30 Dias" />
                      </div>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                      <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> CICLO DETECTADO:
                      </h4>
                      <p className="text-slate-700 leading-relaxed">
                        Existe uma grande chance de você estar preso no ciclo da lombar que nunca descansa. O corpo vai ficando mais rígido e dependente de pausas.
                      </p>
                    </div>

                    <Button className="w-full h-16 rounded-full text-lg font-bold shadow-xl shadow-primary/20" onClick={() => {
                      document.getElementById("revelation")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      Explorar solução
                      <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionMarker step={2} label="A Causa" />

        {/* STATE 4: Relief (Revelation) */}
        <section id="revelation" className="py-24 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="font-headline text-4xl font-bold text-slate-900 leading-tight">O que realmente está acontecendo</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A maioria faz apenas pequenas tentativas isoladas. Um alongamento hoje, uma dica da internet amanhã. O problema raramente é falta de informação. O problema é a <strong>falta de consistência</strong>.
                </p>
                <div className="p-6 bg-white rounded-3xl shadow-sm border border-border/50">
                  <p className="font-medium text-slate-800">
                    Sem consistência, o corpo continua recebendo os mesmos estímulos que criaram o desconforto.
                  </p>
                </div>
              </div>
              <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-square relative group">
                <Image 
                  src={symptomImg || "https://picsum.photos/seed/coluna2/600/400"} 
                  alt="Desconforto" 
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  data-ai-hint="back pain"
                />
              </div>
            </div>
          </div>
        </section>

        <SectionMarker step={3} label="A Solução" />

        {/* STATE 5: Esperança (Solution) */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-headline text-4xl font-bold">A solução: SUPER COLUNA</h2>
              <p className="text-muted-foreground text-lg">Elimine a confusão e siga um caminho claro.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { t: "Programa 30 Dias", d: "Jornada estruturada para criar o hábito da consistência.", icon: <Activity /> },
                { t: "Evolução Guiada", d: "Acompanhe cada pequena vitória e mantenha a motivação.", icon: <TrendingUp /> },
                { t: "Prática e Rápida", d: "Poucos minutos por dia, sem complicações ou academia.", icon: <Smartphone /> }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-premium bg-ghost-grey p-8 rounded-[2rem] space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl">{feature.t}</h3>
                  <p className="text-muted-foreground">{feature.d}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <SectionMarker step={4} label="A Jornada" />

        {/* STATE 6: Confidence (How it works & App Experience) */}
        <section id="how-it-works" className="py-24 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <Image 
                  src={appHomeImg || "https://picsum.photos/seed/coluna3/400/800"} 
                  alt="App Interface" 
                  width={400} 
                  height={800} 
                  className="rounded-[3rem] shadow-2xl border-[10px] border-white mx-auto max-w-[280px]"
                  data-ai-hint="app dashboard"
                />
                <div className="absolute -right-8 top-1/4 p-4 bg-white rounded-2xl shadow-xl animate-bounce">
                  <Check className="text-secondary w-6 h-6" />
                </div>
              </div>
              <div className="space-y-10">
                <h2 className="font-headline text-4xl font-bold">Como funciona</h2>
                <div className="space-y-8">
                  {[
                    { s: "1. Você entra no programa", d: "O app mostra exatamente seu próximo passo. Sem dúvidas ou confusão." },
                    { s: "2. Realiza os exercícios", d: "Vídeos simples e guiados. Nada complexo para acompanhar." },
                    { s: "3. Acompanha a evolução", d: "Cada vitória é registrada. Veja seu progresso real dia após dia." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="font-bold text-xl text-primary">{item.s}</h3>
                      <p className="text-muted-foreground text-lg">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Isso substitui acompanhamento profissional?", a: "Não. O SUPER COLUNA é um programa digital de apoio. Em casos específicos, procure orientação profissional." },
                { q: "Preciso ter experiência com exercícios?", a: "Não. O programa foi desenvolvido para ser simples, intuitivo e fácil de seguir." },
                { q: "Quanto tempo por dia?", a: "Poucos minutos. A ideia é facilitar a continuidade." },
                { q: "É um curso?", a: "Não. Ele funciona como um aplicativo premium de acompanhamento diário." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-ghost-grey rounded-2xl px-6 border-none overflow-hidden">
                  <AccordionTrigger className="hover:no-underline font-bold text-left">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* STATE 7: Decisão (Final CTA) */}
        <section className="py-32 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="container mx-auto px-4 max-w-4xl space-y-12 relative z-10">
            <div className="space-y-6">
              <div className="w-20 h-20 rounded-full border-4 border-secondary flex items-center justify-center mx-auto bg-secondary/10">
                <Check className="w-10 h-10 text-secondary" />
              </div>
              <p className="text-xs font-black tracking-widest text-secondary uppercase">JORNADA 100% DISPONÍVEL</p>
              <h2 className="font-headline text-5xl lg:text-7xl font-bold">Comece hoje.</h2>
              <p className="text-xl text-white/70">Daqui a 30 dias, você pode continuar como está ou ter finalmente começado a cuidar da sua lombar.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="h-20 px-12 rounded-full text-2xl font-bold shadow-2xl shadow-primary/20 group">
                Ativar meu acesso
                <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
              </Button>
            </div>
            
            <p className="text-sm opacity-50">Acesso imediato • 100% Seguro</p>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t py-12">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <Activity className="text-primary w-5 h-5" />
            <span className="font-headline font-bold">SUPER COLUNA</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Este programa é voltado para mobilidade e fortalecimento. Resultados podem variar. © 2024 Super Coluna.
          </p>
        </div>
      </footer>
    </div>
  );
}
