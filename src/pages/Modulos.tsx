import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import MenuSuperior from '@/components/MenuSuperior';
import NewFooter from '@/components/NewFooter';
import PageLayout from '@/components/layout/PageLayout';
import { useApiPanels } from '@/hooks/useApiPanels';
import { useApiModules } from '@/hooks/useApiModules';
import ModuleCardTemplates from '@/components/configuracoes/personalization/ModuleCardTemplates';
import ModuleGridWrapper from '@/components/configuracoes/personalization/ModuleGridWrapper';

const Modulos = () => {
  const { panels } = useApiPanels();
  const { modules, isLoading } = useApiModules();
  const [search, setSearch] = useState('');

  // Filter only active consultation modules
  const consultationModules = useMemo(() => {
    const activeModules = modules.filter(m => m.is_active && m.operational_status === 'on');
    // Filter by category 'consulta' or 'consultas', or modules whose panel is consultation-related
    return activeModules.filter(m => {
      const cat = (m.category || '').toLowerCase();
      return cat.includes('consult');
    });
  }, [modules]);

  const filtered = useMemo(() => {
    if (!search.trim()) return consultationModules;
    const q = search.toLowerCase();
    return consultationModules.filter(m =>
      (m.title || m.name || '').toLowerCase().includes(q) ||
      (m.description || '').toLowerCase().includes(q)
    );
  }, [consultationModules, search]);

  // Get template from the first module's panel
  const getTemplate = () => {
    if (filtered.length === 0) return 'modern' as const;
    const panel = panels.find(p => p.id === filtered[0]?.panel_id);
    const validTemplates = ['corporate', 'creative', 'minimal', 'modern', 'elegant', 'forest', 'rose', 'cosmic', 'neon', 'sunset', 'arctic', 'volcano', 'matrix'];
    if (panel?.template && validTemplates.includes(panel.template)) {
      return panel.template as any;
    }
    return 'modern' as const;
  };

  const template = getTemplate();

  return (
    <PageLayout variant="auth" backgroundOpacity="strong" showGradients={false} className="flex flex-col">
      <MenuSuperior />
      <main className="w-full overflow-x-hidden">
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Módulos de Consulta</h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Confira todos os módulos de consulta disponíveis na plataforma
              </p>
            </motion.div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar módulo..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filtered.length > 0 ? (
              <ModuleGridWrapper>
                {filtered.map((mod) => (
                  <motion.div
                    key={mod.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ModuleCardTemplates
                      module={{
                        title: mod.title || mod.name,
                        description: mod.description,
                        price: '',
                        status: 'ativo',
                        operationalStatus: 'on',
                        iconSize: 'medium',
                        showDescription: true,
                        icon: mod.icon,
                        color: mod.color,
                      }}
                      template={template}
                    />
                  </motion.div>
                ))}
              </ModuleGridWrapper>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum módulo de consulta encontrado</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <NewFooter />
    </PageLayout>
  );
};

export default Modulos;
