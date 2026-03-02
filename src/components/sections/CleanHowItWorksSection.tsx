import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ListChecks, CreditCard, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  { icon: UserPlus, title: 'Crie sua conta', desc: 'Cadastro em menos de 1 minuto com e-mail e senha' },
  { icon: ListChecks, title: 'Escolha seu plano', desc: 'Selecione o plano ideal para suas necessidades' },
  { icon: CreditCard, title: 'Pague ou recarregue', desc: 'Assine um plano ou recarregue saldo para economizar' },
  { icon: Search, title: 'Faça suas consultas', desc: 'Acesse informações completas em segundos' },
];

const CleanHowItWorksSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Como funciona</h2>
          <p className="text-muted-foreground">4 passos simples para começar</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="bg-card/80 backdrop-blur-md border border-border/60 rounded-xl p-6 text-center"
            >
              <div className="h-14 w-14 rounded-full bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-xs font-bold text-primary mb-2">PASSO {i + 1}</div>
              <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="font-semibold px-8"
            onClick={() => navigate('/registration')}
          >
            Comece em 1 minuto
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CleanHowItWorksSection;
