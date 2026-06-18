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
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
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
  ShieldCheck,
  History,
  Target,
  Award,
  Quote,
  Star
} from "lucide-react";
import { generateSpinalAnalysis, type PersonalizedSpinalAnalysisOutput } from "@/ai/flows/generate-spinal-analysis";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Carlos Roberto",
    role: "54 anos, Empresário",
    text: "Parei de calcular cada movimento. A liberdade de simplesmente levantar do sofá sem sentir aquele 'fisgar' na lombar não tem preço. O programa é cirúrgico.",
    stars: 5
  },
  {
    name: "Ana Martins",
    role: "39 anos, Arquiteta",
    text: "O sistema é tão simples que no começo duvidei. 15 dias seguindo os exercícios e a rigidez matinal simplesmente sumiu.",
    stars: 5
  },
  {
    name: "Roberto Silveira",
    role: "62 anos, Aposentado",
    text: "Voltei a brincar com meus netos no chão. O Super Coluna me devolveu momentos que achei que tinham ficado no passado.",
    stars: 5
  },
  {
    name: "Juliana Farias",
    role: "42 anos, Advogada",
    text: "Dirigir por 2 horas costumava ser um pesadelo. Hoje faço viagens longas e chego ao destino inteira, sem dor.",
    stars: 5
  },
  {
    name: "Marcos Torres",
    role: "45 anos, Desenvolvedor",
    text: "Trabalho sentado o dia todo. O Super Coluna virou meu ritual de liberdade. Acordo sem medo de 'travar' e meu rendimento melhorou.",
    stars: 5
  },
  {
    name: "Beatriz Lemos",
    role: "31 anos, Professora",
    text: "A sensação de segurança que o fortalecimento me deu é incrível. Perdi o medo de fazer movimentos básicos.",
    stars: 5
  },
  {
    name: "Ricardo Prado",
    role: "50 anos, Motorista",
    text: "Eu vivia à base de anti-inflamatórios. Seguir o sistema guiado foi a única coisa que trouxe alívio real e duradouro.",
    stars: 5
  },
  {
    name: "Fernanda G.",
    role: "37 anos, Designer",
    text: "A clareza dos exercícios é o diferencial. Você sabe exatamente o que fazer e sente a evolução a cada dia.",
    stars: 5
  }
];

export default function SuperColunaLanding() {
  const checkoutUrl = "https://pay.kiwify.com.br/yc50tcH";

  const [quizStep, setQuizStep] = useState(0); 
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<PersonalizedSpinalAnalysisOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  
  const appHomeImg = "https://i.postimg.cc/0QYLm3tP/IMG-20260613-WA0073.jpg";
  const appEvolutionImg = "https://i.postimg.cc/TPYyZMDs/Chat-GPT-Image-13-06-2026-17-27-18.png";

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!api) return;
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(intervalId);
  }, [api]);

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
    <div className={cn("flex items-center gap-3 transition-all duration-700", !checked && "opacity-40")}>
      <div className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all",
        checked ? "bg-secondary border-secondary text-white scale-110 shadow-sm" : "border-slate-200 bg-white"
      )}>
        {checked ? <Check className="w-3.5 h-3.5 stroke-[3px]" /> : <Circle className="w-2 h-2 fill-slate-300 border-none" />}
      </div>
      <span className={cn("text-sm font-semibold tracking-tight", checked ? "text-slate-800" : "text-slate-400")}>{label}</span>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/10">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[70] pointer-events-none">
        <div 
          className="h-full bg-secondary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-[60] bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-lg lg:text-xl tracking-tighter text-primary">SUPER COLUNA</span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <nav className="flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
              <a href="#transformation" className="hover:text-primary transition-colors">A Jornada</a>
            </nav>
            <Button size="sm" variant="secondary" className="rounded-full px-6 h-10 font-bold active:scale-95 transition-transform shadow-button" onClick={handleStartQuiz}>Avaliação Gratuita</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-slate-100 text-primary">
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      <main className="pt-16 lg:pt-20">
        
        {/* HERO */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-32">
          <div className="section-container max-w-4xl text-center">
            <div className="space-y-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 text-primary rounded-full text-[11px] font-black uppercase tracking-[0.2em] mx-auto border border-primary/10">
                <Sparkles className="w-3 h-3" />
                <span>EXCLUSIVO SUPER COLUNA</span>
              </div>
              <h1 className="text-4xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground">
                Sua lombar está <span className="text-secondary italic">roubando a sua vida</span> e envelhecendo seu corpo anos antes do tempo.
              </h1>
              <p className="text-lg lg:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                A cada dia que passa, você aceita a dor como se fosse normal. Mas a verdade é cruel: viver limitado, sentindo-se refém do próprio corpo, é uma escolha que está te custando caro demais.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                <Button asChild size="lg" variant="secondary" className="h-16 px-10 text-lg font-bold rounded-full group shadow-button active:scale-95 transition-all">
                  <Link href={checkoutUrl}>
                    Blindar minha coluna agora
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-2 border-slate-200 hover:bg-slate-50 active:scale-95 transition-all text-primary" onClick={handleStartQuiz}>
                  Diagnóstico do meu caso
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SYMPTOMS */}
        <section className="bg-ghost-grey py-20 lg:py-28">
          <div className="section-container">
            <div className="text-center mb-16 space-y-4 animate-fade-in-up">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Isso soa familiar para você?</h2>
              <p className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                Quando a sua lombar falha, ela dita as regras de como você deve viver, transformando tarefas simples em tortura diária.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "Acorda com o corpo travado, rígido, sentindo-se um idoso de 80 anos até o corpo 'aquecer'",
                "Precisa se mexer na cadeira a cada 5 minutos porque nenhuma posição alivia o incômodo",
                "Deixou de fazer movimentos simples ou hobbies que ama por medo real de 'travar' a coluna",
                "Sente que sua agilidade e vigor sumiram, dando lugar a um corpo pesado e cansado",
                "Percebeu que sua vida diminuiu para caber dentro das suas limitações físicas",
                "Sentar por mais de uma hora se tornou um teste de resistência física e mental"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-7 bg-white rounded-[2rem] shadow-premium border border-white items-start hover:border-secondary/20 transition-all hover:-translate-y-1 group">
                  <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-0.5 group-hover:bg-secondary group-hover:text-white transition-colors">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <p className="font-semibold text-slate-700 leading-relaxed text-sm lg:text-base">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INVISIBLE ADAPTATION */}
        <section id="revelation" className="py-24 bg-white overflow-hidden">
          <div className="section-container max-w-3xl text-center space-y-8 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
              O pior não é a rigidez.
            </h2>
            <div className="space-y-6">
              <p className="text-2xl lg:text-3xl text-slate-400 leading-relaxed font-medium">
                É a negligência de você começar a achar que isso é <span className="text-foreground font-bold decoration-secondary decoration-4 underline-offset-8">normal.</span>
              </p>
              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Cada dia que você passa se adaptando à dor é um dia a menos de liberdade. Você não precise continuar vivendo assim. E se o retorno à uma lombar forte e saudável fosse uma questão de seguir o sistema do nosso simples aplicativo?
              </p>
            </div>
          </div>
        </section>

        {/* QUIZ */}
        <section id="quiz-section" className="py-20 lg:py-32 bg-ghost-grey relative">
          <div className="section-container max-w-3xl">
            <Card className="shadow-premium border-none overflow-hidden rounded-[2.5rem] bg-white">
              <div className="h-2 bg-slate-100 w-full">
                <div 
                  className="h-full bg-secondary transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)" 
                  style={{ width: quizStep === 1 ? `${(currentQuestion / 3) * 100}%` : quizStep === 3 ? '100%' : '0%' }}
                />
              </div>
              
              <CardContent className="p-10 lg:p-16">
                {quizStep === 0 && (
                  <div className="text-center space-y-8 animate-fade-in-up">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary shadow-inner">
                      <Activity className="w-10 h-10" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-bold tracking-tight">Diagnóstico de Perfil</h2>
                      <p className="text-slate-500 font-medium text-lg">3 perguntas cruciais para avaliarmos a gravidade do seu caso.</p>
                    </div>
                    <Button size="lg" variant="secondary" className="w-full rounded-full h-16 text-lg font-bold shadow-button active:scale-[0.98] transition-all" onClick={() => setQuizStep(1)}>
                      Iniciar Avaliação (15s)
                    </Button>
                  </div>
                )}

                {quizStep === 1 && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      <span>Pergunta {currentQuestion} de 3</span>
                    </div>

                    <div className="space-y-6">
                      {currentQuestion === 1 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">1. O que mais incomoda você hoje?</h3>
                          <div className="grid gap-3.5">
                            {["Dor ou desconforto ao acordar", "Incômodo após ficar muito tempo sentado", "Desconforto ao dirigir", "Sensação constante de rigidez"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-secondary hover:bg-secondary/5 group text-left transition-all active:scale-[0.99] text-slate-700" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity text-secondary" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 2 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">2. Há quanto tempo isso acontece?</h3>
                          <div className="grid gap-3.5">
                            {["Menos de 3 meses", "Entre 3 e 12 meses", "Mais de 1 ano"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-secondary hover:bg-secondary/5 group text-left transition-all active:scale-[0.99] text-slate-700" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity text-secondary" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 3 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold tracking-tight">3. Isso já interfere na sua rotina?</h3>
                          <div className="grid gap-3.5">
                            {["Sim, bastante", "Às vezes", "Ainda pouco"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-secondary hover:bg-secondary/5 group text-left transition-all active:scale-[0.99] text-slate-700" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity text-secondary" />
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
                      <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold">Analisando gravidade...</h3>
                      <p className="text-slate-500 font-medium">Cruzando dados de mobilidade e impacto rotineiro.</p>
                    </div>
                  </div>
                )}

                {quizStep === 3 && quizResult && (
                  <div className="space-y-10 animate-fade-in-up">
                    <div className="text-center space-y-6">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
                        <CheckCircle2 className="w-10 h-10 stroke-[2.5px]" />
                      </div>
                      <h2 className="text-3xl font-bold tracking-tight">Perfil Analisado</h2>
                      <p className="text-lg italic text-slate-500 font-medium leading-relaxed max-w-xl mx-auto">
                        "{quizResult.empathyStatement}"
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-[2rem] p-8 space-y-5 border border-slate-100">
                      <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">FASE DA DESCOBERTA</p>
                      <div className="grid gap-4">
                        <ChecklistItem checked={true} label="Análise de Situação Atual" />
                        <ChecklistItem checked={true} label="Identificação de Ciclo de Rigidez" />
                        <ChecklistItem checked={false} label="Revelação do Vilão da Dor" />
                        <ChecklistItem checked={false} label="Ponte de Recuperação" />
                      </div>
                    </div>

                    <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/10">
                      <h4 className="font-bold text-primary mb-4 flex items-center gap-2.5 text-xs uppercase tracking-widest">
                        <TrendingUp className="w-4 h-4" /> Diagnóstico Comportamental:
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-lg font-medium">
                        Seu perfil indica que você está no <span className="text-primary font-bold">"Ciclo da Lombar que Nunca Descansa"</span>. O corpo entra em um estado de alerta onde cada movimento é calculado para evitar o incômodo, gerando ainda mais rigidez.
                      </p>
                    </div>

                    <Button variant="secondary" className="w-full h-16 rounded-full text-lg font-bold shadow-button group active:scale-[0.98] transition-all" onClick={() => {
                      document.getElementById("revelation-message")?.scrollIntoView({ behavior: "smooth" });
                    }}>
                      Revelar a causa real
                      <ArrowDown className="ml-2 w-5 h-5 animate-bounce group-hover:animate-none" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* REVELATION MESSAGE */}
        <section id="revelation-message" className="py-24 bg-white">
          <div className="section-container max-w-3xl text-center space-y-10 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
              A boa notícia é que você está a um passo de dar um basta definitivo nisso.
            </h2>
            <div className="space-y-6 text-xl text-slate-500 leading-relaxed font-medium">
              <p>Agora imagine ter o mapa exato para recuperar as rédeas da sua vida física.</p>
              <p>Chega de perder tempo no YouTube procurando exercícios aleatórios que podem piorar sua situação ou de gastar fortunas com remédios que apenas mascaram o problema.</p>
              <p>O caos da dor termina onde um sistema científico e testado começa.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-foreground font-bold text-lg lg:text-xl leading-relaxed">
                Você não foi feito para viver quebrado. E se a blindagem completa da sua lombar fosse apenas uma questão de seguir o método exato do nosso aplicativo especializado?
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="py-24 lg:py-32 bg-ghost-grey">
          <div className="section-container">
            <div className="text-center mb-20 space-y-4 animate-fade-in-up">
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">A solução definitiva: SUPER COLUNA</h2>
              <p className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                Desenvolvemos o único sistema de engenharia corporal focado em eliminar a dor lombar através de estímulos biomegânicos de altíssima eficiência e baixo esforço.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { 
                  t: "Mobilidade Absoluta", 
                  d: "Recupere a amplitude de movimento que você achou que tinha perdido para sempre. Mova-se com a segurança de um jovem.", 
                  icon: <Zap className="w-7 h-7" /> 
                },
                { 
                  t: "Leveza Descomplicada", 
                  d: "Elimine o peso morto da inflamação crônica. Seu corpo vai responder aos comandos do dia a dia com fluidez instantânea.", 
                  icon: <Sparkles className="w-7 h-7" /> 
                },
                { 
                  t: "Liberdade Inegociável", 
                  d: "Zere o relógio do medo. Esqueça que você tem uma coluna e volte a focar no seu trabalho, na sua família e no seu lazer.", 
                  icon: <ShieldCheck className="w-7 h-7" /> 
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-premium bg-white p-10 lg:p-12 rounded-[2.5rem] space-y-6 hover:-translate-y-2 transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-2xl">{feature.t}</h3>
                    <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-medium">{feature.d}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 lg:py-32 bg-white">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="relative group lg:order-2 animate-fade-in-up">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                <Image 
                  src={appHomeImg || "https://picsum.photos/seed/coluna3/1200/800"} 
                  alt="App Interface" 
                  width={1200} 
                  height={800} 
                  className="relative rounded-[2.5rem] shadow-2xl border-[12px] border-white mx-auto transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-12 lg:order-1 animate-fade-in-up">
                <div className="space-y-4">
                  <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">Simples e prático</h2>
                  <p className="text-slate-500 text-lg font-medium">O protocolo definitivo para sua liberdade física em 3 etapas:</p>
                </div>
                <div className="space-y-10">
                  {[
                    { 
                      s: "1. Acesse o aplicativo", 
                      d: "Direto ao ponto. Você saberá exatamente qual botão apertar e qual ação tomar para desinflamar sua lombar hoje.",
                      icon: <CheckCircle2 className="w-7 h-7 text-secondary" />
                    },
                    { 
                      s: "2. Execute o protocolo diário", 
                      d: "Apenas alguns minutos. Vídeos em alta definição, guiados passo a passo, projetados para se encaixarem na rotina de pessoas ocupadas.",
                      icon: <CheckCircle2 className="w-7 h-7 text-secondary" />
                    },
                    { 
                      s: "3. Sinta o alívio imediato", 
                      d: "Acompanhe a rigidez indo embora logo nas primeiras sessões enquanto sua coluna retoma a estabilidade perdida.",
                      icon: <CheckCircle2 className="w-7 h-7 text-secondary" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="shrink-0 mt-1 transition-transform group-hover:scale-110">{item.icon}</div>
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-xl tracking-tight">{item.s}</h3>
                        <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-medium">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHORITY MINI SECTION */}
        <section className="py-12 bg-primary text-white overflow-hidden relative border-y border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <div className="section-container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 text-white font-black tracking-[0.2em] text-[10px] uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
                  <Award className="w-3.5 h-3.5 text-secondary" /> CIÊNCIA APLICADA
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white">
                  Mais de <span className="text-secondary italic">30 anos de evidências científicas</span> sobre a saúde da coluna
                </h2>
                <div className="space-y-4">
                  <p className="text-white/40 text-sm italic font-medium">
                    "O problema é conseguir aplicar isso na sua rotina."
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed font-semibold">
                    O <span className="text-secondary font-bold">SUPER COLUNA</span> traduz décadas de estudos clínicos em um passo a passo automatizado, seguro e infalível.
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full max-w-lg space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Movimento Estruturado", icon: <Activity className="w-5 h-5" /> },
                    { label: "Reforço Clínico", icon: <Target className="w-5 h-5" /> },
                    { label: "Ritmo Progressivo", icon: <History className="w-5 h-5" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center space-y-3 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-secondary/50 transition-all group">
                      <div className="text-secondary group-hover:scale-110 transition-transform">{item.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50 text-center">{item.label}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" variant="secondary" className="w-full h-16 rounded-full text-lg font-bold shadow-button group active:scale-95 transition-all">
                  <Link href={checkoutUrl}>
                    Ativar meu acesso agora
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="py-20 bg-white overflow-hidden border-b border-slate-50">
          <div className="section-container">
            <div className="text-center mb-12 space-y-3">
              <p className="text-secondary font-black uppercase tracking-[0.2em] text-[10px]">RECONHECIMENTO REAL</p>
              <h2 className="text-2xl lg:text-4xl font-bold tracking-tight">Resultados incontestáveis de quem recuperou a autonomia física</h2>
            </div>
            
            <Carousel 
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((t, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <Card className="h-full border-none shadow-premium bg-ghost-grey rounded-[2rem] p-8 space-y-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-500">
                      <div className="space-y-4">
                        <div className="flex gap-1 text-secondary">
                          {[...Array(t.stars)].map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-secondary" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-secondary/10 rotate-180" />
                        <p className="text-slate-700 font-medium leading-relaxed italic">
                          "{t.text}"
                        </p>
                      </div>
                      <div className="pt-6 border-t border-slate-200/60">
                        <p className="font-bold text-foreground">{t.name}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* TRANSFORMATION */}
        <section id="transformation" className="py-24 lg:py-32 bg-ghost-grey">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="space-y-10 text-center lg:text-left animate-fade-in-up">
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight">
                  Imagine voltar a ter controle total sobre o seu corpo.
                </h2>
                <div className="space-y-6 text-xl text-slate-500 leading-relaxed font-medium">
                  <p>Levantar num salto. Caminhar quilômetros. Dirigir por horas. Pegar peso sem medo.</p>
                  <p className="font-bold text-foreground text-2xl italic">Sem que a sua mente seja refém do medo de travar.</p>
                  <p>Sem aquela névoa constante de cansaço e rigidez que sabota o seu humor e o seu dia. Você está a poucos dias de experimentar um vigor físico que nem lembrava que existia.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5 text-left">
                  <div className="flex gap-4 items-start p-6 bg-white rounded-3xl shadow-premium border border-white hover:border-secondary/20 transition-all">
                    <Check className="w-6 h-6 text-secondary shrink-0 stroke-[3px]" />
                    <p className="text-base lg:text-lg font-bold text-slate-800">Foque na sua vida, destrua a dor.</p>
                  </div>
                  <div className="flex gap-4 items-start p-6 bg-white rounded-3xl shadow-premium border border-white hover:border-secondary/20 transition-all">
                    <Check className="w-6 h-6 text-secondary shrink-0 stroke-[3px]" />
                    <p className="text-base lg:text-lg font-bold text-slate-800">Recupere a máquina que é o seu corpo.</p>
                  </div>
                </div>
              </div>
              <div className="relative group animate-fade-in-up">
                <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] blur-2xl group-hover:bg-primary/10 transition-colors" />
                <Image 
                  src={appEvolutionImg || "https://picsum.photos/seed/coluna4/1200/800"} 
                  alt="Evolução" 
                  width={1200} 
                  height={800} 
                  className="relative rounded-[2.5rem] shadow-2xl border-[12px] border-white mx-auto transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 lg:py-32 bg-white">
          <div className="section-container max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 tracking-tight">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Isso substitui acompanhamento profissional?", a: "Não. O SUPER COLUNA é um programa digital focado em mobilidade e fortalecimento preventivo. Em casos específicos ou persistentes, procure orientação profissional." },
                { q: "Preciso ter experiência com exercícios?", a: "Não. O programa foi desenvolvido para ser extremamente simples e intuitivo, feito para qualquer pessoa seguir." },
                { q: "Quanto tempo por dia?", a: "Apenas alguns minutos. Nosso foco é facilitar a continuidade, não criar uma nova obrigação pesada." },
                { q: "É um curso?", a: "Não. É um programa de acompanhamento diário dentro de um aplicativo premium, focado em jornada e consistência." }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 rounded-3xl px-8 border-none overflow-hidden hover:bg-slate-100/80 transition-colors">
                  <AccordionTrigger className="hover:no-underline font-bold text-left text-lg py-6 tracking-tight">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-slate-500 leading-relaxed text-base lg:text-lg pb-7 font-medium">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 lg:py-24 bg-primary text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full" />
          <div className="section-container relative z-10">
            <div className="text-center space-y-8 mb-16 animate-fade-in-up">
              <h2 className="text-3xl lg:text-5xl font-bold leading-tight tracking-tight text-white">Quanto mais você adia a decisão,<br />mais <span className="text-secondary">crônica</span> a sua dor se torna.</h2>
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-lg lg:text-xl text-white/80 font-medium">Viver preso em um corpo travado não é uma fatalidade, é uma negligência com você mesmo.</p>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]">O SUPER COLUNA é a ferramenta definitiva que vai restaurar sua autonomia.</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-stretch animate-fade-in-up">
              <div className="space-y-8 bg-white/5 p-8 lg:p-10 rounded-[2.5rem] border border-white/10">
                <h3 className="text-xl font-bold text-secondary tracking-tight">Ao ativar seu acesso hoje, você recebe:</h3>
                <div className="grid gap-5">
                  {[
                    { title: "Aplicativo com o Protocolo de Choque de 30 Dias", desc: "A rota exata, estruturada e blindada contra falhas." },
                    { title: "Aulas Diárias de Alta Performance em Vídeo", desc: "Execuções cirúrgicas, simples de entender e impossíveis de errar." },
                    { title: "Painel de Evolução Biométrica", desc: "Monitore matematicamente a melhora da sua mobilidade." },
                    { title: "Sistema de Recompensas e Consistência", desc: "A neurociência aplicada para garantir que você não desista do processo." },
                    { title: "Módulo Master: \"A Anatomia da Dor\"", desc: "O conhecimento estratégico para nunca mais ser enganado por crises." },
                    { title: "Acesso Instantâneo e Vitalício à Plataforma", desc: "Comece agora pelo celular, tablet ou computador." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 transition-transform">
                        <Check className="w-3 h-3 text-white stroke-[3px]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-xs text-white/40 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="space-y-6 relative z-10">
                  <h3 className="text-lg font-bold text-secondary mb-4 uppercase tracking-[0.2em]">Nas próximas 2 semanas:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    {["✓ Destravamento imediato", "✓ Fim da rigidez matinal", "✓ Confiança inabalável", "✓ Liberdade física", "✓ Método no piloto automático"].map((text, i) => (
                      <span key={i} className="text-base font-bold text-white/90 tracking-tight">{text}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 space-y-6 pt-8 border-t border-white/10 relative z-10">
                  <p className="text-base text-white/70 leading-relaxed italic font-medium">
                    "Daqui a 30 dias, você pode continuar lidando com as mesmas dores, limitações e frustrações... ou pode olhar para trás e agradecer por ter tomado a única decisão inteligente possível hoje."
                  </p>
                  
                  <div className="space-y-5">
                    <Button asChild size="lg" variant="secondary" className="w-full h-18 py-8 rounded-full text-lg font-black shadow-button group active:scale-[0.98] transition-all">
                      <Link href={checkoutUrl}>
                        QUERO UMA SUPER COLUNA AGORA
                        <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>

                    <p className="text-[10px] text-white/30 text-center uppercase font-black tracking-[0.3em]">
                      Acesso imediato • Programa guiado • Multiplataforma
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-white border-t py-16">
        <div className="section-container text-center space-y-6">
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <span className="font-headline font-bold text-primary tracking-tighter">SUPER COLUNA</span>
          </div>
          <p className="text-xs font-semibold text-slate-400 max-w-md mx-auto leading-relaxed uppercase tracking-widest">
            Este aplicativo é focado em mobilidade e fortalecimento preventivo. © 2024 Super Coluna.
          </p>
        </div>
      </footer>
    </div>
  );
}
