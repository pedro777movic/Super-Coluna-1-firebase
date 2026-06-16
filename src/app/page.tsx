"use client";

import React, { useState, useEffect, useCallback } from "react";
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
import { PlaceHolderImages } from "@/app/lib/placeholder-images";
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
    text: "O sistema é tão simples que no começo duvidei. 15 dias seguindo os vídeos e a rigidez matinal que me acompanhava há anos simplesmente sumiu.",
    stars: 5
  },
  {
    name: "Roberto Silveira",
    role: "62 anos, Aposentado",
    text: "Voltei a brincar com meus netos no chão. O Super Coluna me devolveu momentos que eu achei que tinham ficado no passado por causa da idade.",
    stars: 5
  },
  {
    name: "Juliana Farias",
    role: "42 anos, Advogada",
    text: "Dirigir por 2 horas costumava ser um pesadelo. Hoje faço viagens longas e chego ao destino inteira, sem precisar de remédios para dor.",
    stars: 5
  },
  {
    name: "Marcos Torres",
    role: "45 anos, Desenvolvedor",
    text: "Trabalho sentado o dia todo. O Super Coluna virou meu ritual de liberdade. Acordo sem medo de 'travar' e meu rendimento no trabalho até melhorou.",
    stars: 5
  },
  {
    name: "Beatriz Lemos",
    role: "31 anos, Professora",
    text: "A sensação de segurança que o fortalecimento me deu é incrível. Perdi o medo de fazer movimentos básicos e voltei a me sentir jovem e leve.",
    stars: 5
  },
  {
    name: "Ricardo Prado",
    role: "50 anos, Motorista",
    text: "Eu vivia à base de anti-inflamatórios. Seguir o sistema guiado foi a única coisa que trouxe alívio real e duradouro. É um investimento na vida.",
    stars: 5
  },
  {
    name: "Fernanda G.",
    role: "37 anos, Designer",
    text: "A clareza dos exercícios é o diferencial. Você sabe exatamente o que fazer e sente a evolução a cada dia. Minha lombar nunca esteve tão forte.",
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

  // Auto-play logic for carousel
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
          className="h-full bg-primary transition-all duration-300 ease-out"
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
            <span className="font-headline font-bold text-lg lg:text-xl tracking-tighter text-slate-900">SUPER COLUNA</span>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <nav className="flex gap-8 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#how-it-works" className="hover:text-primary transition-colors">Como Funciona</a>
              <a href="#transformation" className="hover:text-primary transition-colors">A Jornada</a>
            </nav>
            <Button size="sm" className="rounded-full px-6 h-10 font-bold active:scale-95 transition-transform" onClick={handleStartQuiz}>Avaliação Gratuita</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-slate-100">
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
              <h1 className="font-headline text-4xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-slate-900">
                Sua lombar está <span className="text-primary italic">roubando da sua vida</span> mais do que você imagina.
              </h1>
              <p className="text-lg lg:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                A cada dia que passa, o desconforto parece mais normal. Mas viver com limitações não deveria fazer parte da sua rotina.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                <Button asChild size="lg" className="h-16 px-10 text-lg font-bold rounded-full group shadow-button active:scale-95 transition-all">
                  <Link href={checkoutUrl}>
                    Começar agora
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-full border-2 border-slate-200 hover:bg-slate-50 active:scale-95 transition-all" onClick={handleStartQuiz}>
                  Entender meu caso
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* SYMPTOMS */}
        <section className="bg-ghost-grey py-20 lg:py-28">
          <div className="section-container">
            <div className="text-center mb-16 space-y-4 animate-fade-in-up">
              <h2 className="font-headline text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight">Isso soa familiar para você?</h2>
              <p className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                Quando a lombar reclama, ela muda silenciosamente a forma como você vive o seu dia.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                "Acorda sentindo o corpo rígido e demora para 'aquecer'",
                "Precisa mudar de posição constantemente para encontrar conforto",
                "Evita alguns movimentos porque sabe que vai sentir desconforto",
                "Sente que sua mobilidade já não é a mesma de antes",
                "Tem a sensação de que está se adaptando cada vez mais às limitações",
                "Desconforto persistente após longos períodos sentado"
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-7 bg-white rounded-[2rem] shadow-premium border border-white items-start hover:border-primary/20 transition-all hover:-translate-y-1 group">
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
        <section className="py-24 bg-white overflow-hidden">
          <div className="section-container max-w-3xl text-center space-y-8 animate-fade-in-up">
            <h2 className="font-headline text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              O pior não é a rigidez.
            </h2>
            <div className="space-y-6">
              <p className="text-2xl lg:text-3xl text-slate-400 leading-relaxed font-medium">
                É o fato de você começar a considerá-la <span className="text-slate-900 font-bold decoration-primary decoration-4 underline-offset-8">normal.</span>
              </p>
              <p className="text-lg lg:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
                Viver se adaptando a restrições rouba sua liberdade pouco a pouco. Adaptar-se à limitação não é o mesmo que resolvê-la.
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
                  className="h-full bg-primary transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1)" 
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
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Diagnóstico de Perfil</h2>
                      <p className="text-slate-500 font-medium text-lg">3 perguntas rápidas para analisarmos seu caso.</p>
                    </div>
                    <Button size="lg" className="w-full rounded-full h-16 text-lg font-bold shadow-button active:scale-[0.98] transition-all" onClick={() => setQuizStep(1)}>
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
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">1. O que mais incomoda você hoje?</h3>
                          <div className="grid gap-3.5">
                            {["Dor ou desconforto ao acordar", "Incômodo após ficar muito tempo sentado", "Desconforto ao dirigir", "Sensação constante de rigidez"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-primary hover:bg-primary/5 group text-left transition-all active:scale-[0.99]" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 2 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">2. Há quanto tempo isso acontece?</h3>
                          <div className="grid gap-3.5">
                            {["Menos de 3 meses", "Entre 3 e 12 meses", "Mais de 1 ano"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-primary hover:bg-primary/5 group text-left transition-all active:scale-[0.99]" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
                              </Button>
                            ))}
                          </div>
                        </>
                      )}
                      {currentQuestion === 3 && (
                        <>
                          <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">3. Isso já interfere na sua rotina?</h3>
                          <div className="grid gap-3.5">
                            {["Sim, bastante", "Às vezes", "Ainda pouco"].map(opt => (
                              <Button key={opt} variant="outline" className="h-16 justify-between px-8 rounded-2xl text-md font-bold hover:border-primary hover:bg-primary/5 group text-left transition-all active:scale-[0.99]" onClick={() => handleQuizAnswer(opt)}>
                                {opt}
                                <ChevronRight className="w-5 h-5 opacity-30 group-hover:opacity-100 transition-opacity" />
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
                      <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900">Analisando seu perfil...</h3>
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
                      <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Perfil Analisado</h2>
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
                        Seu perfil indica que você está no <span className="text-slate-900 font-bold">"Ciclo da Lombar que Nunca Descansa"</span>. O corpo entra em um estado de alerta onde cada movimento é calculado para evitar o incômodo, o que gera ainda mais rigidez.
                      </p>
                    </div>

                    <Button className="w-full h-16 rounded-full text-lg font-bold shadow-button group active:scale-[0.98] transition-all" onClick={() => {
                      document.getElementById("revelation")?.scrollIntoView({ behavior: "smooth" });
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

        {/* REVELATION */}
        <section id="revelation" className="py-24 bg-white">
          <div className="section-container max-w-3xl text-center space-y-10 animate-fade-in-up">
            <h2 className="font-headline text-3xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              A boa notícia é que você não precisa resolver isso sozinho.
            </h2>
            <div className="space-y-6 text-xl text-slate-500 leading-relaxed font-medium">
              <p>Agora imagine ter um plano simples para começar a mudar isso.</p>
              <p>Você não precisa ficar procurando exercícios aleatórios ou tentando descobrir o que fazer a cada dia.</p>
              <p>Tudo fica mais fácil quando existe um sistema claro para seguir.</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <p className="text-slate-900 font-bold text-lg lg:text-xl leading-relaxed">
                Você não precisa continuar vivendo assim. E se o retorno à uma lombar forte e saudável fosse uma questão de seguir o sistema do nosso simples aplicativo?
              </p>
            </div>
          </div>
        </section>

        {/* SOLUTION */}
        <section className="py-24 lg:py-32 bg-ghost-grey">
          <div className="section-container">
            <div className="text-center mb-20 space-y-4 animate-fade-in-up">
              <h2 className="font-headline text-3xl lg:text-5xl font-bold tracking-tight">A solução: SUPER COLUNA</h2>
              <p className="text-slate-500 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
                Desenvolvemos um sistema que elimina a dor lombar a partir de exercícios simples de baixo esforço.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { 
                  t: "Mais mobilidade", 
                  d: "Volte a se mover com mais confiança e menos rigidez. Recupere movimentos que antes eram naturais.", 
                  icon: <Zap className="w-7 h-7" /> 
                },
                { 
                  t: "Mais leveza", 
                  d: "Sinta seu corpo responder melhor aos movimentos do dia a dia. Menos esforço para fazer o simples.", 
                  icon: <Sparkles className="w-7 h-7" /> 
                },
                { 
                  t: "Mais liberdade", 
                  d: "Passe menos tempo pensando na lombar e mais tempo vivendo sua rotina. Livre do peso da restrição.", 
                  icon: <ShieldCheck className="w-7 h-7" /> 
                }
              ].map((feature, i) => (
                <Card key={i} className="border-none shadow-premium bg-white p-10 lg:p-12 rounded-[2.5rem] space-y-6 hover:-translate-y-2 transition-all group">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-2xl text-slate-900">{feature.t}</h3>
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
                  <h2 className="font-headline text-3xl lg:text-5xl font-bold leading-tight tracking-tight">Simples e prático</h2>
                  <p className="text-slate-500 text-lg font-medium">A jornada para sua liberdade de movimento em 3 passos:</p>
                </div>
                <div className="space-y-10">
                  {[
                    { 
                      s: "1. Entre no aplicativo", 
                      d: "Saiba exatamente o que fazer. Sem dúvidas sobre os exercícios que resolverão a dor lombar.",
                      icon: <CheckCircle2 className="w-7 h-7 text-primary" />
                    },
                    { 
                      s: "2. Siga os exercícios", 
                      d: "Poucos minutos por dia. Vídeos rápidos e guiados que cabem na sua rotina.",
                      icon: <CheckCircle2 className="w-7 h-7 text-primary" />
                    },
                    { 
                      s: "3. Sinta sua evolução", 
                      d: "Sinta sua lombar melhorar e seu corpo mais flexível e cada vez menos rígido a cada dia.",
                      icon: <CheckCircle2 className="w-7 h-7 text-primary" />
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="shrink-0 mt-1 transition-transform group-hover:scale-110">{item.icon}</div>
                      <div className="space-y-1.5">
                        <h3 className="font-bold text-xl text-slate-900 tracking-tight">{item.s}</h3>
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
        <section className="py-16 bg-slate-900 text-white overflow-hidden relative border-y border-white/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 blur-[100px] rounded-full -ml-32 -mb-32" />
          
          <div className="section-container relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
              <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-flex items-center gap-2 text-primary font-black tracking-[0.2em] text-[10px] uppercase bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                  <Award className="w-3.5 h-3.5" /> CIÊNCIA APLICADA
                </div>
                <h2 className="font-headline text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
                  Mais de <span className="text-primary italic">30 anos de pesquisas</span> apontam para a mesma direção
                </h2>
                <div className="space-y-4">
                  <p className="text-white/40 text-base italic font-medium">
                    "O problema é conseguir aplicar isso na sua rotina."
                  </p>
                  <p className="text-lg text-white/80 leading-relaxed font-semibold">
                    O <span className="text-primary font-bold">SUPER COLUNA</span> transforma ciência em um programa simples e guiado.
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full max-w-lg space-y-8">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Movimento", icon: <Activity className="w-5 h-5" /> },
                    { label: "Reforço", icon: <Target className="w-5 h-5" /> },
                    { label: "Ritmo", icon: <History className="w-5 h-5" /> }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center space-y-3 p-5 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all group">
                      <div className="text-primary group-hover:scale-110 transition-transform">{item.icon}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{item.label}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="w-full h-16 rounded-full text-lg font-bold shadow-button group bg-primary hover:bg-primary/90 active:scale-95 transition-all">
                  <Link href={checkoutUrl}>
                    Ativar meu acesso
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
              <p className="text-primary font-black uppercase tracking-[0.2em] text-[10px]">RECONHECIMENTO REAL</p>
              <h2 className="font-headline text-2xl lg:text-4xl font-bold tracking-tight text-slate-900">Histórias de quem retomou a liberdade</h2>
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
                        <div className="flex gap-1 text-primary">
                          {[...Array(t.stars)].map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-primary" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-primary/10 rotate-180" />
                        <p className="text-slate-700 font-medium leading-relaxed italic">
                          "{t.text}"
                        </p>
                      </div>
                      <div className="pt-6 border-t border-slate-200/60">
                        <p className="font-bold text-slate-900">{t.name}</p>
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
                <h2 className="font-headline text-3xl lg:text-5xl font-bold leading-tight text-slate-900 tracking-tight">
                  Imagine voltar a confiar no seu corpo.
                </h2>
                <div className="space-y-6 text-xl text-slate-500 leading-relaxed font-medium">
                  <p>Levantar. Caminhar. Dirigir. Trabalhar. Se movimentar.</p>
                  <p className="font-bold text-slate-900 text-2xl italic">Sem ficar sentindo a lombar o tempo inteiro.</p>
                  <p>Sem aquela sensação constante de rigidez que limita sua vida. Você vai começar a se sentir muito melhor do que se sente hoje.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-5 text-left">
                  <div className="flex gap-4 items-start p-6 bg-white rounded-3xl shadow-premium border border-white hover:border-secondary/20 transition-all">
                    <Check className="w-6 h-6 text-secondary shrink-0 stroke-[3px]" />
                    <p className="text-base lg:text-lg font-bold text-slate-800">Foque na vida, não na dor.</p>
                  </div>
                  <div className="flex gap-4 items-start p-6 bg-white rounded-3xl shadow-premium border border-white hover:border-secondary/20 transition-all">
                    <Check className="w-6 h-6 text-secondary shrink-0 stroke-[3px]" />
                    <p className="text-base lg:text-lg font-bold text-slate-800">Recupere a leveza do corpo.</p>
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
            <h2 className="font-headline text-3xl lg:text-4xl font-bold text-center mb-16 tracking-tight">Perguntas frequentes</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {[
                { q: "Isso substitui acompanhamento profissional?", a: "Não. O SUPER COLUNA é um programa digital de apoio voltado para mobilidade e fortalecimento preventivo. Em casos específicos ou persistentes, procure orientação profissional." },
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
        <section className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="section-container relative z-10">
            <div className="text-center space-y-8 mb-20 animate-fade-in-up">
              <h2 className="font-headline text-3xl lg:text-6xl font-bold leading-tight tracking-tight">Quanto mais você adia,<br />mais <span className="text-primary">normal</span> isso parece.</h2>
              <div className="space-y-4 max-w-2xl mx-auto">
                <p className="text-lg lg:text-xl text-white/80 font-medium">Viver com o corpo rígido não deveria ser o seu novo normal.</p>
                <p className="text-white/40 text-sm font-bold uppercase tracking-[0.2em]">O SUPER COLUNA ajuda você a recuperar sua liberdade.</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-10 items-stretch animate-fade-in-up">
              {/* Left Side: Deliverables */}
              <div className="space-y-10 bg-white/5 p-10 lg:p-12 rounded-[2.5rem] border border-white/5">
                <h3 className="text-2xl font-bold text-primary tracking-tight">Ao ativar seu acesso, você recebe:</h3>
                <div className="grid gap-6">
                  {[
                    { title: "Aplicativo com Programa de 30 Dias", desc: "Rotina estruturada e sem complicação." },
                    { title: "Exercícios Diários em Vídeo", desc: "Aulas simples e fáceis de acompanhar." },
                    { title: "Acompanhamento de Evolução", desc: "Visualize seu progresso diário." },
                    { title: "Sistema de Conquistas", desc: "Pequenas vitórias motivadoras." },
                    { title: "Área \"Entenda Sua Coluna\"", desc: "Vídeos educativos exclusivos." },
                    { title: "Acesso Imediato", desc: "Comece agora pelo celular ou PC." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
                        <p className="text-sm text-white/40 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Results */}
              <div className="bg-white/10 border border-white/10 rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
                
                <div className="space-y-8 relative z-10">
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-[0.2em] text-primary">Nos próximos 15 dias:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    {["✓ Mais mobilidade", "✓ Menos rigidez", "✓ Mais confiança", "✓ Mais liberdade", "✓ Rotina simples"].map((text, i) => (
                      <span key={i} className="text-lg font-bold text-white/90 tracking-tight">{text}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-12 space-y-8 pt-10 border-t border-white/10 relative z-10">
                  <p className="text-lg text-white/70 leading-relaxed italic font-medium">
                    "Daqui a 30 dias, você pode continuar como está ou agradecer por ter dado o primeiro passo hoje."
                  </p>
                  
                  <div className="space-y-5">
                    <Button asChild size="lg" className="w-full h-18 py-8 rounded-full text-xl font-black shadow-button group bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all">
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
            <span className="font-headline font-bold text-slate-900 tracking-tighter">SUPER COLUNA</span>
          </div>
          <p className="text-xs font-semibold text-slate-400 max-w-md mx-auto leading-relaxed uppercase tracking-widest">
            Este aplicativo é focado em mobilidade e fortalecimento preventivo. Resultados variam conforme a consistência. © 2024 Super Coluna.
          </p>
        </div>
      </footer>
    </div>
  );
}
