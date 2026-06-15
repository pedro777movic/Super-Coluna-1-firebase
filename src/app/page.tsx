
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ChevronRight,
  TrendingUp,
  Menu,
  Check,
  Circle,
  ArrowDown,
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
import { generateSpinalAnalysis, type PersonalizedSpinalAnalysisOutput } from "@/ai/flows/generate-spinal-analysis";
import { cn } from "@/lib/utils";

export default function SuperColunaLanding() {
  // -- Config --
  const checkoutUrl = "https://pay.kiwify.com.br/yc50tcH";

  // -- States --
  const [quizStep, setQuizStep] = useState(0); // 0: Intro, 1: Questions, 2: Loading, 3: Result
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<PersonalizedSpinalAnalysisOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // -- Images --
  const heroImg = PlaceHolderImages?.find(img => img.id === "hero-mockup")?.imageUrl;
  const appHomeImg = PlaceHolderImages?.find(img => img.id === "app-home")?.imageUrl;
  const appEvolutionImg = PlaceHolderImages?.find(img => img.id === "app-evolution")?.imageUrl;

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
              <a href="#transformation" className="hover:text-primary transition-colors">A Jornada</a>
            </nav>
            <Button size="sm" className="rounded-full px-6" onClick={handleStartQuiz}>Avaliação Gratuita</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="pt-16">
        
        {/* HERO */}
        <section className="relative overflow-hidden bg-white py-12 lg:py-20">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide">
                <span>SUPER COLUNA</span>
              </div>
              <h1 className="font-headline text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-slate-900">
                Sua lombar está <span className="text-primary">roubando mais da sua vida</span> do que você imagina.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A cada dia que passa, o desconforto parece mais normal. Mas viver com limitações não deveria fazer parte da sua rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-full group shadow-xl shadow-primary/20">
                  <Link href={checkoutUrl}>
                    Começar agora
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-full border-2" onClick={handleStartQuiz}>
                  Quero entender meu caso
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-3xl -z-10" />
              <Image 
                src={heroImg || "https://picsum.photos/seed/coluna1/1200/800"} 
                alt="App Mockup Horizontal Topo" 
                width={1200} 
                height={800}
                className="rounded-3xl shadow-2xl border-8 border-white mx-auto max-w-full lg:max-w-xl transition-all hover:scale-[1.02]"
                priority
              />
            </div>
          </div>
        </section>

        {/* SYMPTOMS */}
        <section className="bg-ghost-grey py-12 lg:py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10 space-y-4">
              <h2 className="font-headline text-3xl font-bold text-slate-900">Isso soa familiar para você?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Quando a lombar reclama, ela muda silenciosamente a forma como você vive o seu dia.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Acorda sentindo o corpo rígido e demora para 'aquecer'",
                "Precisa mudar de posição constantemente para encontrar conforto",
                "Evita alguns movimentos porque sabe que vai sentir desconforto",
                "Sente que sua mobilidade já não é a mesma de antes",
                "Tem a sensação de que está se adaptando cada vez mais às limitações"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl shadow-sm border border-border/50 items-start hover:border-primary/30 transition-all hover:shadow-md">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <p className="font-medium text-slate-700 leading-relaxed text-sm lg:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INVISIBLE ADAPTATION */}
        <section className="py-12 bg-white overflow-hidden">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-6">
            <h2 className="font-headline text-3xl font-bold text-slate-900 leading-tight">
              O pior não é a rigidez.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              É o fato de você começar a considerá-la <span className="text-slate-900 font-bold">normal.</span>
            </p>
            <p className="text-lg text-muted-foreground">
              Viver se adaptando a restrições rouba sua liberdade pouco a pouco. Adaptar-se à limitação não é o mesmo que resolvê-la.
            </p>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz-section" className="py-12 bg-ghost-grey relative">
          <div className="container mx-auto px-4 max-w-3xl">
            <Card className="shadow-2xl border-none overflow-hidden rounded-[2.5rem]">
              <div className="h-1.5 bg-muted w-full">
                <div 
                  className="h-full bg-primary transition-all duration-500" 
                  style={{ width: quizStep === 1 ? `${(currentQuestion / 3) * 100}%` : quizStep === 3 ? '100%' : '0%' }}
                />
              </div>
              
              <CardContent className="p-8 lg:p-10">
                {quizStep === 0 && (
                  <div className="text-center space-y-6 animate-fade-in-up">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                      <Activity className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold">Diagnóstico de Perfil</h2>
                    <p className="text-muted-foreground">3 perguntas rápidas para analisarmos como sua lombar está impactando sua vida.</p>
                    <Button size="lg" className="w-full rounded-full h-14 text-lg font-bold" onClick={() => setQuizStep(1)}>
                      Iniciar Avaliação (15s)
                    </Button>
                  </div>
                )}

                {quizStep === 1 && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-primary">
                      <span>Pergunta {currentQuestion} de 3</span>
                    </div>

                    <div className="space-y-4">
                      {currentQuestion === 1 && (
                        <>
                          <h3 className="text-2xl font-bold">1. O que mais incomoda você hoje?</h3>
                          <div className="grid gap-3">
                            {["Dor ou desconforto ao acordar", "Incômodo após ficar muito tempo sentado", "Desconforto ao dirigir", "Sensação constante de rigidez"].map(opt => (
                              <Button key={opt} variant="outline" className="h-14 justify-between px-6 rounded-xl text-md hover:border-primary group text-left" onClick={() => handleQuizAnswer(opt)}>
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
                              <Button key={opt} variant="outline" className="h-14 justify-between px-6 rounded-xl text-md hover:border-primary group text-left" onClick={() => handleQuizAnswer(opt)}>
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
                              <Button key={opt} variant="outline" className="h-14 justify-between px-6 rounded-xl text-md hover:border-primary group text-left" onClick={() => handleQuizAnswer(opt)}>
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
                  <div className="space-y-8 text-center animate-fade-in-up py-6">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <h3 className="text-2xl font-bold">Analisando seu perfil...</h3>
                    <p className="text-muted-foreground">Cruzando dados de mobilidade e impacto rotineiro.</p>
                  </div>
                )}

                {quizStep === 3 && quizResult && (
                  <div className="space-y-8 animate-fade-in-up">
                    <div className="text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-secondary mx-auto" />
                      <h2 className="text-2xl font-bold">Perfil Analisado</h2>
                      <p className="text-md italic text-muted-foreground leading-relaxed">
                        "{quizResult.empathyStatement}"
                      </p>
                    </div>

                    <div className="bg-ghost-grey rounded-[2rem] p-6 space-y-4 border border-border/50">
                      <p className="text-xs font-black text-primary uppercase tracking-widest">PROGRESSO DA DESCOBERTA</p>
                      <div className="space-y-3">
                        <ChecklistItem checked={true} label="Análise de Situação Atual" />
                        <ChecklistItem checked={true} label="Identificação de Ciclo de Rigidez" />
                        <ChecklistItem checked={false} label="Revelação do Vilão da Dor" />
                        <ChecklistItem checked={false} label="Ponte de Recuperação" />
                      </div>
                    </div>

                    <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                      <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> DIAGNÓSTICO DE COMPORTAMENTO:
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-md">
                        Seu perfil indica que você está no <strong>"Ciclo da Lombar que Nunca Descansa"</strong>. O corpo entra em um estado de alerta onde cada movimento é calculado para evitar o incômodo, o que gera ainda mais rigidez.
                      </p>
                    </div>

                    <Button className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20" onClick={() => {
                      document.getElementById("revelation")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      Revelar a causa real
                      <ArrowDown className="ml-2 w-5 h-5 animate-bounce" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* REVELATION */}
        <section id="revelation" className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-3xl text-center space-y-8">
            <h2 className="font-headline text-3xl font-bold text-slate-900 leading-tight">
              A boa notícia é que você não precisa resolver isso sozinho.
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Agora imagine ter um plano simples para começar a mudar isso.
              </p>
              <p>
                Você não precisa ficar procurando exercícios aleatórios ou tentando descobrir o que fazer a cada dia.
              </p>
              <p>
                Tudo fica mais fácil quando existe um aplicativo claro para seguir.
              </p>
            </div>
            <div className="p-6 bg-ghost-grey rounded-2xl border border-border/50">
              <p className="text-slate-900 font-medium">
                Talvez você não precise continuar vivendo assim. E se o retorno à uma lombar forte e saudável fosse uma questão de seguir o sistema do nosso simples aplicativo?
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="py-12 lg:py-16 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10 space-y-4">
              <h2 className="font-headline text-3xl font-bold">A solução: SUPER COLUNA</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Desenvolvemos um sistema que elimina a dor lombar a partir de exercícios simples de baixo esforço.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {[
                { 
                  t: "Mais mobilidade", 
                  d: "Volte a se mover com mais confiança e menos rigidez. Recupere movimentos que antes eram naturais.", 
                  icon: <Zap className="w-6 h-6" /> 
                },
                { 
                  t: "Mais leveza", 
                  d: "Sinta seu corpo responder melhor aos movimentos do dia a dia. Menos esforço para fazer o simples.", 
                  icon: <Sparkles className="w-6 h-6" /> 
                },
                { 
                  t: "Mais liberdade", 
                  d: "Passe menos tempo pensando na lombar e mais tempo vivendo sua rotina. Livre do peso da restrição.", 
                  icon: <ShieldCheck className="w-6 h-6" /> 
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-premium bg-white p-8 rounded-[2.5rem] space-y-4 hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-xl">{feature.t}</h3>
                  <p className="text-muted-foreground text-md leading-relaxed">{feature.d}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative group lg:order-2">
                <Image 
                  src={appHomeImg || "https://picsum.photos/seed/coluna3/1200/800"} 
                  alt="App Interface Horizontal Meio" 
                  width={1200} 
                  height={800} 
                  className="rounded-3xl shadow-2xl border-8 border-white mx-auto max-w-full lg:max-w-lg transition-all hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-8 lg:order-1">
                <h2 className="font-headline text-3xl font-bold leading-tight">Simples e prático</h2>
                <div className="space-y-6 lg:space-y-8">
                  {[
                    { 
                      s: "1. Entre no aplicativo", 
                      d: "Saiba exatamente o que fazer. Sem dúvidas sobre os exercícios que resolverão a dor lombar.",
                      icon: <CheckCircle2 className="w-6 h-6 text-primary" />
                    },
                    { 
                      s: "2. Siga os exercícios", 
                      d: "Poucos minutos por dia. Vídeos rápidos e guiados que cabem na sua rotina.",
                      icon: <CheckCircle2 className="w-6 h-6 text-primary" />
                    },
                    { 
                      s: "3. Sinta sua evolução", 
                      d: "Sintua sua lombar melhorar e sinta seu corpo mais flexível e cada vez menos rígido a cada dia.",
                      icon: <CheckCircle2 className="w-6 h-6 text-primary" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="shrink-0 mt-1">{item.icon}</div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-slate-900">{item.s}</h3>
                        <p className="text-muted-foreground text-sm lg:text-md leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION */}
        <section id="transformation" className="py-16 bg-ghost-grey">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h2 className="font-headline text-3xl lg:text-4xl font-bold leading-tight text-slate-900">
                  Imagine voltar a confiar no seu corpo.
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>Levantar. Caminhar. Dirigir. Trabalhar. Se movimentar.</p>
                  <p className="font-medium text-slate-900">Sem ficar sentindo a lombar o tempo inteiro.</p>
                  <p>Sem aquela sensação constante de rigidez que limita sua vida. Talvez você não precise voltar anos no tempo, mas vai começar a se sentir muito melhor do que se sente hoje.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 text-left">
                  <div className="flex gap-3 items-start p-5 bg-white rounded-2xl shadow-sm">
                    <Check className="w-5 h-5 text-secondary shrink-0" />
                    <p className="text-md font-medium text-slate-700">Volte a focar na vida, não na dor.</p>
                  </div>
                  <div className="flex gap-3 items-start p-5 bg-white rounded-2xl shadow-sm">
                    <Check className="w-5 h-5 text-secondary shrink-0" />
                    <p className="text-md font-medium text-slate-700">Recupere a leveza natural do corpo.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Image 
                  src={appEvolutionImg || "https://picsum.photos/seed/coluna4/1200/800"} 
                  alt="App Evolution Horizontal Meio" 
                  width={1200} 
                  height={800} 
                  className="rounded-3xl shadow-2xl border-8 border-white mx-auto max-w-full lg:max-w-lg transition-all hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-headline text-3xl font-bold text-center mb-10">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {[
                { q: "Isso substitui acompanhamento profissional?", a: "Não. O SUPER COLUNA é um programa digital de apoio voltado para mobilidade e fortalecimento preventivo. Em casos específicos ou persistentes, procure orientação profissional." },
                { q: "Preciso ter experiência com exercícios?", a: "Não. O programa foi desenvolvido para ser extremamente simples e intuitivo, feito para qualquer pessoa seguir." },
                { q: "Quanto tempo por dia?", a: "Apenas alguns minutos. Nosso foco é facilitar a continuidade, não criar uma nova obrigação pesada." },
                { q: "É um curso?", a: "Não. É um programa de acompanhamento diário dentro de um aplicativo premium, focado em jornada e consistência." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-ghost-grey rounded-xl px-6 border-none overflow-hidden">
                  <AccordionTrigger className="hover:no-underline font-bold text-left text-lg py-5">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-md pb-5">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 lg:py-24 bg-slate-900 text-white relative overflow-hidden text-center">
          <div className="container mx-auto px-4 max-w-4xl space-y-12 relative z-10">
            <div className="space-y-6">
              <h2 className="font-headline text-4xl lg:text-5xl font-bold leading-tight">Quanto mais você adia, mais normal isso parece.</h2>
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-xl text-white/80 leading-relaxed">
                  Viver com o corpo rígido e evitar movimentos não deveria ser o seu novo normal.
                </p>
                <p className="text-lg text-white/70">
                  O SUPER COLUNA foi criado para ajudar você a recuperar a mobilidade, fortalecer a lombar e voltar a se movimentar com mais confiança.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-16 px-10 rounded-full text-xl font-bold shadow-2xl shadow-primary/20 group">
                <Link href={checkoutUrl}>
                  Ativar meu acesso agora
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
            
            <p className="text-sm opacity-50">Acesso imediato e seguro ao programa</p>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t py-10">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Activity className="text-primary w-5 h-5" />
            <span className="font-headline font-bold">SUPER COLUNA</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Este aplicativo é focado em mobilidade e fortalecimento preventivo. Resultados variam conforme a consistência. © 2024 Super Coluna.
          </p>
        </div>
      </footer>
    </div>
  );
}
